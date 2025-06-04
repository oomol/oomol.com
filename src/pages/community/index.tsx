import styles from "./styles.module.scss";
import XSVG from "@site/static/img/pages/community/x.svg";
import GitHubSVG from "@site/static/img/pages/community/github.svg";
import DiscordSVG from "@site/static/img/pages/community/discord.svg";
import YoutubeSVG from "@site/static/img/pages/community/youtube.svg";
import WeComSVG from "@site/static/img/pages/community/wecom.svg";
import DiscussionSVG from "@site/static/img/pages/community/github_discussion.svg";

import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import { Popover } from "@site/src/components/Popover";
import LinkBtn from "@site/src/components/Button/LinkBtn";
import { Button } from "@site/src/components/Button";
import i18n from "@generated/i18n";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";

const contentData = [
  {
    icon: <DiscordSVG className={styles.logo} />,
    name: "Discord",
    href: "https://discord.gg/W3evr2kJDa",
    text: "Discord",
  },
  {
    icon: <YoutubeSVG className={styles.logo} />,
    name: "Youtube",
    href: "https://www.youtube.com/@oomolstudio",
    text: "YouTube",
  },
  {
    icon: <XSVG className={styles.logo} />,
    name: "X",
    href: "https://twitter.com/OomolStudio",
    text: "X",
  },
  {
    icon: <GitHubSVG className={styles.logo} />,
    name: "GitHub",
    href: "https://github.com/oomol-lab",
    text: "GitHub",
  },
  {
    icon: <DiscussionSVG className={styles.logo} />,
    name: "Discussion",
    href: "https://github.com/orgs/oomol-lab/discussions",
    text: "Discussions",
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
        <div className={styles.headBox}>
          <div className={styles.titleBox}>
            <div className={styles.title}>
              {translate({
                message: "HOME.Community.title",
              })}
            </div>
            <div className={styles.subTitle}>
              {translate({
                message: "HOME.Community.subtitle",
              })}
            </div>
          </div>
          <div className={styles.contactBox}>
            <div className={styles["contact-list"]}>
              {contentData.map((item, index) => {
                return (
                  <LinkBtn
                    text={item.text}
                    iconPos="left"
                    icon={item.icon}
                    url={item.href}
                  />
                );
              })}
              <Popover
                trigger={
                  <LinkBtn
                    text={translate({
                      message: "HOME.Community.contact-we-com",
                    })}
                    iconPos="left"
                    icon={<WeComSVG className={styles.logo} />}
                  />
                }
                position="top"
                className="popoverCentered"
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
        </div>

        <div className={styles.sloganBox}>
          {sloganData.map((item, index) => {
            return (
              <div className={styles.slogan} key={index}>
                <i className={`${styles.sloganIcon} ${item.icon}`} />
                <span className={styles.sloganText}>{item.text}</span>
              </div>
            );
          })}
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
