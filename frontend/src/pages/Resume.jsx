import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import api from "../services/api";

// 1. Utility function: Purely for data formatting (No Hooks allowed here)
const normalizeResume = (resume) => {
  if (!resume) return null;

  const personal = resume.personal || {};

  return {
    personal: {
      name:
        personal.name ||
        personal.fullName ||
        personal.full_name ||
        personal.username ||
        "",
      email: personal.email || "",
      phone: personal.phone || "",
      linkedin: personal.linkedin || "",
      portfolio: personal.portfolio || "",
      location: personal.location || "",
      summary: personal.summary || "",
    },
    education: resume.education || [],
    skills: resume.skills || [],
    experience: resume.experience || [],
    projects: resume.projects || [],
    certifications: resume.certifications || [],
    _id: resume._id,
    title: resume.title || "",
  };
};

export default function Resume() {
  const [formData, setFormData] = useState({
    personal: {},
    education: [],
    experience: [],
    projects: [],
    jobDescription: "",
    notes: "",
  });

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Fetch logic: Strictly filters out the "AI Optimized" placeholders
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/resume")
      .then((res) => {
        const fetched = res.data.resumes || [];
        // REMOVE: Any resume with the placeholder title or missing title
        const filtered = fetched.filter(
          (r) => r && r.title && r.title !== "ATS Optimized Resume"
        );
        setResumes(filtered);
      })
      .catch((err) =>
        console.error("Failed to fetch resumes:", err.response?.data || err)
      );
  }, []);

  const generateResume = async () => {
    setLoading(true);
    try {
      const genRes = await api.post("/resume/generate", { ...formData });
      const generatedResume = genRes.data;

      // Merge user data with AI data
      generatedResume.personal = {
        ...generatedResume.personal,
        ...formData.personal,
      };

      const normalized = normalizeResume(generatedResume);

      setResumes((prev) => [normalized, ...prev]);
      setSelectedResume(normalized);
      setActiveId(normalized._id || null);
    } catch (err) {
      console.error("Resume generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromUI = (id) => {
    setResumes((prev) => prev.filter((r) => r._id !== id));
    if (id === activeId) {
      setSelectedResume(null);
      setActiveId(null);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Resume Builder</h1>

      {/* 3. List Rendering: No "ATS Optimized" fallbacks */}
      {resumes.length > 0 && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {resumes.map((r) => (
            <div
              key={r._id}
              className={`border rounded-lg p-3 ${
                r._id === activeId ? "border-blue-600" : "border-gray-700"
              }`}
            >
              <p
                onClick={() => {
                  setSelectedResume(normalizeResume(r));
                  setActiveId(r._id);
                }}
                className="font-medium text-sm cursor-pointer truncate"
              >
                {r.title}
              </p>
              <button
                onClick={() => removeFromUI(r._id)}
                className="text-xs text-red-600 mt-2 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeForm
          formData={formData}
          setFormData={setFormData}
          onGenerate={generateResume}
          loading={loading}
        />

        {selectedResume ? (
          <ResumePreview resume={selectedResume} />
        ) : (
          <div className="border border-dashed rounded p-10 text-center text-gray-500">
            Fill the form and generate to see your resume
          </div>
        )}
      </div>
    </section>
  );
}
