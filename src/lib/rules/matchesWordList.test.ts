import matchesWordList from "./matchesWordList";

const rules = { isFingerspelled: true };

describe("matchesWordList", () => {
  it("returns true for simple matches", async () => {
    // given a dictEntry of ["AEU", "a"]
    expect(matchesWordList("a", ["a", "the"], rules)).toEqual(true);
  });

  it("returns true after transforming formatting like glue symbols", async () => {
    // given a dictEntry of ["A*", "{>}{&a}"]
    expect(matchesWordList("{>}{&a}", ["a", "b"], rules)).toEqual(true);
  });

  it("returns false for other formatting", async () => {
    // given a dictEntry of ["A", "{a^}"]
    expect(matchesWordList("{a^}", ["a"], rules)).toEqual(false);
  });

  it("returns false for other words", async () => {
    // given a dictEntry of ["AEU", "a"]
    expect(matchesWordList("a", ["the"], rules)).toEqual(false);
  });
});
