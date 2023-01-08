import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBaseByIdQuery } from "../../api/queries/get-assetstore";
import { TaskType } from "react-babylonjs";
import { IPMeshTask } from "./utilities/interfaces";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../ui-components/core/buttons/Button";
import { customizeActions } from "../../store/customize-slice";



const SceneAPI = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const { base } = useSelector((state: any) => state.appState._appState);
  const meshTaskStates =useSelector((state :any)=> state.customizeState._meshTaskStates)
  const meshTaskLoader =useSelector((state :any)=> state.customizeState._meshTaskLoader)
  const { data, isSuccess } = useBaseByIdQuery(
    `${base.isFetched ? base.id : null}`
  );

  useEffect(()=>{
    if (isSuccess) {
        let meshTaskLoader = {
          front: [] as IPMeshTask[],
          back: [] as IPMeshTask[],
          collar: [] as IPMeshTask[],
          sleeves: [] as IPMeshTask[],
          waistPockets: [] as IPMeshTask[],
          closureZipper: [] as IPMeshTask[],
          hem: [] as IPMeshTask[],
          cuffs: [] as IPMeshTask[],
          
        };
        data[0].jParts.map((parts: any) => {
          let jpName =parts.jpName
          let meshtask =parts.jpMeshTask
          if(meshtask != undefined){
            return meshTaskLoader[jpName].push({ taskType: TaskType.Mesh, rootUrl:meshtask.rootUrl, sceneFilename:meshtask.sceneFilename , name:meshtask.name})
          }
       
        });

        console.log("meshTaskloader ",meshTaskLoader)
        
        dispatch(customizeActions._setMeshTask(meshTaskLoader))
        
    
      }
  },[isSuccess])

 


  useEffect(()=>{
    if(meshTaskStates.isProcessed){
      console.log(meshTaskStates.isProcessed)
        navigate("/customize/style")
    }
   
  },[meshTaskStates.isProcessed])




  return (
    <>
      <h1>{base.id}</h1>
      {/* {isSuccess && <h1>{`${base.id} is fetched`}</h1>} */}
      <Button name="click" className="" onClick={()=>{navigate("/customize/style")}}/>
      {/* {sceneSuccess && navigate("/customize/style")} */}
    </>
  );
};

export default SceneAPI;
