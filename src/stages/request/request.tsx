import React from 'react'
import { Button } from '../../ui-components/core/buttons/Button'
import { useNavigate } from 'react-router-dom'

export const Request = () => {
    const navigate =useNavigate()
  return (
    <div className="items-center flex flex-col space-y-5 my-10">
    <p className="text-2xl ">Request Artwork</p>
    <p className="text-xl ">Upload Reference Images</p>
    <p className="text-xl ">Request Artwork</p>
    <Button
      name="Submit"
      className="text-2xl font-semibold bg-primary-main"
      color="contrast"
      onClick={ ()=>{navigate("/submit")}}
      size="lg"
    />
        <Button
      name="Cancel"
      className="text-2xl font-semibold text-red-300"
      onClick={ ()=>{navigate("/customize/artwork")}}
      size="lg"
      variant='contrast'
    />
    {/* <h1>{`Device: ${device}`}</h1> */}


  </div>
  )
}

