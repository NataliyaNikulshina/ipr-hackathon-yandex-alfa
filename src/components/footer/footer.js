import React from 'react';
import footerStyle from './footer.module.scss';
import Unpacker from '../../ui/unpacker/unpacker.js'

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
      <a className={`${footerStyle[`footer__logo`]}`} href='#0' target='_blank' rel='noreferrer'>A</a>
    </section>
  );
};

export default Footer;