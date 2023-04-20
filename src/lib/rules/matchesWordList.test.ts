import matchesWordList from "./matchesWordList";

const rules = { isFingerspelled: true };

describe("matchesWordList", () => {
  it("returns true for simple matches", async () => {
    expect(matchesWordList(["AEU", "a"], ["a", "the"], rules)).toEqual(true);
  });

  it("returns true after transforming formatting like glue symbols", async () => {
    expect(matchesWordList(["A*", "{>}{&a}"], ["a", "b"], rules)).toEqual(true);
  });

  it("returns false for other formatting", async () => {
    expect(matchesWordList(["A", "{a^}"], ["a"], rules)).toEqual(false);
  });

  it("returns false for other words", async () => {
    expect(matchesWordList(["AEU", "a"], ["the"], rules)).toEqual(false);
  });
});
