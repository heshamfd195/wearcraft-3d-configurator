import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BsChevronLeft} from "react-icons/bs";
import { CustomScene3D } from '../../bjs-components/scene/CustomScene3D';
import { ModelLoaderStory } from '../../bjs-components/manager/manager';
import { Button } from '../../ui-components/core/buttons/Button';

const stageName=['style','material','color','artwork']

const Customize = () => {
  const [stage,setStage]=useState(0)

  const onNext=()=>{
    if(stage <3){
      setStage(stage+1)
      navigate(stageName[stage])
    }

  }

  const onBack=()=>{
    if(stage >=0){
      setStage(stage-1)
      navigate(stageName[stage])
    }

  }

  const navigate=useNavigate()
  return (
    <div className='items-center flex flex-col space-y-5 my-10'>
     
        <BsChevronLeft onClick={()=>navigate(-1)}/>
  
      <p className='text-2xl'>Customize</p>
      <p className='text-xl'>{stageName[stage]}</p>
      <Outlet/>
      <div className='absolute z-10 '>
         {/* <ModelLoaderStory/> */}
      </div>
      <div className='flex flex-row space-x-2'>
      
      <Button name='Back' onClick={onBack}/>
      <Button name='Next' color='contrast' onClick={onNext}/>
       
      </div>
      
    </div>
  )
}

export default Customize