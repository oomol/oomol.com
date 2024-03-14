import React, { useEffect, useState } from "react";
import { ConfigProvider, MappingAlgorithm, theme } from "antd";

const antdDarkTheme: MappingAlgorithm = (seedToken, mapToken) => ({
  ...theme.darkAlgorithm(seedToken, mapToken),
  colorBgLayout: "#161B22",
});

const antdLightTheme: MappingAlgorithm = seedToken => ({
  ...theme.defaultAlgorithm(seedToken),
  colorBgLayout: "#ecf0f7",
});

const CustomAntdTheme = (children: JSX.Element) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const handleStorageChange = () => {
      setThemeMode(localStorage.getItem("theme"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

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
