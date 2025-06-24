import MenuBar from "@/app/components/MenuBar";
import { background, container, squareArea } from "@/styles/classNames/layout";
import { tableCell, xl2_c, xl_c } from "@/styles/classNames/typography";

/**
 * The `AboutPage` component renders an informational page about the website.
 * It includes details about the purpose of the site, usage instructions,
 * user registration options, and a comparison table of features available
 * with or without registration. Additionally, it provides a section for
 * feedback and links to external resources.
 *
 * ## Features
 * - Displays a gradient background with a responsive layout.
 * - Contains a menu bar and a central content area with detailed information.
 * - Provides a table comparing features for registered and unregistered users.
 * - Includes a feedback section with a link to Twitter (X) for user input.
 *
 * ## Usage
 * This component is designed to be used as a standalone page in a Next.js
 * application. It is styled using Tailwind CSS classes for a modern and
 * responsive design.
 *
 * @component
 * @returns {JSX.Element} The rendered AboutPage component.
 */
export default function AboutPage() {
  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className={squareArea}>
            <h1 className={xl2_c}>このサイトについて</h1>
            <p className="mb-2">
              このサイトは、技術ブログの校正をAIで行うためのものです。
            </p>

            <h1 className={xl_c}>使い方</h1>
            <p className="mb-2">
              URLを入力して実行するとAIがチェックした内容を表示します。
            </p>

            <h2 className={xl_c}>ユーザ登録について</h2>
            <ul className="list-inside list-disc">
              <li>ユーザ登録は無料です。</li>
              <li>登録情報はFirebase Authenticationで管理・保護されます。</li>
            </ul>

            <table className="mt-4 table-auto border-collapse border border-gray-400 text-center">
              <thead>
                <tr>
                  <th className={tableCell}>項目</th>
                  <th className={tableCell}>登録なし</th>
                  <th className={tableCell}>メールアドレスを登録</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableCell}>登録方法</td>
                  <td className={tableCell}>-</td>
                  <td className={tableCell}>reCAPTCHA、利用規約</td>
                </tr>
                <tr>
                  <td className={tableCell}>ログイン方法</td>
                  <td className={tableCell}>-</td>
                  <td className={tableCell}>メールのリンク</td>
                </tr>
                <tr>
                  <td className={tableCell}>実行時制限</td>
                  <td className={tableCell}>reCAPTCHA、利用規約</td>
                  <td className={tableCell}>なし</td>
                </tr>

                <tr>
                  <td className={tableCell}>実行対象</td>
                  <td className={tableCell}>Zennのみ</td>
                  <td className={tableCell}>技術ブログ全般</td>
                </tr>
                <tr>
                  <td className={tableCell}>Gemini AI</td>
                  <td className={tableCell}>2.5 flash</td>
                  <td className={tableCell}>
                    <ul className="list-none">
                      <li>2.5 flash</li>
                      <li>2.0 flash</li>
                      <li>2.5 thinking</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className={tableCell}>実行履歴保存</td>
                  <td className={tableCell}>なし</td>
                  <td className={tableCell}>保存あり</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm text-gray-500">※ 2.5はpreviewモデル</p>
            <h2 className="mt-4 text-lg font-bold">フィードバック</h2>
            <p className="mb-2">感想やフィードバックをお待ちしています。</p>
            <p className="mb-2">
              GitHubのIssues{" "}
              <a
                href="https://x.com/shimo_s3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Twitter(X)
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
