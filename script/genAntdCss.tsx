import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import CustomAntdTheme from "../src/utils/customAntdTheme";

const outputPath = "./static/css/antd.min.css";

const css = extractStyle(CustomAntdTheme);

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);
