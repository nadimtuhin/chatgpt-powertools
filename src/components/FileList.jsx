import React from "react";

export const FileList = ({filePaths, insertFiles}) => {
  return (
    <ul>
      {filePaths.map((key) => (
        <li key={key}>
          <button
            type="button"
            onClick={() => insertFiles([key])}
          >
            insert
          </button>
          {key}
        </li>
      ))}
    </ul>
  )
}
