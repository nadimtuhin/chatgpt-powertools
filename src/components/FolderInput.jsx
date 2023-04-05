import * as PropTypes from "prop-types";
import React from "react";

export function FolderInput(props) {
  return <div className="cp-sidebar-header">
    <input
      type="file"
      onChange={props.onChange}
      webkitdirectory="true"
      ref={props.fileInputRef}
    />
    <button onClick={props.onClick}>Reset</button>
  </div>;
}

FolderInput.propTypes = {
  onChange: PropTypes.func,
  ref: PropTypes.any,
  onClick: PropTypes.func
};
