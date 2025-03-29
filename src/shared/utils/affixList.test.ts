import { AffixList } from "./affixList";
import createAGlobalLookupDictionary from "./transformingDictionaries/createAGlobalLookupDictionary";
import type { PersonalDictionaryNameAndContents } from "../types";

describe("AffixList", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^en}", [["*EPB", "typey:typey-type.json"]]],
        ["{^ment}", [["*PLT", "typey:typey-type.json"]]],
        ["{a^}", [["A", "typey:typey-type.json"]]],
        ["{in^}", [["EUPB", "typey:typey-type.json"]]],
        ["{^ly}", [["HREU", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  describe("creates an affix list with prefixes and suffixes, excluding certain items", () => {
    it("and excludes doubly affixed entries", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "H-PB": "{^-^}",
          "SKWRA*": "{^a^}",
          "TK-LS": "{^^}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [],
        "suffixes": [],
      });
    });

    // TODO: Needs more thought about actual expectations
    xit("and excludes punctuation entries", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "PO*EUP": "{.^}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [["PO*EUP/", "."]],
        // "prefixes": [],
        "suffixes": [],
      });
    });
  });

  describe("creates an affix list with prefixes and suffixes including leading and trailing slashes on outlines", () => {
    it("and handles the same word, prefix, and suffix", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "PWABG": "back",
          "PWA*EBG": "{back^}",
          "PWA*BG": "{^back}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [["PWA*EBG/", "back"]],
        "suffixes": [["/PWA*BG", "back"]],
      });
    });

    it("with hyphenated suffixes", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "TKA*EU": "{^-day}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [],
        "suffixes": [["/TKA*EU", "-day"]],
      });
    });

    it("with ^.com", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "KROPL": "{^.com}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [],
        "suffixes": [["/KROPL", ".com"]],
      });
    });
  });

  describe("creates an affix list with sorted, ranked prefixes and suffixes", () => {
    it("prioritises longer translations over shorter translations to select affixes so that the hint for suitors is SAOUT/O*RS not SAOU/TOR/-S", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "-S": "{^s}",
          "O*R": "{^or}",
          "O*RS": "{^ors}",
          "SAOU/TOR": "suitor",
          "SAOUT": "suit",
          "SAOUT/TOR": "suitor",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [],
        "suffixes": [
          ["/O*RS", "ors"],
          ["/O*R", "or"],
          ["/-S", "s"],
        ],
      });
    });

    it("ranks available affix outlines and chooses the first outline to add to the affix list", () => {
      const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
      const customGlobalLookupDictionary = createAGlobalLookupDictionary(
        emptyPersonalDictionaries,
        {
          "STPA": "{^a}",
          "STPO": "{^o}",
          "STPE": "{^e}",
          "STPEU": "{^i}",
          "STPU": "{^u}",
          "SKWRA": "{^a}",
          "SKWRO": "{^o}",
          "SKWR*E": "{^e}",
          "SKWRE": "{^e}",
          "SKWREU": "{^i}",
          "SKWRU": "{^u}",
          "KWRA": "{^a}",
          "KWRO": "{^o}",
          "KWREU": "{^y}",
        },
        {}
      );
      new AffixList(customGlobalLookupDictionary);

      expect(new AffixList(customGlobalLookupDictionary)).toEqual({
        "prefixes": [],
        "suffixes": [
          ["/SKWRA", "a"],
          ["/SKWRO", "o"],
          ["/SKWRE", "e"],
          ["/SKWREU", "i"],
          ["/SKWRU", "u"],
          ["/KWREU", "y"],
        ],
      });
    });
  });
});
