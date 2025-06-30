import { logging } from "./logging";

export const handleResponse = async (
  response: Response,
  url: string,
): Promise<{
  output: [string, string][] | null;
  elapsed_time: string;
  info: string | null;
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
      info: null,
      error: `取得に失敗しました\n(Status code: ${response.status} - ${errorData.error})`,
    };
  }

  const data = await response.json();
  logging("Response=data.gemini_result:", data.gemini_result);
  const elapsed_time = parseFloat(data.gemini_result.elapsed_time).toFixed(1);

  let raw = data.gemini_result.generated_text.trim();

  if (raw === "Code 999 No Tenaoshi") {
    logging("No Tenaoshi.");
    return {
      output: [],
      elapsed_time: elapsed_time,
      info: "修正する箇所は見つかりませんでした",
      error: null,
    };
  }

  if (raw === "Code 999 No Tech") {
    logging("No Tech blog found.");
    return {
      output: [],
      elapsed_time: elapsed_time,
      info: "技術ブログではないと判定されました",
      error: null,
    };
  }

  let parsedPairs: [string, string][] = [];
  try {
    // Markdownブロックが含まれていれば除去
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json\s*|\s*```/g, "");
    }
    // \nが含まれていたら除去
    raw = raw.replace(/\n/g, "");
    parsedPairs = JSON.parse(raw);
  } catch (e) {
    // TODO: ここに来たら出力が [[]] だけになっている想定
    console.log("JSON parse error:", e);
    parsedPairs = JSON.parse(data.gemini_result.generated_text);
  }

  return {
    output: parsedPairs,
    elapsed_time: elapsed_time,
    info: null,
    error: null,
  };
};
