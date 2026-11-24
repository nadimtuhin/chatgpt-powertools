import { isGitignored, parseGitignore } from "../../../utils/gitignore.js";

const IGNORED_PATHS = [
  "/.git/",
  "/.vscode/",
  "/node_modules/",
  "/dist/",
  "/build/",
  "/.next/",
  "/.cache/",
  "/.yarn/",
  "/.pnp/",
  "/.pnp.js",
  "/.pnp.cjs",
  "/.pnp.mjs",
  "/.idea/",
  ".DS_Store",
  "yarn.lock",
];

// Only the .gitignore at the root of the picked folder ("root/.gitignore").
const getGitIgnoreFile = (files) =>
  files.find(
    (file) =>
      file.webkitRelativePath.split("/").length === 2 &&
      file.name === ".gitignore"
  );

const readGitIgnore = async (files) => {
  const gitIgnoreFile = getGitIgnoreFile(files);
  if (!gitIgnoreFile) return [];
  return parseGitignore(await gitIgnoreFile.text());
};

const shouldIgnoreFile = (file, gitignoreRules) => {
  const path = file.webkitRelativePath;
  const isImage = file.type.startsWith("image/");
  return (
    isImage ||
    isGitignored(path, gitignoreRules) ||
    IGNORED_PATHS.some((ignoredPath) => path.includes(ignoredPath))
  );
};

const readFileContent = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve([file.webkitRelativePath, reader.result]);
    };
    reader.readAsText(file);
  });
};

const filterFiles = (files, gitignoreRules) => {
  return files.filter((file) => !shouldIgnoreFile(file, gitignoreRules));
};

const readFiles = async (files, gitignoreRules) => {
  const filteredFiles = filterFiles(files, gitignoreRules);
  const fileContents = await Promise.all(filteredFiles.map(readFileContent));
  return fileContents.reduce(
    (contents, [path, content]) => ({ ...contents, [path]: content }),
    {}
  );
};

export const handleFolderInput = async (event) => {
  const files = Array.from(event.target.files);
  const gitignoreRules = await readGitIgnore(files);
  return readFiles(files, gitignoreRules);
};
