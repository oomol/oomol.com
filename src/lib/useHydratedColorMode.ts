import { useColorMode } from "@docusaurus/theme-common";
import { useEffect, useState } from "react";

type ResolvedColorMode = "light" | "dark";

export function useHydratedColorMode(
  fallbackColorMode: ResolvedColorMode = "dark"
) {
  const { colorMode, colorModeChoice, setColorMode } = useColorMode();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    colorMode: isHydrated ? colorMode : fallbackColorMode,
    colorModeChoice: isHydrated ? colorModeChoice : null,
    isHydrated,
    setColorMode,
  };
}
