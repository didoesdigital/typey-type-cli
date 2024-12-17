/**
 * Examples:
 * "H-L"
 * "KPA"
 * "KPA\*"
 * "TEFT"
 * "WOB/HREU"
 * "SKPAO\*EUPL"
 * "WO\*RLD/WA\*R/2"
 * "#"
 * "#-P"
 * "「か-か」"
 * "PTVAt/TEOta"
 * "LROT"
 */
export type Outline = string;

/**
 * Examples:
 * "gazed"
 * "El Salvador"
 * "ever-increasing"
 * "{^-edge}"
 * "{>}{&e}"
 * "{*+}"
 * "{^:55}"
 * "{~|()}"
 * "{^ ^}\\{\\}{#Left}{^}"
 */
export type Translation = string;

export type UnknownStroke = "xxx";

/**
 * Examples:
 * "H-L"
 * "KPA"
 * "TEFT"
 * "WOB"
 * "HREU"
 * "PTVAt"
 * "TEOta"
 */
export type SingleStroke = string;

/**
 * Examples:
 * "user:personal.json"
 * "typey:typey-type.json"
 * "plover:main-3-jun-2018.json"
 */
export type NamespacedDictionary = string;

/**
 * Examples:
 * "coding.json"
 * "fingerspelling.json"
 * "punctuation.json"
 * "personal.json"
 * "typey-type.json"
 * "main.json"
 */
export type DictName = string;

/**
 * Example:
 * ["personal.json", {"TEFT": "myBrief"}]
 */
export type PersonalDictionaryNameAndContents = [DictName, StenoDictionary];

/**
 * Examples:
 * "user"
 * "typey"
 * "plover"
 */
export type Namespace = string;

/**
 * Examples:
 * ["KPA*", "typey:typey-type.json"]
 */
export type StrokeAndNamespacedDict = [Outline, NamespacedDictionary];

/**
 * Examples:
 * ["TEFT", "personal.json", "user"]
 * ["KPA*", "typey-type.json", "typey"]
 * ["O", "main.json", "plover"]
 */
export type StrokeAndDictionaryAndNamespace = [Outline, DictName, Namespace];

/**
 * An outline-first JSON-formatted steno dictionary that could be used by a steno engine, such as Plover
 *
 * Example:
 * {
 *   "TEFT": "test",
 *   "TEFT/TEFT": "test",
 *   "H-L": "hello",
 *   "KPA": "{}{-|}",
 *   "WOB/HREU": "wobbly",
 *   "#": "{*+}",
 * }
 */
export type StenoDictionary = {
  [outline: Outline]: Translation;
};

/** e.g. [{"KR-S": "css", "KR*S": "CSS"}, "css.json"] */
export type ReadDictionaryData = [StenoDictionary, DictName];

/**
 * The data read from files for multiple dictionaries including their
 * StenoDictionary content and DictName:
 *
 * e.g. [
 *   [{"A": "{&A}", "KR-S": "C"}, "letters.json"],
 *   [{"KR-S": "css", "KR*S": "CSS"}, "css.json"]
 * ]
 **/
export type ReadDictionariesData = ReadDictionaryData[];

/**
 * Examples:
 * ["typey:typey-type.json", "user:nouns.json", "user:personal.json"]
 * ["typey:typey-type.json", "user:nouns.json", "user:personal.json", "plover:plover-main-3-jun-2018.json"]
 */
export type DictionaryConfigurationList = DictName[];

export type OptionalDictionaryConfig = {
  configuration?: DictionaryConfigurationList;
};

export type DictionaryConfig = Required<OptionalDictionaryConfig>;

/**
 * A word-first JavaScript Map lookup dictionary with source dictionary names for each outline
 *
 * Example:
 * Map (7) {
 *   "thought" => [
 *     ["THAUT", "plover:main.json"],
 *     ["THAUGT", "typey:typey-type.json"]
 *   ],
 *   "people" => [["PAOEPL", "typey:typey-type.json"]],
 *   "found" => [["TPOUPBD", "typey:typey-type.json"]],
 *   "just" => [["SKWRUFT", "typey:typey-type.json"]],
 *   "{&A}" => [["A\*P", "typey:typey-type.json"]],
 *   "{>}{&a}" => [["A\*", "typey:typey-type.json"]],
 *   "{}" => [["WUZ/WUZ", "typey:typey-type.json"]]
 * }
 */
export type LookupDictWithNamespacedDicts = Map<
  Translation,
  StrokeAndNamespacedDict[]
> &
  OptionalDictionaryConfig;

/**
 * A lookup dictionary and configuration list
 *
 * Example:
 * Map (74602)
 * configuration: ['typey:typey-type.json', 'user:personal.json', 'plover:plover-main-3-jun-2018.json']
 *
 */
export type LookupDictWithNamespacedDictsAndConfig = Omit<
  LookupDictWithNamespacedDicts,
  "configuration"
> &
  DictionaryConfig;

/**
 * Example:
 * "/AOUL/A*T"
 */
export type SuffixOutlineWithLeadingSlash = string;

/**
 * Example:
 * "KWAS/KWREU/"
 */
export type PrefixOutlineWithSlash = string;

/**
 * Example:
 * "ulate"
 */
export type SuffixTextWithNoTPRBGTS = string;

/**
 * Example:
 * "quasi-"
 */
export type PrefixTextWithNoTPRBGTS = string;

/**
 * Example:
 * [ "TPHRAOUR/", "fluoro" ]
 */
export type PrefixEntry = [PrefixOutlineWithSlash, PrefixTextWithNoTPRBGTS];

/**
 * Example:
 * [ "/AOEUBL", "izable" ]
 */
export type SuffixEntry = [
  SuffixOutlineWithLeadingSlash,
  SuffixTextWithNoTPRBGTS
];

/**
 * Examples:
 * ["A*UT/", "auto"],
 * ["/WAL", "ual"],
 */
export type AffixItem = [
  PrefixOutlineWithSlash | SuffixOutlineWithLeadingSlash,
  PrefixTextWithNoTPRBGTS | SuffixTextWithNoTPRBGTS
];

/**
 * Example:
 * {
 *   prefixes: [["A*UT/", "auto"], ["TPHRAOUR/", "fluoro"]],
 *   suffixes: [["/WAL", "ual"], ["/AOEUBL", "izable"]]
 * }
 */
export type AffixObject = {
  prefixes: AffixItem[];
  suffixes: AffixItem[];
};
