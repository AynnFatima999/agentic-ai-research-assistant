import { ResearchState } from "@/types/research";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const SUMMARY_LENGTH_OPTIONS = [
  {
    value: "short",
    label: "Short",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "long",
    label: "Long",
  },
] as const;

export const INITIAL_RESEARCH_STATE: ResearchState = {
  topic: "",
  summaryLength: "medium",
  isRunning: false,
  progress: 0,
  progressMessage: "",
  result: null,
  error: null,
};