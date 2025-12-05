import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Popover } from "@site/src/components/Popover";
import { Card, CardHeader, CardTitle } from "@site/src/components/ui/card";
import Layout from "@theme/Layout";
import { useEffect, useState } from "react";

interface RepoInfo {
  name: string;
  url: string;
  description: string;
  defaultStar?: number; // Optional, used for fallback
  defaultForks?: number; // Optional, used for fallback
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
    defaultStar: 2879,
    defaultForks: 163,
  },
  {
    name: "OVM Win",
    url: "oomol-lab/ovm-win",
    description: "Run ovm-core virtual machine on Windows WSL2",
    defaultStar: 20,
    defaultForks: 3,
  },
  {
    name: "Mac Power Monitor",
    url: "oomol-lab/mac-power-monitor",
    description: "macOS Sleep / Wake notifications",
    defaultStar: 18,
    defaultForks: 3,
  },
];

const contentData = [
  {
    icon: <i className={`${styles.logo} i-bi-discord`} />,
    name: "Discord",
    href: "https://discord.gg/W3evr2kJDa",
    text: "Discord",
  },
  {
    icon: <i className={`${styles.logo} i-bi-youtube`} />,
    name: "Youtube",
    href: "https://www.youtube.com/@oomolstudio",
    text: "YouTube",
  },
  {
    icon: <i className={`${styles.logo} i-bi-twitter-x`} />,
    name: "X",
    href: "https://twitter.com/OomolStudio",
    text: "X",
  },
  {
    icon: <i className={`${styles.logo} i-bi-github`} />,
    name: "GitHub",
    href: "https://github.com/oomol-lab",
    text: "GitHub",
  },
  {
    icon: <i className={`${styles.logo} i-octicon-comment-discussion-16`} />,
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
  const qrcodeUrl = useBaseUrl("/img/qrcode@3x.png");
  const repositoryIconUrl = useBaseUrl("/img/pages/community/repository.png");

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
              {contentData.map(item => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    <Card className={styles.contactCard}>
                      <CardHeader className={styles.contactCardHeader}>
                        <div className={styles.contactCardIcon}>
                          {item.icon}
                        </div>
                        <CardTitle className={styles.contactCardTitle}>
                          {item.text}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </a>
                );
              })}
              <Popover
                trigger={
                  <Card
                    className={`${styles.contactCard} ${styles.contactCardClickable}`}
                  >
                    <CardHeader className={styles.contactCardHeader}>
                      <div className={styles.contactCardIcon}>
                        <i className={`${styles.logo} i-simple-icons-wechat`} />
                      </div>
                      <CardTitle className={styles.contactCardTitle}>
                        {translate({
                          message: "HOME.Community.contact-we-com",
                        })}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                }
                position="right"
                content={
                  <img alt="qrcode" className={styles.qrcode} src={qrcodeUrl} />
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
          {REPOS.map(repo => {
            return (
              <a
                className={styles.repository}
                key={repo.url}
                href={`https://github.com/${repo.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles["repo-body"]}>
                  <div className={styles["repo-header"]}>
                    <img
                      className={styles["repo-icon"]}
                      src={repositoryIconUrl}
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
                      {(githubStats && githubStats[repo.url]?.forks) ||
                        repo.defaultForks}
                      <i className={`${styles.icon} i-codicon-repo-forked`} />
                    </div>
                    <div className={styles.state}>
                      {(githubStats && githubStats[repo.url]?.stars) ||
                        repo.defaultStar}
                      <i
                        className={`${styles["star-icon"]} i-codicon-star-empty`}
                      />
                    </div>
                  </div>
                </div>
              </a>
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
