import React, { FC, useState } from "react";
import { Button, ButtonProps } from "../buttons/Button";

export const StyleList: FC<any> = ({ list,selected }) => {
  
//   const [l, ls] = useState(list);
  const onClickHandler=(e:any)=>{
  let value=e.target.value;
  

  }
  return (
    <div className="flex flex-col space-y-2 px-4 py-10 mx-5">
      {list?.map((button: any, index: number) => {
        return (
          <Button
            value={index}
            key={index}
            name={button.name}
            size="md"
            variant="outlined"
            selected={button.selected}
            onClick={ onClickHandler}
          />
        );
      })}
    </div>
  );
};
