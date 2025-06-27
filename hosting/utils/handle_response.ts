import { logging } from "./logging";

export const handleResponse = async (
  response: Response,
  url: string,
): Promise<{
  output: [string, string][] | null;
  elapsed_time: string;
  error: string | null;
}> => {
  if (!response.ok) {
    const errorData = await response.json();
    console.error("errorData", errorData);
    logging("Response status:", response.status);
    logging("Error response:", errorData);
    return {
      output: null,
      elapsed_time: "0.0",
      error: `取得に失敗しました\n(Status code: ${response.status} - ${errorData.error})`,
    };
  }

  const data = await response.json();
  logging("Response=data.gemini_result:", data.gemini_result);

  let parsedPairs: [string, string][] = [];
  try {
    let raw = data.gemini_result.generated_text.trim();

    // Markdownブロックが含まれていれば除去
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json\s*|\s*```/g, "");
    }
    // \nが含まれていたら除去
    raw = raw.replace(/\n/g, "");
    parsedPairs = JSON.parse(raw);
  } catch (e) {
    // TODO: ここに来たら出力が [[]] だけになっている？
    console.log("JSON parse error:", e);
    parsedPairs = JSON.parse(data.gemini_result.generated_text);
  }

  const elapsed_time = parseFloat(data.gemini_result.elapsed_time).toFixed(1);
  return {
    output: parsedPairs,
    elapsed_time: elapsed_time,
    // result: `URL entered: ${url}\nFirebase Function Response:\n${data.result.response}\n時間(sec): ${elapsed_time}`,  // TODO: consider removing this
    error: null,
  };
};
