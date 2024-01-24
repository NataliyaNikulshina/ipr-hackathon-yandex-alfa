import React from 'react';
import footerStyle from './footer.module.scss';
import Unpacker from '../../ui/unpacker/unpacker.js'
import LogoIcon from "../../ui/icons/logo";

function Footer(props) {
  return (
    <section className={`${footerStyle[`footer`]}`}>
      <ul className={`${footerStyle[`footer__links-box`]}`}>
        {
          props.footerLinkList.length ?
            props.footerLinkList.map((title) => <Unpacker key={title.id}>
              <li>
                <a className={`${footerStyle[`footer__links`]}`} href={title.url} target='_blank' rel='noreferrer'>{title.title}</a>
              </li>
            </Unpacker>) : ''
        }
      </ul>
      <div className={`${footerStyle[`footer__logo`]}`}>
        <LogoIcon width={'40'} height={'40'}/>
      </div>
    </section>
  );
};

export default Footer;