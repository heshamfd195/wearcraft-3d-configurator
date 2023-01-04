import React, { FC } from 'react'



export const StyleSwap: FC<any> = ({ list }) => {
    return (
        <div className="overflow-y-auto h-[80%] border rounded-md mx-10 my-4 flex flex-col items-center space-y-4 ">{list?.map((img: any, index: number) => {
            return <img className="border rounded-md hover:bg-gray-200 "   src={img.url} alt={img.name} key={index} />

        })}
        </div>)

}



