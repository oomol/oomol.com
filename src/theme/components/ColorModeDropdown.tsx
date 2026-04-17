import styles from "./ColorModeDropdown.module.scss";

import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/dropdown-menu";
import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";
import { Check } from "lucide-react";

type ColorModeType = "light" | "dark" | "system";

export interface ColorModeDropdownProps {
  triggerClassName?: string;
}

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

export const ColorModeDropdown = ({
  triggerClassName,
}: ColorModeDropdownProps) => {
  const { colorMode, colorModeChoice, setColorMode } = useHydratedColorMode();
  const selectedMode: ColorModeType = colorModeChoice ?? "system";

  const modes: ColorModeType[] = ["light", "dark", "system"];

  const handleModeChange = (mode: ColorModeType) => {
    if (mode === "system") {
      setColorMode(null);
    } else {
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
        <Button
          className={`${styles.triggerButton}${triggerClassName ? ` ${triggerClassName}` : ""}`}
          size="sm"
          variant="ghost"
        >
          <i className={`${getDisplayIcon()} ${styles.triggerIcon}`} />
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className={styles.menu}>
        {modes.map(mode => (
          <DropdownMenuItem
            key={mode}
            className={styles.menuItem}
            onSelect={() => handleModeChange(mode)}
          >
            <i className={modeIconMap[mode]} />
            <span className="flex-1">{getModeText(mode)}</span>
            {mode === selectedMode && (
              <Check className="ml-auto size-4 text-[var(--oomol-primary)]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
