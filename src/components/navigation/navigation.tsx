import { FC, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "../../ui/links/link";

import styleNav from "./navigation.module.scss";

export interface Navigation {}

const Crumb = ({ title, path, url }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <span className={styleNav.wrapper}>
      {path === pathname ? (
        <Link href={url} color="grey" size="14" underline={false} disabled>
        {title}
        </Link>
      ) : (
        <>
          <Link href={url} color="grey" size="14" underline={false}>
            {title}
          </Link>
          {` > `}
        </>
      )}
    </span>
  );
};

const Navigation: FC<Navigation> = () => {
  const location = useLocation();
  console.log(location);
  return (
    <nav className={styleNav.nav}>
      {location.state ? (
        location.state.map((crumb: any) => <Crumb {...crumb} key={crumb.url} />)
      ) : (
        <Crumb title={location.pathname==='/' ? 'Моя команда' : 'Мои ИПР'} path={location.pathname} />
      )}
    </nav>
  );
};

export default Navigation;
