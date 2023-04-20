"use strict";

import fs from "node:fs/promises";

import checkFileExists from "../utils/checkFileExists";

type Options = {
  rule: string;
};

/**
 * This command helps quickly scaffold out new rule files.
 *
 * Example files:
 * src/lib/rules/hasStar.ts
 * src/lib/rules/hasStar.test.ts
 */
const run = async (options: Options) => {
  const ruleFilePath = `src/lib/rules/${options.rule}.ts`;
  const ruleTestFilePath = `src/lib/rules/${options.rule}.test.ts`;

  if (
    (await checkFileExists(ruleFilePath)) ||
    (await checkFileExists(ruleTestFilePath))
  ) {
    throw new Error(`Rule files already exist`);
  }

  const ruleContents = `const ${options.rule} = (outline: string, translation: string) => true;

export default ${options.rule};
`;

  const ruleTestContents = `import ${options.rule} from "./${options.rule}";

describe("${options.rule}", () => {
  it("returns true for TODO", async () => {
    expect(${options.rule}("TEFT", "test")).toEqual(true);
  });

  it("returns false for TODO", async () => {
    expect(${options.rule}("TEFT", "test")).toEqual(false);
  });
});
`;

  await fs.writeFile(ruleFilePath, ruleContents).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  await fs.writeFile(ruleTestFilePath, ruleTestContents).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  console.log("📣 Update the following files and run yarn test:");
  console.log(ruleFilePath);
  console.log(ruleTestFilePath);
};

export default {
  run,
};
