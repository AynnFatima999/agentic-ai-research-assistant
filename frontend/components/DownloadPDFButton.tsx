"use client";

import { useState } from "react";

import { useResearch } from "@/hooks/useResearch";

export function DownloadPDFButton() {
  const { state, downloadResearchPDF } = useResearch();

  const [downloading, setDownloading] = useState(false);


  const handleDownload = async () => {
    try {
      setDownloading(true);

      await downloadResearchPDF();

    } catch (error) {
      console.error(error);
      alert("Failed to download PDF.");

    } finally {
      setDownloading(false);
    }
  };


  if (!state.result) {
    return null;
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

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          via-indigo-600
          to-blue-600
          px-6
          py-4
          font-semibold
          text-white
          shadow-lg
          shadow-purple-900/30
          transition
          hover:scale-[1.02]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >

        <span className="relative z-10">
          {downloading
            ? "Generating PDF..."
            : "Download Research PDF"}
        </span>


        <div
          className="
            absolute
            inset-0
            translate-x-[-100%]
            bg-white/20
            transition-transform
            duration-700
            group-hover:translate-x-[100%]
          "
        />

      </button>


    </section>
  );
}