export function shortenPath(path, maxLen = 50) {
  const pathParts = path.split('/');
  const folderCount = pathParts.length - 1;
  let result = '';

  // Handle absolute paths
  if (pathParts[0] === '') {
    result = '/';
    pathParts.shift();
  }

  // Add shortened folder names to result
  for (let i = 0; i < folderCount; i++) {
    const folderName = pathParts[i];
    const shortenedFolderName = folderName.length === 1 ? folderName : folderName.charAt(0);
    result += shortenedFolderName + '/';
  }

  // Add last part of path (filename or last folder)
  result += pathParts[pathParts.length - 1];

  // If path is still too long, truncate
  if (result.length > maxLen) {
    const filenameIndex = result.lastIndexOf('/');
    const basename = filenameIndex !== -1 ? result.slice(filenameIndex + 1) : result;
    const extensionIndex = basename.lastIndexOf('.');
    const name = extensionIndex !== -1 ? basename.slice(0, extensionIndex) : basename;
    const extension = extensionIndex !== -1 ? basename.slice(extensionIndex) : '';

    if (name.length <= 3) {
      result = result.slice(0, maxLen - extension.length) + extension;
    } else {
      result = result.slice(0, 3) + '...' + extension;
    }
  }

  return result;
}
