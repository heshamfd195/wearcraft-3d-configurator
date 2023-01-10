import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appSlice, { appStateActions } from "../../../store/app-slice";
import { Button } from "../../../ui-components/core/buttons/Button";
import Select from 'react-select'
import { customizeActions } from "../../../store/customize-slice";


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export const StyleList: FC<any> = () => {
  const { style } = useSelector((state: any) => state.appState._customize)
  let { list, dList, selection } = style
  const dispatch = useDispatch()

  //   const [l, ls] = useState(list);
  const onClickHandler = (e: any) => {
   
    let value = e.target.value;
    dispatch(customizeActions._updateAssetSlider(value))
    // let newlist = [...list];
    // let selectedData = {
    //   prev: selection.curr,
    //   curr: value
    // }
    // dispatch(appStateActions._updateStyleList(selectedData))
  }

  return (
    <div className="flex flex-col space-y-2 px-4 py-10 mx-5">

  
      {list?.map((button: any, index: number) => {
        return (

          <Button
            value={button.id}
            key={index}
            name={button.name}
            size="md"
            variant="outlined"
            // selected={button.selected}
            onClick={onClickHandler}
          />

        );

      })}
      {/* {dList?.map((button: any, index: number) => {
        return <Select key={index} options={button.options} defaultInputValue={button.name} />
      })} */}





    </div>
  );
};
