import React from "react";

export default function Features() {
  const features = [
    {
      title: "ATS-Optimized Structure",
      desc: "Resumes formatted to pass applicant tracking systems without breaking layouts.",
    },
    {
      title: "Role-Specific Templates",
      desc: "Layouts designed specifically for engineering, product, data, and business roles.",
    },
    {
      title: "Smart Bullet Suggestions",
      desc: "Impact-focused resume points tailored to your experience and job role.",
    },
    {
      title: "Keyword Matching",
      desc: "Aligns resume keywords with job descriptions to improve shortlist chances.",
    },
    {
      title: "Clean PDF Export",
      desc: "Recruiter-friendly PDFs that render correctly across all ATS platforms.",
    },
    {
      title: "Privacy by Design",
      desc: "Your resume data is never shared, sold, or used for model training.",
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-medium text-[#4F46E5]">
            Why Stride AI
          </span>

          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            Designed for modern hiring systems
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Most resumes fail before a human ever sees them. Stride AI focuses
            on structure, relevance, and clarity — exactly what ATS software
            looks for.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-xl p-6
                transition-all duration-200
                hover:-translate-y-1 hover:border-[#4F46E5]
              "
            >
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-[#4F46E5]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
