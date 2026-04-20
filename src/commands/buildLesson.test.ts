import buildLesson from "./buildLesson";

describe("buildLesson", () => {
  it("exits early for bad metadata file path", async () => {
    await expect(async () => {
      await buildLesson.run({
        metadata: "not-a-real-file",
        target: "not-a-real-file",
      });
    }).rejects.toThrow();
  });
});
