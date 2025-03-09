import createLookupDict from "./createLookupDict";
import namespacedTypeyDict from "../consts/namespacedTypeyDict";
import { StenoDictionary } from "../shared/types";

describe("createLookupDict", () => {
  xit("combines dictionaries into a lookup Map with multiple outlines for a word, ranked/sorted", async () => {
    expect(
      createLookupDict([
        [{ "APL/PWEURBT": "ambitious" }, "test.json"],
        [
          { "APL/PWEURB/OUS": "ambitious", "EUPL/PWEURBS": "ambitious" },
          "test2.json",
        ],
      ])
    ).toEqual(
      new Map([
        ["0", [["#O", "plover:built-in-numbers.json"]]],
        ["1", [["#S", "plover:built-in-numbers.json"]]],
        ["2", [["#T", "plover:built-in-numbers.json"]]],
        ["3", [["#P", "plover:built-in-numbers.json"]]],
        ["4", [["#H", "plover:built-in-numbers.json"]]],
        ["5", [["#A", "plover:built-in-numbers.json"]]],
        ["6", [["#F", "plover:built-in-numbers.json"]]],
        ["7", [["#-P", "plover:built-in-numbers.json"]]],
        ["8", [["#L", "plover:built-in-numbers.json"]]],
        ["9", [["#-T", "plover:built-in-numbers.json"]]],
        [
          "ambitious",
          [
            ["APL/PWEURBT", namespacedTypeyDict],
            ["EUPL/PWEURBS", namespacedTypeyDict],
            ["APL/PWEURB/OUS", namespacedTypeyDict],
          ],
        ],
      ])
    );
  });

  it("combines dictionaries into a lookup Map, preserving duplicate outlines from different dictionaries", async () => {
    const testInput: [StenoDictionary, string][] = [
      [{ "TEFT": "test1" }, "typey-type.json"],
      [{ "TEFT": "test2" }, "typey-type.json"],
    ];
    const testOutput = new Map([
      ["0", [["#O", "plover:built-in-numbers.json"]]],
      ["1", [["#S", "plover:built-in-numbers.json"]]],
      ["2", [["#T", "plover:built-in-numbers.json"]]],
      ["3", [["#P", "plover:built-in-numbers.json"]]],
      ["4", [["#H", "plover:built-in-numbers.json"]]],
      ["5", [["#A", "plover:built-in-numbers.json"]]],
      ["6", [["#F", "plover:built-in-numbers.json"]]],
      ["7", [["#-P", "plover:built-in-numbers.json"]]],
      ["8", [["#L", "plover:built-in-numbers.json"]]],
      ["9", [["#-T", "plover:built-in-numbers.json"]]],
      ["test1", [["TEFT", namespacedTypeyDict]]],
      ["test2", [["TEFT", namespacedTypeyDict]]],
    ]);

    expect(createLookupDict(testInput)).toEqual(testOutput);
  });
});
