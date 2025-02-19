import styles from "./styles.module.scss";
import XSVG from "@site/static/img/community-x.svg";
import GitHubSVG from "@site/static/img/community-github.svg";
import DiscordSVG from "@site/static/img/community-discord.svg";
import YoutubeSVG from "@site/static/img/community-youtube.svg";
import WeComSVG from "@site/static/img/community-we-com.svg";

import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { Popover } from "@site/src/components/Popover";

const contentData = [
  {
    icon: <XSVG className={styles.logo} />,
    name: "X",
    href: "https://twitter.com/OomolStudio",
  },
  {
    icon: <DiscordSVG className={styles.logo} />,
    name: "Discord",
    href: "https://discord.gg/W3evr2kJDa",
  },
  {
    icon: <YoutubeSVG className={styles.logo} />,
    name: "Youtube",
    href: "https://www.youtube.com/@oomolstudio",
  },
  {
    icon: <GitHubSVG className={styles.logo} />,
    name: "GitHub",
    href: "https://github.com/oomol-lab",
  },
];

const sloganData = [
  {
    icon: "i-codicon-target",
    text: translate({
      message: "HOME.Community.slogan-1",
    }),
  },
  {
    icon: "i-codicon-feedback",
    text: translate({
      message: "HOME.Community.slogan-2",
    }),
  },
  {
    icon: "i-codicon-sparkle",
    text: translate({
      message: "HOME.Community.slogan-3",
    }),
  },
  {
    icon: "i-codicon-organization",
    text: translate({
      message: "HOME.Community.slogan-4",
    }),
  },
];

export default function Community() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {translate({
            message: "HOME.Community.title",
          })}
        </h1>
        <span className={styles["sub-title"]}>
          {translate({
            message: "HOME.Community.subtitle",
          })}
        </span>
        <div className={styles.middle}>
          <span className={styles["contact-title"]}>
            {translate({
              message: "HOME.Community.contact-title",
            })}
          </span>
          <div className={styles["contact-list"]}>
            {contentData.map((item, index) => {
              return (
                <button key={`contact-${index}`} className={styles.item}>
                  <a
                    className={styles.content}
                    href={item.href}
                    target="_blank"
                  >
                    {item.icon}
                    <span className={styles.name}>{item.name}</span>
                  </a>
                </button>
              );
            })}
            <Popover
              trigger={
                <button className={styles.item}>
                  <a className={styles.content}>
                    <WeComSVG className={styles.logo} />
                    <span className={styles.name}>WeCom</span>
                  </a>
                </button>
              }
              position="top"
              content={
                <img
                  alt="qrcode"
                  className={styles.qrcode}
                  src={"/img/qrcode@3x.png"}
                />
              }
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.slogans}>
            {sloganData.map((item, index) => {
              return (
                <div key={`slogan-${index}`} className={styles.slogan}>
                  <i className={`${item.icon} ${styles.icon}`} />
                  <span className={styles["slogan-text"]}>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
