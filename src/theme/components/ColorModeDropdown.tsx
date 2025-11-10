import styles from "./ColorModeDropdown.module.scss";

import { useColorMode } from "@docusaurus/theme-common";
import { Button } from "@site/src/components/Button";
import { useState, useEffect } from "react";

type ColorModeType = "light" | "dark" | "system";

const modeMap: Record<ColorModeType, string> = {
  light: "浅色模式",
  dark: "深色模式",
  system: "跟随系统",
};

const modeIconMap: Record<ColorModeType, string> = {
  light: "i-lucide-sun",
  dark: "i-lucide-moon",
  system: "i-lucide-sun-moon",
};

export const ColorModeDropdown = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [isShow, setIsShow] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ColorModeType>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem("theme") as ColorModeType | null;
      return storedMode || "system";
    }
    return "system";
  });

  useEffect(() => {
    if (selectedMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setColorMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [selectedMode, setColorMode]);

  const modes: ColorModeType[] = ["light", "dark", "system"];

  const handleModeChange = (mode: ColorModeType) => {
    setSelectedMode(mode);
    if (mode === "system") {
      localStorage.removeItem("theme");
      // 获取系统主题
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setColorMode(systemTheme);
    } else {
      localStorage.setItem("theme", mode);
      setColorMode(mode);
    }
    setIsShow(false);
  };

  const renderModeContent = () => {
    return (
      <div className={styles["item-box"]}>
        {modes.map(mode => {
          return (
            <div
              key={mode}
              className={`${styles.item} ${mode === selectedMode ? styles.selected : ""}`}
              onClick={() => handleModeChange(mode)}
            >
              <i className={modeIconMap[mode]} style={{ fontSize: "14px" }} />
              <div>{modeMap[mode]}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const getDisplayIcon = () => {
    if (selectedMode === "system") {
      return modeIconMap.system;
    }
    return modeIconMap[colorMode];
  };

  const getDisplayText = () => {
    if (selectedMode === "system") {
      return modeMap.system;
    }
    return modeMap[colorMode];
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <div className={styles.content}>{isShow && renderModeContent()}</div>
      <Button
        className={styles["mode-btn"]}
        icon={<div className={getDisplayIcon()} />}
        iconPosition="start"
      >
        {getDisplayText()}
      </Button>
    </div>
  );
};
