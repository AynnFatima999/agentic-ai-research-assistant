"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { INITIAL_RESEARCH_STATE } from "@/lib/constants";
import {
  createResearchStream,
  downloadPDF,
} from "@/lib/api";

import type {
  ProgressEvent,
  ResearchRequest,
  ResearchResponse,
  ResearchState,
  SummaryLength,
} from "@/types/research";

interface ResearchContextValue {
  state: ResearchState;

  startResearch: (
    topic: string,
    summaryLength: SummaryLength
  ) => void;

  resetResearch: () => void;

  downloadResearchPDF: () => Promise<void>;
}

const ResearchContext = createContext<
  ResearchContextValue | undefined
>(undefined);

export function ResearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] =
    useState<ResearchState>(INITIAL_RESEARCH_STATE);

  const startResearch = (
    topic: string,
    summaryLength: SummaryLength
  ) => {
    setState({
      topic,
      summaryLength,
      isRunning: true,
      progress: 0,
      progressMessage: "Starting research...",
      result: null,
      error: null,
    });

    createResearchStream(
      topic,

      summaryLength,

      (progress: ProgressEvent) => {
        setState((prev) => ({
          ...prev,
          progress: progress.progress,
          progressMessage: progress.message,
        }));
      },

      (result: ResearchResponse) => {
        setState((prev) => ({
          ...prev,
          isRunning: false,
          progress: 100,
          progressMessage: "Completed",
          result,
        }));
      },

      (message: string) => {
        setState((prev) => ({
          ...prev,
          isRunning: false,
          error: message,
        }));
      }
    );
  };

  const downloadResearchPDF = async () => {
    if (!state.topic) return;

    const payload: ResearchRequest = {
      topic: state.topic,
      summary_length: state.summaryLength,
    };

    const blob = await downloadPDF(payload);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download =
      `${state.topic.replace(/\s+/g, "_")}.pdf`;

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const resetResearch = () => {
    setState(INITIAL_RESEARCH_STATE);
  };

  const value = useMemo(
    () => ({
      state,
      startResearch,
      resetResearch,
      downloadResearchPDF,
    }),
    [state]
  );

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch() {
  const context = useContext(ResearchContext);

  if (!context) {
    throw new Error(
      "useResearch must be used inside ResearchProvider."
    );
  }

  return context;
}