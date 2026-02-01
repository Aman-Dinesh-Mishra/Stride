import React from "react";

export default function ResumeForm({
  formData,
  setFormData,
  onGenerate,
  loading,
}) {
  const updatePersonal = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const handleJobDesc = (e) =>
    setFormData((prev) => ({ ...prev, jobDescription: e.target.value }));

  // 🔧 FIX: store notes correctly (NOT summary)
  const handleNotes = (e) =>
    setFormData((prev) => ({ ...prev, notes: e.target.value }));

  const isReady =
    formData.jobDescription && formData.personal?.name && formData.notes;

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-6">AI Resume Builder</h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          value={formData?.personal?.name || ""}
          onChange={(e) => updatePersonal("name", e.target.value)}
          placeholder="Full Name *"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={formData?.personal?.email || ""}
          onChange={(e) => updatePersonal("email", e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={formData?.personal?.phone || ""}
          onChange={(e) => updatePersonal("phone", e.target.value)}
          placeholder="Phone"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={formData?.personal?.role || ""}
          onChange={(e) => updatePersonal("role", e.target.value)}
          placeholder="Target Role"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Job Description *
        </label>
        <textarea
          value={formData?.jobDescription || ""}
          onChange={handleJobDesc}
          placeholder="Paste job description..."
          rows="4"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 resize-vertical"
        />
      </div>

      {/* Notes (MAIN DATA SOURCE) */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Notes (Experience, Projects, Education, Skills) *
        </label>
        <textarea
          value={formData?.notes || ""}
          onChange={handleNotes}
          placeholder={`Example:
Software Engineer, XYZ Corp (2022–2024)
- Built REST APIs using Node.js and Express
- Improved performance by 30%

Projects:
Inventory Management System
- React, Node.js, MongoDB

Education:
B.Tech CSE, ABC University, CGPA 8.5

Skills:
JavaScript, React, Node.js, MongoDB`}
          rows="6"
          className="w-full p-3 border rounded-lg dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 resize-vertical"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={loading || !isReady}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
      >
        {loading ? "Generating..." : "Generate AI Resume"}
      </button>
    </div>
  );
}
