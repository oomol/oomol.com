import { useColorMode } from "@docusaurus/theme-common";
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
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
      return modeMap.system;
    }
    return modeMap[colorMode];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <div className={getDisplayIcon()} />
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={selectedMode} onValueChange={(value) => handleModeChange(value as ColorModeType)}>
          {modes.map(mode => (
            <DropdownMenuRadioItem key={mode} value={mode} className="gap-2">
              <i className={modeIconMap[mode]} style={{ fontSize: "14px" }} />
              <span>{modeMap[mode]}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
