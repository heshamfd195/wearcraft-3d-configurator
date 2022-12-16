import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BsChevronLeft} from "react-icons/bs";
import { CustomScene3D } from '../../bjs-components/scene/CustomScene3D';
import { ModelLoaderStory } from '../../bjs-components/manager/manager';
const Customize = () => {
  const navigate=useNavigate()
  return (
    <div className='items-center flex flex-col space-y-5 my-10'>
     
        <BsChevronLeft onClick={()=>navigate(-1)}/>
  
      <p className='text-2xl'>Customize</p>
      <Outlet/>
      <div className='absolute z-10 '>
         <ModelLoaderStory/>
      </div>
      
    </div>
  )
}

export default Customize