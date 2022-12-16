import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Card from '../../ui-components/stateful/cards/card'

const mobile='flex-col'
const desktop='flex-row '

function Category() {
  const navigate=useNavigate()
  return (
    <div className="items-center flex flex-col space-y-5 my-10">
        <BsChevronLeft onClick={()=>navigate(-1)}/>
      <p className="text-3xl">Select CategoryTEST</p>
      <div className={`flex desktop:${desktop} mobile:${mobile} gap-2`}>
        <Card title="Cafe Racer"/>
        <Card title="Double Rider"/>
        <Card title="Bomber"/>
      </div>
    </div>
  )
}

export default Category