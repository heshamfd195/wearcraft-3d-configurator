import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const getAssetStore:any =createApi({
    reducerPath:"getAssetStoreAPi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/AssetStore"}),
    endpoints:(builder)=>({
        category:builder.query<any,void>({
            query:()=>"/catData"
        }),
    })
})

export const {useCategoryQuery} =getAssetStore
