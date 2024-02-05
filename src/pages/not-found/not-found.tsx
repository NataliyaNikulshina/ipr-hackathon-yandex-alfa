import Link from "../../ui/links/link";
import styleNotFound from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styleNotFound.page}>
      <div className={styleNotFound.container}>
        <h1 className={styleNotFound.title}>404 Not Found.</h1>
        <p className={styleNotFound.description}>
          Возможно, она устарела или не существует.
        </p>
        <div className={styleNotFound.wrapper}>
          <p className={styleNotFound.description}>Вы можете вернуться в</p>
          <Link href={"/"} color="blue">
            личный кабинет
          </Link>
        </div>
      </div>
    </section>
  );
}
