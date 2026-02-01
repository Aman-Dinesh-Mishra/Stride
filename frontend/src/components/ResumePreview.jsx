import React from "react";

const Section = ({ title, children }) => {
  if (!children || (Array.isArray(children) && children.length === 0))
    return null;

  return (
    <section className="mt-4 print:mt-1">
      <h2 className="text-sm font-bold border-b mb-2 print:mb-1">{title}</h2>
      {children}
    </section>
  );
};

// Helper to normalize bullets array or string
const normalizeBullets = (bullets, description) => {
  if (Array.isArray(bullets)) return bullets;
  if (typeof description === "string") return [description];
  return [];
};

export default function ResumePreview({ resume }) {
  if (!resume) return null;

  const {
    personal = {},
    education = [],
    skills = [],
    experience = [],
    projects = [],
    certifications = [],
  } = resume;

  return (
    <div
      id="resume-print"
      className="bg-white text-black p-8 shadow rounded text-[10pt] leading-tight print:p-2 print:shadow-none print:text-[10pt] print:leading-tight"
    >
      {/* PERSONAL */}
      <h1 className="text-2xl font-bold print:text-xl">
        {personal.name || "Your Name"}
      </h1>

      <p className="text-xs mt-1 print:mt-0">
        {[personal.phone, personal.email, personal.portfolio, personal.linkedin]
          .filter(Boolean)
          .join(" | ")}
      </p>

      {personal.summary && (
        <p className="mt-2 print:mt-1">{personal.summary}</p>
      )}

      {/* EDUCATION */}
      <Section title="EDUCATION">
        {education.map((e, i) => (
          <div key={i} className="mb-2 print:mb-1">
            <div className="flex justify-between">
              <strong>{e.school}</strong>
              {e.cgpa && <span>CGPA: {e.cgpa}</span>}
            </div>
            <div className="flex justify-between text-xs print:text-[9pt]">
              <span>{e.degree}</span>
              {e.year && <span>{e.year}</span>}
            </div>
          </div>
        ))}
      </Section>

      {/* SKILLS */}
      <Section title="TECHNICAL SKILLS">
        {Array.isArray(skills) ? (
          <ul className="list-disc ml-5 mt-1 print:ml-4 print:mt-0">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          Object.entries(skills).map(
            ([category, items]) =>
              Array.isArray(items) &&
              items.length > 0 && (
                <div key={category} className="mb-2 print:mb-1">
                  <strong>{category.toUpperCase()}:</strong>
                  <ul className="list-disc ml-5 mt-1 print:ml-4 print:mt-0">
                    {items.map((skill, idx) => (
                      <li key={idx}>{skill?.name || skill}</li>
                    ))}
                  </ul>
                </div>
              ),
          )
        )}
      </Section>

      {/* EXPERIENCE */}
      <Section title="WORK EXPERIENCE">
        {experience.map((e, i) => (
          <div key={i} className="mb-3 print:mb-2">
            <div className="flex justify-between font-semibold print:text-[10pt]">
              <span>
                {e.role} {e.company && `— ${e.company}`}
              </span>
              {e.dates && <span>{e.dates}</span>}
            </div>

            <ul className="list-disc ml-5 mt-1 print:ml-4 print:mt-0">
              {normalizeBullets(e.bullets, e.description)
                .slice(0, 3) // limit to 3 bullets
                .map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="PROJECTS">
        {projects.map((p, i) => {
          let name = p.name;
          let dates = p.dates || null;

          // Fallback: extract date from name if AI added "|"
          if (!dates && typeof p.name === "string" && p.name.includes("|")) {
            const parts = p.name.split("|");
            name = parts[0].trim();
            dates = parts.slice(1).join("|").trim();
          }

          return (
            <div key={i} className="mb-3 print:mb-2">
              <div className="flex justify-between font-semibold print:text-[10pt]">
                <span>{name}</span>
                {dates && (
                  <span className="font-bold whitespace-nowrap">{dates}</span>
                )}
              </div>

              <ul className="list-disc ml-5 mt-1 print:ml-4 print:mt-0">
                {normalizeBullets(p.bullets, p.description)
                  .slice(0, 3) // limit to 3 bullets
                  .map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
              </ul>
            </div>
          );
        })}
      </Section>

      {/* CERTIFICATIONS */}
      <Section title="CERTIFICATIONS">
        <ul className="list-disc ml-5 mt-1 print:ml-4 print:mt-0">
          {certifications.map((c, i) => (
            <li key={i}>
              <div className="flex justify-between">
                <span>{c}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* PDF */}
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 print:hidden"
      >
        Download PDF
      </button>
    </div>
  );
}
