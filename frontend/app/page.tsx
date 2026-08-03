import { ResearchProvider } from "@/hooks/useResearch";

import { ResearchForm } from "@/components/ResearchForm";
import { ProgressSection } from "@/components/ProgressSection";
import { ResultSection } from "@/components/ResultSection";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";
import { FadeIn } from "@/components/ui/FadeIn";

export default function HomePage() {
  return (
    <ResearchProvider>
      <main className="relative min-h-screen overflow-hidden bg-[#050510] px-4 py-10 text-white sm:px-6 lg:px-8">

        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

          <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="absolute bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        </div>


        <div className="relative mx-auto flex max-w-6xl flex-col gap-6">


          {/* Hero */}
          <FadeIn>

            <section
              className="
                rounded-3xl
                border border-white/10
                bg-white/5
                p-8
                shadow-2xl
                backdrop-blur-xl
                sm:p-10
              "
            >

              <div className="space-y-4">

                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-400">
                  AI Research Assistant
                </p>


                <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
                  Agentic AI Research Assistant
                </h1>


                <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Research any topic using AI agents, monitor real-time progress,
                  analyze trusted sources, and generate professional research reports.
                </p>

              </div>


              <div className="mt-10">
                <ResearchForm />
              </div>


            </section>

          </FadeIn>



          <FadeIn delay={0.2}>
            <ProgressSection />
          </FadeIn>



          <FadeIn delay={0.35}>
            <ResultSection />
          </FadeIn>



          <FadeIn delay={0.5}>
            <DownloadPDFButton />
          </FadeIn>



        </div>

      </main>
    </ResearchProvider>
  );
}