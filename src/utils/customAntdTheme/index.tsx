import React from "react";
import { ConfigProvider, MappingAlgorithm, theme } from "antd";
import { useThemeMode } from "../useThemeMode";

const antdDarkTheme: MappingAlgorithm = (seedToken, mapToken) => ({
  ...theme.darkAlgorithm(seedToken, mapToken),
  colorBgLayout: "#161B22",
});

const antdLightTheme: MappingAlgorithm = seedToken => ({
  ...theme.defaultAlgorithm(seedToken),
  colorBgLayout: "#ecf0f7",
});

const CustomAntdTheme = (children: JSX.Element) => {
  const themeMode = useThemeMode();

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7d7fe9",
          },
          algorithm: themeMode === "dark" ? antdDarkTheme : antdLightTheme,
        }}
      >
        {children}
      </ConfigProvider>
    </>
  );
};

export default CustomAntdTheme;
