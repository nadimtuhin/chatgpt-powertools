import * as PropTypes from "prop-types";
import React from "react";

export function FolderInput(props) {
  const {fileInputs, addFileInput} = props;
  return <div className="cp-sidebar-header">
    {fileInputs.map((fileInput) => (
      <input
        key={fileInput.key}
        type="file"
        onChange={props.onChange}
        webkitdirectory="true"
      />
    ))}
    <button onClick={addFileInput}>Add another folder</button>
    <button onClick={props.onClick}>Reset</button>
  </div>;
}

FolderInput.propTypes = {
  onChange: PropTypes.func,
  ref: PropTypes.any,
  onClick: PropTypes.func
};
