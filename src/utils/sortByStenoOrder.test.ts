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

  it("sorts second stroke starting with -P ahead of -L", async () => {
    expect(
      sortByStenoOrder([
        ["STAOEP/-L", "steeple"],
        ["STAOEP/-LS", "steeples"],
        ["STAOEP/-PBS", "steepness"],
      ])
    ).toEqual([
      ["STAOEP/-PBS", "steepness"],
      ["STAOEP/-L", "steeple"],
      ["STAOEP/-LS", "steeples"],
    ]);
  });

  it("sorts second stroke starting with -S ahead of -D", async () => {
    expect(
      sortByStenoOrder([
        ["STEULT/-D", "stilted"],
        ["STEULT/-S", "stilts"],
      ])
    ).toEqual([
      ["STEULT/-S", "stilts"],
      ["STEULT/-D", "stilted"],
    ]);
  });

  it("sorts stroke with SZ ahead of D", async () => {
    expect(
      sortByStenoOrder([
        ["STPH-PBD", "sentenced"],
        ["STPH-PBSZ", "sentences"],
      ])
    ).toEqual([
      ["STPH-PBSZ", "sentences"],
      ["STPH-PBD", "sentenced"],
    ]);
  });

  it("sorts stroke with EU ahead of -", async () => {
    expect(
      sortByStenoOrder([
        ["12-R", "XII"],
        ["12EU", "21"],
      ])
    ).toEqual([
      ["12EU", "21"],
      ["12-R", "XII"],
    ]);
  });
});
