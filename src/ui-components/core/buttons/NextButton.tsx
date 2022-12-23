import React, { FC } from "react";

type ButtonProps = {
  name: string;
  size?: string;
  variant?: string;
  color?: string;
  className?:string
  textColor?: string;
  selected?: boolean;
  value?:string
  onClick?:React.MouseEventHandler<HTMLButtonElement>
};

export const Button: FC<ButtonProps> = ({
  name,
  size,
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
      className={`${className} rounded-md py-3 px-10 text-lg
      
      ${ color === "contrast"
          ? "bg-primary-dark text-primary-light hover:bg-primary-solid" 
          : "bg-primary-light text-primary-dark"
      }
      ${selected? "bg-primary-solid":null

      }
    
      `}

    >
      {name}
    </button>
  );
};
