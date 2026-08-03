"use client";

import { useResearch } from "@/hooks/useResearch";

export function ReferenceList() {
  const { state } = useResearch();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">References</p>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {state.references.length > 0 ? (
          state.references.map((reference) => (
            <li key={reference} className="rounded-xl border border-slate-200 px-4 py-3">
              {reference}
            </li>
          ))
        ) : (
          <li className="rounded-xl border border-slate-200 px-4 py-3">References will be listed here.</li>
        )}
      </ul>
    </section>
  );
}
