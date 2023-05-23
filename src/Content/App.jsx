import React, {useEffect, useRef, useState} from "react";
import ToggleButton from "../components/ToggleButton.jsx";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { handleFolderInput } from "../components/FolderInput/utils/handleFolderInput.jsx";
import { FolderInput } from "../components/FolderInput/FolderInput.jsx";
import { uuidV4 } from "../utils/uuidV4.jsx";
import {
  appendValueToCGPTInput,
  getChatGPTInput, triggerKeyPress,
} from "../utils/chatGPTInterface.js";

const useStateWithLocalStorage = (localStorageKey, initialValue) => {
  const [value, setValue] = useState(
    () => {
      const storedValue = localStorage.getItem(localStorageKey);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    }
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
    console.log("setting local storage", localStorage.getItem(localStorageKey))
  }, [localStorageKey, value]);

  return [value, setValue];
};

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useStateWithLocalStorage(
    'sidebarVisible',
    true
  );
  const [fileContents, setFileContents] = useState({});
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

  const insertFiles = (files) => {
    getChatGPTInput()?.focus();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        appendValueToCGPTInput(`// ${file}` + "\n" + fileContents[file]);
      });
      triggerKeyPress();
    }
  };
  const resetFileInput = () => {
    setFileInputs([{ key: uuidV4(), value: null }]);
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
