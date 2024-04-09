import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";

esbuild
  .build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    minify: true,
    outfile: "./dist/main.js",
    plugins: [GasPlugin],
    charset: "utf8",
    define: {
      "process.env.SPREAD_SHEET_ID": `"${process.env.SPREAD_SHEET_ID}"`,
      "process.env.LINE_BOT_SECRETS": `"${process.env.LINE_BOT_SECRETS}"`,
      "process.env.LINE_BOT_CHANNEL_TOKEN": `"${process.env.LINE_BOT_CHANNEL_TOKEN}"`,
    },
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
