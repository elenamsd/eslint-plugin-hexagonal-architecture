import {
  GeneralNode,
  HexagonalArchitectureDependencyRuleEnforcer,
} from "../common/HexagonalArchitectureDependencyRuleEnforcer";
import { HexagonalArchitectureFolderEnforcer } from "../common/HexagonalArchitectureFolderEnforcer";
import { Rule } from "eslint";

const folderEnforcer = new HexagonalArchitectureFolderEnforcer();
const dependencyRuleEnforcer = new HexagonalArchitectureDependencyRuleEnforcer();

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce Hexagonal Architecture on a given path",
      recommended: true,
      url: "https://github.com/CodelyTV/eslint-plugin-hexagonal-architecture/blob/main/README.md"
    },
    messages: {
      "folder-not-follow-hexagonal": "The folder containing this file does not follow the Hexagonal Architecture structure",
      "import-not-follow-hexagonal": "This import is violating the Hexagonal Architecture dependency rule ({{ source }} can't import {{ target }})",
    },
    type: "problem",
  },
  create: function (context: Rule.RuleContext): Rule.RuleListener {
    return {
      "Program, ImportExpression"(node: Rule.Node) {
        folderEnforcer.enforce(context, node);

        if (folderEnforcer.hasCorrectFolderStructure(context.filename)) {
          dependencyRuleEnforcer.enforce(context, node as GeneralNode);
        }
      }
    };
  },
};

export default rule;
