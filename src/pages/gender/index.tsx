import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { appStateActions } from '../../store/app-slice'
import { Button } from '../../ui-components/core/buttons/Button'

function Gender() {
  const navigate =useNavigate()
  const dispatch =useDispatch()

  const onGenderNavigate=(evt:any)=>{
   if(evt != undefined){
    dispatch(appStateActions._setGender(evt.target.value))
    navigate("/category")
   }

  }

  return (
    <div className="flex flex-col items-center space-y-10 py-10">
          <BsChevronLeft onClick={()=>navigate("/home")}/>
      <p className="text-4xl font-medium">Select Gender</p>
      <div className="flex flex-row space-x-3 ">
        <Button name={'Men'} value={"men"} color="contrast" onClick={onGenderNavigate}/>
        <Button name={'Women'} value={"women"} color="contrast" onClick={onGenderNavigate}/>
      </div>
    </div>
  )
}

export default Gender