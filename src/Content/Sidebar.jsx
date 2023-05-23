import React from "react";
import Draggable from "react-draggable";

const Sidebar = ({ children, visible, toggle }) => {
  return (
    <Draggable handle=".cp-sidebar-header">
      <aside
        style={{ width: "50vh", height: "70vh" }}
        className={`${
          !visible ? "cp-hidden" : ""
        } cp-fixed cp-p-2 cp-right-0 cp-top-0  dark:bg-gray-800 cp-overflow-y-scroll`}
      >
        <div className="cp-sidebar-header cp-bg-indigo-600 cp-text-white cp-font-bold cp-p-3 cp-text-lg cp-flex cp-items-center cp-justify-between cp-cursor-move cp-mb-5">
          <span>ChatGPT Powertools</span>
          <button
            type="button"
            className="cp-bg-gray-900  cp-text-white cp-font-semibold cp-py-2 cp-px-4 cp-rounded"
            onClick={toggle}
          >
            x
          </button>
        </div>
        {children}
      </aside>
    </Draggable>
  );
};

export default Sidebar;
