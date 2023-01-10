import { CubeTexture, MeshBuilder ,StandardMaterial} from '@babylonjs/core';
import * as BABYLON from 'babylonjs';
import { useScene } from 'babylonjs-hook';
import React from 'react';






const  EnvironmentSetup:React.FC<any>=(sceneSettings:any)=>{
    
  let scene =useScene()
  // console.log(sceneSettings.url)
  // let envTexture =sceneSettings.url
  let envTexture ="https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/SceneSettings/environment.env"
  let env :any = {};
  env.lighting =CubeTexture.CreateFromPrefilteredData(envTexture, scene!);
  env.lighting.name = "hamburg_hbf";
  env.lighting.srgb = true;
  env.lighting.gammaSpace = false;
  env.lighting.rotationY = BABYLON.Tools.ToRadians(0);
  scene!.environmentTexture = env.lighting;

  env.skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene!);
  env.skyboxMaterial = new StandardMaterial("skyBox", scene!);
  env.skyboxMaterial.backFaceCulling = true; //True means no backgoeund at back
  env.skyboxMaterial.reflectionTexture = new CubeTexture(envTexture, scene!);
  env.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  env.skyboxMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
  env.skyboxMaterial.specularColor = new BABYLON.Color3(0.8, 0.8, 0.8);
  env.skyboxMaterial.cameraExposure = 1.5;
  env.skyboxMaterial.cameraContrast = 1.5;
  env.skybox.material = env.skyboxMaterial;
   
  return null

};

export default EnvironmentSetup;