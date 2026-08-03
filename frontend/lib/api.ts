import {
  API_BASE_URL,
} from "@/lib/constants";

import type {
  ProgressEvent,
  ResearchRequest,
  ResearchResponse,
} from "@/types/research";


export async function requestResearch(
  payload: ResearchRequest
): Promise<ResearchResponse> {

  const response = await fetch(
    `${API_BASE_URL}/research/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {
    throw new Error(
      "Failed to generate research."
    );
  }


  return response.json();
}



export function createResearchStream(
  topic: string,
  summaryLength: string,
  onProgress: (event: ProgressEvent) => void,
  onComplete: (result: ResearchResponse) => void,
  onError: (message: string) => void
) {

  const url =
    `${API_BASE_URL}/research/stream` +
    `?topic=${encodeURIComponent(topic)}` +
    `&summary_length=${summaryLength}`;


  const eventSource = new EventSource(url);


  let completed = false;



  eventSource.addEventListener(
    "progress",
    (event) => {

      const data: ProgressEvent =
        JSON.parse(event.data);

      onProgress(data);

    }
  );



  eventSource.addEventListener(
    "completed",
    (event) => {

      completed = true;


      const data: ResearchResponse =
        JSON.parse(event.data);


      onComplete(data);


      eventSource.close();

    }
  );



  eventSource.onerror = () => {

    if (!completed) {
      onError(
        "Research failed."
      );
    }


    eventSource.close();

  };


  return eventSource;
}




export async function downloadPDF(
  payload: ResearchRequest
): Promise<Blob> {

  const response = await fetch(
    `${API_BASE_URL}/research/pdf`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {
    throw new Error(
      "Failed to generate PDF."
    );
  }


  return response.blob();

}