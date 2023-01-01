import React, { FC } from "react";

import { FiChevronLeft, FiChevronRight} from "react-icons/fi";

type ButtonProps = {
  name: string;
  size?: string;
  variant?: string;
  color?: string;
  className?: string;
  textColor?: string;
  selected?: boolean;
  value?: string;
  textSize?: string;
  next?:Boolean;
  back?:Boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const StageButton: FC<ButtonProps> = ({
  name,
  size,
  variant,
  color,
  className,
  selected,
  value,
  textSize = "lg",
  next,
  back,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      value={value}
      className={`${className} rounded-md py-5 px-10 flex flex-row space-x-2 justify-center
      
      ${
        color === "contrast"
          ? "bg-primary-dark text-primary-light hover:bg-primary-solid"
          : "bg-white text-gray-500  hover:bg-gray-300"
      }
      ${selected ? "bg-primary-solid" : null}
      ${size === "lg" && "w-[80%] h-[40%]"}
      ${textSize === "lg" && "text-lg"}
      ${textSize === "2xl" && "text-2xl"}
      ${textSize === "3xl" && "text-3xl"}
            
      `}
    >
      {back &&<FiChevronLeft className="w-8 h-8"/>}
      {name}
      {next && <FiChevronRight className="w-8 h-8"/>}
    </button>
  );
};
