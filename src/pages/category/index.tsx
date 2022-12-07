import React from 'react'
import Card from '../../ui-components/stateful/cards/card'

const mobile='flex-col '
const desktop='flex-row '

function Category() {
  
  return (
    <div className="items-center flex flex-col space-y-5 my-10">
      <p className="text-3xl">Select Category</p>
      <div className={`flex desktop:${desktop} mobile:${mobile} gap-2`}>
        <Card title="Cafe Racer"/>
        <Card title="Double Rider"/>
        <Card title="Bomber"/>
      </div>
    </div>
  )
}

export default Category