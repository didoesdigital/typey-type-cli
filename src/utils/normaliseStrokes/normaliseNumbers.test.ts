import normaliseNumbers from "./normaliseNumbers";

describe("normaliseNumbers", () => {
  it("converts number bar and left-hand unambiguous letters into numbers", async () => {
    expect(normaliseNumbers("#H")).toEqual("4");
  });

  it("converts number bar and right-hand unambiguous letters without hyphen into numbers", async () => {
    expect(normaliseNumbers("#-L")).toEqual("-8");
  });

  it("converts number bar and right-hand unambiguous letters with hyphen into numbers", async () => {
    expect(normaliseNumbers("#L")).toEqual("8"); // If hyphens were also normalised, it would be "-8"
  });

  it("converts number bar and left-hand ambiguous letters into left-hand number", async () => {
    expect(normaliseNumbers("#T")).toEqual("2");
  });

  it("converts number bar and right-hand ambiguous letters into right-hand number", async () => {
    expect(normaliseNumbers("#-T")).toEqual("-9");
  });

  it("converts number bar, non-number key and right-hand ambiguous letter into non-number key and right-hand number", async () => {
    expect(normaliseNumbers("#R-P")).toEqual("R-7");
  });

  it("converts number bar, non-number key and right-hand unambiguous letter into non-number key and right-hand number", async () => {
    expect(normaliseNumbers("#HG")).toEqual("4G");
  });

  it("preserves number bar when there is a missing implicit hyphen and only non-number keys e.g. bottom row keys", async () => {
    expect(normaliseNumbers("#G")).toEqual("#G");
  });

  it("preserves number bar when there are only non-number keys e.g. bottom row keys", async () => {
    expect(normaliseNumbers("#-Z")).toEqual("#-Z");
  });

  it("preserves number bar when it's alone", async () => {
    expect(normaliseNumbers("#")).toEqual("#");
  });

  it("converts number bar and number keys when using number bar and mix of unambiguous right-hand number key and non-number key e.g. bottom row keys", async () => {
    expect(normaliseNumbers("#-LZ")).toEqual("-8Z");
  });

  it("converts number bar and number keys when using number bar and mix of ambiguous right-hand number key and non-number key e.g. bottom row keys", async () => {
    expect(normaliseNumbers("#-TZ")).toEqual("-9Z");
  });
});
