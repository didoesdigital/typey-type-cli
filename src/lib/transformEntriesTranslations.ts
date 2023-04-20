import type { DictEntries, PresentationOptions, Rules } from "../cli-types";
import presentationTransforms from "../consts/presentationTransforms";
import ruleTransforms from "../consts/ruleTransforms";
import type { PresentationTransforms } from "../consts/presentationTransforms";
import type { RuleTransforms } from "../consts/ruleTransforms";

type TranslationTransforms = RuleTransforms | PresentationTransforms;

type TransformOptions = Rules | PresentationOptions;

const allTransforms: TranslationTransforms = {
  ...presentationTransforms,
  ...ruleTransforms,
};

/**
 * This method transforms translations in entries.
 *
 * @remarks
 * For rules to filter material, this method is used to transform translations using specific
 * transforms for rules of the same names to improve lookup results to better find outlines with
 * dictionary formatting for simplified material text. For example, hasPunctuation filters
 * Fundamental lessons to only material that has punctuation, and then replaces glued
 * characters `{&%}` with plain text `%`.
 *
 * For presentation options to simplify appearance in lessons, this method is used to transform
 * translations using specific transforms to simplify material text for presentation in lessons.
 * For example, removing curly braces or French brackets in affix entries `{non^}` for lessons such
 * as the Prefixes lesson `non^`.
 */
const transformEntriesTranslations = (
  entries: DictEntries,
  transforms: TransformOptions
): DictEntries => {
  let transformedEntries = entries;

  for (const [transform, expectation] of Object.entries(transforms)) {
    if (expectation && allTransforms[transform]) {
      transformedEntries = transformedEntries.map(([outline, translation]) => [
        outline,
        allTransforms[transform](translation),
      ]);
    }
  }

  return transformedEntries;
};

export default transformEntriesTranslations;
