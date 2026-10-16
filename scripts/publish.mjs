import { cp, rm } from "node:fs/promises";
await rm("bundles", { recursive: true, force: true });
await cp("dist/bundles", "bundles", { recursive: true });
await cp("dist/index.html", "index.html");
console.log("Static GitHub Pages site prepared in repository root.");
