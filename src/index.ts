import enforce from "./rules/enforce";

export const plugin = {
  meta: {
    name: "eslint-plugin-hexagonal-architecture",
    version: "1.0.3",
  },
  rules: {
    enforce,
  }
}