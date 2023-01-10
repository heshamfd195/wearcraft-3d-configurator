import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAssetStore: any = createApi({
  reducerPath: "getAssetStoreAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tjm-3d-serverless.vercel.app/api/assetstore",
    mode: "cors",
    prepareHeaders: (headers) => {
      // headers.set('Access-Control-Allow-Origin', '*')
      // headers.set('Access-Control-Allow-Methods', 'GET') //
      // headers.set('Access-Control-Allow-Headers', '*') //
      return headers;
    },
  }),
  endpoints: (builder) => ({
    category: builder.query<any, void>({
      query: () => "/catData",
    }),
    baseById: builder.query<any, string>({
      query: (id) => `/bases/${id}`,
    }),
    matDefault: builder.query<any, void>({
      query: () => "/defMat",
    }),
    assetSlider: builder.query<any, void>({
      query: () => "/menJParts",
    }),
    assetColorSlider: builder.query<any, string>({
      query: (color) => `/${color}Color`,
    }),
    textureSlider: builder.query<any, string>({
      query: (texture) => `/${texture}`,
    }),
    materialOnLoad: builder.query<any, string>({
      query: (mat) => `/material-${mat}`,
    }),
    sceneSetting:builder.query<any,void>({
        query:()=>"/sceneSet"
    }),
    jBases:builder.query<any,string>({
        query:(gender)=>`/J${gender}Bases`
    }),
    mcrParts:builder.query<any,string>({
        query:(id)=>`/mcr-parts/${id}`
    }),
  }),
});

export const {
  useCategoryQuery,
  useBaseByIdQuery,
  useAssetSliderQuery,
  useTextureSliderQuery,
  useMaterialOnLoadQuery,
  useAssetColorSliderQuery,
  useSceneSettingQuery,
  useMatDefaultQuery,
  useMcrPartsQuery
  
  
} = getAssetStore;
