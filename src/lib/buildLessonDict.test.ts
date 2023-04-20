import buildLessonDict from "./buildLessonDict";

import type { DictEntries } from "../cli-types";

describe("buildLessonDict", () => {
  it("returns a valid dictionary as a string, removing duplicates, reordering number properties, preserving string properties with number values", async () => {
    const dictEntries: DictEntries = [
      ["KPA/THR", "There"],
      ["WAS", "was"],
      ["WUPBS", "once"],
      ["POPB", "upon"],
      ["AEU", "a"],
      ["TAOEUPL", "time"],
      ["KRAOEUD", "cried"],
      ["2", "2"],
      ["#H", "4"],
      ["WEUPL", "women"],
    ];

    const expectedResult = `{
"2": "2",
"KPA/THR": "There",
"WAS": "was",
"WUPBS": "once",
"POPB": "upon",
"AEU": "a",
"TAOEUPL": "time",
"KRAOEUD": "cried",
"#H": "4",
"WEUPL": "women"
}
`;

    expect(await buildLessonDict(dictEntries)).toEqual(expectedResult);
  });
});
