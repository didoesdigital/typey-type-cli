import normaliseNumbers from "./normaliseNumbers";

describe("normaliseNumbers", () => {
  it("converts number bar and letters into numbers", async () => {
    expect(normaliseNumbers("#S")).toEqual("1");
  });
});
