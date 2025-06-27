import MenuBar from "@/app/components/MenuBar";
import {
  background,
  columnLayoutStyles,
  container,
  textSpacing_w,
  textSpacing_wp,
} from "@/styles/classNames/layout";
import {
  h1,
  h1Text,
  linkText,
  normalText_l,
  xl_l,
} from "@/styles/classNames/typography";
import clsx from "clsx";

export default function AboutPage() {
  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className={columnLayoutStyles}>
            <div className={clsx(normalText_l, "p-4")}>
              <h1 className={clsx(h1, h1Text)}>このサイトについて</h1>
              <p className={textSpacing_wp}>
                URLを入力して実行すると、AIが技術ブログを校正チェックした内容を表示します。
                <br />
                利用は無料です。
              </p>

              <h2 className={clsx(xl_l, textSpacing_w)}>使い方</h2>
              <p className={textSpacing_wp}>
                ログイン後、ダッシュボードに移動するので、URLを入力して実行します。
              </p>

              <h2 className={clsx(xl_l, textSpacing_w)}>
                匿名ログインについて
              </h2>
              <ul className={clsx(textSpacing_wp, "list-disc pl-5")}>
                <li>
                  Firebase Authenticationの匿名ログインを利用しています。
                  <ul className="list-disc pl-5">
                    <li>
                      匿名のままユニークユーザーとしてFirebaseが管理していますが、ユーザ情報は保存されません。
                    </li>
                    <li>
                      ユーザーに昇格することは技術的には可能ですが、今回は想定していません。
                    </li>
                  </ul>
                </li>
                <li>匿名ユーザーは適宜削除します。</li>
              </ul>

              <h2 className={clsx(xl_l, textSpacing_w)}>生成AIについて</h2>
              <p className={textSpacing_wp}>
                Gemini 2.5 Flashを使用しています。
              </p>

              <h2 className={clsx(xl_l, textSpacing_w)}>フィードバック</h2>
              <p className={textSpacing_wp}>
                感想やフィードバックをお待ちしています。
                <a
                  href="https://github.com/shimo164/minaos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkText}
                >
                  GitHub
                </a>{" "}
                ,{" "}
                <a
                  href="https://x.com/shimo_s3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkText}
                >
                  Twitter(X)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
