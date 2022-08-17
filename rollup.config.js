import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "es",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [typescript()],
    external: ["react", "react-dom"],
  },
  {
    // path to your declaration files root
    input: "index.d.ts",
    output: [{ file: "index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
