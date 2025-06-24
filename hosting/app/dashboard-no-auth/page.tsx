import MenuBar from "@/app/components/MenuBar";
import {
  background,
  columnLayoutStyles,
  container,
  squareArea,
} from "@/styles/classNames/layout";

export default function DashboardNoAuthPage() {
  return (
    <>
      <div className={background}>
        <MenuBar />
        <div className={container}>
          <div className={columnLayoutStyles}>
            <div className={squareArea}>
              <p className="mb-2">登録なしで使うためのページ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
