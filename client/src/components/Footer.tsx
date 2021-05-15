import { GithubFilled, InstagramFilled, MailFilled } from "@ant-design/icons";
import { memo } from "react";

const Footer = memo(() => {
  return (
    <footer className="footer">
      <div className="footer_desc">
        <h4>ⓒ 2021, Jang Hyun Soo who English & Japanese Tour guide, All Rights Resrved.</h4>
        <h4>Supported by Korea Tourism Organization's open API</h4>
      </div>
      <ul className="footer_list">
        <li>
          <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
            <GithubFilled />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/salmonchobab/" target="_blank" rel="noreferrer">
            <InstagramFilled />
          </a>
        </li>
        <li>
          <a href="mailto:noah071610@naver.com">
            <MailFilled />
          </a>
        </li>
      </ul>
    </footer>
  );
});

export default memo(Footer);
