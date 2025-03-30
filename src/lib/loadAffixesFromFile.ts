import fs from "fs";

import affixesPath from "../consts/affixesPath";
import type { AffixObject } from "../shared/types";
import type { LoadFunction } from "../shared/utils/affixes/affixes";

const loadAffixes: LoadFunction = () => {
  try {
    const newAffixes: AffixObject = JSON.parse(
      fs.readFileSync(affixesPath, "utf8")
    );
    return newAffixes;
  } catch (error) {
    console.error(`There was an error reading the affixes.json file. ${error}`);
    process.exit(1);
  }
};

export default loadAffixes;
