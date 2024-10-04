import {
  GeneralNode,
  HexagonalArchitectureDependencyRuleEnforcer,
} from "../common/HexagonalArchitectureDependencyRuleEnforcer";
import { HexagonalArchitectureFolderEnforcer } from "../common/HexagonalArchitectureFolderEnforcer";
import {RuleMetaDataDocs} from "@typescript-eslint/utils/dist/ts-eslint";
import {Rule} from "eslint";
import {RuleWithMetaAndName} from "@typescript-eslint/utils/dist/eslint-utils";

const folderEnforcer = new HexagonalArchitectureFolderEnforcer();
const dependencyRuleEnforcer = new HexagonalArchitectureDependencyRuleEnforcer();

type MessageIds = "folder-not-follow-hexagonal" | "import-not-follow-hexagonal";
type Options = unknown;
// type Options = {
//   rootPath: string;
// };
export type RuleContext = Readonly<RuleWithMetaAndName<unknown[], MessageIds, Options[]>>;

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce Hexagonal Architecture on a given path",
      recommended: "error",
      requiresTypeChecking: false,
    } as RuleMetaDataDocs,
    messages: {
      "folder-not-follow-hexagonal":
        "The folder containing this file does not follow the Hexagonal Architecture structure",
      "import-not-follow-hexagonal":
        "This import is violating the Hexagonal Architecture dependency rule ({{ source }} can't import {{ target }})",
    },
    type: "problem",
    schema: [],
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
