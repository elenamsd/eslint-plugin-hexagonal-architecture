import enforce from "./rules/enforce";

const plugin = {
  meta: {
    name: "eslint-plugin-hexagonal-architecture",
    version: "1.0.3",
  },
  rules: {
    enforce,
  }
}

module.exports = plugin;