"use strict";

import isOneSyllable from "./rules/isOneSyllable";
import outlineIsTranslation from "./rules/outlineIsTranslation";
import hasOneKeyPerFinger from "./rules/hasOneKeyPerFinger";
import hasStretchKeys from "./rules/hasStretchKeys";
import fewerThanFiveCharacters from "./rules/fewerThanFiveCharacters";
import moreThanTwoCharacters from "./rules/moreThanTwoCharacters";
import moreThanOneSyllable from "./rules/moreThanOneSyllable";
import hasOnlyOneVowelKey from "./rules/hasOnlyOneVowelKey";
import hasOnlyShortIVowel from "./rules/hasOnlyShortIVowel";
import hasAnyShortVowel from "./rules/hasAnyShortVowel";
import hasAnyLongVowel from "./rules/hasAnyLongVowel";
import hasDiphthong from "./rules/hasDiphthong";
import hasVowelDisambiguator from "./rules/hasVowelDisambiguator";
import hasAnyVowelKey from "./rules/hasAnyVowelKey";
import isSingleStroke from "./rules/isSingleStroke";
import isMultiStroke from "./rules/isMultiStroke";
import hasForcedWordEnding from "./rules/hasForcedWordEnding";
import hasOneConsonantOnEachSide from "./rules/hasOneConsonantOnEachSide";
import hasMoreThanOneConsonant from "./rules/hasMoreThanOneConsonant";
import hasLhsConsonantWithMultipleKeys from "./rules/hasLhsConsonantWithMultipleKeys";
import hasRhsConsonantWithMultipleKeys from "./rules/hasRhsConsonantWithMultipleKeys";
import hasDigraphs from "./rules/hasDigraphs";
import hasCompoundClusters from "./rules/hasCompoundClusters";
import hasSomeConsonants from "./rules/hasSomeConsonants";
import hasApostrophes from "./rules/hasApostrophes";
import hasDoubleLetters from "./rules/hasDoubleLetters";
import hasDoubleConsonants from "./rules/hasDoubleConsonants";
import hasDoubleVowels from "./rules/hasDoubleVowels";
import hasContractionsPluralsOrPossessives from "./rules/hasContractionsPluralsOrPossessives";
import hasSimpleStenoKeys from "./rules/hasSimpleStenoKeys";
import hasUnstressedVowels from "./rules/hasUnstressedVowels";
import hasInversion from "./rules/hasInversion";
import hasSuppressedSpaceStroke from "./rules/hasSuppressedSpaceStroke";
import hasEfAsVeeOrEss from "./rules/hasEfAsVeeOrEss";
import isFingerspelled from "./rules/isFingerspelled";
import hasNumbers from "./rules/hasNumbers";
import hasPunctuation from "./rules/hasPunctuation";
import hasCapitalLetter from "./rules/hasCapitalLetter";
import isUppercase from "./rules/isUppercase";
import hasDictionaryFormatting from "./rules/hasDictionaryFormatting";
import hasCoding from "./rules/hasCoding";
import hasMedical from "./rules/hasMedical";
import hasDisambiguatingBrief from "./rules/hasDisambiguatingBrief";
import hasPhillyShift from "./rules/hasPhillyShift";
import hasShortTranslations from "./rules/hasShortTranslations";
import hasLongTranslations from "./rules/hasLongTranslations";
import hasLongWords from "./rules/hasLongWords";
import isBrief from "./rules/isBrief";
import startsWithPrefix from "./rules/startsWithPrefix";
import endsWithSuffix from "./rules/endsWithSuffix";
import hasStar from "./rules/hasStar";
import matchesWordList from "./rules/matchesWordList";
import isRomanNumeral from "./rules/isRomanNumeral";

import affixesJSON from "../consts/affixes.json";
import misstrokesJSON from "../shared/json/misstrokes.json";
import rankOutlines from "../shared/utils/transformingDictionaries/rankOutlines/rankOutlines";
import splitIntoStrokesDictsAndNamespaces from "../shared/utils/transformingDictionaries/splitIntoStrokesDictsAndNamespaces";

import type { DictEntry, DictEntries, Rules } from "../cli-types";
import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
  StenoDictionary,
} from "../shared/types";

type Filter = (outline: string, translation: string) => boolean;
type FilterAndExpectation = [Filter, boolean];

type RuleFunctionsTypes = {
  [Property in keyof Rules]: Filter;
};

const misstrokes = misstrokesJSON as StenoDictionary;
const affixes = affixesJSON as AffixObject;

const ruleFunctions: Required<RuleFunctionsTypes> = {
  isOneSyllable: isOneSyllable,
  outlineIsTranslation: outlineIsTranslation,
  hasOneKeyPerFinger: hasOneKeyPerFinger,
  hasStretchKeys: hasStretchKeys,
  fewerThanFiveCharacters: fewerThanFiveCharacters,
  moreThanTwoCharacters: moreThanTwoCharacters,
  moreThanOneSyllable: moreThanOneSyllable,
  hasOnlyOneVowelKey: hasOnlyOneVowelKey,
  hasOnlyShortIVowel: hasOnlyShortIVowel,
  hasAnyShortVowel: hasAnyShortVowel,
  hasAnyLongVowel: hasAnyLongVowel,
  hasDiphthong: hasDiphthong,
  hasVowelDisambiguator: hasVowelDisambiguator,
  hasAnyVowelKey: hasAnyVowelKey,
  isSingleStroke: isSingleStroke,
  isMultiStroke: isMultiStroke,
  hasForcedWordEnding: hasForcedWordEnding,
  hasOneConsonantOnEachSide: hasOneConsonantOnEachSide,
  hasMoreThanOneConsonant: hasMoreThanOneConsonant,
  hasLhsConsonantWithMultipleKeys: hasLhsConsonantWithMultipleKeys,
  hasRhsConsonantWithMultipleKeys: hasRhsConsonantWithMultipleKeys,
  hasDigraphs: hasDigraphs,
  hasCompoundClusters: hasCompoundClusters,
  hasSomeConsonants: hasSomeConsonants,
  hasApostrophes: hasApostrophes,
  hasDoubleLetters: hasDoubleLetters,
  hasDoubleConsonants: hasDoubleConsonants,
  hasDoubleVowels: hasDoubleVowels,
  hasContractionsPluralsOrPossessives: hasContractionsPluralsOrPossessives,
  hasSimpleStenoKeys: hasSimpleStenoKeys,
  hasUnstressedVowels: hasUnstressedVowels,
  hasInversion: hasInversion,
  hasSuppressedSpaceStroke: hasSuppressedSpaceStroke,
  hasEfAsVeeOrEss: hasEfAsVeeOrEss,
  isFingerspelled: isFingerspelled,
  hasNumbers: hasNumbers,
  hasPunctuation: hasPunctuation,
  hasCapitalLetter: hasCapitalLetter,
  isUppercase: isUppercase,
  hasDictionaryFormatting: hasDictionaryFormatting,
  hasCoding: hasCoding,
  hasMedical: hasMedical,
  hasDisambiguatingBrief: hasDisambiguatingBrief,
  hasPhillyShift: hasPhillyShift,
  hasShortTranslations: hasShortTranslations,
  hasLongTranslations: hasLongTranslations,
  hasLongWords: hasLongWords,
  isBrief: isBrief,
  startsWithPrefix: startsWithPrefix,
  endsWithSuffix: endsWithSuffix,
  hasStar: hasStar,
  isRomanNumeral: isRomanNumeral,
};

/**
 * Builds a list of words/phrases according to given rules
 */
const generateLessonEntriesFromRules = (
  lookupDict: LookupDictWithNamespacedDicts,
  rules: Rules,
  translationExclusions: string[],
  words?: string[]
): DictEntries => {
  const filters: FilterAndExpectation[] = [];
  const validRules = Object.keys(rules).filter(
    (ruleName) => ruleName in ruleFunctions
  );

  for (let i = 0; i < validRules.length; i++) {
    const rule = validRules[i] as keyof RuleFunctionsTypes;
    if (ruleFunctions[rule]) {
      if (rules[rule] === true) {
        filters.push([ruleFunctions[rule], true]);
      } else {
        filters.push([ruleFunctions[rule], false]);
      }
    } else {
      throw new Error(`Invalid rule name used: ${rule}`);
    }
  }

  const ruleFilters = (entry: DictEntry) =>
    filters.every(([rule, expected]) => rule(...entry) === expected);

  const entriesList = [];
  for (const [translation, strokesAndNamespacedDicts] of lookupDict) {
    const listOfStrokeAndDictAndNamespace = splitIntoStrokesDictsAndNamespaces(
      strokesAndNamespacedDicts
    );

    const allOutlines = rankOutlines(
      listOfStrokeAndDictAndNamespace,
      misstrokes,
      translation,
      affixes
    );

    const bestStrokeAndDictAndName = allOutlines[0];
    const bestOutline = bestStrokeAndDictAndName[0];
    const entry: DictEntry = [bestOutline, translation];

    const isInWordList = words
      ? matchesWordList(translation, words, rules)
      : true;
    const passesAllRules = ruleFilters(entry);
    const isNotExcludedTranslation =
      !translationExclusions.includes(translation);

    if (isInWordList && passesAllRules && isNotExcludedTranslation) {
      entriesList.push(entry);
    }
    // For debugging, uncomment this:
    // else {
    //   const word = "10,000";
    //   if (!isInWordList) {
    //     console.log(`“${word}`” is not in word list`);
    //   }
    //   if (!passesAllRules) {
    //     for (const [rule, expected] of filters) {
    //       console.log(`${rule}`);
    //       console.log(`☝️ expected ${expected}, got ${rule(...entry)}`);
    //     }
    //     console.log(`“${word}`” is not in word list`);
    //   }
    //   if (!isNotExcludedTranslation) {
    //     console.log(`“${word}`” is an excluded translation`);
    //   }
    // }
  }

  return entriesList;
};

export default generateLessonEntriesFromRules;
