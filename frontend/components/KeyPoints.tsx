"use client";

import { useResearch } from "@/hooks/useResearch";

export function KeyPoints() {
  const { state } = useResearch();

  const keyPoints = state.result?.key_points ?? [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        Key Points
      </p>

      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {keyPoints.length > 0 ? (
          keyPoints.map((point, index) => (
            <li
              key={index}
              className="rounded-xl bg-slate-50 px-4 py-3"
            >
              {point}
            </li>
          ))
        ) : (
          <li className="rounded-xl bg-slate-50 px-4 py-3">
            Key findings will appear here once available.
          </li>
        )}
      </ul>
    </section>
  );
}