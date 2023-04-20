import slugifyTitle from "./slugifyTitle";

describe("slugifyTitle", () => {
  it("downcases and dashifies lesson title", async () => {
    const expectedResult = "roman-numerals";
    const dashifiedTitle = slugifyTitle("Roman Numerals");
    expect(dashifiedTitle).toEqual(expectedResult);
  });

  it("replaces colon, space, dash with 1 dash", async () => {
    const expectedResult = "fr-fer";
    const dashifiedTitle = slugifyTitle("FR: -fer");
    expect(dashifiedTitle).toEqual(expectedResult);
  });

  it("replaces colon and space with dash", async () => {
    const expectedResult = "two-letter-words-rare";
    const dashifiedTitle = slugifyTitle("Two Letter Words: Rare");
    expect(dashifiedTitle).toEqual(expectedResult);
  });

  it("removes apostrophes", async () => {
    const expectedResult = "little-idas-flowers";
    const dashifiedTitle = slugifyTitle("Little Ida's Flowers");
    expect(dashifiedTitle).toEqual(expectedResult);
  });

  it("removes commas", async () => {
    const expectedResult = "the-mouse-the-bird-and-the-sausage";
    const dashifiedTitle = slugifyTitle("The Mouse, the Bird, and the Sausage");
    expect(dashifiedTitle).toEqual(expectedResult);
  });

  it("removes asterisks", async () => {
    // Note: we actually want to preserve capitalisation for the two-key briefs slug so we use a custom slug for that but we keep this test and behaviour here anyway to guard against similar issues in the future
    const expectedResult = "two-key-briefs--b";
    const dashifiedTitle = slugifyTitle("Two-key briefs *-B");
    expect(dashifiedTitle).toEqual(expectedResult);
  });
});
