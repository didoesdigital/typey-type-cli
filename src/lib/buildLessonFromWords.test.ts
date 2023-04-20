import buildLessonFromWords from "./buildLessonFromWords";

describe("buildLessonFromWords", () => {
  it("returns words formatted as lesson", async () => {
    expect(buildLessonFromWords([["PHREFD", "pleased"]], "Pleased", null, null))
      .toEqual(`Pleased

'pleased': PHREFD
`);
  });

  it("returns words formatted as lesson with custom message", async () => {
    expect(
      buildLessonFromWords(
        [["PHREFD", "pleased"]],
        "Pleased",
        "Hint: use “Case sensitive” setting to learn how to fingerspell uppercase and lowercase letters",
        null
      )
    ).toEqual(`Pleased

'pleased': PHREFD
warning_message=Hint: use “Case sensitive” setting to learn how to fingerspell uppercase and lowercase letters
`);
  });

  it("returns words formatted as lesson with ignored characters", async () => {
    expect(buildLessonFromWords([["EUPB", "in^"]], "Affixes", null, "^"))
      .toEqual(`Affixes

'in^': EUPB
ignore_characters='^'
`);
  });
});
