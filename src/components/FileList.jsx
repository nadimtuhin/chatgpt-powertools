import PropTypes from "prop-types";
import {shortenPath} from "../utils/shortenPath.jsx";

export function FileList({filePaths, insertFiles}) {
  return (
    <ul className="cp-list-inside cp-list-disc cp-pl-4 cp-mb-4">
      {filePaths.map((key) => (
        <li key={key} className="cp-flex cp-items-center cp-mb-2">
          <button
            type="button"
            className="cp-rounded cp-py-2 cp-px-4 cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
            onClick={() => insertFiles([key])}
          >
            Insert
          </button>
          <span className="cp-truncate">{shortenPath(key)}</span>
        </li>
      ))}
    </ul>
  );
}

FileList.propTypes = {
  filePaths: PropTypes.arrayOf(PropTypes.string),
  insertFiles: PropTypes.any
};
