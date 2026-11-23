import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My agent spent forty minutes confidently refactoring the file it had already deleted, then asked me to review the diff.";

mkdirSync("/output", { recursive: true });

// Defensive gate: the entry must be one non-empty line, 1-200 chars, valid UTF-8.
if (LINE.length === 0 || LINE.length > 200) {
  throw new Error("entry line must be 1-200 characters");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("entry line must be valid UTF-8");
}

writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
