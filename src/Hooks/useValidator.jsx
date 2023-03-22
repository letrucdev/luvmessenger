import { useRef, useState } from "react";

export function useValidator({ children, type }) {
  const container = useRef();
  const [error, showError] = useState(false);

  function Validate(value) {
    if (value?.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="">
      <div
        className="w-full"
        ref={container}
        onBlur={(e) => {
          !Validate(e.target.value) && showError(true);
        }}
        onFocus={() => {
          showError(false);
        }}
      >
        {children}
      </div>
      {error ? (
        <div
          className={`backdrop-blur-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 z-50
            bg-opacity-60 absolute top-[${container.current.offsetHeight}px] mt-2 p-1  
            rounded-xl duration-300 transition-all text-center text-sm font-semibold`}
        >
          * Please fill in this field
        </div>
      ) : null}
    </div>
  );
}
