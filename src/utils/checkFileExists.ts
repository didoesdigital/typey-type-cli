import fs from "node:fs/promises";

const checkFileExists = async (path: string) =>
  !!(await fs.stat(path).catch(() => false));

export default checkFileExists;
