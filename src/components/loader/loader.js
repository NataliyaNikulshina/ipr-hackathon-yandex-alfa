import loaderStyle from './loader.module.scss';
import LogoIcon from "../../ui/icons/logo";


function Loader(props) {
  return (
    <aside className={`${loaderStyle['loader']} ${props.isOpen && loaderStyle['loader_opened']}`}>
      <div className={`${loaderStyle['loader__box']}`}>
      </div>
      <div className={`${loaderStyle['loader__icon-wrap']}`}>
        <LogoIcon width={'180'} height={'180'} />
      </div>
    </aside>
  );
};

export default Loader;