import styles from "./ColorModeDropdown.module.scss";

import { translate } from "@docusaurus/Translate";
import { Button, type ButtonProps } from "@site/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/dropdown-menu";
import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";
import * as React from "react";

type ColorModeType = "light" | "dark" | "system";

export interface ColorModeDropdownProps {
  buttonVariant?: ButtonProps["variant"];
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
  buttonVariant = "ghost",
  triggerClassName,
}: ColorModeDropdownProps) => {
  const { colorMode, colorModeChoice, setColorMode } = useHydratedColorMode();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const shouldSkipTriggerRefocusRef = React.useRef(false);
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
          ref={triggerRef}
          className={`${styles.triggerButton}${triggerClassName ? ` ${triggerClassName}` : ""}`}
          size="sm"
          variant={buttonVariant}
        >
          <i className={`${getDisplayIcon()} ${styles.triggerIcon}`} />
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className={styles.menu}
        onCloseAutoFocus={event => {
          if (!shouldSkipTriggerRefocusRef.current) {
            return;
          }

          event.preventDefault();
          shouldSkipTriggerRefocusRef.current = false;
          triggerRef.current?.blur();
        }}
      >
        {modes.map(mode => (
          <DropdownMenuItem
            key={mode}
            className={styles.menuItem}
            onPointerDown={() => {
              shouldSkipTriggerRefocusRef.current = true;
            }}
            onSelect={() => handleModeChange(mode)}
          >
            <i className={modeIconMap[mode]} />
            <span className="flex-1">{getModeText(mode)}</span>
            {mode === selectedMode && (
              <i
                className="i-lucide-check ml-auto size-4 text-[var(--oomol-primary)]"
                aria-hidden="true"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
