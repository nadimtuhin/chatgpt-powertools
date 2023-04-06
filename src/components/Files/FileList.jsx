import PropTypes from "prop-types";
import { FileTree } from "./FileTree.jsx";

export function getTree(filePaths) {
  return filePaths.reduce((acc, path) => {
    const parts = path.split("/");
    let parent = acc;
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const node = parent.find((n) => n.name === name);
      if (node) {
        parent = node.children;
      } else {
        const newNode = {
          name,
          key: path,
          type: i === parts.length - 1 ? "file" : "folder",
          children: [],
        };
        parent.push(newNode);
        parent = newNode.children;
      }
    }
    return acc;
  }, []);
}

export function FileList({ filePaths, insertFiles }) {
  // Convert the list of file paths into a tree structure
  const tree = getTree(filePaths);

  return <FileTree tree={tree} insertFiles={insertFiles} />;
}

FileList.propTypes = {
  filePaths: PropTypes.arrayOf(PropTypes.string),
  insertFiles: PropTypes.any,
};
