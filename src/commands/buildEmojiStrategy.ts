"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

/**
 * This command builds the modified emoji strategy for use in building the emoji dictionary.
 */
const run = async () => {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`⏱  ${entry.duration} ms to build emoji strategy`);
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark("build-emoji-strategy-start");

  const newEmojiStrategyRaw = await fs.readFile(
    "vendor/emoji_strategy.json",
    "utf8"
  );
  const newEmojiStrategy = JSON.parse(newEmojiStrategyRaw);

  const oldEmojiStrategyRaw = await fs.readFile(
    "vendor/emoji_strategy_c8900a0.json",
    "utf8"
  );
  const oldEmojiStrategy = JSON.parse(oldEmojiStrategyRaw);
  const oldEntries = Object.entries(oldEmojiStrategy);

  const oldEmojiNewFormat = Object.fromEntries(
    Object.entries(newEmojiStrategy).filter((entry) => {
      const oldEntryUnicodeMatchesNewStrategyKey = oldEntries.find(
        (oldEntry) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return oldEntry[1].unicode === entry[0];
        }
      );

      return !!oldEntryUnicodeMatchesNewStrategyKey;
    })
  );

  await fs
    .writeFile(
      "vendor/emoji_strategy_reduced_to_c8900a0_chars.json",
      JSON.stringify(oldEmojiNewFormat, null, 2) + "\n"
    )
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });

  performance.mark("build-emoji-strategy-end");
  performance.measure(
    "build-emoji-strategy",
    "build-emoji-strategy-start",
    "build-emoji-strategy-end"
  );
};

export default {
  run,
};
