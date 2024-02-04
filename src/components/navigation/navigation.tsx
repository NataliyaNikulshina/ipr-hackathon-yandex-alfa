import { FC, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "../../ui/links/link";

import styleNav from "./navigation.module.scss";
import { removeRemainingCrumbs } from "../../utils/breadcrumbs";

export interface Navigation {}

const Crumb = ({ title, path, url }: any) => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  // console.log(state, pathname);

  const routeTo = (e:MouseEvent) => {
    e.preventDefault();
    navigate(path, { replace: true, state: removeRemainingCrumbs(state, url) });
  };

  return (
    <span className={styleNav.wrapper}>
      {path === pathname ? (
        <Link href={url} color="grey" size="14" underline={false} disabled>
        {title}
        </Link>
      ) : (
        <>
          <Link href={url} onClick={routeTo} color="grey" size="14" underline={false}>
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
