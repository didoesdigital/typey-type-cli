const stenoOrderAndEnglishKeys = [
  ["#", "1"],
  ["1", "2"],
  ["S", "3"],
  ["T", "4"],
  ["2", "5"],
  ["K", "6"],
  ["3", "7"],
  ["P", "8"],
  ["W", "9"],
  ["4", "0"],
  ["H", "a"],
  ["R", "b"],
  ["5", "c"],
  ["A", "d"],
  ["0", "e"],
  ["O", "f"],
  ["*", "g"],
  ["E", "h"],
  ["U", "i"],
  ["-", "j"], // right-hand index
  ["6", "k"],
  ["F", "l"],
  ["R", "m"],
  ["7", "n"],
  ["P", "o"],
  ["B", "p"],
  ["8", "q"],
  ["L", "r"],
  ["G", "s"],
  ["9", "t"],
  ["T", "u"],
  ["S", "v"],
  ["D", "w"],
  ["Z", "x"],
];

/** i.e. [..."#1S2TK3PW4HR5A0O*EU-6FR7PB8LG9TSDZ"] */
export const stenoOrderWithNumbers = stenoOrderAndEnglishKeys.map(
  (entry) => entry[0]
);

export const rightHandIndex = stenoOrderWithNumbers.indexOf("-");

export default stenoOrderAndEnglishKeys;
