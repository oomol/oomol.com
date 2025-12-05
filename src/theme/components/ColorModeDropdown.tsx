import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <div className={getDisplayIcon()} />
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{
          backgroundColor: "var(--oomol-bg-container)",
          borderColor: "var(--oomol-border-default)",
        }}
      >
        <DropdownMenuRadioGroup
          value={selectedMode}
          onValueChange={value => handleModeChange(value as ColorModeType)}
        >
          {modes.map(mode => (
            <DropdownMenuRadioItem key={mode} value={mode} className="gap-2">
              <i className={modeIconMap[mode]} style={{ fontSize: "14px" }} />
              <span>{getModeText(mode)}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
