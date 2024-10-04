import {Rule} from "eslint";

export class HexagonalArchitectureFolderEnforcer {
  public enforce(context: Rule.RuleContext, node: Rule.Node): void {
    const filename = context.filename;

    if (!this.hasCorrectFolderStructure(filename)) {
      context.report({ node, messageId: "folder-not-follow-hexagonal" });
    }
  }

  public hasCorrectFolderStructure(filename: string): boolean {
    return /application|domain|infrastructure/.test(filename);
  }
}
