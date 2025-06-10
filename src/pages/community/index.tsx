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
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { useEffect, useState } from "react";

interface RepoInfo {
  name: string;
  url: string;
  description: string;
}

interface RepoStats {
  stars: number;
  forks: number;
}

interface CacheData {
  timestamp: string;
  data: Record<string, RepoStats>;
}

const GITHUB_API_CONFIG = {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
  baseUrl: "https://api.github.com/repos/",
};

const CACHE_KEY = "github_stats_cache";
const CACHE_HOURS = 6;

const REPOS: RepoInfo[] = [
  {
    name: "PDF Craft",
    url: "oomol-lab/pdf-craft",
    description:
      "PDF craft can convert PDF files into various other formats. This project will focus on processing PDF files of scanned books. The project has just started.",
  },
  {
    name: "OVM Win",
    url: "oomol-lab/ovm-win",
    description: "Run ovm-core virtual machine on Windows WSL2",
  },
  {
    name: "Mac Power Monitor",
    url: "oomol-lab/mac-power-monitor",
    description: "macOS Sleep / Wake notifications",
  },
];

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
  const [githubStats, setGithubStats] = useState<Record<
    string,
    RepoStats
  > | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      if (await tryLoadFromCache()) return;

      await fetchFreshData();
    };

    const tryLoadFromCache = async (): Promise<boolean> => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return false;

        const { data, timestamp }: CacheData = JSON.parse(cached);
        const hoursSince =
          (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);

        if (hoursSince < CACHE_HOURS) {
          setGithubStats(data);
          return true;
        }

        return false;
      } catch (e) {
        console.warn("parse cache error", e);
        return false;
      }
    };

    const fetchFreshData = async () => {
      try {
        const repoStats = await fetchAllRepoStats();

        if (Object.keys(repoStats).length > 0) {
          saveToCache(repoStats);
          setGithubStats(repoStats);
        } else {
          await fallbackToCache();
        }
      } catch (e) {
        console.error("fetch GitHub data failed", e);
        await fallbackToCache();
      }
    };

    const fetchAllRepoStats = async (): Promise<Record<string, RepoStats>> => {
      const result: Record<string, RepoStats> = {};

      const promises = REPOS.map(async ({ url }) => {
        try {
          const res = await fetch(`${GITHUB_API_CONFIG.baseUrl}${url}`, {
            signal: controller.signal,
            headers: GITHUB_API_CONFIG.headers,
          });

          if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
          }

          const json = await res.json();
          result[url] = {
            stars: json.stargazers_count,
            forks: json.forks_count,
          };
        } catch (e) {
          console.warn(`⚠️ fetch ${url} data failed`, e);
        }
      });

      await Promise.all(promises);
      return result;
    };

    const saveToCache = (data: Record<string, RepoStats>) => {
      try {
        const cacheData: CacheData = {
          timestamp: new Date().toISOString(),
          data,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (e) {
        console.error("cache data failed", e);
      }
    };

    const fallbackToCache = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          setGithubStats(data);
          console.info("use cached data as fallback");
          return true;
        }
      } catch (e) {
        console.error("failed to use cached data as fallback", e);
      }
      return false;
    };

    fetchStats();

    return () => {
      controller.abort();
    };
  }, []);

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
            <div className={styles["contactList"]}>
              {contentData.map((item, index) => {
                return (
                  <LinkBtn
                    key={item.name}
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
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {translate({
              message: "HOME.Community.open-source.title",
            })}
          </div>
          <div className={styles.subTitle}>
            {translate({
              message: "HOME.Community.open-source.subtitle",
            })}
          </div>
        </div>
        <div className={styles.repositories}>
          {REPOS.map((repo, index) => {
            return (
              <div
                className={styles.repository}
                key={repo.url}
                onClick={() => {
                  window.open(`https://github.com/${repo.url}`, "_blank");
                }}
              >
                <div className={styles["repo-body"]}>
                  <div className={styles["repo-header"]}>
                    <img
                      className={styles["repo-icon"]}
                      src={"/img/pages/community/repository.png"}
                      alt={repo.name}
                    />
                    <span className={styles["repo-title"]}>{repo.name}</span>
                  </div>
                  <span className={styles["repo-description"]}>
                    {repo.description}
                  </span>
                </div>
                <div className={styles["repo-footer"]}>
                  <div className={styles["repo-name"]}>{repo.url}</div>
                  <div className={styles["repo-status"]}>
                    <div className={styles.state}>
                      {(githubStats && githubStats[repo.url]?.forks) || 0}
                      <i className={`${styles.icon} i-codicon-repo-forked`} />
                    </div>
                    <div className={styles.state}>
                      {(githubStats && githubStats[repo.url]?.stars) || 0}
                      <i
                        className={`${styles["star-icon"]} i-codicon-star-empty`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
