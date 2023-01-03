import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appSlice, { appStateActions } from "../../../store/app-slice";
import { Button } from "../../../ui-components/core/buttons/Button";


export const StyleList: FC<any> = () => {
  const {style} =useSelector((state :any)=> state.appState._customize)
  let {list,selection} =style
  const dispatch = useDispatch()

  //   const [l, ls] = useState(list);
  const onClickHandler = (e: any) => {
    let value = e.target.value;
    let newlist=[...list];
    let selectedData ={
      prev:selection.curr,
      curr:value
    }
    dispatch(appStateActions._updateStyleList(selectedData))
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
            onClick={onClickHandler}
          />
        );
      })}
    </div>
  );
};
