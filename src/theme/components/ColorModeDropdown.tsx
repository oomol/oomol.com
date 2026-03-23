import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import { Dropdown, Menu } from "@arco-design/web-react";
import { Button } from "@site/src/components/ui/button";
import styles from "./ColorModeDropdown.module.scss";
import { useState, useEffect } from "react";

type ColorModeType = "light" | "dark" | "system";

const modeIconMap: Record<ColorModeType, string> = {
  light: "i-lucide-sun",
  dark: "i-lucide-moon",
  system: "i-lucide-sun-moon",
};

const getModeText = (mode: ColorModeType) => {
  return translate({
    id: `Theme.ColorMode.${mode}`,
    message:
      mode === "light"
        ? "Light Mode"
        : mode === "dark"
          ? "Dark Mode"
          : "Follow System",
  });
};

export const ColorModeDropdown = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [selectedMode, setSelectedMode] = useState<ColorModeType>(() => {
    if (typeof window !== "undefined") {
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
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColorMode(systemTheme);
    } else {
      localStorage.setItem("theme", mode);
      setColorMode(mode);
    }
  };

  const getDisplayIcon = () => {
    if (selectedMode === "system") {
      return modeIconMap.system;
    }
    return modeIconMap[colorMode];
  };

  const getDisplayText = () => {
    if (selectedMode === "system") {
      return getModeText("system");
    }
    return getModeText(colorMode);
  };

  return (
    <Dropdown
      droplist={
        <Menu
          className={styles.menu}
          onClickMenuItem={key => handleModeChange(key as ColorModeType)}
          selectedKeys={[selectedMode]}
        >
          {modes.map(mode => (
            <Menu.Item className={styles.menuItem} key={mode}>
              <i className={modeIconMap[mode]} />
              <span>{getModeText(mode)}</span>
            </Menu.Item>
          ))}
        </Menu>
      }
      position="top"
      trigger="click"
    >
      <Button className={styles.triggerButton} variant="ghost">
        <div className={getDisplayIcon()} />
        {getDisplayText()}
      </Button>
    </Dropdown>
  );
};
