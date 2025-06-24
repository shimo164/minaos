"use client";

import { inputArea, squareArea } from "@/styles/classNames/layout";

interface GeminiModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
}

export default function GeminiModelSelector({
  model,
  setModel,
}: GeminiModelSelectorProps) {
  return (
    <div className={squareArea}>
      <label
        htmlFor="gemini-model"
        className="mb-2 block font-medium text-gray-700"
      >
        Geminiモデルを選択
      </label>
      <select
        className={inputArea}
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="gemini-2.0-flash">gemini-2.0-flash</option>
        <option value="gemini-2.5-flash-preview-05-20">
          gemini-2.5-flash-preview-05-20
        </option>
        <option value="gemini-2.5-flash-preview-04-17-thinking">
          gemini-2.5-flash-preview-04-17-thinking
        </option>
        <option value="gemini-2.0-flash-thinking-exp">
          gemini-2.0-flash-thinking-exp
        </option>
      </select>
    </div>
  );
}
