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

  it("does not add a hyphen to ambiguous left-hand key", async () => {
    expect(normaliseImplicitHyphen("S")).toEqual("S");
  });

  it("removes hyphen from left-hand key", async () => {
    expect(normaliseImplicitHyphen("S-")).toEqual("S");
  });

  it("does not add a hyphen to stroke starting with ambiguous left-hand key", async () => {
    expect(normaliseImplicitHyphen("STKPWOUPB")).toEqual("STKPWOUPB");
  });
});
