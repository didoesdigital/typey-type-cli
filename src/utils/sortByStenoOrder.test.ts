import sortByStenoOrder from "./sortByStenoOrder";

describe("sortByStenoOrder", () => {
  it("sorts S ahead of A", async () => {
    expect(
      sortByStenoOrder([
        ["ST", "st"],
        ["AT", "at"],
      ])
    ).toEqual([
      ["ST", "st"],
      ["AT", "at"],
    ]);
  });

  it("sorts numbers ahead of letters", async () => {
    expect(
      sortByStenoOrder([
        ["S", "s"],
        ["1", "1"],
      ])
    ).toEqual([
      ["1", "1"],
      ["S", "s"],
    ]);
  });

  it("sorts number bar ahead of letter", async () => {
    expect(
      sortByStenoOrder([
        ["S", "s"],
        ["#", "1"],
      ])
    ).toEqual([
      ["#", "1"],
      ["S", "s"],
    ]);
  });

  it("sorts single-stroke outlines ahead of multi-stroke outlines", async () => {
    expect(
      sortByStenoOrder([
        ["AT/AT", "at"],
        ["AT", "at"],
      ])
    ).toEqual([
      ["AT", "at"],
      ["AT/AT", "at"],
    ]);
  });

  it("sorts shorter outlines ahead of longer outlines", async () => {
    expect(
      sortByStenoOrder([
        ["ATD", "atd"],
        ["AT", "at"],
      ])
    ).toEqual([
      ["AT", "at"],
      ["ATD", "atd"],
    ]);
  });
});
