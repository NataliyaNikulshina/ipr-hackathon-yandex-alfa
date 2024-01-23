import React from 'react';
import footerStyle from './footer.module.scss';
import Unpacker from '../../ui/unpacker/unpacker.js'

function Footer(props) {
  return (
    <section className={`${footerStyle[`footer`]}`}>
      <ul className={`${footerStyle[`footer__links-box`]}`}>
        <li>
          <a className={`${footerStyle[`footer__links`]}`} href='#/' target='_blank' rel='noreferrer'>Github</a>
        </li>
        <li>
          <a className={`${footerStyle[`footer__links`]}`} href='#/' target='_blank' rel='noreferrer'>Github</a>
        </li>
        <li>
          <a className={`${footerStyle[`footer__links`]}`} href='#/' target='_blank' rel='noreferrer'>Github</a>
        </li>
        <li>
          <a className={`${footerStyle[`footer__links`]}`} href='#/' target='_blank' rel='noreferrer'>Github</a>
        </li>
      </ul>
      <p>A</p>
    </section>
  );
};

export default Footer;