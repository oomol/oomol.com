import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const docusaurusCli = path.join(
  rootDir,
  "node_modules",
  "@docusaurus",
  "core",
  "bin",
  "docusaurus.mjs"
);

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: "inherit",
      env: { ...process.env, ...extraEnv },
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} exited with signal ${signal}`));
        return;
      }
      resolve(code ?? 0);
    });
  });
}

async function main() {
  // Work around an Rspack persistent-cache panic seen during `docusaurus start`.
  const env = { DOCUSAURUS_NO_PERSISTENT_CACHE: "1" };

  const unoExitCode = await run(npmCommand, ["run", "build-unocss"], env);
  if (unoExitCode !== 0) {
    process.exit(unoExitCode);
  }

  const docusaurusExitCode = await run(
    process.execPath,
    [docusaurusCli, "start", ...process.argv.slice(2)],
    env
  );
  process.exit(docusaurusExitCode);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
