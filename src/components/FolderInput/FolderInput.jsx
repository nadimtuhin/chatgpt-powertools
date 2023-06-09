import * as PropTypes from "prop-types";
import React from "react";

export function FolderInput(props) {
  const { fileInputs, addFileInput } = props;
  return (
    <div className="cp-flex cp-flex-col cp-mb-4">
      <div className="cp-min-h-20">
        {fileInputs.map((fileInput) => (
          <input
            key={fileInput.key}
            type="file"
            onChange={props.onChange}
            webkitdirectory="true"
            className="cp-mb-2"
          />
        ))}
      </div>
      <button
        className="cp-rounded cp-py-2 cp-px-4 cp-mr-2 cp-bg-indigo-600 cp-text-white cp-font-semibold"
        onClick={addFileInput}
      >
        Add another folder
      </button>
      <button
        className="cp-rounded cp-py-2 cp-px-4 cp-mr-2 cp-bg-red-500 cp-text-white cp-font-semibold"
        onClick={props.onClick}
      >
        Reset
      </button>
    </div>
  );
}


FolderInput.propTypes = {
  onChange: PropTypes.func,
  ref: PropTypes.any,
  onClick: PropTypes.func,
};
