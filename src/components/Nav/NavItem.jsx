import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavItem(props, ref) {
  return (
    <div ref={ref}
      className={`${props.Class} w-full h-14 flex items-center justify-center hover:bg-slate-900 hover:bg-opacity-50 cursor-pointer message duration-300`}
      onClick={() => {
        props.Click(props.id);
      }}
    >
      <FontAwesomeIcon
        icon={props.icon}
        className="w-14 h-14 text-xl"
        fixedWidth
      />
    </div>
  );
}

export default forwardRef(NavItem)
