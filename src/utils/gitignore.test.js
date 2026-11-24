import { test } from "node:test";
import assert from "node:assert/strict";
import { parseGitignore, isGitignored } from "./gitignore.js";

const rules = parseGitignore(
  [
    "# comment",
    "",
    ".env",
    "coverage/",
    "/secret.txt",
    "*.log",
    "docs/private",
    "!keep.log",
  ].join("\n")
);

test("matches plain names in any folder below the picked root", () => {
  assert.equal(isGitignored("project/.env", rules), true);
  assert.equal(isGitignored("project/api/.env", rules), true);
  assert.equal(isGitignored("project/.env.example", rules), false);
});

test("matches folders ending in a slash", () => {
  assert.equal(isGitignored("project/coverage/index.html", rules), true);
  assert.equal(isGitignored("project/src/coverage.js", rules), false);
});

test("anchors patterns with a leading or middle slash to the root", () => {
  assert.equal(isGitignored("project/secret.txt", rules), true);
  assert.equal(isGitignored("project/src/secret.txt", rules), false);
  assert.equal(isGitignored("project/docs/private/a.md", rules), true);
  assert.equal(isGitignored("project/src/docs/private/a.md", rules), false);
});

test("supports * wildcards within one path segment", () => {
  assert.equal(isGitignored("project/logs/debug.log", rules), true);
  assert.equal(isGitignored("project/src/log.js", rules), false);
});

test("ignores comments, blank lines and negations", () => {
  assert.equal(isGitignored("project/comment", rules), false);
  assert.deepEqual(parseGitignore("").length, 0);
});
