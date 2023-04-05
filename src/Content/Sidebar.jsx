import React from 'react';
import Draggable from 'react-draggable';

const Sidebar = ({children, visible}) => {
  return (
    <Draggable handle=".cp-sidebar-header">

      <aside
        style={{width: '50vh', height: '50vh'}}
        className={`${
          !visible ? 'cp-hidden' : ''
        } cp-fixed cp-right-0 cp-top-0  cp-bg-gray-200 cp-overflow-y-scroll`}
      >
        <div className="cp-sidebar-header">
          <span>Chatgpt Powertools</span>
        </div>
        {children}
      </aside>
    </Draggable>

  );
};

export default Sidebar;
