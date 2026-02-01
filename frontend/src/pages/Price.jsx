import React from "react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    tagline: "For simple, single resumes",
    features: [
      "1 ATS-friendly resume",
      "Access to basic templates",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    tagline: "For active job seekers",
    features: [
      "5 ATS-friendly resumes",
      "All templates",
      "Priority email support",
      "Smart bullet suggestions",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49/mo",
    tagline: "For teams and agencies",
    features: [
      "Unlimited resumes",
      "All templates",
      "Dedicated support",
      "Team collaboration",
      "Custom branding",
    ],
    popular: false,
  },
];

export default function Price() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Simple pricing for every stage
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose a plan that helps you ship polished, ATS-friendly resumes
            without overthinking the details.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-xl border bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm
                ${
                  plan.popular
                    ? "border-indigo-500 shadow-md shadow-indigo-500/10"
                    : "border-slate-200 dark:border-slate-800"
                }
                p-6 md:p-7 transition-transform duration-150 hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-50 text-[11px] font-medium text-indigo-600 px-2.5 py-0.5 dark:bg-indigo-500/10">
                    Most popular
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {plan.tagline}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">
                  {plan.price}
                </span>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full rounded-lg border text-sm font-medium py-2.5
                  ${
                    plan.popular
                      ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                      : "border-slate-300 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500"
                  }
                  transition-colors`}
              >
                Get {plan.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
