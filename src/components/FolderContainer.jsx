import {FileList} from "./FileList.jsx";
import * as PropTypes from "prop-types";
import React from "react";

export function FolderContainer(props) {
  return <div>
    <button
      type="button"
      onClick={props.onClick}
    >insert all
    </button>
    <FileList
      filePaths={props.filePaths}
      insertFiles={props.insertFiles}
    />
  </div>;
}

FolderContainer.propTypes = {
  onClick: PropTypes.func,
  filePaths: PropTypes.arrayOf(PropTypes.string),
  insertFiles: PropTypes.any
};
