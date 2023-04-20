import buildLesson from "./buildLesson";

describe("buildLesson", () => {
  it("exits early for bad metadata file path", async () => {
    expect(async () => {
      await buildLesson.run({
        metadata: "not-a-real-file",
        target: "not-a-real-file",
      });
    }).rejects.toThrow();
  });
});
