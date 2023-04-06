import * as PropTypes from "prop-types";

function File(props) {
  return (
    <>
      <span>{props.prefix + props.node.name}</span> &nbsp;
      <button
        type="button"
        className="cp-rounded px-1 cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
        onClick={props.onClick}
      >
        insert
      </button>
    </>
  );
}

File.propTypes = {
  prefix: PropTypes.string,
  node: PropTypes.any,
  onClick: PropTypes.func,
};

function Folder(props) {
  return (
    <>
      <span className="folder">{props.prefix + props.node.name}</span>
      <FileTree
        tree={props.node.children}
        level={props.level + 1}
        insertFiles={props.insertFiles}
      />
    </>
  );
}

Folder.propTypes = {
  prefix: PropTypes.string,
  node: PropTypes.any,
  level: PropTypes.number,
  insertFiles: PropTypes.any,
};

export function FileTree({ tree, insertFiles, level = 0 }) {
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
            <File
              prefix={getPrefix(level)}
              node={node}
              onClick={() => insertFiles([node.key])}
            />
          ) : (
            <Folder
              prefix={getPrefix(level)}
              node={node}
              level={level}
              insertFiles={insertFiles}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
