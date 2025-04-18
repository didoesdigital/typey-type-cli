// const numberDictionaryEntries: { [translation: string]: string } = {
//   "1,000": "#S/W-B/THUZ",
//   "2,000": "#T/W-B/THUZ",
//   "3,000": "#P/W-B/THUZ",
//   "4,000": "#H/W-B/THUZ",
//   "5,000": "#A/W-B/THUZ",
//   "6,000": "#F/W-B/THUZ",
//   "7,000": "#-P/W-B/THUZ",
//   "8,000": "#L/W-B/THUZ",
//   "9,000": "#-T/W-B/THUZ",
//   "10,000": "#SO/W-B/THUZ",
//   "10": "10",
//   "12": "12",
//   "13": "13",
//   "15": "15",
//   "16": "16",
//   "17": "17",
//   "18": "18",
//   "20": "20",
//   "23": "23",
//   "24": "24",
//   "25": "25",
//   "26": "26",
//   "27": "27",
//   "28": "28",
//   "29": "29",
//   "30": "30",
//   "34": "34",
//   "35": "35",
//   "36": "36",
//   "37": "37",
//   "38": "38",
//   "39": "39",
//   "45": "45",
//   "46": "46",
//   "47": "47",
//   "48": "48",
//   "49": "49",
//   "50": "50",
//   "56": "56",
//   "57": "57",
//   "58": "58",
//   "59": "59",
//   "67": "67",
//   "68": "68",
//   "69": "69",
//   "78": "78",
//   "79": "79",
//   "89": "89",
//   "1000": "10Z",
//   "2000": "20Z",
//   "3000": "30Z",
//   "4000": "40Z",
//   "5000": "50Z",
//   "6000": "60Z",
//   "7000": "70Z",
//   "8000": "80Z",
//   "9000": "90Z",
//   "10000": "10/THUZ",
//   "1": "#S",
//   "2": "#T",
//   "3": "#P",
//   "4": "#H",
//   "5": "#A",
//   "0": "#O",
//   "6": "#F",
//   "7": "#-P",
//   "8": "#L",
//   "9": "#-T",
//   "100": "#SZ",
//   "200": "#T-Z",
//   "300": "#P-Z",
//   "400": "#HZ",
//   "500": "#AZ",
//   "600": "#FZ",
//   "700": "#-PZ",
//   "800": "#LZ",
//   "900": "#-TZ",
//   "$100": "#SDZ",
//   "$200": "#T-DZ",
//   "$300": "#P-DZ",
//   "$400": "#HDZ",
//   "$500": "#ADZ",
//   "$600": "#FDZ",
//   "$700": "#-PDZ",
//   "$800": "#LDZ",
//   "$900": "#-TDZ",
//   "1:00": "#SBG",
//   "2:00": "#TBG",
//   "3:00": "#PBG",
//   "4:00": "#HBG",
//   "5:00": "#ABG",
//   "6:00": "#FBG",
//   "7:00": "#-PBG",
//   "8:00": "#BLG",
//   "9:00": "#BGT",
//   "10:00": "#SOBG",
//   "11:00": "#SBGD",
//   "12:00": "#STBG",
//   "13:00": "#SP-BG",
//   "14:00": "#SHBG",
//   "15:00": "#SABG",
//   "16:00": "#SFBG",
//   "17:00": "#S-PBG",
//   "18:00": "#SBLG",
//   "19:00": "#SBGT",
//   "20:00": "#TOBG",
//   "21:00": "#STEUBG",
//   "22:00": "#TBGD",
//   "23:00": "#T-PBG",
//   "24:00": "#THBG",
// };

const numberDictionaryEntries: ReadonlyArray<[string, [string, string][]]> = [
  ["1", [["#S", "plover:built-in-numbers.json"]]],
  ["2", [["#T", "plover:built-in-numbers.json"]]],
  ["3", [["#P", "plover:built-in-numbers.json"]]],
  ["4", [["#H", "plover:built-in-numbers.json"]]],
  ["5", [["#A", "plover:built-in-numbers.json"]]],
  ["6", [["#F", "plover:built-in-numbers.json"]]],
  ["7", [["#-P", "plover:built-in-numbers.json"]]],
  ["8", [["#L", "plover:built-in-numbers.json"]]],
  ["9", [["#-T", "plover:built-in-numbers.json"]]],
  ["0", [["#O", "plover:built-in-numbers.json"]]],
];

// const numberDictionaryEntries: ReadonlyArray<[string, [string, string][]]> = [
//   ["1,000", [["#S/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["2,000", [["#T/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["3,000", [["#P/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["4,000", [["#H/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["5,000", [["#A/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["6,000", [["#F/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["7,000", [["#-P/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["8,000", [["#L/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["9,000", [["#-T/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["10,000", [["#SO/W-B/THUZ", "typey:numbers-lesson.json"]]],
//   ["10", [["10", "typey:numbers-lesson.json"]]],
//   ["12", [["12", "typey:numbers-lesson.json"]]],
//   ["13", [["13", "typey:numbers-lesson.json"]]],
//   ["15", [["15", "typey:numbers-lesson.json"]]],
//   ["16", [["16", "typey:numbers-lesson.json"]]],
//   ["17", [["17", "typey:numbers-lesson.json"]]],
//   ["18", [["18", "typey:numbers-lesson.json"]]],
//   ["20", [["20", "typey:numbers-lesson.json"]]],
//   ["23", [["23", "typey:numbers-lesson.json"]]],
//   ["24", [["24", "typey:numbers-lesson.json"]]],
//   ["25", [["25", "typey:numbers-lesson.json"]]],
//   ["26", [["26", "typey:numbers-lesson.json"]]],
//   ["27", [["27", "typey:numbers-lesson.json"]]],
//   ["28", [["28", "typey:numbers-lesson.json"]]],
//   ["29", [["29", "typey:numbers-lesson.json"]]],
//   ["30", [["30", "typey:numbers-lesson.json"]]],
//   ["34", [["34", "typey:numbers-lesson.json"]]],
//   ["35", [["35", "typey:numbers-lesson.json"]]],
//   ["36", [["36", "typey:numbers-lesson.json"]]],
//   ["37", [["37", "typey:numbers-lesson.json"]]],
//   ["38", [["38", "typey:numbers-lesson.json"]]],
//   ["39", [["39", "typey:numbers-lesson.json"]]],
//   ["45", [["45", "typey:numbers-lesson.json"]]],
//   ["46", [["46", "typey:numbers-lesson.json"]]],
//   ["47", [["47", "typey:numbers-lesson.json"]]],
//   ["48", [["48", "typey:numbers-lesson.json"]]],
//   ["49", [["49", "typey:numbers-lesson.json"]]],
//   ["50", [["50", "typey:numbers-lesson.json"]]],
//   ["56", [["56", "typey:numbers-lesson.json"]]],
//   ["57", [["57", "typey:numbers-lesson.json"]]],
//   ["58", [["58", "typey:numbers-lesson.json"]]],
//   ["59", [["59", "typey:numbers-lesson.json"]]],
//   ["67", [["67", "typey:numbers-lesson.json"]]],
//   ["68", [["68", "typey:numbers-lesson.json"]]],
//   ["69", [["69", "typey:numbers-lesson.json"]]],
//   ["78", [["78", "typey:numbers-lesson.json"]]],
//   ["79", [["79", "typey:numbers-lesson.json"]]],
//   ["89", [["89", "typey:numbers-lesson.json"]]],
//   ["1000", [["10Z", "typey:numbers-lesson.json"]]],
//   ["2000", [["20Z", "typey:numbers-lesson.json"]]],
//   ["3000", [["30Z", "typey:numbers-lesson.json"]]],
//   ["4000", [["40Z", "typey:numbers-lesson.json"]]],
//   ["5000", [["50Z", "typey:numbers-lesson.json"]]],
//   ["6000", [["60Z", "typey:numbers-lesson.json"]]],
//   ["7000", [["70Z", "typey:numbers-lesson.json"]]],
//   ["8000", [["80Z", "typey:numbers-lesson.json"]]],
//   ["9000", [["90Z", "typey:numbers-lesson.json"]]],
//   ["10000", [["10/THUZ", "typey:numbers-lesson.json"]]],
//   ["1", [["#S", "typey:numbers-lesson.json"]]],
//   ["2", [["#T", "typey:numbers-lesson.json"]]],
//   ["3", [["#P", "typey:numbers-lesson.json"]]],
//   ["4", [["#H", "typey:numbers-lesson.json"]]],
//   ["5", [["#A", "typey:numbers-lesson.json"]]],
//   ["0", [["#O", "typey:numbers-lesson.json"]]],
//   ["6", [["#F", "typey:numbers-lesson.json"]]],
//   ["7", [["#-P", "typey:numbers-lesson.json"]]],
//   ["8", [["#L", "typey:numbers-lesson.json"]]],
//   ["9", [["#-T", "typey:numbers-lesson.json"]]],
//   ["100", [["#SZ", "typey:numbers-lesson.json"]]],
//   ["200", [["#T-Z", "typey:numbers-lesson.json"]]],
//   ["300", [["#P-Z", "typey:numbers-lesson.json"]]],
//   ["400", [["#HZ", "typey:numbers-lesson.json"]]],
//   ["500", [["#AZ", "typey:numbers-lesson.json"]]],
//   ["600", [["#FZ", "typey:numbers-lesson.json"]]],
//   ["700", [["#-PZ", "typey:numbers-lesson.json"]]],
//   ["800", [["#LZ", "typey:numbers-lesson.json"]]],
//   ["900", [["#-TZ", "typey:numbers-lesson.json"]]],
//   ["$100", [["#SDZ", "typey:numbers-lesson.json"]]],
//   ["$200", [["#T-DZ", "typey:numbers-lesson.json"]]],
//   ["$300", [["#P-DZ", "typey:numbers-lesson.json"]]],
//   ["$400", [["#HDZ", "typey:numbers-lesson.json"]]],
//   ["$500", [["#ADZ", "typey:numbers-lesson.json"]]],
//   ["$600", [["#FDZ", "typey:numbers-lesson.json"]]],
//   ["$700", [["#-PDZ", "typey:numbers-lesson.json"]]],
//   ["$800", [["#LDZ", "typey:numbers-lesson.json"]]],
//   ["$900", [["#-TDZ", "typey:numbers-lesson.json"]]],
//   ["1:00", [["#SBG", "typey:numbers-lesson.json"]]],
//   ["2:00", [["#TBG", "typey:numbers-lesson.json"]]],
//   ["3:00", [["#PBG", "typey:numbers-lesson.json"]]],
//   ["4:00", [["#HBG", "typey:numbers-lesson.json"]]],
//   ["5:00", [["#ABG", "typey:numbers-lesson.json"]]],
//   ["6:00", [["#FBG", "typey:numbers-lesson.json"]]],
//   ["7:00", [["#-PBG", "typey:numbers-lesson.json"]]],
//   ["8:00", [["#BLG", "typey:numbers-lesson.json"]]],
//   ["9:00", [["#BGT", "typey:numbers-lesson.json"]]],
//   ["10:00", [["#SOBG", "typey:numbers-lesson.json"]]],
//   ["11:00", [["#SBGD", "typey:numbers-lesson.json"]]],
//   ["12:00", [["#STBG", "typey:numbers-lesson.json"]]],
//   ["13:00", [["#SP-BG", "typey:numbers-lesson.json"]]],
//   ["14:00", [["#SHBG", "typey:numbers-lesson.json"]]],
//   ["15:00", [["#SABG", "typey:numbers-lesson.json"]]],
//   ["16:00", [["#SFBG", "typey:numbers-lesson.json"]]],
//   ["17:00", [["#S-PBG", "typey:numbers-lesson.json"]]],
//   ["18:00", [["#SBLG", "typey:numbers-lesson.json"]]],
//   ["19:00", [["#SBGT", "typey:numbers-lesson.json"]]],
//   ["20:00", [["#TOBG", "typey:numbers-lesson.json"]]],
//   ["21:00", [["#STEUBG", "typey:numbers-lesson.json"]]],
//   ["22:00", [["#TBGD", "typey:numbers-lesson.json"]]],
//   ["23:00", [["#T-PBG", "typey:numbers-lesson.json"]]],
//   ["24:00", [["#THBG", "typey:numbers-lesson.json"]]],
// ];

export default numberDictionaryEntries;
