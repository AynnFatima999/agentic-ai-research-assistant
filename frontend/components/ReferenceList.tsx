"use client";

import { useResearch } from "@/hooks/useResearch";

export function ReferenceList() {
  const { state } = useResearch();

  const references = state.result?.references ?? [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        References
      </p>

      <ul className="mt-4 space-y-3 text-sm">
        {references.length > 0 ? (
          references.map((reference) => (
            <li
              key={reference.url}
              className="rounded-xl border border-slate-200 px-4 py-3"
            >
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {reference.title}
              </a>
            </li>
          ))
        ) : (
          <li className="rounded-xl border border-slate-200 px-4 py-3 text-slate-600">
            References will be listed here.
          </li>
        )}
      </ul>
    </section>
  );
}