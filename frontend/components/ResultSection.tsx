"use client";

import { useResearch } from "@/hooks/useResearch";

export function ResultSection() {
  const { state } = useResearch();


  if (!state.result) {
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

        <h2 className="mb-5 text-xl font-semibold text-white">
          Research Result
        </h2>


        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-white/20
            bg-black/20
            p-10
            text-center
            text-slate-400
          "
        >
          No research available yet.
        </div>


      </section>
    );
  }


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

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-2xl font-bold text-white">
          {state.result.topic}
        </h2>


        <span
          className="
            w-fit
            rounded-full
            border
            border-emerald-400/30
            bg-emerald-400/10
            px-4
            py-1
            text-sm
            font-medium
            text-emerald-300
          "
        >
          ✓ Completed
        </span>

      </div>


      <div
        className="
          mb-8
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-5
        "
      >

        <h3 className="mb-3 text-lg font-semibold text-purple-300">
          Summary
        </h3>


        <p className="leading-8 text-slate-300">
          {state.result.summary}
        </p>

      </div>



      <div className="mb-8">

        <h3 className="mb-4 text-lg font-semibold text-purple-300">
          Key Points
        </h3>


        <div className="grid gap-3">

          {state.result.key_points.map((point, index) => (

            <div
              key={index}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                text-slate-300
                transition
                hover:border-purple-500/40
                hover:bg-purple-500/5
              "
            >

              <span className="mr-2 text-purple-400">
                {index + 1}.
              </span>

              {point}

            </div>

          ))}

        </div>

      </div>



      <div>

        <h3 className="mb-4 text-lg font-semibold text-purple-300">
          References
        </h3>


        <div className="grid gap-3">

          {state.result.references.map((reference) => (

            <a
              key={reference.url}
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                text-slate-300
                transition
                hover:border-indigo-500/50
                hover:bg-indigo-500/10
              "
            >

              <p className="font-medium text-white">
                {reference.title}
              </p>

              <p className="mt-1 truncate text-sm text-slate-400">
                {reference.url}
              </p>

            </a>

          ))}

        </div>

      </div>


    </section>
  );
}