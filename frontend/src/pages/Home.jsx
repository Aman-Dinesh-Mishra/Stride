import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-28">
        <div className="max-w-3xl">
          <span className="text-sm font-medium text-[#4F46E5]">
            ATS-ready resumes
          </span>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Build resumes that get
            <br className="hidden sm:block" />
            past hiring systems
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            Stride AI helps you create clean, role-specific resumes optimized
            for modern applicant tracking systems — without sacrificing
            readability.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              to="/builder"
              className="px-6 py-3 rounded-md bg-[#4F46E5] text-white text-lg font-medium hover:opacity-90"
            >
              Get Started
            </Link>

            <Link
              to="/features"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
