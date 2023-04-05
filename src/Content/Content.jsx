import React from 'react';

const Content = ({fileContents, insertFiles}) => {
  return (
    <div className="cp-p-4">
      {/* Your content goes here */}
      {fileContents && (
        <div>
          <p>File:</p>
          <button
            type="button"
            onClick={insertFiles(fileContents)
            }>insert all
          </button>
          <ul>
            {Object.keys(fileContents).map((key) => (
              <li key={key}>
                <button type="button">
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
