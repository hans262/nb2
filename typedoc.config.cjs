/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: "Dpenx",
  out: "docs",
  navigationLinks: {
    GitHub: "https://github.com/hans262/dpenx",
    Npm: "https://www.npmjs.com/package/dpenx"
  },
  entryPoints: [
    "src/index.ts",
  ],
  projectDocuments: ["documents/*.md"],
  theme: "default",
  includeVersion: false,
  alwaysCreateEntryPointModule: false,
}