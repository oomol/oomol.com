import React from "react";
import { ConfigProvider } from "antd";

const CustomAntdTheme = (children: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7d7fe9",
        },
      }}
    >
      {children}
    </ConfigProvider>
  </>
);

export default CustomAntdTheme;
