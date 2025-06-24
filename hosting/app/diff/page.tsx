import DiffDisplay from "@/app/components/DiffDisplay";
// TODO: This is temporary data for testing purposes
// Remove later
const result: [string, string][] = [
  ["tech", "Tech"],
  ["ユーザ", "ユーザー"],
  ["ユーザ", "ユーザー"],
  ["サイズ", "size"],
  ["Insight", "Insights"],
];

export default function ResultDisplay() {
  return (
    <div className="text-gray-800">
      <h2 className="mb-2 text-xl font-bold">結果</h2>
      <DiffDisplay pairs={result} />
    </div>
  );
}
