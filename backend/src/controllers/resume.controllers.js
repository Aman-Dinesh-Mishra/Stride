import Resume from "../models/resume.models.js";
import atsResumePrompt from "../utils/prompt.js";
import generateWithGroq from "../utils/ai.js";
import parseNotes from "../utils/parseNotes.js";

// Helper to clean strings
const clean = (s = "") => s.replace(/\*\*/g, "").replace(/\*/g, "").trim();

// Normalize bullets: array or single string
const normalizeBullets = (bullets, description) => {
  if (Array.isArray(bullets)) return bullets.map(clean);
  if (typeof description === "string") return [clean(description)];
  return [];
};

// Categorize skills
const categorizeSkills = (skillsArray = []) => {
  const skillCategories = {
    "Programming Languages": [],
    "Web Technologies": [],
    "Data & Analytics": [],
    Databases: [],
    Concepts: [],
  };

  skillsArray.forEach((skill) => {
    const s = skill.toLowerCase();
    if (["python", "c++", "java", "sql"].includes(s))
      skillCategories["Programming Languages"].push(skill);
    else if (["reactjs", "nodejs", "rest apis"].includes(s))
      skillCategories["Web Technologies"].push(skill);
    else if (
      ["pandas", "numpy", "seaborn", "tableau", "excel", "power bi"].includes(s)
    )
      skillCategories["Data & Analytics"].push(skill);
    else if (["mysql", "mongodb", "postgresql"].includes(s))
      skillCategories["Databases"].push(skill);
    else skillCategories["Concepts"].push(skill);
  });

  const formattedSkills = [];
  for (const key of Object.keys(skillCategories)) {
    if (skillCategories[key].length)
      formattedSkills.push(`${key}: ${skillCategories[key].join(", ")}`);
  }

  return formattedSkills;
};

// Generate ATS-friendly resume
export const generateResume = async (req, res) => {
  try {
    const {
      personal = {},
      education = [],
      experience = [],
      projects = [],
      jobDescription = "",
      notes = "",
    } = req.body;

    const parsedNotes = parseNotes(notes);

    // Use structured data if provided, else extract from notes
    const finalExperience =
      experience.length > 0 ? experience : parsedNotes.experience || [];
    const finalEducation =
      education.length > 0 ? education : parsedNotes.education || [];
    const finalProjects =
      projects.length > 0 ? projects : parsedNotes.projects || [];

    const prompt = atsResumePrompt({
      personal,
      education: finalEducation,
      experience: finalExperience,
      projects: finalProjects,
      jobDescription,
      notes,
    });

    const aiResponse = await generateWithGroq(prompt);

    let resume;
    try {
      resume = JSON.parse(aiResponse);
    } catch {
      return res
        .status(502)
        .json({ error: "Invalid AI response format", type: "AI_PARSE_ERROR" });
    }

    // Clean and normalize education
    resume.education = (resume.education || []).map((e) => ({
      ...e,
      cgpa: clean(e.cgpa),
    }));

    // Normalize experience bullets
    resume.experience = (resume.experience || []).map((e) => ({
      ...e,
      bullets: normalizeBullets(e.bullets, e.description),
    }));

    // Normalize project bullets
    resume.projects = (resume.projects || []).map((p) => ({
      ...p,
      bullets: normalizeBullets(p.bullets, p.description),
    }));

    // Remove project duplicates that match experience names
    const experienceKeys = new Set(
      resume.experience.map((e) => `${e.role}|${e.company}`),
    );
    resume.projects = resume.projects.filter(
      (p) => !experienceKeys.has(p.name),
    );

    // Process skills
    const skillsArray = Array.isArray(resume.skills)
      ? resume.skills
      : typeof resume.skills === "string"
        ? resume.skills.split(",").map((s) => s.trim())
        : [];
    resume.skills = categorizeSkills(skillsArray);

    // Validate user-provided experience
    const userProvidedProfessionalExperience = experience.length > 0;
    if (userProvidedProfessionalExperience) {
      const invalidExperience = resume.experience?.some(
        (exp) =>
          !exp.role ||
          !exp.company ||
          !exp.dates ||
          exp.role === "Not specified" ||
          exp.company === "Not specified",
      );
      if (invalidExperience)
        return res.status(422).json({
          error: "Invalid resume output: malformed experience",
          type: "AI_VALIDATION_ERROR",
        });
    }

    return res.status(200).json(resume);
  } catch (err) {
    console.error("Resume generation error:", err);
    return res.status(500).json({
      error: "Resume generation failed",
      type: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Get user's resumes
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("title templateId atsScore status jobKeywords createdAt")
      .limit(10);

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};

// Get single resume
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

// Update resume status
export const updateResumeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["draft", "published"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use 'draft' or 'published'",
      });
    }

    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status, updatedAt: new Date() },
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: `Resume ${
        status === "published" ? "published" : "saved as draft"
      }`,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update resume",
      error: error.message,
    });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};
