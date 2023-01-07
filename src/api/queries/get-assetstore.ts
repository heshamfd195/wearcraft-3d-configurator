import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const getAssetStore:any =createApi({
    reducerPath:"getAssetStoreAPi",
    baseQuery:fetchBaseQuery({baseUrl:"https://tjm-3d-serverless.vercel.app/api/assetstore",mode: "cors",
    prepareHeaders: (headers) => {
        // headers.set('Access-Control-Allow-Origin', '*') 
        // headers.set('Access-Control-Allow-Methods', 'GET') //
        // headers.set('Access-Control-Allow-Headers', '*') //
        return headers
      },}),
    endpoints:(builder)=>({
        category:builder.query<any,void>({
            query:()=>"/catData"
        }),
        baseById:builder.query<any,string>({
            query:(id)=>`/${id}`
        }),
        matDefault:builder.query<any,void>({
            query:()=>"/defMat"
        }),
    })
})

export const {useCategoryQuery,useBaseByIdQuery} =getAssetStore
