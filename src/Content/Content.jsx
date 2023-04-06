import React from "react";
import { FolderContainer } from "../components/Files/FolderContainer.jsx";

const Content = ({ fileContents, insertFiles }) => {
  const filePaths = Object.keys(fileContents);
  return (
    <div className="cp-p-4">
      {!!filePaths.length && (
        <FolderContainer
          onClick={() => insertFiles(filePaths)}
          filePaths={filePaths}
          insertFiles={insertFiles}
        />
      )}
    </div>
  );
};

export default Content;
