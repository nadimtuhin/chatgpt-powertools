import PropTypes from "prop-types";

function FileTree({ tree, insertFiles, level = 0 }) {
  const getPrefix = (level) => {
    let prefix = "";
    for (let i = 1; i < level; i++) {
      prefix += "│ ";
    }
    if (level > 0) {
      prefix += "├ ";
    }
    return prefix;
  };

  return (
    <ul className="cp-list-none cp-m-0 cp-p-0">
      {tree.map((node) => (
        <li key={node.name} className="cp-mb-1">
          {node.type === "file" ? (
            <>
              <span>{getPrefix(level) + node.name}</span> &nbsp;
              <button
                type="button"
                className="cp-rounded px-1 cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
                onClick={() => insertFiles([node.key])}
              >
                insert
              </button>
            </>
          ) : (
            <>
              <span className="folder">{getPrefix(level) + node.name}</span>
              <FileTree tree={node.children} level={level + 1} insertFiles={insertFiles} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}


export function FileList({ filePaths, insertFiles }) {
  // Convert the list of file paths into a tree structure
  const tree = filePaths.reduce((acc, path) => {
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

  return <FileTree tree={tree} insertFiles={insertFiles} />;
}

FileList.propTypes = {
  filePaths: PropTypes.arrayOf(PropTypes.string),
  insertFiles: PropTypes.any,
};
