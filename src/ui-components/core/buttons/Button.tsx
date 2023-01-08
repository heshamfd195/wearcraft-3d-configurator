import React, { FC } from "react";

export type ButtonProps = {
  name: string;
  size?: string;
  variant?: string;
  color?: string;
  className?:string
  textColor?: string;
  selected?: boolean;
  value?:string | number
  onClick?:React.MouseEventHandler<HTMLButtonElement>
};

export const Button: FC<ButtonProps> = ({
  name,
  size="sm",
  variant,
  color,
  className,
  selected,
  value,
  onClick
}) => {
  return (
    <button
    onClick={onClick} value={value}
      className={`${className} rounded-md  px-10  active:bg-orange-200 focus:bg-green-300

      ${variant ==="outlined" && "border border-primary-dark hover:bg-gray-100 hover:text-opacity-30"}
      
      ${ color === "contrast"
          ? "bg-primary-dark text-primary-light hover:bg-primary-solid" 
          : "bg-primary-light text-primary-dark"
      }
      ${selected && "bg-primary-solid text-white "}
      ${size ==="sm" && "w-40 py-1 text-sm font-normal"}
      ${size ==="md" && " py-2 text-lg font-medium"}
      ${size ==="lg" && " py-3 text-xl"}
    
      `}

    >
      {name}
    </button>
  );
};
