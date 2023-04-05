import React, {useRef, useState} from 'react';
import ToggleButton from './ToggleButton';
import Content from './Content';
import Sidebar from './Sidebar';
import {handleFileInput} from "./utils/handleFileInput.jsx";
import {FolderInput} from "../components/FolderInput.jsx";


const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [fileContents, setFileContents] = useState({});
  const fileInputRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const saveFileContents = (event) => {
    handleFileInput(event).then((fileContents) => {
      setFileContents(fileContents);
    });
  }

  const insertFiles = (files) => {
    if (Array.isArray(files)) {
      files.forEach((file) => {
        console.log(fileContents[file]);
      });
    } else {
      console.log(files);
    }
  }
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileContents({})
  };


  return (
    <div className="cp-h-screen">
      <div className={`cp-fixed cp-right-0 cp-top-0 ${sidebarVisible && 'cp-hidden'}`}>
        <ToggleButton toggle={toggleSidebar}/>
      </div>
      <Sidebar visible={sidebarVisible} toggle={toggleSidebar}>
        <FolderInput
          onChange={saveFileContents}
          fileInputRef={fileInputRef}
          onClick={resetFileInput}
        />

        <Content fileContents={fileContents} insertFiles={insertFiles}/>
      </Sidebar>
    </div>
  );

};

export default App;
