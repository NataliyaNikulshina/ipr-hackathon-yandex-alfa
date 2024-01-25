import React from 'react';
import footerStyle from './footer.module.scss';
import Unpacker from '../../ui/unpacker/unpacker.js'
import LogoIcon from "../../ui/icons/logo";
import Link from "../../ui/links/link";

function Footer(props) {
  return (
    <section className={`${footerStyle[`footer`]}`}>
      <ul className={`${footerStyle[`footer__links-box`]}`}>
        {
          props.footerLinkList.length ?
            props.footerLinkList.map((title) => <Unpacker key={title.id}>
              <li>
                <Link
                  href={title.url}
                  color='black'
                  size='18'
                  underline={false}
                >
                  {title.title}
                </Link>
              </li>
            </Unpacker>
            ) : ''
        }
      </ul>
      <div className={`${footerStyle[`footer__logo`]}`}>
        <LogoIcon width={'40'} height={'40'} />
      </div>
    </section>
  );
};

export default Footer;