"use client";

import { useResearch } from "@/hooks/useResearch";

export function ProgressSection() {
  const { state } = useResearch();

  return (
    <section
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        p-6
        shadow-2xl
        backdrop-blur-xl
      "
    >

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Research Progress
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {state.progressMessage || "Waiting for research..."}
          </p>
        </div>


        <div
          className="
            rounded-full
            border border-purple-500/30
            bg-purple-500/10
            px-4 py-2
            text-2xl
            font-bold
            text-purple-400
          "
        >
          {state.progress}%
        </div>

      </div>


      <div
        className="
          h-3
          w-full
          overflow-hidden
          rounded-full
          bg-black/40
          border
          border-white/10
        "
      >

        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-purple-500
            via-indigo-500
            to-blue-500
            shadow-lg
            shadow-purple-500/40
            transition-all
            duration-700
          "
          style={{
            width: `${state.progress}%`,
          }}
        />

      </div>


      <div className="mt-5 flex justify-between text-sm text-slate-400">

        <span>
          {state.topic || "No topic selected"}
        </span>


        <span className="capitalize">
          {state.summaryLength}
        </span>

      </div>


      {state.error && (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-3
            text-sm
            text-red-300
          "
        >
          {state.error}
        </div>
      )}

    </section>
  );
}