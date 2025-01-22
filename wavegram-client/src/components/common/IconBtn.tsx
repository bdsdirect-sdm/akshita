import React from "react";
import { iconBtn } from "../../interfaces/interfaces";

const IconBtn: React.FC<iconBtn> = ({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) => {
  //   console.log("typetypetype", type);
  return (
    <div className="flex justify-end">
      <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={`flex items-end justify-center text-base w-52  ${
          outline
            ? "border border-customBlue bg-transparent"
            : `${customClasses ? `${customClasses}` : ""}`
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold bg-[#3E5677]  ${customClasses}`}
      >
        {children ? (
          <div className="flex items-center justify-center gap-2">
            <span>{text}</span>
            {children}
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default IconBtn;
