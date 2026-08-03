"use client";

import { useResearch } from "@/hooks/useResearch";

export function Summary() {
  const { state } = useResearch();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">Summary</p>
      <h2 className="mt-1 text-xl font-semibold text-slate-900">Executive summary</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {state.summary || "A concise summary will be displayed here once research data is available."}
      </p>
    </section>
  );
}
