"use client";

import { useState } from "react";

import { SUMMARY_LENGTH_OPTIONS } from "@/lib/constants";
import { useResearch } from "@/hooks/useResearch";

import type {
  SummaryLength,
} from "@/types/research";

export function ResearchForm() {
  const {
    state,
    startResearch,
  } = useResearch();

  const [topic, setTopic] = useState("");

  const [summaryLength, setSummaryLength] =
    useState<SummaryLength>("medium");


  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!topic.trim()) return;

    startResearch(
      topic.trim(),
      summaryLength
    );
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="
        grid gap-5 rounded-3xl 
        border border-white/10 
        bg-white/5 
        p-6 
        shadow-2xl 
        backdrop-blur-xl
        md:grid-cols-[2fr_220px_auto]
      "
    >

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Research Topic
        </label>

        <input
          type="text"
          value={topic}
          disabled={state.isRunning}
          placeholder="Artificial Intelligence"
          onChange={(e) =>
            setTopic(e.target.value)
          }
          className="
            w-full rounded-xl 
            border border-white/10
            bg-black/30
            px-4 py-3
            text-white
            placeholder:text-slate-500
            outline-none
            transition
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/20
            disabled:opacity-50
          "
        />
      </div>


      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Summary Length
        </label>

        <select
          value={summaryLength}
          disabled={state.isRunning}
          onChange={(e) =>
            setSummaryLength(
              e.target.value as SummaryLength
            )
          }
          className="
            w-full rounded-xl
            border border-white/10
            bg-black/30
            px-4 py-3
            text-white
            outline-none
            transition
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/20
            disabled:opacity-50
          "
        >
          {SUMMARY_LENGTH_OPTIONS.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#080812]"
              >
                {option.label}
              </option>
            )
          )}

        </select>
      </div>


      <button
        type="submit"
        disabled={state.isRunning}
        className="
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-indigo-600
          px-6 py-3
          font-semibold
          text-white
          shadow-lg
          shadow-purple-900/30
          transition
          hover:scale-[1.02]
          hover:from-purple-500
          hover:to-indigo-500
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {state.isRunning
          ? "Researching..."
          : "Start Research"}
      </button>


    </form>
  );
}