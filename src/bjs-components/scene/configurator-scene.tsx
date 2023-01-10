import {
  Color4,
  CubeTexture,
  HDRCubeTexture,
  MeshAssetTask,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { sceneFragmentDeclaration } from "babylonjs/Shaders/ShadersInclude/sceneFragmentDeclaration";
import axios from "axios";
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import {
  acMatOver,
  acMatUpdate,
  acMeshMatUpdate,
} from "../actions/materials/mat-action";
import { AssetManagerFallback } from "../scene/AssetLoader";
import EnvironmentSetup from "../setup/EnvironmentSetup";

import "../../App.css";
import { MeshLoader } from "./MeshLoader";
import { useDispatch, useSelector } from "react-redux";
import { createPBRMat } from "../setup/PBRmat";
import {
  JLoadMatAction,
  JLoadMatAction1,
} from "../actions/materials/mat-action";
import { saMeshLoaded, saSceneSetter } from "../actions/scene/switchActions";
import { customizeActions } from "../../store/customize-slice";
import { MyFallback } from "../manager/manager";

let loadState = {
  meshCount: 0,
  loadCount: 0,
  loaded: false,
};

export const ConfiguratorScene = () => {

  const dispatch=useDispatch()
  // const meshTaskLoader = useSelector(
  //   (state: any) => state.customizeState._meshTaskLoader
  // );
  const sceneSettingState = useSelector(
    (state: any) => state.customizeState._sceneSettingState
  );

  const matDefaultState = useSelector(
    (state: any) => state.customizeState._matDefaultState
  );
  const {meshStates} = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );
  const {meshTaskLoader} = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );

  const switchMeshStates =useSelector((state: any) => state.customizeState._switchMeshStates)
  const {meshLoadState} =useSelector((state: any) => state.customizeState._switchMeshStates)
  const assetSliderState = useSelector(
    (state: any) => state.customizeState._assetSliderState
  );
  const count = useRef(0);

  // const onDispatchMeshState=(state)=>{
  //   console.log("state :",state)
  //   dispatch(customizeActions._updateMeshState(state))
  //   dispatch(customizeActions._updateMeshState({ meshCount:0,
  //     loadCount:0,
  //     loaded:false}))
  // }

  const onMeshFallbackLoaded=()=>{
    console.log("true")
    dispatch(customizeActions._updadeMeshLoadedState(true))
  }

  





  return (
    <React.Fragment>
      {/* <button style={{backgroundColor:"red", height:50, width:100}} onClick={getData}> GET MAT</button> */}
      <Engine antialias adaptToDeviceRatio canvasId="my-canvas">
        <Scene>
          <DebugLayer />
          <BackColor />
          <EnvironmnetLoader />
          {/* <PBRMaterialLoader material={matDefaultState.matDefault} /> */}
          {<PBRMaterialLoader material={matDefaultState.matDefault} /> }
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 2.2}
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
            <Suspense
              fallback={
                // <AssetManagerFallback
                //   barColor="#666666"
                //   textColor="white"
                //   totalControls={1}
                //   loadState={loadState}
                //   meshStates={meshStates}
                //   onDispatchMeshState={onDispatchMeshState}
                // />
               < MyFallback onMeshFallbackLoaded={onMeshFallbackLoaded}/>
              }
            >
              {Object.keys(meshTaskLoader).map(function (
                key: string,
                index: number
              ) {
                if (meshTaskLoader[key][0] !== undefined) {
                  return (
                    <MeshLoader1
                      jpMeshTaskLoader={meshTaskLoader[key]}
                      key={index}
                    />
                  );
                }
              })}
                 {/* {meshStates.loaded && <SwitchManager/>} */}
                 {/* {meshLoadState.isMeshLoaded &&  <SwitchManager assetSliderState={assetSliderState} switchMeshStates={switchMeshStates}/>} */}
                 { <SwitchManager assetSliderState={assetSliderState} switchMeshStates={switchMeshStates}/>}
                 
                
            </Suspense>
            
          </AssetManagerContextProvider>
          
         
        </Scene>
      </Engine>
    </React.Fragment>
  );
};

const BackColor = () => {
  let scene = useScene();
  scene!.clearColor = new Color4(0, 0, 0, 0);
  return null;
};

const DebugLayer = () => {
  let scene = useScene();
  scene?.debugLayer.show({ embedMode: true });
  return null;
};

const EnvironmnetLoader: React.FC = () => {
  let scene = useScene();
  useMemo(() => {
    let hdrTexture = new CubeTexture(
      "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/SceneSettings/environment.env",
      scene!
    );
    scene!.createDefaultSkybox(hdrTexture, true, 10000);
    for (let mat of scene!.materials) {
      if (mat.id === "skyBox") {
        mat.backFaceCulling = true;
      }
    }
  }, []);

  return null;
};

const PBRMaterialLoader: React.FC<any> = ({ material }) => {
  let scene = useScene();

  useMemo(() => {
    const {
      panel,
      panel_zip,
      panel_lin,
      stitch,
      metal_zip,
      panel_sl,
      metal_btn,
      panel_rib,
    } = material;

    let panelMat = createPBRMat(scene, "panelMat", panel);
    let panelZip = createPBRMat(scene, "panelZip", panel_zip);
    let panelLin = createPBRMat(scene, "panelLin", panel_lin);
    let stitchMat = createPBRMat(scene, "stitchMat", stitch);
    let metalZip = createPBRMat(scene, "metalZip", metal_zip);
    let panelSl = createPBRMat(scene, "panelSl", panel_sl);
    let metalBtn = createPBRMat(scene, "metalBtn", metal_btn);
  }, []);
  return null;
};

export const MeshLoader1: React.FC<any> = ({ jpMeshTaskLoader }) => {
  let scene = useScene();
  const meshName = jpMeshTaskLoader[0].name;
  const loadedAssets = useAssetManager(jpMeshTaskLoader);
  const mesh = loadedAssets.taskNameMap[meshName] as MeshAssetTask;
  const part = mesh.loadedMeshes[0];
  part.name = meshName;
  console.log("mesh loaded : ",meshName)


  // JLoadMatAction(scene,meshName,loadedAssets)
  
  // console.log(mesh.taskState)
 


  let panelMatIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('panelMat');
  let panelZipIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('panelZip');
  let panelLinIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('panelLin');
  let stitchIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('stitchMat');
  let metalZipIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('metalZip');
  let panelSlIndex = scene!.materials.map(function(x) {return x.id; }).indexOf('panelSl');

  if (mesh.isCompleted) {
    for (let i = 1; i < mesh.loadedMeshes.length; i++) {
      let mesh1 = mesh.loadedMeshes[i];
    
      

      if (mesh1.material!.name === "panel") {
    
       
        mesh1.material!.dispose();
        
        mesh1.material = scene!.materials[panelMatIndex];
        (mesh1.material as any).albedoTexture.uScale=5;
        (mesh1.material as any).albedoTexture.vScale=5;
        (mesh1.material as any).bumpTexture!.vScale = 5;
        (mesh1.material as any).bumpTexture!.uScale = 5;
      }
      if (mesh1.material!.name === "panel_sl" || mesh1.material!.name === "panel_sr") {

        mesh1.material!.dispose();
        mesh1.material = scene!.materials[panelSlIndex];
        (mesh1.material as any).albedoTexture.uScale=5;
        (mesh1.material as any).albedoTexture.vScale=5;
        (mesh1.material as any).bumpTexture.vScale = 5;
        (mesh1.material as any).bumpTexture.uScale = 5;
      }
      if (mesh1.material!.name === "panel_zip" ) {

        mesh1.material!.dispose();
        mesh1.material = scene!.materials[panelZipIndex];
      }

      
    if(mesh1.material!.name === "panel_lin"){
      mesh1.material!.dispose()
      mesh1.material =scene!.materials[panelLinIndex]
    }

    if(mesh1.material!.name === "stitch"){
      mesh1.material!.dispose()
      mesh1.material =scene!.materials[stitchIndex]
    }
    if(mesh1.material!.name === "metal_zip"){
      mesh1.material!.dispose()
      mesh1.material =scene!.materials[metalZipIndex]
    }
    }
  }



  //  p.material=scene!.materials[panelMatIndex]
  //  p.material.albedoTexture.uScale=5
  //    if (part.material.name === "panel"  ) {
  //     mesh.material.dispose()
  //     mesh.material =scene.materials[panelMatIndex]

  //     mesh.material.albedoTexture.uScale=5
  //     mesh.material.albedoTexture.vScale=5
  //     mesh.material.bumpTexture.vScale = 5;
  //     mesh.material.bumpTexture.uScale = 5;
  // }

  // console.log(mesh.isCompleted)

  // useEffect(()=>{
  //   if(mesh.isCompleted){
  //     JLoadMatAction(scene,meshName,loadedAssets)
  //   }

  //  },[mesh.isCompleted])

  // if(meshName !=="brm-hem-A1D1"){
  //   JLoadMatAction(scene,meshName,loadedAssets)

  // }

  return null;
};



export const SwitchManager: React.FC<any> = ({assetSliderState,switchMeshStates}) => {

  const {partDisable,disableList,curPartsId}=switchMeshStates
  
  const scene =useScene()
  
  if(partDisable.flag ){
      saSceneSetter(scene,disableList,partDisable,curPartsId[assetSliderState.part].jpId)
  }
 
  // Why? : MeshLoad
  // saMeshLoaded(scene)

  return null;

}


export const MeshSceneCounter=()=>{
  let scene =useScene()
  let sceneNodes =scene?.rootNodes
  


    // for (let nodes of sceneNodes!){
    //   console.log("nodes ",nodes)
  
    // }
    for (let i = 0; i <  sceneNodes!.length; i++) {
    if (sceneNodes![i].getClassName()==='Mesh' && sceneNodes![i].name.includes('L') || sceneNodes![i].name.includes('A')) {
      console.log(sceneNodes![i].name)
    }
  }



  return null
}
