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

      <table className="w-full table-auto text-center text-sm text-gray-700">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-1">モデル</th>
            <th className="border px-4 py-1">応答の質</th>
            <th className="border px-4 py-1">応答の速さ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-1">Gemini 2.0 Flash</td>
            <td className="border px-4 py-1">★0</td>
            <td className="border px-4 py-1">★3（数秒〜）</td>
          </tr>
          <tr>
            <td className="border px-4 py-1">Gemini 2.5 Flash</td>
            <td className="border px-4 py-1">★2</td>
            <td className="border px-4 py-1">★2（30秒〜）</td>
          </tr>
        </tbody>
      </table>
      <br />
      <select
        className={inputArea}
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="gemini-2.0-flash">gemini-2.0-flash</option>
        <option value="gemini-2.5-flash">gemini-2.5-flash</option>
      </select>
    </div>
  );
}
