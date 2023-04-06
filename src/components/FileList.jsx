import PropTypes from "prop-types";
import { shortenPath } from "../utils/shortenPath.jsx";

function FileTree({ tree, insertFiles }) {
  return (
    <ul>
      {tree.map((node) => (
        <li key={node.name}>
          {node.type === "file" ? (
            <>
              <button
                type="button"
                className="cp-rounded cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
                onClick={() => insertFiles([node.key])}
              >
                +
              </button>
              <span>{node.name}</span>
            </>
          ) : (
            <>
              <span className="folder">{node.name}</span>
              <FileTree tree={node.children} />
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

  console.log(tree);

  return <FileTree tree={tree} insertFiles={insertFiles} />;
}

// export function FileList({filePaths, insertFiles}) {
//   return (
//     <ul className="cp-list-inside cp-list-disc cp-pl-4 cp-mb-4">
//       {filePaths.map((key) => (
//         <li key={key} className="cp-flex cp-items-center cp-mb-2">
//           <button
//             type="button"
//             className="cp-rounded cp-py-2 cp-px-4 cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
//             onClick={() => insertFiles([key])}
//           >
//             Insert
//           </button>
//           <span className="cp-truncate">{shortenPath(key)}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

FileList.propTypes = {
  filePaths: PropTypes.arrayOf(PropTypes.string),
  insertFiles: PropTypes.any,
};
