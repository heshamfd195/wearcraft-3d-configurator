import {
    MeshBuilder,
    Nullable,
    MeshAssetTask,
    Vector3,
    Texture,
    AssetsManager,
    Scene,
    TextureAssetTask,
    DynamicTexture,
    StandardMaterial,
    PBRMaterial,
  } from "@babylonjs/core";

  import * as BABYLON from "babylonjs";
import { Material } from "react-babylonjs";


const createPBRMat=(scene:any,matName:any,matType:any)=>{
      let customMat =new BABYLON.PBRMaterial(matName, scene);
      customMat.useRoughnessFromMetallicTextureAlpha = false;
      customMat.useRoughnessFromMetallicTextureGreen = true;
      customMat.useMetallnessFromMetallicTextureBlue = true;
      // console.log(matType)

      customMat.albedoTexture = new BABYLON.Texture(matType.mMaps.baseColor, scene);
      // customMat.roughness =0.8

      customMat.bumpTexture = new BABYLON.Texture(matType.mMaps.normal, scene);
      customMat.metallicTexture = new BABYLON.Texture(matType.mMaps.occlusion,scene)

      return customMat

}
export const PBRMat = (scene:any, material:any) => {
    
 
    const {panel,panel_zip,panel_lin,stitch,metal_zip,panel_sl,metal_btn} =material
    
    let panelMat = createPBRMat(scene,"panelMat",panel)
    let panelZip = createPBRMat(scene,"panelZip",panel_zip)
    let panelLin = createPBRMat(scene,"panelLin",panel_lin)
    let stitchMat = createPBRMat(scene,"stitchMat",stitch)
    let metalZip = createPBRMat(scene,"metalZip",metal_zip)
    let panelSl  = createPBRMat(scene,"panelSl",panel_sl)
    let metalBtn= createPBRMat(scene,"metalBtn",metal_btn)


}