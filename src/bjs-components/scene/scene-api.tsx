import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useBaseByIdQuery,
  useMatDefaultQuery,
  useSceneSettingQuery,
} from "../../api/queries/get-assetstore";
import { TaskType } from "react-babylonjs";
import { IPMeshTask } from "./utilities/interfaces";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../ui-components/core/buttons/Button";
import { customizeActions } from "../../store/customize-slice";
import { ThreeDots } from "react-loader-spinner";

const SceneAPI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { base } = useSelector((state: any) => state.appState._appState);
  const meshTaskStates = useSelector(
    (state: any) => state.customizeState._meshTaskStates
  );
  const sceneSettingState = useSelector(
    (state: any) => state.customizeState._sceneSettingState
  );
  const meshTaskLoader = useSelector(
    (state: any) => state.customizeState._meshTaskLoader
  );
  let {meshStates} =useSelector((state: any) => state.customizeState._switchMeshStates)

  const { data, isSuccess } = useBaseByIdQuery(
    `${base.isFetched ? base.id : null}`
  );
  // let currParts = useSelector(
  //   (state: any) => state.customizeState.currParts
  // );

  const sceneSettingRes = useSceneSettingQuery();
  const defMaterialRes = useMatDefaultQuery();

  // Jacket Base Fetcher
  useEffect(() => {
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
        let jpName = parts.jpName;
        let meshtask = parts.jpMeshTask;
        if (meshtask != undefined) {
          return meshTaskLoader[jpName].push({
            taskType: TaskType.Mesh,
            rootUrl: meshtask.rootUrl,
            sceneFilename: meshtask.sceneFilename,
            name: meshtask.name,
          });
        }
      });
      let currParts ={
        front:{
          jpId:'',
        },
        back:{
          jpId:'',
        },
        collar:{
          jpId:'',
        },
        closureZipper:{
          jpId:'',
        },
        sleeves:{
          jpId:'',
        },
        hem:{
          jpId:'',
        },
        waistPockets:{
          jpId:'',
        },
        cuffs:{
          jpId:'',
        },
      }
      let meshCount=0;
      let jParts =data[0].jParts
          Object.keys(currParts)?.map(
        function(key, index){
          let partData = jParts.filter(part=>part.jpName === key)
             
             if(partData[0] !== undefined){
              // console.log(partData[0])
              // console.log(currParts[key].jpId)
              currParts[key]={jpId:partData[0].jpId}
              meshCount+=1;
             }
            
          
  
        })


      console.log('currParts:',currParts)
      dispatch(customizeActions._updateCurrJData(jParts));
      dispatch(customizeActions._addCurrPartIds(currParts));
      dispatch(customizeActions._setMeshTask(meshTaskLoader));
      dispatch(customizeActions._addMeshTaskLoader(meshTaskLoader));
      dispatch(customizeActions._updateMeshState({...meshStates,meshCount:meshCount}))
     
    

 
     
        // dispatch(meshTaskActions._updateCurrJData(cBase.jParts))
    }
  }, [isSuccess]);

  // Scene Setting Fetcher
  useEffect(() => {
    const { data, isSuccess } = sceneSettingRes;
    if (isSuccess) {
      dispatch(customizeActions._setScene(data[0]));
    }
  }, [sceneSettingRes.isSuccess]);

  // Default Material Fetcher
  useEffect(() => {
    const { data, isSuccess } = defMaterialRes;
    if (isSuccess) {
      dispatch(customizeActions._setMatDefault(data[0]));
      dispatch(customizeActions._updateMatData(data[0]));
    }
  }, [defMaterialRes.isSuccess]);

  // Navigate Fetcher
  useEffect(() => {
    if (
      meshTaskStates.isProcessed &&
      sceneSettingState.isProcessed &&
      defMaterialRes.isSuccess
    ) {
      
      navigate("/customize/style");
    }
  }, [
    meshTaskStates.isProcessed,
    sceneSettingState.isProcessed,
    defMaterialRes.isSuccess,
  ]);

  return (
    <>
      {/* <h1>{base.id}</h1> */}
      <div className="mx-auto w-screen h-screen">
      <ThreeDots width={100} height={100} color="black"  />
      </div>

      {/* {isSuccess && <h1>{`${base.id} is fetched`}</h1>} */}

      {/* {sceneSuccess && navigate("/customize/style")} */}
    </>
  );
};

export default SceneAPI;
