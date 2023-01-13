import {
  Color4,
  CubeTexture,
  DynamicTexture,
  HDRCubeTexture,
  Mesh,
  MeshAssetTask,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  StandardMaterial,
  Texture,
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
  JCMatLoad,
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
import { useNavigate } from "react-router-dom";

let loadState = {
  meshCount: 0,
  loadCount: 0,
  loaded: false,
};

export const ConfiguratorScene = () => {
  const navigate = useNavigate();

  // navigate(0)

  const dispatch = useDispatch();
  // const meshTaskLoader = useSelector(
  //   (state: any) => state.customizeState._meshTaskLoader
  // );
  const sceneSettingState = useSelector(
    (state: any) => state.customizeState._sceneSettingState
  );

  const matDefaultState = useSelector(
    (state: any) => state.customizeState._matDefaultState
  );
  const { meshStates } = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );
  const { meshTaskLoader } = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );

  const switchMeshStates = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );
  const artworkState = useSelector(
    (state: any) => state.customizeState._artworklogoState
  );

  const matDefualtData = useSelector(
    (state: any) => state.customizeState._matDefualtData
  );
  const matState = useSelector((state: any) => state.customizeState._matState);
  const { curPartsId, currMeshList } = useSelector(
    (state: any) => state.customizeState._switchMeshStates
  );
  const jpUniMeshLoader = useSelector(
    (state: any) => state.customizeState._jpUniMeshLoader
  );
  const { is_style, is_material, is_color, is_artwork } = useSelector(
    (state: any) => state.customizeState._stageFlags
  );

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

  const onMeshFallbackLoaded = () => {
    console.log("true");
    dispatch(customizeActions._updadeMeshLoadedState(true));
  };

  return (
    <React.Fragment>
      {/* <button style={{backgroundColor:"red", height:50, width:100}} onClick={getData}> GET MAT</button> */}
      <Engine antialias adaptToDeviceRatio canvasId="my-canvas">
        <Scene>
          <DebugLayer />
          <BackColor />
          <EnvironmnetLoader />
          {/* <PBRMaterialLoader material={matDefaultState.matDefault} /> */}
          {<PBRMaterialLoader material={matDefaultState.matDefault} />}
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
                <MyFallback onMeshFallbackLoaded={onMeshFallbackLoaded} />
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
              {is_style && (
                <SwitchManager
                  assetSliderState={assetSliderState}
                  switchMeshStates={switchMeshStates}
                />
              )}
              {is_material && (
                <SceneTextureManager
                  matDefualtCurData={matDefualtData}
                  matState={matState}
                />
              )}
              {is_color && (
                <SceneTextureManager
                  matDefualtCurData={matDefualtData}
                  matState={matState}
                />
              )}
              {/* {is_artwork && <ArtworkManager artworkState={artworkState} />} */}
              {is_artwork && artworkState.flag &&<ArtworkLogoManagerTest artworkState={artworkState}/>}
              {/* { is_material && <SceneDisposer currMeshList={currMeshList}/>} */}
              {/* {<MeshManager uniMeshTaskLoader={jpUniMeshLoader}/>} */}
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
  // console.log("mesh loaded : ",meshName)

  // JLoadMatAction(scene,meshName,loadedAssets)

  // console.log(mesh.taskState)

  let panelMatIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("panelMat");
  let panelZipIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("panelZip");
  let panelLinIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("panelLin");
  let stitchIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("stitchMat");
  let metalZipIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("metalZip");
  let panelSlIndex = scene!.materials
    .map(function (x) {
      return x.id;
    })
    .indexOf("panelSl");

  if (mesh.isCompleted) {
    for (let i = 1; i < mesh.loadedMeshes.length; i++) {
      let mesh1 = mesh.loadedMeshes[i];

      try {
        console.log(mesh1.name);
        if (mesh1.material!.name === "panel") {
          mesh1.material!.dispose();

          mesh1.material = scene!.materials[panelMatIndex];
          (mesh1.material as any).albedoTexture.uScale = 5;
          (mesh1.material as any).albedoTexture.vScale = 5;
          (mesh1.material as any).bumpTexture!.vScale = 5;
          (mesh1.material as any).bumpTexture!.uScale = 5;
          continue;
        } else if (
          mesh1.material!.name === "panel_sl" ||
          mesh1.material!.name === "panel_sr"
        ) {
          mesh1.material!.dispose();
          mesh1.material = scene!.materials[panelSlIndex];
          (mesh1.material as any).albedoTexture.uScale = 5;
          (mesh1.material as any).albedoTexture.vScale = 5;
          (mesh1.material as any).bumpTexture.vScale = 5;
          (mesh1.material as any).bumpTexture.uScale = 5;
          continue;
        } else if (mesh1.material!.name === "panel_zip") {
          mesh1.material!.dispose();
          mesh1.material = scene!.materials[panelZipIndex];
          continue;
        } else if (mesh1.material!.name === "panel_lin") {
          mesh1.material!.dispose();
          mesh1.material = scene!.materials[panelLinIndex];
          continue;
        } else if (mesh1.material!.name === "stitch") {
          mesh1.material!.dispose();
          mesh1.material = scene!.materials[stitchIndex];
          continue;
        } else if (mesh1.material!.name === "metal_zip") {
          mesh1.material!.dispose();
          mesh1.material = scene!.materials[metalZipIndex];
          continue;
        } else {
          break;
        }
      } catch {
        break;
      }
    }
  }

  return null;
};
export const MeshManager: React.FC<any> = ({ uniMeshTaskLoader }) => {
  let scene = useScene();
  const meshName = uniMeshTaskLoader[0].name;
  const loadedAssets = useAssetManager(uniMeshTaskLoader);

  console.log("name : ", meshName);
  // const mesh = loadedAssets.taskNameMap[meshName] as MeshAssetTask;

  // JLoadMatAction(scene,meshName,loadedAssets)

  return null;
};

export const SceneDisposer: React.FC<any> = ({ currMeshList }) => {
  const scene = useScene();
  let sceneNodes = scene!.rootNodes;

  for (let i = 0; i < sceneNodes!.length; i++) {
    if (
      (sceneNodes![i].getClassName() === "Mesh" &&
        sceneNodes![i].name.includes("L")) ||
      sceneNodes![i].name.includes("A")
    ) {
      if (!currMeshList.includes(sceneNodes![i].name)) {
        console.log("yes ", sceneNodes![i].name);
        // sceneNodes![i].dispose()
        for (let mesh of sceneNodes![i].getChildren()) {
          mesh.dispose();
        }
      }
      //  console.log(sceneNodes![i].name)
    }
  }

  return null;
};

export const SwitchManager: React.FC<any> = ({
  assetSliderState,
  switchMeshStates,
}) => {
  const { partDisable, disableList, curPartsId } = switchMeshStates;

  const scene = useScene();

  if (partDisable.flag) {
    saSceneSetter(
      scene,
      disableList,
      partDisable,
      curPartsId[assetSliderState.part].jpId
    );
  }

  // Why? : MeshLoad
  // saMeshLoaded(scene)

  return null;
};

export const MeshSceneCounter = () => {
  let scene = useScene();
  let sceneNodes = scene?.rootNodes;

  // for (let nodes of sceneNodes!){
  //   console.log("nodes ",nodes)

  // }
  for (let i = 0; i < sceneNodes!.length; i++) {
    if (
      (sceneNodes![i].getClassName() === "Mesh" &&
        sceneNodes![i].name.includes("L")) ||
      sceneNodes![i].name.includes("A")
    ) {
      console.log(sceneNodes![i].name);
    }
  }

  return null;
};

export const SceneTextureManager: React.FC<any> = ({
  matDefualtCurData,
  matState,
}) => {
  let scene = useScene();
  console.log(matDefualtCurData);

  if (matState.state) {
    JCMatLoad(scene, matState.matType, matState.matMaps, matState.matOver);
  }

  return null;
};

const ArtworkLogoManager = () => {
  let scene = useScene();
  let sceneNodes = scene?.rootNodes;

  // for (let nodes of sceneNodes!){
  //   console.log("nodes ",nodes)

  // }
  for (let i = 0; i < sceneNodes!.length; i++) {
    if (
      (sceneNodes![i].getClassName() === "Mesh" &&
        sceneNodes![i].name.includes("L")) ||
      sceneNodes![i].name.includes("A")
    ) {
      // console.log(sceneNodes![i].name)
      if (sceneNodes![i].name.includes("fr")) {
        let mesh = sceneNodes![i];
        let panel = sceneNodes![i].getChildren()[0];
        console.log(panel);
        console.log(mesh);
        let p = panel as any;

        var decalMaterial = new StandardMaterial("decalMat", scene!);
        decalMaterial.diffuseTexture = new Texture(
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-blk-s1/metal_normal.png",
          scene!
        );
        decalMaterial.diffuseTexture.hasAlpha = true;

        (decalMaterial.diffuseTexture as any).vAng = Math.PI;

        var decal = MeshBuilder.CreateDecal("decal", p, {
          position: new Vector3(0, 7, -0.01),
          normal: new Vector3(0, 0, -1),
          size: new Vector3(1, 1, 1),
        });
        decal.material = decalMaterial;
      }
    }
  }

  return null;
};

const ArtworkManager = ({ artworkState }) => {
  const onDecalMaterial = (artworkPath, scene) => {
    var decalMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
      "decalMat",
      scene
    );
    decalMaterial.baseTexture = new BABYLON.Texture(artworkPath, scene);
    decalMaterial.baseTexture.hasAlpha = true;
    (decalMaterial.baseTexture as any).vAng = Math.PI;
    decalMaterial.metallic = 0;
    return decalMaterial;
  };

  const onDecalBuilder = (mesh, artPosition) => {
    let decal;
    if (artPosition === "Left Chest") {
      decal = BABYLON.MeshBuilder.CreateDecal("decal", mesh, {
        position: new BABYLON.Vector3(-0.4, 7.6, 0.001),
        normal: new BABYLON.Vector3(0, 0, -1),
        size: new BABYLON.Vector3(1, 1, 1),
      });
    } else if (artPosition === "Back") {
      decal = BABYLON.MeshBuilder.CreateDecal("decal", mesh, {
        position: new BABYLON.Vector3(0, 7.3, 0),
        normal: new BABYLON.Vector3(0, 0, 1),
        size: new BABYLON.Vector3(2, 2, 2),
      });
    }

    return decal;
  };

  let scene = useScene();
  let sceneNodes = scene?.rootNodes;

  // for (let nodes of sceneNodes!){
  //   console.log("nodes ",nodes)

  // }
  for (let i = 0; i < sceneNodes!.length; i++) {
    if (
      (sceneNodes![i].getClassName() === "Mesh" &&
        sceneNodes![i].name.includes("L")) ||
      sceneNodes![i].name.includes("A")
    ) {
      // console.log(sceneNodes![i].name)
      if (sceneNodes![i].name.includes("fr")) {
        let mesh = sceneNodes![i];
        let panel = sceneNodes![i].getChildren()[0];
        console.log(panel);
        console.log(mesh);
        let p = panel as any;
        console.log(artworkState.position);

        let decal = onDecalBuilder(p, "Left Chest");
        decal.material = onDecalMaterial(
          "https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/Materials/Hardware/ZipperPuller/mth-zpp-blk-s1/metal_normal.png",
          scene
        );

        // for (let nodes of sceneNodes!){
        //    if(nodes.name ==="decal"){
        //     (nodes as any).absolutePosition.z=0
        //     console.log("decal ",(nodes as any).absolutePosition)
        //    }
        // }
      }
    }
  }

  return null;
};

const ArtworkLogoManagerTest = ({artworkState}) => {

  let mt:Mesh;
  let scene = useScene();


  //remove decal
  let position:any;
  let normal:any
  let size:any
 
  if(artworkState.decal ==='Left Chest'){
    position =new Vector3(-0.45, 7.7, 0.001)
    normal =new Vector3(0, 0, -1)
    size=new Vector3(0.5, 0.5, 0.5)
  }
  else if(artworkState.decal ==='Right Chest'){
    position =new Vector3(0.45, 7.7, 0.001)
    normal =new Vector3(0, 0, -1)
    size=new Vector3(0.5, 0.5, 0.5)
  }
  else if(artworkState.decal ==='Back'){
    console.log("bk runs")
    position =new Vector3(0, 7.5, 0.001)
    normal =new Vector3(0, 0, 1)
    size=new Vector3(2, 2, 2)
  }
  else if(artworkState.decal ==='Right Arm'){
    position =new Vector3(0.4, 7.6, 0.001)
    normal =new Vector3(0, 0, 1)
    size=new Vector3(2, 2, 2)
  }
  else if(artworkState.decal ==='Left  Arm'){
    position =new Vector3(0, 0, 0.001)
  }

  let sceneNodes = scene?.rootNodes;

  for (let i = 0; i < sceneNodes!.length; i++) {
    if(sceneNodes![i].name===artworkState.decal){
      sceneNodes![i].dispose()
    }
  }


  for (let i = 0; i < sceneNodes!.length; i++) {
    if (
      (sceneNodes![i].getClassName() === "Mesh" &&
        sceneNodes![i].name.includes("L")) ||
      sceneNodes![i].name.includes("A")
    ) {
      // console.log(sceneNodes![i].name)
      if (sceneNodes![i].name.includes(artworkState.part)) {
        let p:any
        if(sceneNodes![i].name.includes('fr') || sceneNodes![i].name.includes('bk')){
          let mesh = sceneNodes![i];
          let panel = sceneNodes![i].getChildren()[0];
          console.log(panel);
           p = panel as any;

        }

        if(sceneNodes![i].name.includes('sl') ){
          let mesh = sceneNodes![i];
          let panel = sceneNodes![i].getChildren()[0];
          console.log(panel);
           p = panel as any;
        }
      
       


        

        var decalMaterial = new PBRMetallicRoughnessMaterial(`${artworkState.decal} Mat`,scene!);
        decalMaterial.baseTexture = new Texture(artworkState.imgFile, scene!);
        decalMaterial.baseTexture.hasAlpha = true;
        (decalMaterial.baseTexture as any).vAng = Math.PI;
        decalMaterial.metallic = 0;
        decalMaterial.zOffset = -2;

        
      
        var decal = MeshBuilder.CreateDecal(artworkState.decal, p, {
          position: position,
          normal: normal,
          size: size,
          // cullBackFaces:true
          // localMode:true
        })

        decal.material = decalMaterial;



      }
    }
  }

  










    
  return null;
};
const ArtworkLogoManagerTest1 = ({artworkState}) => {

  let mt:Mesh;
  let scene = useScene();


  let sceneNodes = scene?.rootNodes;

  // for (let nodes of sceneNodes!){
  //   console.log("nodes ",nodes)

  // }
  let mp =sceneNodes![3].getChildren()[0]


        var textureResolution = 512;
        var textureGround = new DynamicTexture("dynamic texture", textureResolution, scene);   
        var textureContext = textureGround.getContext();

        // var materialGround = new StandardMaterial("Mat", scene!);    				
        // materialGround.diffuseTexture = textureGround;
     

        var writingPlane = (mp as any).clone("writingPlane");
        writingPlane.parent = mp;



       let img =document.getElementById('artLogo')!
//        img!.onload=function(){
//         textureContext.drawImage(this, 100, 100);
//         textureGround.update();	
//        }

//        var mat = new StandardMaterial("mat", scene!);

// // dynamicTexture.wAng=Math.PI;
// mat.diffuseTexture = textureGround;
// mat.diffuseTexture.hasAlpha = true;


// writingPlane.material = mat;

      //  textureContext.drawImage(this, 100, 100);
      //  textureGround.update();	
        
        // var img = new Image();
        // img.src = 'textures/grass.png';
        // img.onload = function() {
        //       //Add image to dynamic texture
        
        
     
        



      
    
  

  










    
  return null;
};
