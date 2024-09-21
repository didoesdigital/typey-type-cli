# Typey Type CLI

This repo houses the [Typey Type](https://didoesdigital.com/typey-type) Command Line Interface (CLI) to build stenography (steno) lessons.

The Typey Type CLI is used to build [Typey Type](https://didoesdigital.com/typey-type) stenography lessons by using source data in this repo to produce lessons and dictionaries in the [Typey Type data repo](https://github.com/didoesdigital/typey-type-data).

## Sponsor

You can support [Di’s efforts on Patreon](https://www.patreon.com/didoesdigital). A monthly donation helps [Di](https://didoesdigital.com) build more lessons and features to help you fast-track your steno progress.

## Development

Note: I've tested this on macOS and Linux. It mostly uses POSIX-compatible tools. Please let me know what other systems you run it successfully on.

Note: both the source and output lesson data is committed in git so that it's easy to `git diff` and compare the impact of dictionary changes across all lessons.

### Setup

Requirements:

- Node version 18 or later. Note: the project is currently built with Node version 20.
- Install [yarn](https://yarnpkg.com/getting-started/install) v4.
- The CLI uses built-in tools including:
    - [GNU Make](https://www.gnu.org/software/make/)
    - `find`, which is usually part of [findutils](https://www.gnu.org/software/findutils/)
    - `mkdir`
    - `comm`
    - `grep`
    - `sed`
    - `cat`
    - `diff`
    - `sort`
    - `git`
    - `echo`
    - `cp`
    - `rsync`

This project includes a Git submodule for [steno dictionaries](https://github.com/didoesdigital/steno-dictionaries). If you want to clone this repository as well as its submodules, you can use the `--recursive` parameter:

```sh
git clone --recursive git@github.com:didoesdigital/typey-type-cli.git
```

Alternatively, if you've already cloned the repository without the `--recursive` parameter, you can load its submodules using `submodule update`:

```sh
git submodule update --init --recursive
```

Change directory into the cloned repository:

```sh
cd typey-type-cli
```

Yarn install the dependencies:

```
yarn install
```

You'll also need the Typey Type data repo somewhere nearby to produce lessons, which you *can* clone by itself but I recommend setting up the Typey Type app with the data repo included as a submodule so you have everything you might want in the right place:

```
cd ../
git clone https://github.com/didoesdigital/typey-type.git
cd typey-type
git submodule update --init --recursive
```

If you want to install the Typey Type app dependencies:

```
yarn install
```

## Updates

```
cd typey-type-cli
git pull
yarn
cd ../
cd typey-type
git pull
yarn
git submodule update
```

## Development / usage

For the following commands, make sure you're in the right repo:

`cd typey-type-cli`

To build the lessons, lesson index, and dictionaries, and compile, test, and lint everything:

```sh
time make -j 8 build-everything
```

- `-j 8` builds as many jobs in parallel as possible (i.e. for 4 CPUs, use `-j 4`).
- `time` times the whole process including making prerequisites

### Publishing lessons

When you're happy with the results of `build-everything`, sync the `misstrokes.json` file to the `steno-dictionaries` submodule and copy all the finalised lessons into the Typey Type data repo **at the path that you need to specify** ahead of publishing to production:

```sh
make sync-typey-type-data TYPEY_TYPE_DATA_REPO_PATH="~/projects/typey-type/typey-type-data/"
```

> **Warning**
> You need to change the value of TYPEY_TYPE_DATA_REPO_PATH to the path where you have cloned the `typey-type-data` repo *with* a trailing slash.

For testing, try an alternative test path like this:

```sh
time make -j 8 sync-typey-type-data TYPEY_TYPE_DATA_REPO_PATH="~/projects/test-typey-type/test-typey-type-data/"
```

### More details

To build all the **lessons** one at time:

```sh
make lessons
```

> **Note**
> To create a *new* lesson, see the new lesson section below.

To build the **lesson index**:

```sh
make lesson-index
```

To rebuild a specific lesson and always build it, even if dependencies have not changed:

```sh
time make --always-make faux-typey-type-data/lessons/fundamentals/numbers/lesson.txt
```

To build the **Typey Type dictionary** with one preferred entry for every word:

```sh
time make typey-type-dict
```

To **copy source dictionaries** (Plover, Jade's phrasing dictionary, Di's steno-dictionaries from the submodule, etc.) to dictionaries target:

```sh
time make copy-dictionaries
```

To **build recommendations courses**:

```sh
time make build-recommendations-courses
```

To **collect misstrokes** into `misstrokes.json`:

```sh
time make collect-misstrokes
```

## Debugging

While you can run CLI commands individually, for lessons, just use `make`. If you want to run a command though, do this:

```sh
yarn dev <command>
yarn dev help
```

For interactive debugging, here are some options:

```sh
yarn build && node --inspect-brk ./build/index.js build-lesson --target=faux-typey-type-data/lessons/drills/homophones/lesson.txt --metadata=faux-typey-type-data/lesson-source-data/drills/homophones/meta.json
yarn build && node --inspect-brk ./build/index.js build-typey-type-dictionary --target=faux-typey-type-data/lesson-intermediate-data/typey-type-standard-dict-set-combined.json --intermediate
yarn build && node --inspect-brk ./build/index.js build-lesson-index
```

For interactive debugging of tests, edit the `tsconfig.json` file to compile tests and edit the `jest.config.js` file to include the `build` directory:

```sh
yarn build && node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand build/shared/utils/transformingDictionaries/rankOutlines/rankOutlines.test.js
```

## Testing

```sh
time make lint-and-test
```

… or:

```sh
yarn lint:check
yarn lint:fix
yarn test
yarn test:watch
```

## Validate lessons

```sh
yarn dev validate-lessons
```

## Build

This cleans the `build` directory, compiles all the TypeScript to JavaScript and makes the `./build/index.js` executable:

```sh
yarn build
```

## Cleaning

To remove all intermediate data (which is git ignored) and target data (which is tracked in git) for lessons and dictionaries, and remove the `build` directory where compiled JavaScript is built:

```sh
make clean
```

## Glossary

These terms are not necessarily technically accurate, but are used frequently throughout the code. "Word" is often used where something like "phrase" might be more precise but "word" is more representative of typical content.

**Word** is often used to refer to an item of material in a lesson. It is often a plain, single word, but it could also be something like `pick-axe`, `sister-in-law`, `bread and butter`, `React.Component`, `<img src="`, or `I really think the`.

**Outline** is generally used to refer to all the steno strokes needed to write a "word". For example, `TKOPB/KEU KW-BG` to write "donkey," (with a comma). It is also used to refer to the outline as it appears in a dictionary. For example, `TKOPB/KEU` for "donkey" and `KW-BG` for `{,}` (a comma with dictionary formatting symbols).

**Translation** is generally used to refer to the word that will be output by translating a dictionary outline to text. For example, `donkey,`. It is also used to refer to that part of the dictionary entry, including original dictionary formatting symbols, for example, `donkey{,}`.

**Entry** or **Dict Entry** is loosely used to refer to a combination of outline and word or outline and translation. **Lookup Entry** refers to a word and its array of possible outlines.

**Lookup dict** refers to a word-first lookup dictionary, usually a Map, containing lookup entries with an array of possible outlines.

**Steno dict** refers to a steno dictionary that could be used by a steno engine, usually an object, containing outlines and their translations.

## Create a new lesson

To create a new lesson, you need to create the new lesson's source files outlined in the next section, add the lesson to the index (`lesson-source-data/sourceLessonIndex.json`), then run the `make lessons` command to build the new lesson using those new source files.

You can also add lessons directly to the community’s lessons spreadsheet. See [Typey Type lessons](https://didoesdigital.com/typey-type/lessons) to learn more.

### Copyright

Use material that is in the [public domain](https://en.wikipedia.org/wiki/Public_domain) or otherwise legal to use in Typey Type. Check out the [Wikipedia List of countries' copyright lengths](https://en.wikipedia.org/wiki/List_of_countries%27_copyright_lengths).

### How to make a great lesson

Aim for lessons that are around 50–300 words long. Short lessons less than 10 words often result in heavily skewed speed scores and are over too quickly. Longer lessons drag on, and not everyone is aware or comfortable to hit "Stop" before reaching the end.

Split the lesson up into one word per line. In other words, split on spaces. For example, split the sentence `"Only a little--not very."` like this:

```
"Only
a
little--not
very."
```

One exception to that suggestion is phrasing briefs. If you intend to write a pair of words or a few words in a single stroke, keep them on one line. For example, you might split the sentence `I struck a match a little bit on the wall; probably it came a little too close to the thatched roof. ` like this:

```
I
struck
a
match
a little bit
on the
wall;
probably
it
came
a little
too
close
to the
thatched
roof.
```

For lessons specifically to practice affixes, try to make the entire lesson use the same affixes (all prefixes or all suffixes), preserve the dictionary formatting in the words list, and use the `replaceAffixCurlies` presentation option in the meta file. For example:

```
{^s about}
{^s is}
{^er and}
{^ing and}
{^s and the}
```

Check for non-ASCII characters that might be difficult to type and consider possible amendments. For example, lots of Project Gutenberg material uses back tick (grave) characters as quotation marks, which you might change to actual quotation marks. Here's a regular expression to quickly highlight non-ASCII and non-printable control characters: `[^\x20-\x7f]`

## Source files

The lesson source files live in `lesson-source-data` in a category such as `Fundamentals`, `Drills`, `Collections` or `Stories` and, for Collections and Stories, a subcategory.

Each lesson must have:

- `meta.json` (more details below)

A lesson may optionally have:

- `lesson-overview.html` (more details below)
- `words.txt` (more details below)

In rare cases, you may also create a lesson-hints dictionary, but that's usually not necessary. For examples of that, see the meta files for one of these lessons: numbers, steno party tricks, markdown, or medical-prefixes. It's a last resort, try to avoid it.

### Lesson meta files

The source lesson metadata file is called `meta.json` and can include:

- **title:** (Required) Pretty title of the lesson e.g. "Emotions"
- **subtitle:** (Deprecated) Leave this empty
- **category:** (Required) Fundamentals, Drills, Stories, or Collections
- **subcategory:** Story or collection name (which may be the author) e.g. "Tech", "Medical", "Two-key briefs", "Two-word briefs, same beginnings", "Henry Handel Richardson", "Banjo Paterson", "Aesop’s Fables"
- **path:** (Required) The slug including category, e.g. "/drills/emotions/lesson.txt"
- **vocabulary:** The large collection of words used in Fundamentals (top 10000 words) and collection of entries used for lookup in Drills, Stories, and Collections (global lookup)
- **recommendedDictionarySet:** A collection of dictionaries e.g. `["punctuation.json"]` to use for overriding vocabulary outlines (e.g. `1-R` for "I") and expanding vocabulary words e.g. "sankey" from `data-viz.json`
- **wordList:** The list of words that defines the lesson, always called "words.txt"
- **rules:** An object containing rule names set to true or false to filter entries from available vocabulary to build a Fundamental lesson
- **presentationOptions:** An object containing presentation transforms set to true or false to amend translations in entries, such as removing `{}` from affix entries like `{pre^}`:
    - `replaceAffixCurlies`
    - `replaceGlueCurlies`
    - `replaceArrowNavigation`
    - `replaceCapitalisationFormatting`
    - `replaceSuppressedSpaces`
- **translationExclusions:** A list of translations to exclude from a lesson e.g. `["pos", "sol", "spas", "pros"]`
- **customMessage:** A custom message appearing at the bottom of lesson files and as a big heading in the Typey Type lesson UI e.g. "Hint: use exact spacing setting"
- **ignoredCharacters:** A string of characters to appear in Typey Type material but be ignored when matching against typed text
- **slug:** A custom slug that appears in the URL to define where the lesson-specific dictionary file is stored. Note: if the lesson-specific dictionary files are deleted in the future, this may become irrelevant and be deprecated. Example, `"slug": "ux-vocabulary"` defines `ux-vocabulary.json` in `lessons/collections/user-experience/ux-vocabulary/ux-vocabulary.json`.

### Lesson overview file

The source lesson overview file is called `lesson-overview.html`. If this exists, Typey Type will show an "Overview" link to describe the lesson's concepts. To add a new overview to an existing lesson, you may need to run `make --always-make lesson-index` to re-build the lesson index to link to the new overview and make it show up in Typey Type.

### Lesson index file

The source lesson index file contains an ordered list of the lesson paths.

### Dictionaries

- `didoesdigital` — Typey Type's main dictionaries based on Plover plus Di's own dictionaries
- `individual` — dictionaries made by individuals such as Jade's phrasing dictionary or Emily's symbols dictionary
- `plover`
- `lesson-hints` includes dictionaries that only exist to make lessons work better, such as `numbers-lesson.json`, that aren't intended for steno usage.

Dictionaries referenced by `recommendedDictionarySet` may be in any of those places.

### Dictionaries index file

The source dictionaries index file contains a list of the source dictionaries to copy straight over to target data directories.

## Intermediate data

Intermediate data is produced from source files but before creating target files. It's necessary to create the target files, but can be safely deleted at any time and it will be recreated by the source files.

- Intermediate standard dictionary: this looks just like `typey-type.json` dictionary.
- Intermediate lesson word count files: these are built by the build lesson command and used as input to the build lesson index command.

## Adding new rules

To scaffold some files to add a new rule for lessons that are generated according to rules:

```sh
yarn dev add-new-rule --rule <ruleName>
yarn dev add-new-rule --rule testRule  # example
```

## Contributing

See the [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behaviour to [typeytype@didoesdigital.com](mailto:typeytype@didoesdigital.com).

## Licenses

- The project code (e.g. `src/**`) is licensed under MIT License, as shown in [LICENSE.md](./LICENSE.md).
- The data is licensed under GPL-2.0:
    - The following files came from [Plover](https://github.com/openstenoproject/plover/) and are licensed under GPL-2.0 as shown in [the plover repo's LICENSE](https://github.com/openstenoproject/plover/blob/main/LICENSE.txt):
        - [Plover’s Main Dictionary Jun 3, 2018 (latest)](./faux-typey-type-data/dictionaries/plover/main-3-jun-2018.json) in `faux-typey-type-data/dictionaries/plover/` and `faux-typey-type-data/dictionary-source-data/plover`
        - [Plover’s Main Dictionary Oct 5, 2016](./faux-typey-type-data/dictionaries/plover/main-5-oct-2016.json) in `faux-typey-type-data/dictionaries/plover/` and `faux-typey-type-data/dictionary-source-data/plover`
        - [Plover’s Commands Dictionary Jun 3, 2018 (latest)](./faux-typey-type-data/dictionaries/plover/commands-3-jun-2018.json) in `faux-typey-type-data/dictionaries/plover/` and `faux-typey-type-data/dictionary-source-data/plover`
    - The dictionary and lessons data (e.g. `faux-typey-type-data/`) are licensed under GPL-2.0 as shown in [LICENSE_DATA](./LICENSE_DATA).

## Author

Typey Type was created by [Di](https://didoesdigital.com).

## Related repos

- [Typey Type](https://github.com/didoesdigital/typey-type)
- [Typey Type data](https://github.com/didoesdigital/typey-type-data)
- [Di's steno dictionaries](https://github.com/didoesdigital/steno-dictionaries)
- [Stenoboard diagram SVG to React](https://github.com/didoesdigital/typey-type-stenoboard-diagram-svg-to-react)

