// A small subset of .gitignore: plain names, "dir/", "/anchored", "a/b" and
// "*" wildcards. Negations ("!") are skipped, so those files stay ignored.

const segmentToRegex = (segment) =>
  segment
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join("[^/]*");

export function parseGitignore(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("!"))
    .map((line) => {
      const pattern = line.replace(/\/+$/, "");
      const anchored = pattern.includes("/");
      const body = pattern
        .replace(/^\/+/, "")
        .split("/")
        .map(segmentToRegex)
        .join("/");
      // Unanchored patterns match at any depth; a match also covers
      // everything inside it.
      return new RegExp(`${anchored ? "^" : "(^|/)"}${body}(/|$)`);
    });
}

// `path` is a webkitRelativePath, whose first segment is the picked folder.
export function isGitignored(path, rules) {
  const relativePath = path.split("/").slice(1).join("/");
  return rules.some((rule) => rule.test(relativePath));
}
