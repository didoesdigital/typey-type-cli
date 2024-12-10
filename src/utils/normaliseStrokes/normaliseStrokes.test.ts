import normaliseStrokes from "./normaliseStrokes";

// Unlike the tests for normaliseNumbers and normaliseImplicitHyphen,
// normaliseStrokes ensures *both* are handled correctly. This should make it
// easy to spot errors if the order of normalising numbers or implicit hyphens
// first changes.
describe("normaliseStrokes", () => {
  it("converts number bar and adds implicit hyphen to unambiguous, right-hand number keys", async () => {
    expect(
      normaliseStrokes([
        ["#SG", "1 grand"],
        ["#HG", "4 grand"],
      ])
    ).toEqual([
      ["1-G", "1 grand"],
      ["4-G", "4 grand"],
    ]);
  });

  it("preserves number bar and adds implicit hyphen to unambiguous, right-hand non-number keys", async () => {
    expect(
      normaliseStrokes([
        ["#B", "test"],
        ["#G", "test"],
      ])
    ).toEqual([
      ["#-B", "test"],
      ["#-G", "test"],
    ]);
  });

  it("converts number bar and right-hand unambiguous letters into numbers", async () => {
    expect(normaliseStrokes([["#L", "test"]])).toEqual([["-8", "test"]]);
  });

  it("converts number bar and right-hand ambiguous letters into right-hand number", async () => {
    expect(normaliseStrokes([["#-T", "test"]])).toEqual([["-9", "test"]]);
  });
});
