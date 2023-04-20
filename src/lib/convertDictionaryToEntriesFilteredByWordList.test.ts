import convertDictionaryToEntriesFilteredByWordList from "./convertDictionaryToEntriesFilteredByWordList";
import type { StenoDictionary } from "../shared/types";

describe("convertDictionaryToEntriesFilteredByWordList", () => {
  it("returns dict entries", async () => {
    const words = [
      "it",
      "it could",
      "it can't",
      "it believe",
      "it can't",
      "it don't",
    ];

    const recommendedDictionary: StenoDictionary = {
      "KPWH": "it",
      "KPWH*EBLGT": "it doesn't like the",
      "KPWH-BGD": "it could",
      "KPWH-BGT": "it can't",
      "KPWH-BL": "it believe",
      "KPWHERPBD": "it doesn't understand",
      "KPWHO": "it can't",
      "KPWHOE": "it don't",
    };

    expect(
      convertDictionaryToEntriesFilteredByWordList(words, recommendedDictionary)
    ).toEqual([
      ["KPWH", "it"],
      ["KPWH-BGD", "it could"],
      ["KPWH-BGT", "it can't"],
      ["KPWH-BL", "it believe"],
      ["KPWHO", "it can't"],
      ["KPWHOE", "it don't"],
    ]);
  });
});
