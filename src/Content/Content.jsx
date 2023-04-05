import React from 'react';

const Content = ({fileContents, insertFiles}) => {
  const filePaths = Object.keys(fileContents)
  return (
    <div className="cp-p-4">
      {/* Your content goes here */}
      {!!filePaths.length && (
        <div>
          <p>File:</p>
          <button
            type="button"
            onClick={
              () => insertFiles(filePaths)
            }>insert all
          </button>
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
        </div>
      )}
    </div>
  );
};

export default Content;
