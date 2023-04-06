import React, { useRef, useState } from "react";
import ToggleButton from "../components/ToggleButton.jsx";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { handleFolderInput } from "../components/FolderInput/utils/handleFolderInput.jsx";
import { FolderInput } from "../components/FolderInput/FolderInput.jsx";
import { uuidV4 } from "../utils/uuidV4.jsx";

function getChatGPTInput() {
  return document.querySelector("textarea[data-id]");
}

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [fileContents, setFileContents] = useState({});
  const fileInputRef = useRef(null);
  const [fileInputs, setFileInputs] = useState([
    { key: uuidV4(), value: null },
  ]);

  const addFileInput = () => {
    const newKey = uuidV4();
    setFileInputs([...fileInputs, { key: newKey, value: null }]);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const saveFileContents = (event) => {
    handleFolderInput(event).then((newFileContents) => {
      setFileContents({ ...fileContents, ...newFileContents });
    });
  };

  function appendValueToCGPTInput(content) {
    if (!getChatGPTInput()) return;
    getChatGPTInput().value += JSON.stringify(content, null, 2);
  }

  const insertFiles = (files) => {
    getChatGPTInput()?.focus();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        appendValueToCGPTInput(fileContents[file]);
      });
      getChatGPTInput()?.focus();
    } else {
      console.log(files);
    }
  };
  const resetFileInput = () => {
    setFileInputs([{ key: uuidV4(), value: null }]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileContents({});
  };

  return (
    <div className="cp-h-screen">
      <div
        className={`cp-fixed cp-right-0 cp-top-0 ${
          sidebarVisible && "cp-hidden"
        }`}
      >
        <ToggleButton toggle={toggleSidebar} />
      </div>
      <Sidebar visible={sidebarVisible} toggle={toggleSidebar}>
        <FolderInput
          onChange={saveFileContents}
          onClick={resetFileInput}
          fileInputs={fileInputs}
          addFileInput={addFileInput}
        />

        <Content fileContents={fileContents} insertFiles={insertFiles} />
      </Sidebar>
    </div>
  );
};

export default App;
