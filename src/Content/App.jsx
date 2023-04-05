import React, {useState} from 'react';
import ToggleButton from './ToggleButton';
import Content from './Content';
import Sidebar from './Sidebar';
import {handleFileInput} from "./handleFileInput.jsx";


const App = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [fileContents, setFileContents] = useState({});

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const saveFileContents = (event) => {
        handleFileInput(event).then((fileContents) => {
            console.log(fileContents)
            setFileContents(fileContents);
        });
    }


    return (
        <div className="cp-h-screen">
            <div className={`cp-fixed cp-right-0 cp-top-0 ${sidebarVisible && 'cp-hidden'}`}>
                <ToggleButton toggle={toggleSidebar} />
            </div>
            <Sidebar visible={sidebarVisible}>
                <ToggleButton toggle={toggleSidebar} />
                <div className="cp-sidebar-header">
                    <input
                        type="file"
                        onChange={saveFileContents}
                        webkitdirectory="true"
                    />
                </div>

                <Content />
            </Sidebar>
        </div>
    );

};

export default App;
