import normaliseImplicitHyphen from "./normaliseImplicitHyphen";

describe("normaliseImplicitHyphen", () => {
  it("adds a hyphen to stroke starting with suffix key", async () => {
    expect(normaliseImplicitHyphen("G")).toEqual("-G");
    expect(normaliseImplicitHyphen("D")).toEqual("-D");
    expect(normaliseImplicitHyphen("Z")).toEqual("-Z");
  });

  it("adds a hyphen to stroke with unambiguous right-hand key", async () => {
    expect(normaliseImplicitHyphen("F")).toEqual("-F");
    expect(normaliseImplicitHyphen("B")).toEqual("-B");
    expect(normaliseImplicitHyphen("L")).toEqual("-L");
  });

  it("adds a hyphen to stroke with ambiguous right-hand key", async () => {
    expect(normaliseImplicitHyphen("HP")).toEqual("H-P");
  });

  it("adds a hyphen between ambiguous left-hand key and unambiguous right-hand key", async () => {
    expect(normaliseImplicitHyphen("SD")).toEqual("S-D");
  });

  it("adds a hyphen between left-hand number keys and right-hand keys", async () => {
    expect(normaliseImplicitHyphen("3DZ")).toEqual("3-DZ");
  });

  it("does not add a hyphen to ambiguous left-hand key", async () => {
    expect(normaliseImplicitHyphen("S")).toEqual("S");
  });

  it("removes hyphen from left-hand key", async () => {
    expect(normaliseImplicitHyphen("S-")).toEqual("S");
  });

  it("removes hyphen from left-hand numbers with right-hand letters", async () => {
    expect(normaliseImplicitHyphen("15-BG")).toEqual("15BG");
  });

  it("removes hyphen from left-hand numbers with right-hand suffix key", async () => {
    expect(normaliseImplicitHyphen("5-Z")).toEqual("5Z");
  });

  it("removes hyphen from vowel-like numbers", async () => {
    expect(normaliseImplicitHyphen("0-7Z")).toEqual("07Z");
  });

  it("does not remove a hyphen from right-hand numbers with no left-hand or vowel-like keys", async () => {
    expect(normaliseImplicitHyphen("-7Z")).toEqual("-7Z");
  });

  it("does not add a hyphen to stroke starting with ambiguous left-hand key", async () => {
    expect(normaliseImplicitHyphen("STKPWOUPB")).toEqual("STKPWOUPB");
  });
});
