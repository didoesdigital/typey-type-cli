import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "src",
    environment: "node",
    globals: true,
    typecheck: {
      enabled: true,
    },
  },
});