import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import LogoIcon from "@site/static/img/pages/brand-assets/oomol-logo.svg";
import ColorIcon from "@site/static/img/pages/brand-assets/color.svg";
import IconSymbolIcon from "@site/static/img/pages/brand-assets/icon-symbol.svg";
import TypefaceIcon from "@site/static/img/pages/brand-assets/typeface.svg";
import LogoIconActive from "@site/static/img/pages/brand-assets/oomol-logo-1.svg";
import ColorIconActive from "@site/static/img/pages/brand-assets/color-1.svg";
import IconSymbolIconActive from "@site/static/img/pages/brand-assets/icon-symbol-1.svg";
import TypefaceIconActive from "@site/static/img/pages/brand-assets/typeface-1.svg";
import AssetBlock from "@site/src/components/AssetBlock";
import OomolLogoB from "@site/static/img/pages/brand-assets/oomol-logo-black.svg";
import OomolLogoW from "@site/static/img/pages/brand-assets/oomol-logo-white.svg";
import OomolLogoEnB from "@site/static/img/pages/brand-assets/oomol-logo-en-black.svg";
import OomolLogoEnW from "@site/static/img/pages/brand-assets/oomol-logo-en-white.svg";
import OomolLogoCnB from "@site/static/img/pages/brand-assets/oomol-logo-cn-black.svg";
import OomolLogoCnW from "@site/static/img/pages/brand-assets/oomol-logo-cn-white.svg";
import OomolIcon from "@site/static/img/pages/brand-assets/oomol-icon.svg";
import JostIcon from "@site/static/img/pages/brand-assets/typeface-jost.svg";
import clsx from "clsx";
export default function BrandAssets() {
  const [activeSection, setActiveSection] = useState("logos");
  const [isScrolling, setIsScrolling] = useState(false);
  const isManualScroll = useRef(false);
  const activeSectionRef = useRef(activeSection);

  interface CornerDownloadProps {
    url: string;
  }
  const CornerDownload = ({ url }: CornerDownloadProps) => {
    return (
      <i
        className={`i-codicon-cloud-download ${styles.icon}`}
        onClick={() => window.open(url, "_self")}
      />
    );
  };

  interface CornerCopyProps {
    text: string;
  }

  const CornerCopy = ({ text }: CornerCopyProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3600);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <i
        className={`${isCopied ? "i-codicon-check" : "i-codicon-copy"} ${styles.icon}`}
        style={{ color: isCopied ? "#52C41A" : "" }}
        onClick={handleCopy}
      />
    );
  };

  // 更新 ref 值
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const logosRef = useRef(null);
  const colorsRef = useRef(null);
  const iconsRef = useRef(null);
  const typefaceRef = useRef(null);

  const sections = [
    {
      id: "logos",
      name: translate({
        message: "HOME.BrandAssets.logos",
      }),
      ref: logosRef,
    },
    {
      id: "colors",
      name: translate({
        message: "HOME.BrandAssets.colors",
      }),
      ref: colorsRef,
    },
    {
      id: "icons",
      name: translate({
        message: "HOME.BrandAssets.icons",
      }),
      ref: iconsRef,
    },
    {
      id: "typeface",
      name: translate({
        message: "HOME.BrandAssets.typeface",
      }),
      ref: typefaceRef,
    },
  ];

  const handleClick = id => {
    setActiveSection(id);
    isManualScroll.current = true;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      isManualScroll.current = false;
    }, 300);
  };

  useEffect(() => {
    let scrollTimer = null;
    const handleScroll = () => {
      if (!isScrolling) setIsScrolling(true);

      if (scrollTimer) clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        // 只有非手动滚动时才更新状态
        if (!isManualScroll.current) {
          const currentScroll = window.scrollY + 100;

          // 获取 titleBox 位置并判断是否在 titleBox 区域
          const titleBoxElement = document.querySelector(`.${styles.titleBox}`);
          const titleBoxTop = (titleBoxElement as HTMLElement)?.offsetTop || 0;
          const titleBoxHeight =
            (titleBoxElement as HTMLElement)?.offsetHeight || 200;

          if (
            currentScroll >= titleBoxTop &&
            currentScroll < titleBoxTop + titleBoxHeight
          ) {
            if (activeSectionRef.current !== "logos") {
              setActiveSection("logos");
            }
            return;
          }

          for (const section of sections) {
            const element = section.ref.current;
            const sectionTop = element.offsetTop;
            const sectionHeight = element.offsetHeight;

            if (
              currentScroll >= sectionTop &&
              currentScroll < sectionTop + sectionHeight &&
              activeSectionRef.current !== section.id
            ) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [sections, isManualScroll.current]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {translate({ message: "HOME.BrandAssets.title" })}
          </div>
          <div className={styles.subTitle}>
            {translate({ message: "HOME.BrandAssets.subtitle" })}
          </div>
        </div>

        <div className={styles.scrollBox}>
          {/* 左侧导航 */}
          <div className={styles.sidebar}>
            {sections.map(section => {
              const isActive = activeSection === section.id;
              const IconComponent = isActive
                ? {
                    logos: LogoIconActive,
                    colors: ColorIconActive,
                    icons: IconSymbolIconActive,
                    typeface: TypefaceIconActive,
                  }[section.id]
                : {
                    logos: LogoIcon,
                    colors: ColorIcon,
                    icons: IconSymbolIcon,
                    typeface: TypefaceIcon,
                  }[section.id];

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={clsx(
                    styles.sideBarWrapper,
                    isActive && styles.sidebarActive,
                    isScrolling && "noTransition"
                  )}
                  onClick={e => {
                    e.preventDefault();
                    handleClick(section.id);
                  }}
                >
                  <div
                    className={clsx(
                      styles.sidebarItem,
                      isScrolling && "noTransition"
                    )}
                  >
                    <div
                      className={clsx(
                        styles.sidebarIcon,
                        isScrolling && "noTransition"
                      )}
                    >
                      <IconComponent />
                    </div>
                    <div
                      className={clsx(
                        styles.sidebarText,
                        isScrolling && "noTransition"
                      )}
                    >
                      {section.name}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className={styles.content}>
            <div className={styles.section} id="logos" ref={logosRef}>
              <div className={styles.sectionTitle}>
                {translate({
                  message: "HOME.BrandAssets.logos",
                })}
              </div>
              <div className={styles.sectionContentMultiple}>
                <AssetBlock
                  height={259}
                  backgroundColor="#f6f8fa"
                  borderColor="#f6f8fa"
                  centerType="svg"
                  centerIcon={<OomolLogoB />}
                  centerWidth={100}
                  centerHeight={100}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-black.zip" />
                  }
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#010409"
                  borderColor="#212830"
                  centerType="svg"
                  centerIcon={<OomolLogoW />}
                  centerWidth={100}
                  centerHeight={100}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-white.zip" />
                  }
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#f6f8fa"
                  borderColor="#f6f8fa"
                  centerType="svg"
                  centerIcon={<OomolLogoEnB />}
                  centerWidth={175}
                  centerHeight={50}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-black-en.zip" />
                  }
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#010409"
                  borderColor="#212830"
                  centerType="svg"
                  centerIcon={<OomolLogoEnW />}
                  centerWidth={175}
                  centerHeight={50}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-white-en.zip" />
                  }
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#f6f8fa"
                  borderColor="#f6f8fa"
                  centerType="svg"
                  centerIcon={<OomolLogoCnB />}
                  centerWidth={123}
                  centerHeight={50}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-black-cn.zip" />
                  }
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#010409"
                  borderColor="#212830"
                  centerType="svg"
                  centerIcon={<OomolLogoCnW />}
                  centerWidth={123}
                  centerHeight={50}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/logo-white-cn.zip" />
                  }
                />
              </div>
            </div>

            <div className={styles.section} id="colors" ref={colorsRef}>
              <div className={styles.sectionTitle}>
                {translate({
                  message: "HOME.BrandAssets.colors",
                })}
              </div>
              <div className={styles.sectionContentMultiple}>
                <AssetBlock
                  height={259}
                  backgroundColor="#f6f8fa"
                  borderColor="#f6f8fa"
                  centerType="text"
                  centerText="F6F8FA"
                  centerTextColor="#252A2E"
                  cornerIcon={<CornerCopy text="#F6F8FA" />}
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#7d7fe9"
                  borderColor="#7d7fe9"
                  centerType="text"
                  centerText="7D7FE9"
                  centerTextColor="#f0f6fc"
                  cornerIcon={<CornerCopy text="#7D7FE9" />}
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#32335D"
                  borderColor="#32335D"
                  centerType="text"
                  centerText="32335D"
                  centerTextColor="#f0f6fc"
                  cornerIcon={<CornerCopy text="#32335D" />}
                />
                <AssetBlock
                  height={259}
                  backgroundColor="#0D1117"
                  borderColor="#212830"
                  centerType="text"
                  centerText="0D1117"
                  centerTextColor="#f0f6fc"
                  cornerIcon={<CornerCopy text="#0D1117" />}
                />
              </div>
            </div>

            <div className={styles.section} id="icons" ref={iconsRef}>
              <div className={styles.sectionTitle}>
                {translate({
                  message: "HOME.BrandAssets.icons",
                })}
              </div>
              <div className={styles.sectionContentSingle}>
                <AssetBlock
                  height={544}
                  backgroundColor="#010409"
                  borderColor="#212830"
                  centerType="svg"
                  centerIcon={<OomolIcon />}
                  centerHeight={256}
                  centerWidth={256}
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/oomol-icon.zip" />
                  }
                />
              </div>
            </div>

            <div className={styles.section} id="typeface" ref={typefaceRef}>
              <div className={styles.sectionTitle}>
                {translate({
                  message: "HOME.BrandAssets.typeface",
                })}
              </div>
              <div className={styles.sectionContentSingle}>
                <AssetBlock
                  height={544}
                  backgroundColor="#0d1117"
                  borderColor="#212830"
                  centerType="svg"
                  centerIcon={<JostIcon />}
                  centerHeight={100}
                  centerWidth={178}
                  centerTextColor="#f0f6fc"
                  cornerIcon={
                    <CornerDownload url="https://static.oomol.com/assets/font-jost.zip" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
