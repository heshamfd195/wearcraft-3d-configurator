import { Color4, MeshAssetTask, Vector3 } from "@babylonjs/core";
import "@babylonjs/inspector";
import { sceneFragmentDeclaration } from "babylonjs/Shaders/ShadersInclude/sceneFragmentDeclaration";
import axios from 'axios';
import React, { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AssetManagerContext,
  AssetManagerContextProvider,
  Engine,
  Scene,
  Task,
  TaskType,
  useAssetManager,
  useBeforeRender,
  useScene,
} from "react-babylonjs";
import { acMatOver, acMatUpdate, acMeshMatUpdate } from "../actions/materials/mat-action";
import { AssetManagerFallback } from "../scene/AssetLoader";
import EnvironmentSetup from "../setup/EnvironmentSetup";
// import "../../style.css";

let loadState = {
    meshCount: 0,
    loadCount: 0,
    loaded: false,
  };

let meshTaskLoader = [

      {
        taskType: "Mesh",
        rootUrl:
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/front/crm-fr-L1D1/",
        sceneFilename: "crm-fr-L1D1.glb",
        name: "crm-fr-L1D1",
      },
   
      {
        taskType: "Mesh",
        rootUrl:
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/back/crm-bk-L1D1/",
        sceneFilename: "crm-bk-L1D1.glb",
        name: "crm-bk-L1D1",
      },

      {
        taskType: "Mesh",
        rootUrl:
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/collar/crm-clr-L1D1/",
        sceneFilename: "crm-clr-L1D1.glb",
        name: "crm-clr-L1D1",
      },

      {
        taskType: "Mesh",
        rootUrl:
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/sleeves/crm-sl-L1D1/",
        sceneFilename: "crm-sl-L1D1.glb",
        name: "crm-sl-L1D1",
      },

      {
        taskType: "Mesh",
        rootUrl:
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/JacketParts/Men/cr-parts/closureZipper/crm-clz-L1D1/",
        sceneFilename: "crm-clz-L1D1.glb",
        name: "crm-clz-L1D1",
      }

    ] as Task[]

























export default { title: "Models" };

const baseUrl =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/";

const modelAssetTasks = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}BoomBox/glTF/`,
    sceneFilename: "BoomBox.gltf",
    name: "boombox",
  },
  {
    taskType: TaskType.Mesh,
    rootUrl: `${baseUrl}Avocado/glTF/`,
    sceneFilename: "Avocado.gltf",
    name: "avocado",
  },
] as Task[];

const MyFallback = (props:any) => {
  const boxRef:any = useRef();
  const context = useContext(AssetManagerContext);
  console.log("context in fallback:", context);



  useBeforeRender((scene) => {
    if (boxRef.current) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      boxRef.current.rotation.x = Math.PI / 4;
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        
    }
  });

  const eventData = context?.lastProgress?.eventData;
//   console.log("Event Data: ",eventData?.remainingCount)
  
if(eventData?.task.isCompleted){
  props.onLoaded(true)
}



  return (
    <>
      <adtFullscreenUi name="ui">
        <rectangle name="rect" height="50px" width="150px">
          <rectangle>
            {eventData !== undefined && (
              <textBlock
                text={`${eventData.totalCount - eventData.remainingCount}/${
                  eventData.totalCount
                }`}
                fontStyle="bold"
                fontSize={20}
                color="white"
              />
            )}
            {eventData === undefined && (
              <textBlock
                text="0/2"
                fontStyle="bold"
                fontSize={20}
                color="white"
              />
            )}
            
          </rectangle>
        </rectangle>
      </adtFullscreenUi>
      <box ref={boxRef} name="fallback" size={5} />
    
    </>
  );
};

const MaterialUpdate:React.FC<any>=({defMat})=>{
    let scene =useScene()
    console.log("mat ",defMat)
    useMemo(()=>{
        // acMatUpdate(scene,defMat)
    },[defMat])

return null
}
const BackColor=()=>{
    let scene =useScene()
    scene!.clearColor = new Color4(0, 0, 0, 0);
    return null
}

const DebugLayer=()=>{
    let scene =useScene()
    scene?.debugLayer.show();
    return null
}

const MyModels:React.FC<any> = ({matState,defMat}) => {
  const assetManagerResult = useAssetManager(meshTaskLoader);
  let m;


useMemo(()=>{
 for ( const p of meshTaskLoader){
  console.log("Part :",p.name)
  let part=assetManagerResult.taskNameMap[p.name] as MeshAssetTask
  let mesh =part.loadedMeshes[0]
  mesh.name=p.name
   m=part.loadedMeshes[2]
  // m.material =null

 


 }




},[])



  if(matState){
    acMatOver(m,defMat)
   }



//   useMemo(() => {
//     console.log("Loaded Tasks", assetManagerResult);
//     const boomboxTask = assetManagerResult.taskNameMap["boombox"] as MeshAssetTask;
//     boomboxTask.loadedMeshes[0].position = new Vector3(2.5, 0, 0);
//     boomboxTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);

//     const avocadoTask = assetManagerResult.taskNameMap["avocado"]  as MeshAssetTask;
//     avocadoTask.loadedMeshes[0].position = new Vector3(-2.5, 0, 0);
//     avocadoTask.loadedMeshes[1].scaling = new Vector3(20, 20, 20);
//   },[]);

  return null;
};

const MyScene = () => {


  const [loaded,setLoad]=useState(false)
  const [matState,setMatState]=useState(false)
  const [mat,SetMat]=useState({})

  
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/assetstore/defMat"
    );
    SetMat(response.data[0])
    setMatState(true)
    console.log("Def Mat Success ",response.data[0])

  };





  
  return (
    <React.Fragment>
      <button style={{backgroundColor:"red", height:50, width:100}} onClick={getData}> GET MAT</button>
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS" style={{width:1000,height:1000}}>
      <Scene>
        {/* <EnvironmentSetup/> */}
        <DebugLayer/>
        < BackColor/>

        <arcRotateCamera
          name="camera1"
          alpha={Math.PI/2}
          beta={Math.PI/2.2}
          radius={7}
          target={new Vector3(0, 6.8, 0)}
          minZ={0.1}
          lowerRadiusLimit={2}
          upperRadiusLimit={8}
          inertia={0.9}
          angularSensibilityX={1000}
          angularSensibilityY={1000}
          panningSensibility={4000}
          pinchDeltaPercentage={0.01}
          wheelDeltaPercentage={0.01}
          wheelPrecision={1}
          upperBetaLimit={2}
          speed={0.1}
          noPreventDefault={false}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <AssetManagerContextProvider>
          <Suspense fallback={   <MyFallback onLoaded={(flag:boolean)=>{setLoad(flag) ;console.log("Yes")}}/>}>
           {<MyModels matState={matState} detMat={mat}/>}
          </Suspense>
        </AssetManagerContextProvider>
     { matState && loaded && <MaterialUpdate defMat={mat}/>}
      </Scene>
    </Engine>
    </React.Fragment>
  );
};

export const ModelLoaderStory = () => (
  <div style={{ flex: 1, display: "flex" }}>
    <MyScene />
  </div>
);

ModelLoaderStory.story = {
  name: "Asset Manager",
};