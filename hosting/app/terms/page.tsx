import MenuBar from "@/app/components/MenuBar";
import {
  background,
  columnLayoutStyles,
  container,
} from "@/styles/classNames/layout";

export default function TermPage() {
  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className={columnLayoutStyles}>
            <div className="flex flex-col border-1 border-dashed border-gray-400 p-4">
              <h1 className="mb-4 text-center text-2xl font-bold">
                利用規約とプライバシーポリシー
              </h1>

              <h2 className="text-center text-xl font-bold">利用規約</h2>

              <h2 className="mt-2 mb-1 text-xl font-bold">1. 総則（目的）</h2>
              <p>
                <strong>サービスの目的</strong>
                <br />
                本サービスは、技術ブログの文章をAIで自動校正・チェックするツールを無料で提供し、ユーザーの執筆・学習支援を目的とします。
              </p>
              <p>
                <strong>規約の適用範囲</strong>
                <br />
                ユーザーは、本サービスを利用することにより本利用規約に同意したものとみなされます。本規約は全てのユーザーに適用されます。
              </p>

              <h2 className="mt-2 mb-1 text-xl font-bold">2. 利用条件</h2>
              <p>
                <strong>利用環境の整備</strong>
                <br />
                本サービスの利用に必要な端末、通信環境、ブラウザはユーザーが自己の責任と費用で準備してください。
              </p>
              <p>
                <strong>ユーザー登録</strong>
                <br />
                ユーザーは、メールアドレスによる認証を用いて登録することができます。登録にあたり、正確な情報を提供してください。
              </p>
              <p>
                <strong>制限事項</strong>
                <br />
                未登録ユーザーは一部機能制限の対象となる場合があります。
              </p>

              <h2 className="mt-2 mb-1 text-xl font-bold">3. 禁止事項</h2>
              <p>以下の行為は禁止します。</p>
              <ul className="list-inside list-disc">
                <li>法令または公序良俗に反する行為</li>
                <li>他人になりすます行為</li>
                <li>本サービスの運営を妨げる行為</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ul>

              <h2 className="mt-2 mb-1 text-xl font-bold">4. 免責事項</h2>
              <p>
                本サービスは、AIによる自動処理を行いますが、その内容の正確性・完全性は保証しません。本サービスの利用により発生した損害について、運営者は一切の責任を負いません。
              </p>

              <h2 className="mt-2 mb-1 text-xl font-bold">5. 規約の変更</h2>
              <p>
                本規約は予告なく変更される場合があります。変更後にサービスを利用した場合、変更に同意したものとみなされます。
              </p>

              <h2 className="mt-10 text-center text-xl font-bold">
                個人情報保護方針（プライバシーポリシー）
              </h2>

              <h2 className="mt-2 mb-1 text-xl font-bold">1. 収集する情報</h2>
              <p>本サービスでは以下の情報を収集します。</p>
              <ul className="list-inside list-disc">
                <li>Firebase Authentication によるメールアドレス</li>
                <li>サービスの実行履歴（投稿内容、チェック結果など）</li>
              </ul>

              <h2 className="mt-2 mb-1 text-xl font-bold">2. 利用目的</h2>
              <p>収集した情報は以下の目的にのみ使用されます。</p>
              <ul className="list-inside list-disc">
                <li>サービス提供・改善</li>
                <li>不正利用の防止</li>
                <li>サービスの利用状況の把握</li>
              </ul>

              <h2 className="mt-2 mb-1 text-xl font-bold">3. 情報管理と閲覧</h2>
              <p>
                登録されたメールアドレスや実行履歴はFirebaseに保存され、運営者（管理者）が閲覧可能です。これらの情報は第三者には提供されません（法令による場合を除く）。
              </p>

              <h2 className="mt-2 mb-1 text-xl font-bold">
                4. 情報の第三者提供
              </h2>
              <p>
                本人の同意がある場合、または法令に基づく場合を除き、個人情報を第三者に提供しません。
              </p>

              <h2 className="mt-2 mb-1 text-xl font-bold">
                5. プライバシーポリシーの変更
              </h2>
              <p>
                本方針は予告なく変更されることがあります。重要な変更がある場合はサービス内にて告知します。
              </p>
              <p className="mt-4 text-sm text-gray-500">
                最終更新日: 2025年6月7日
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
