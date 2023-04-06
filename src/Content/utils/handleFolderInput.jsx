const IGNORED_PATHS = [
  '/.git/',
  '/.vscode/',
  '/node_modules/',
  '/dist/',
  '/build/',
  '/.next/',
  '/.cache/',
  '/.yarn/',
  '/.pnp/',
  '/.pnp.js',
  '/.pnp.cjs',
  '/.pnp.mjs',
  '/.idea/',
  '.DS_Store',
  'yarn.lock',
];


const getGitIgnoreFile = (files) => files.find((file) => file.name === '.gitignore');

const readContent = (file) => file.text();

const generateIgnorePattern = (gitIgnoreContent) => {
  const ignoreList = gitIgnoreContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .join('|');
  return ignoreList ? `(${IGNORED_PATHS.join('|')}|${ignoreList})` : `(${IGNORED_PATHS.join('|')})`;
};

const readGitIgnore = async (files) => {
  const gitIgnoreFile = getGitIgnoreFile(files);
  if (!gitIgnoreFile) return `(${IGNORED_PATHS.join('|')})`;

  const content = await readContent(gitIgnoreFile);
  return generateIgnorePattern(content);
};

const shouldIgnoreFile = (file, ignorePattern) => {
  const path = file.webkitRelativePath;
  const isImage = file.type.startsWith('image/');
  return (
    isImage ||
    ignorePattern.test(path) ||
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

const filterFiles = (files, ignorePattern) => {
  return files.filter((file) => !shouldIgnoreFile(file, ignorePattern));
};

const readFiles = async (files, ignorePattern) => {
  const filteredFiles = filterFiles(files, ignorePattern);
  const fileContents = await Promise.all(filteredFiles.map(readFileContent));
  return fileContents.reduce((contents, [path, content]) => ({...contents, [path]: content}), {});
};

export const handleFolderInput = async (event) => {
  const files = Array.from(event.target.files);
  const ignorePattern = await readGitIgnore(files);
  return readFiles(files, new RegExp(ignorePattern));
};
