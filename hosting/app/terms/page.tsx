import MenuBar from "@/app/components/MenuBar";
import {
  background,
  columnLayoutStyles,
  container,
  textSpacing_w,
} from "@/styles/classNames/layout";
import {
  h1,
  h1Text,
  normalText_l,
  paragraphSpacing,
  sm_r_gray,
  xl_c,
  xl_l,
} from "@/styles/classNames/typography";
import clsx from "clsx";

export default function TermPage() {
  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className={columnLayoutStyles}>
            <div className={clsx(normalText_l, textSpacing_w, "p-4")}>
              <h1 className={clsx(h1, h1Text)}>
                利用規約とプライバシーポリシー
              </h1>

              {/* -- 利用規約 -- */}
              <h2 className={xl_c}>利用規約</h2>
              <h2 className={xl_l}>1. 総則（目的）</h2>
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
              <h2 className={xl_l}>2. 利用条件</h2>
              <p>
                <strong>利用環境の整備</strong>
                <br />
                本サービスの利用に必要な端末、通信環境、ブラウザはユーザーが自己の責任と費用で準備してください。
              </p>
              <p>
                <strong>ユーザー登録</strong>
                <br />
                本サービスは匿名で利用可能です。
              </p>
              <h2 className={xl_l}>3. 禁止事項</h2>
              <p>以下の行為は禁止します。</p>
              <ul className="list-inside list-disc">
                <li>法令または公序良俗に反する行為</li>
                <li>他人になりすます行為</li>
                <li>本サービスの運営を妨げる行為</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ul>
              <h2 className={xl_l}>4. 免責事項</h2>
              <p>
                本サービスは、AIによる自動処理を行いますが、その内容の正確性・完全性は保証しません。運営者は、故意または重過失がある場合を除き、本サービスの利用に起因する損害について責任を負いません。
              </p>
              <h2 className={xl_l}>5. 規約の変更</h2>
              <p>
                本規約は予告なく変更される場合があります。変更後にサービスを利用した場合、変更に同意したものとみなされます。
              </p>
              <h2 className={xl_l}>6. 準拠法および管轄</h2>
              <p>
                本規約は日本法を準拠法とし、本サービスに関して紛争が生じた場合には、サービス提供者の所在地を管轄する地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>

              {/* -- プライバシーポリシー -- */}
              <p className={paragraphSpacing}></p>
              <h2 className={xl_c}>個人情報保護方針（プライバシーポリシー）</h2>
              <h2 className={xl_l}>1. 収集する情報</h2>
              <p>本サービスでは以下の情報を収集します。</p>
              <ul className="list-inside list-disc">
                <li>Firebase Authentication による匿名ID</li>
                <li>サービスの実行履歴（投稿内容、チェック結果など）</li>
              </ul>
              <h2 className={xl_l}>2. 情報管理と閲覧</h2>
              <p>
                登録された匿名IDや実行履歴はFirebaseおよびGoogle
                Cloudに保存され、運営者（管理者）が閲覧可能です。これらの情報は第三者には提供されません（法令による場合を除く）。
                <br />
                収集したデータは、個人を識別できない統計情報の形で外部へ開示・公表する場合があります。
                ただし、投稿本文が特定ユーザー個人または法人を推定できる形で開示されることはありません。
              </p>
              <h2 className={xl_l}>3. 情報の第三者提供</h2>
              <p>
                本人の同意がある場合、または法令に基づく場合を除き、個人情報を第三者に提供しません。
              </p>
              <h2 className={xl_l}>4. プライバシーポリシーの変更</h2>
              <p>
                本方針は予告なく変更されることがあります。重要な変更がある場合はサービス内にて告知します。
              </p>
              <p className={sm_r_gray}>最終更新日: 2025年6月30 日</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
