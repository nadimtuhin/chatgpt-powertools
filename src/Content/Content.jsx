import React from 'react';

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

const Content = ({fileContents, insertFiles}) => {
  const filePaths = Object.keys(fileContents)
  return (
    <div className="cp-p-4">
      {!!filePaths.length && (
        <div>
          <p>Files:</p>
          <button
            type="button"
            onClick={() => insertFiles(filePaths)}
          >insert all
          </button>
          <FileList
            filePaths={filePaths}
            insertFiles={insertFiles}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
