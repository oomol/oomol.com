import styles from "./ColorModeDropdown.module.scss";

import { Dropdown, Menu } from "@arco-design/web-react";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";

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
      <Button
        className={`${styles.triggerButton}${triggerClassName ? ` ${triggerClassName}` : ""}`}
        size="sm"
        variant="ghost"
      >
        <i className={`${getDisplayIcon()} ${styles.triggerIcon}`} />
        {getDisplayText()}
      </Button>
    </Dropdown>
  );
};
