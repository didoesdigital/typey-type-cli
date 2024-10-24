default: help

.PHONY: help
help:
	@echo "Try reading the README"

export LC_ALL := C # makes `sort` work consistently

CLI := node ./build/index.js
# CLI := npx ts-node ./src/index.ts
# CLI := npx ts-node --transpile-only ./src/index.ts
DATA_DIR := faux-typey-type-data
DATA_DIR_WITH_SLASH := faux-typey-type-data/
SRC_DIR := src
LESSON_TARGET_DIR := $(DATA_DIR)/lessons
LESSON_INTERMEDIATE_DIR := $(DATA_DIR)/lesson-intermediate-data
LESSON_SRC_DIR := $(DATA_DIR)/lesson-source-data
LESSON_INDEX_SRC := $(LESSON_SRC_DIR)/sourceLessonIndex.json
DICTIONARIES_SRC_DIR := $(DATA_DIR)/dictionary-source-data
DICTIONARIES_TARGET_DIR := $(DATA_DIR)/dictionaries
TARGET_MISSTROKES_JSON := $(DICTIONARIES_TARGET_DIR)/didoesdigital/misstrokes.json
TARGET_EMOJI_JSON := $(DICTIONARIES_TARGET_DIR)/didoesdigital/emoji.json
DICTIONARY_INTERMEDIATE_DIR := $(DATA_DIR)/dictionary-intermediate-data
DIDOESDIGITAL_DICTIONARIES_DIR := didoesdigital/steno-dictionaries/dictionaries
LESSON_HINTS_DICTIONARIES_DIR := $(DICTIONARIES_SRC_DIR)/lesson-hints
PLOVER_DICTIONARIES_DIR := $(DICTIONARIES_SRC_DIR)/plover
INDIVIDUAL_DICTIONARIES_DIR := $(DICTIONARIES_SRC_DIR)/individual
TYPEY_TYPE_DICTIONARIES := \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/abbreviations.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/briefs.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/condensed-strokes-fingerspelled.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/condensed-strokes.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/currency.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/dict.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/dict-en-AU-phonetic.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/dict-en-AU-vocab.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/dict-en-AU-with-extra-stroke.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/nouns.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/numbers.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/numbers-powerups.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/proper-nouns.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/punctuation-unspaced.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/symbols.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/symbols-briefs.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/symbols-currency.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/top-10000-project-gutenberg-words.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/fingerspelling.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/top-level-domains.json
PLOVER_DICTIONARIES := $(shell find $(PLOVER_DICTIONARIES_DIR) -name '*.json')
LESSON_HINTS_DICTIONARIES := $(shell find $(LESSON_HINTS_DICTIONARIES_DIR) -name '*.json')
INDIVIDUAL_DICTIONARIES := $(shell find $(INDIVIDUAL_DICTIONARIES_DIR) -name '*.json')
DICTIONARY_INDEX := $(DICTIONARIES_SRC_DIR)/dictionaryIndex.json
TYPEY_TARGET_DICT_DIR := $(DICTIONARIES_TARGET_DIR)/typey-type/
TOP_10_DICTIONARY := $(DICTIONARIES_SRC_DIR)/typey-type/top-10.json
RECOMMENDATIONS := $(LESSON_SRC_DIR)/recommendations.json
FLASHCARDS_RECOMMENDATIONS := $(LESSON_SRC_DIR)/flashcardsRecommendations.json
DICT = didoesdigital/steno-dictionaries/dictionaries/dict.json
NOT_MISSTROKE_DICTS := \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/abbreviations.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/briefs.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/condensed-strokes.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/html.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/nouns.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/numbers.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/proper-nouns.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/punctuation-di.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/punctuation-powerups.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/punctuation-unspaced.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/top-1000-words.json \
  $(DIDOESDIGITAL_DICTIONARIES_DIR)/top-10000-project-gutenberg-words.json

MODIFIED_EMOJI_STRATEGY := vendor/emoji_strategy_reduced_to_c8900a0_chars.json

LESSONS_META_FILES := $(shell find $(LESSON_SRC_DIR) -name 'meta.json')
# NOTE: We're doing an adventurous substitution of 'lesson-source-data' anywhere in the path:
LESSONS_TARGETS := $(patsubst %meta.json,%lesson.txt,$(subst lesson-source-data,lessons,$(LESSONS_META_FILES)))
ALL_TS_FILES := $(shell find $(SRC_DIR) -name '*.ts' -and -not -name '*.test.ts')

INTERMEDIATE_WORD_COUNT_FILES := $(patsubst %meta.json,%word-count.txt,$(subst lesson-source-data,lesson-intermediate-data,$(LESSONS_META_FILES)))
$(INTERMEDIATE_WORD_COUNT_FILES): lessons
ORIGINAL_DICT := $(DICTIONARY_INTERMEDIATE_DIR)/original-dictionary.txt
ORIGINAL_FINGERSPELLING_ENTRIES := $(DICTIONARY_INTERMEDIATE_DIR)/original-dictionary-fingerspelling-entries.txt
SORTED_ORIGINAL_DICT := $(DICTIONARY_INTERMEDIATE_DIR)/sorted-original-dictionary.txt
SORTED_DICT := $(DICTIONARY_INTERMEDIATE_DIR)/sorted-dict.txt

# lessons
lessons: $(LESSONS_TARGETS)
.SECONDEXPANSION:
$(LESSONS_TARGETS): build/index.js $(ALL_TS_FILES) $(LESSON_INTERMEDIATE_DIR)/typey-type-standard-dict-set-combined.json $(TYPEY_TYPE_DICTIONARIES) $(LESSON_HINTS_DICTIONARIES) $(INDIVIDUAL_DICTIONARIES) $$(wildcard $$(patsubst $(DATA_DIR)/lessons/%/lesson.txt,$(LESSON_SRC_DIR)/%/lesson-overview.html,$$@)) $$(wildcard $$(patsubst $(DATA_DIR)/lessons/%/lesson.txt,$(LESSON_SRC_DIR)/%/words.txt,$$@)) $$(patsubst $(DATA_DIR)/lessons/%/lesson.txt,$(LESSON_SRC_DIR)/%/meta.json,$$@)
	@mkdir -p "$$(dirname $@)" # make sure lesson target subdirectories exist before writing lesson file inside them
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@mkdir -p "$(LESSON_INTERMEDIATE_DIR)" # make sure intermediate lesson directory exists before adding subdirectories inside them
	@mkdir -p "$$(dirname $(subst $(LESSON_TARGET_DIR),$(LESSON_INTERMEDIATE_DIR),$@))" # make sure intermediate lesson subdirectories exists before writing word count inside them
	@$(CLI) build-lesson --target=$@ --metadata=$(lastword $^)

# lesson-index
lesson-index: $(DATA_DIR)/lessons/lessonIndex.json
$(DATA_DIR)/lessons/lessonIndex.json: $(LESSON_INDEX_SRC) $(INTERMEDIATE_WORD_COUNT_FILES) $(LESSONS_META_FILES)
	@$(CLI) build-lesson-index

# intermediate-standard-dict
intermediate-standard-dict: $(LESSON_INTERMEDIATE_DIR)/typey-type-standard-dict-set-combined.json
$(LESSON_INTERMEDIATE_DIR)/typey-type-standard-dict-set-combined.json: build/index.js $(ALL_TS_FILES) $(TYPEY_TYPE_DICTIONARIES)
	@mkdir -p "$(LESSON_INTERMEDIATE_DIR)" # make sure intermediate lesson directory exists before adding subdirectories inside them
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@echo "Running build-typey-type-dictionary for intermediate dict"
	@$(CLI) build-typey-type-dictionary --target=$@

# typey-type-dict
typey-type-dict: $(DATA_DIR)/dictionaries/typey-type/typey-type.json
$(DATA_DIR)/dictionaries/typey-type/typey-type.json: build/index.js $(TYPEY_TYPE_DICTIONARIES) $(ALL_TS_FILES)
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@mkdir -p "$(TYPEY_TARGET_DICT_DIR)" # make sure target typey-type subdirectory exists before adding files inside
	@echo "Running build-typey-type-dictionary to build typey-type.json"
	@$(CLI) build-typey-type-dictionary --target=$@

# emoji-dict
emoji-dict: $(TARGET_EMOJI_JSON)
$(TARGET_EMOJI_JSON): build/index.js $(TYPEY_TYPE_DICTIONARIES) $(ALL_TS_FILES) emoji-modified-strategy copy-dictionaries
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@mkdir -p "$$(dirname $@)" # make sure didoesdigital target subdirectory exists before writing emoji file inside
	@echo "Running build-emoji-dict to build emoji.json"
	@$(CLI) build-emoji-dictionary --target=$@
	
# emoji-modified-strategy
emoji-modified-strategy: $(MODIFIED_EMOJI_STRATEGY)
$(MODIFIED_EMOJI_STRATEGY): build src/lib/stemoji.ts src/commands/buildEmojiStrategy.ts vendor/emoji_strategy.json vendor/emoji_strategy_c8900a0.json
	@echo "Running build-emoji-strategy to build emoji strategy with reduced characters"
	@$(CLI) build-emoji-strategy

# copy-dictionaries
copy-dictionaries: build $(LESSON_HINTS_DICTIONARIES) $(INDIVIDUAL_DICTIONARIES) $(PLOVER_DICTIONARIES) $(TYPEY_TYPE_DICTIONARIES) $(TOP_10_DICTIONARY) $(DICTIONARY_INDEX)
	@$(CLI) copy-dictionaries

# build-recommendations-courses
build-recommendations-courses: build $(RECOMMENDATIONS) $(FLASHCARDS_RECOMMENDATIONS)
	@mkdir -p "$(LESSON_TARGET_DIR)"
	@$(CLI) build-recommendations-courses

# collect-misstrokes
collect-misstrokes: $(TARGET_MISSTROKES_JSON)
$(TARGET_MISSTROKES_JSON): $(TYPEY_TYPE_DICTIONARIES) $(ORIGINAL_DICT) $(ORIGINAL_FINGERSPELLING_ENTRIES) copy-dictionaries $(DICT) $(NOT_MISSTROKE_DICTS) $(DICTIONARY_INTERMEDIATE_DIR)/deleted-dict-lines.txt $(DICTIONARY_INTERMEDIATE_DIR)/not-misstrokes.txt
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@mkdir -p "$$(dirname $@)" # make sure didoesdigital target subdirectory exists before writing misstrokes file inside
	@comm -2 -3 $(DICTIONARY_INTERMEDIATE_DIR)/deleted-dict-lines.txt $(DICTIONARY_INTERMEDIATE_DIR)/not-misstrokes.txt | grep -v '"TKW-D": "\\u00f7",' | sed -e "1s/^/{\n/" -e '$$s/,$$/\n}/' > $(TARGET_MISSTROKES_JSON)

$(DICTIONARY_INTERMEDIATE_DIR)/not-misstrokes.txt: $(DICT) $(NOT_MISSTROKE_DICTS) $(ORIGINAL_FINGERSPELLING_ENTRIES)
	@cat $(DICT) $(NOT_MISSTROKE_DICTS) $(ORIGINAL_FINGERSPELLING_ENTRIES) | sort -u > $(DICTIONARY_INTERMEDIATE_DIR)/not-misstrokes.txt

$(DICTIONARY_INTERMEDIATE_DIR)/deleted-dict-lines.txt: $(SORTED_ORIGINAL_DICT) $(SORTED_DICT) $(ORIGINAL_FINGERSPELLING_ENTRIES)
	@diff -u $(SORTED_ORIGINAL_DICT) $(SORTED_DICT) | grep "^-[^-]" | sed "s/^-//" > $(DICTIONARY_INTERMEDIATE_DIR)/deleted-dict-lines.txt

$(SORTED_ORIGINAL_DICT): $(ORIGINAL_DICT)
	@sort $(ORIGINAL_DICT) > $(SORTED_ORIGINAL_DICT)

$(SORTED_DICT): $(DICT)
	@sort $(DICT) > $(SORTED_DICT)

$(ORIGINAL_DICT): $(DICT)
# NOTE: The commit hash for the main Plover dict as it existed at "Mon Nov 2 07:11:45 2015 +1100": 6b9f830
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)" # make sure intermediate dictionary directory exists before adding subdirectories inside them
	@git -C ./didoesdigital/steno-dictionaries show 6b9f830:dictionaries/dict.json > $(ORIGINAL_DICT)

$(ORIGINAL_FINGERSPELLING_ENTRIES): ./didoesdigital/steno-dictionaries/dictionaries/dict.json
# NOTE: The commit hash where fingerspelling entries were deleted from dict.json: 3516d0c
	@git -C ./didoesdigital/steno-dictionaries show 3516d0c dictionaries/dict.json | grep "^-[^-]" | sed "s/^-//" > $(ORIGINAL_FINGERSPELLING_ENTRIES)

# compile CLI
build: build/index.js
build/index.js: $(ALL_TS_FILES)
	@yarn build

# lint-and-test
lint-and-test: tmp/make/lint-and-test.timestamp
tmp/make/lint-and-test.timestamp: build/index.js $(ALL_TS_FILES)
	@yarn lint:fix
	@yarn test:only
	@mkdir -p tmp/make/
	@touch tmp/make/lint-and-test.timestamp

validate-lessons: lessons
	@$(CLI) validate-lessons

# build-everything
build-everything: typey-type-dict intermediate-standard-dict copy-dictionaries lessons lesson-index build-recommendations-courses collect-misstrokes emoji-dict lint-and-test validate-lessons

# sync-typey-type-data
.PHONY: sync-typey-type-data
sync-typey-type-data: build-everything
ifdef TYPEY_TYPE_DATA_REPO_PATH
	@echo "Copying misstrokes.json to submodule"
	@cp $(TARGET_MISSTROKES_JSON) $(DIDOESDIGITAL_DICTIONARIES_DIR)
	@echo "Copying emoji.json to submodule"
	@cp $(TARGET_EMOJI_JSON) $(DIDOESDIGITAL_DICTIONARIES_DIR)
	@echo "Copying dictionaries to $(TYPEY_TYPE_DATA_REPO_PATH)dictionaries/"
	@rsync -azh --exclude=".DS_Store" ./$(DATA_DIR_WITH_SLASH)dictionaries/ $(TYPEY_TYPE_DATA_REPO_PATH)dictionaries/
	@echo "Copying lessons to $(TYPEY_TYPE_DATA_REPO_PATH)lessons/"
	@rsync -azh --exclude=".DS_Store" ./$(DATA_DIR_WITH_SLASH)lessons/ $(TYPEY_TYPE_DATA_REPO_PATH)lessons/
else
	@echo "You need to specify a value for TYPEY_TYPE_DATA_REPO_PATH"
endif

clean:
	@echo "Cleaning target and intermediate lesson and dictionary data directories as well as compiled JavaScript in build directory"
	@if [ -e build ] ; then rm -r ./build; fi;
	@if [ -e $(DICTIONARY_INTERMEDIATE_DIR) ] ; then rm -r $(DICTIONARY_INTERMEDIATE_DIR); fi;
	@mkdir -p "$(DICTIONARY_INTERMEDIATE_DIR)"
	@if [ -e $(DICTIONARIES_TARGET_DIR) ] ; then rm -r $(DICTIONARIES_TARGET_DIR); fi;
	@mkdir -p "$(DICTIONARIES_TARGET_DIR)"
	@if [ -e $(LESSON_TARGET_DIR) ] ; then rm -r $(LESSON_TARGET_DIR); fi;
	@mkdir -p "$(LESSON_TARGET_DIR)"
	@if [ -e $(LESSON_INTERMEDIATE_DIR) ] ; then rm -r $(LESSON_INTERMEDIATE_DIR); fi;
	@mkdir -p "$(LESSON_INTERMEDIATE_DIR)"

# # This is an example of a make recipe with useful reminders of make syntax…
# faux-typey-type-data/lesson-source-data/fundamentals/introduction/lesson.txt: faux-typey-type-data/lesson-source-data/fundamentals/introduction/meta.json faux-typey-type-data/dictionaries/didoesdigital/dict.json
# 	@echo "Build target lesson:"
# 	@echo $@
# 	@echo "Changed dependents are:"
# 	@echo $?
# 	@echo "related file that caused the action:"
# 	@echo $<
# 	@echo "Prefix shared by target and prereq:"
# 	@echo $*
# 	@echo "Prereq:"
# 	@echo $^
