export default function parseNotes(notes = "") {
  const sections = {
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
  };

  if (!notes) return sections;

  const expRegex =
    /\*\*(.*?)\s*–\s*(.*?)\*\*\s*\((.*?)\)[\s\S]*?(?=\n\n|\n##|$)/g;

  let match;
  while ((match = expRegex.exec(notes)) !== null) {
    sections.experience.push({
      role: match[1].trim(),
      company: match[2].trim(),
      dates: match[3].trim(),
    });
  }

  const eduRegex =
    /\*\*(.*?)\*\*\s*\n\s*(.*?)\s*\((.*?)\)[\s\S]*?CGPI:\s*(.*)/g;

  while ((match = eduRegex.exec(notes)) !== null) {
    sections.education.push({
      degree: match[1].trim(),
      school: match[2].trim(),
      year: match[3].trim(),
      cgpa: match[4].trim(),
    });
  }

  const projectRegex = /\*\*(.*?)\*\*\s*\((.*?)\)/g;
  while ((match = projectRegex.exec(notes)) !== null) {
    sections.projects.push({
      name: match[1].trim(),
    });
  }

  return sections;
}
