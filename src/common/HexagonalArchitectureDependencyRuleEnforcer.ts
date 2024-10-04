import {Rule} from "eslint";

type ImportDeclarationNode = {
  type: string;
  source: { value: string };
};

export type GeneralNode = { body: ImportDeclarationNode[] | undefined };

type HexagonalLayers = "application" | "domain" | "infrastructure";

export class HexagonalArchitectureDependencyRuleEnforcer {
  private readonly layers = ["application", "domain", "infrastructure"];
  private readonly dependenciesWildcard = {
    application: ["application", "domain"],
    domain: ["domain"],
    infrastructure: ["application", "domain", "infrastructure"],
  };

  public enforce(context: Rule.RuleContext, node: GeneralNode): void {
    const nodeBody = node["body"];

    if (nodeBody !== undefined) {
      nodeBody
        .filter((value) => value.type === "ImportDeclaration")
        .forEach((value) => {
          this.ensureImportIsValid(value.source.value, context, value as Rule.Node);
        });
    }
  }

  private ensureImportIsValid(importText: string, context: Rule.RuleContext, node: Rule.Node): void {
    const currentLayer = this.extractCurrentLayer(context.filename);
    const forbiddenImports = this.layers.filter(
      (layer) => !this.dependenciesWildcard[currentLayer].includes(layer)
    );

    forbiddenImports.forEach((forbiddenImport) => {
      if (importText.includes(forbiddenImport)) {
        context.report({
          node,
          messageId: "import-not-follow-hexagonal",
          data: {
            source: currentLayer,
            target: forbiddenImport,
          },
        });
      }
    });
  }

  private extractCurrentLayer(filename: string): HexagonalLayers {
    const regex = /application|domain|infrastructure/g;
    const found = filename.match(regex) as HexagonalLayers[];

    return found[0];
  }
}
