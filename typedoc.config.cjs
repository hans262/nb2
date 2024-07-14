/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: "Dopx",
  out: "docs",
  navigationLinks: {
    GitHub: "https://github.com/hans262/dopx",
    Npm: "https://www.npmjs.com/package/dopx"
  },
  entryPoints: [
    "src/index.ts",
  ],
  projectDocuments: ["pdocs/*.md"],
  theme: "default",
  includeVersion: false,
  alwaysCreateEntryPointModule: false,
}