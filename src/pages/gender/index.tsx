import React from 'react'
import {useNavigate} from "react-router-dom"
import { Button } from '../../ui-components/core/buttons/Button'

function Gender() {
  const navigate =useNavigate()
  return (
    <div className="flex flex-col items-center space-y-10 py-10">
      <p className="text-4xl font-medium">Select Gender</p>
      <div className="flex flex-row space-x-3 ">
        <Button name={'Men'} color="contrast" onClick={()=>{navigate("/category")}}/>
        <Button name={'Women'} color="contrast" onClick={()=>{navigate("/category")}}/>
      </div>
    </div>
  )
}

export default Gender