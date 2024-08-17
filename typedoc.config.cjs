/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: "Nb2",
  out: "docs",
  navigationLinks: {
    GitHub: "https://github.com/hans262/nb2",
    Npm: "https://www.npmjs.com/package/nb2"
  },
  entryPoints: [
    "src/index.ts",
  ],
  projectDocuments: ["pdocs/*.md"],
  theme: "default",
  includeVersion: false,
  alwaysCreateEntryPointModule: false,
}