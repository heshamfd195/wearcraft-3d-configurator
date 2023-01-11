import { Scene } from "babylonjs"
import { useMemo } from "react"
import { createPBRMat } from "../../setup/PBRmat"
import { useScene } from "babylonjs-hook"
import { MeshAssetTask, Texture } from "@babylonjs/core"


let list=['panel','stitch','panel_zip','panel_sl','panel_sr','panel_lin',"metal_zip"]
export const acMatUpdate=(scene:any,defMat:any)=>{



  const {panel,panel_zip,panel_lin,stitch,metal_zip,panel_sl,metal_btn} =defMat
    
  let panelMat = createPBRMat(scene,"panelMat",panel)
  // let panelZip = createPBRMat(scene,"panelZip",panel_zip)
  // let panelLin = createPBRMat(scene,"panelLin",panel_lin)
  // let stitchMat = createPBRMat(scene,"stitchMat",stitch)
  // let metalZip = createPBRMat(scene,"metalZip",metal_zip)
  // let panelSl  = createPBRMat(scene,"panelSl",panel_sl)
  // let metalBtn= createPBRMat(scene,"metalBtn",metal_btn)




  // console.log("Materials :",scene.materials[0])
  for (let mat of scene.materials){
    if(mat.name === 'panel'){
     console.log(panelMat)
      // mat.dispose()
      mat=panelMat
    }



    //  console.log("Def name: ",defMat[mat.name]?.mType)
    // if(mat.name === defMat[mat.name ]?.mType){
    //   console.log(" Success :", mat.name)
    // }
  }

}
export const acMeshMatUpdate=(mesh:any,defMat?:any)=>{
  // let matName =mesh.name
  // mesh.material=defMat[]

  for (let i=1;i<mesh.length;i++){
    console.log(" Mesh Material Name",mesh[i].material.name)
    // console.log(" Def Match Material",defMat[mesh[i].material.name])
    console.log(" Def Match Material",defMat)
  }

}

export const acMatOver=(mesh:any,defMat:any)=>{
  let scene =useScene()
  const {panel,panel_zip,panel_lin,stitch,metal_zip,panel_sl,metal_btn} =defMat
    
  let panelMat = createPBRMat(scene,"panelMat",panel)
  if(mesh.material.name ==='panel'){
    console.log("mes mat :  ",mesh.material)
  }
}


export const JLoadMatAction = (
  scene: any,
  meshName: any,
  loadAssets?: any
) => {
  // let pbr = new BABYLON.PBRMaterial("pbr", scene);
  // // pbr.albedoTexture.hasAlpha = true;
  // pbr.albedoTexture = new BABYLON.Texture(material.jacket.baseColor, scene);
  // pbr.bumpTexture = new BABYLON.Texture(material.jacket.normal, scene);
  // pbr.metallicTexture = new BABYLON.Texture(
  //   material.jacket.occlusionRoughnessMetallic,
  //   scene
  // );

  let panelMatIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelMat');
  let panelZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelZip');
  let panelLinIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelLin');
  let stitchIndex = scene.materials.map(function(x) {return x.id; }).indexOf('stitchMat');
  let metalZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('metalZip');
  let panelSlIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelSl');
 

  let mesh;
  const assetTask = loadAssets.taskNameMap[meshName] as MeshAssetTask;
  for (let i = 1; i < assetTask.loadedMeshes.length; i++) {
    mesh = assetTask.loadedMeshes[i];
    console.log(  mesh.material.name)
  
    // console.log(meshName, mesh.id);
    if (mesh.material.name === "panel"  ) {
        mesh.material.dispose()
        mesh.material =scene.materials[panelMatIndex]

        mesh.material.albedoTexture.uScale=5
        mesh.material.albedoTexture.vScale=5
        mesh.material.bumpTexture.vScale = 5;
        mesh.material.bumpTexture.uScale = 5;
    }
    if (mesh.material.name === "panel_sl"  || mesh.material.name === "panel_sr" ) {
        mesh.material.dispose()
        mesh.material =scene.materials[panelSlIndex]

        mesh.material.albedoTexture.uScale=5
        mesh.material.albedoTexture.vScale=5
        mesh.material.bumpTexture.vScale = 5;
        mesh.material.bumpTexture.uScale = 5;
    }

    if(mesh.material.name === "panel_zip"){
      mesh.material.dispose()
      mesh.material =scene.materials[panelZipIndex]
    }

    if(mesh.material.name === "panel_lin"){
      mesh.material.dispose()
      mesh.material =scene.materials[panelLinIndex]
    }
    if(mesh.material.name === "stitch"){
      mesh.material.dispose()
      mesh.material =scene.materials[stitchIndex]
    }
    if(mesh.material.name === "metal_zip"){
      mesh.material.dispose()
      mesh.material =scene.materials[metalZipIndex]
    }


  }
}



export const JLoadMatAction1 = (
  scene: any,
  meshName: any,
  loadAssets?: any
) => {
  // let pbr = new BABYLON.PBRMaterial("pbr", scene);
  // // pbr.albedoTexture.hasAlpha = true;
  // pbr.albedoTexture = new BABYLON.Texture(material.jacket.baseColor, scene);
  // pbr.bumpTexture = new BABYLON.Texture(material.jacket.normal, scene);
  // pbr.metallicTexture = new BABYLON.Texture(
  //   material.jacket.occlusionRoughnessMetallic,
  //   scene
  // );

  // let panelMatIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelMat');
  // let panelZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelZip');
  // let panelLinIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelLin');
  // let stitchIndex = scene.materials.map(function(x) {return x.id; }).indexOf('stitchMat');
  // let metalZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('metalZip');
  // let panelSlIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelSl');
 

  let mesh;
  const assetTask = loadAssets.taskNameMap[meshName] as MeshAssetTask;
  mesh = assetTask.loadedMeshes[2]
  // console.log(scene!)
  
  // for (let i = 1; i < assetTask.loadedMeshes.length; i++) {
  //   mesh = assetTask.loadedMeshes[i];
  //   // console.log(meshName, mesh.id);
  //   if (mesh.material.name === "panel"  ) {
  //       mesh.material.dispose()
  //       mesh.material =scene.materials[panelMatIndex]

  //       mesh.material.albedoTexture.uScale=5
  //       mesh.material.albedoTexture.vScale=5
  //       mesh.material.bumpTexture.vScale = 5;
  //       mesh.material.bumpTexture.uScale = 5;
  //   }
  //   if (mesh.material.name === "panel_sl"  || mesh.material.name === "panel_sr" ) {
  //       mesh.material.dispose()
  //       mesh.material =scene.materials[panelSlIndex]

  //       mesh.material.albedoTexture.uScale=5
  //       mesh.material.albedoTexture.vScale=5
  //       mesh.material.bumpTexture.vScale = 5;
  //       mesh.material.bumpTexture.uScale = 5;
  //   }

  //   if(mesh.material.name === "panel_zip"){
  //     mesh.material.dispose()
  //     mesh.material =scene.materials[panelZipIndex]
  //   }

  //   if(mesh.material.name === "panel_lin"){
  //     mesh.material.dispose()
  //     mesh.material =scene.materials[panelLinIndex]
  //   }
  //   if(mesh.material.name === "stitch"){
  //     mesh.material.dispose()
  //     mesh.material =scene.materials[stitchIndex]
  //   }
  //   if(mesh.material.name === "metal_zip"){
  //     mesh.material.dispose()
  //     mesh.material =scene.materials[metalZipIndex]
  //   }


  // }
}



export const JCMatLoad=(scene,matType,matMaps,matOver)=>{
  let panelMatIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelMat');
  let panelZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelZip');
  let panelLinIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelLin');
  let stitchIndex = scene.materials.map(function(x) {return x.id; }).indexOf('stitchMat');
  let metalZipIndex = scene.materials.map(function(x) {return x.id; }).indexOf('metalZip');
  let panelSlIndex = scene.materials.map(function(x) {return x.id; }).indexOf('panelSl');


  if(matOver ==='Torso'){
    if(matType === "panel"){
      scene.materials[panelMatIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelMatIndex].albedoTexture.uScale=5
      scene.materials[panelMatIndex].albedoTexture.vScale=5
  
      scene.materials[panelMatIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelMatIndex].bumpTexture.uScale=5
      scene.materials[panelMatIndex].bumpTexture.vScale=5
  
      scene.materials[panelMatIndex].metallicTexture = new Texture(matMaps.occlusion,scene);
    }
  }


  if(matOver ==='Full Jacket'){
 
    if(matType === "panel"){
      scene.materials[panelMatIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelMatIndex].albedoTexture.uScale=5
      scene.materials[panelMatIndex].albedoTexture.vScale=5
  
      scene.materials[panelMatIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelMatIndex].bumpTexture.uScale=5
      scene.materials[panelMatIndex].bumpTexture.vScale=5

      scene.materials[panelSlIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelSlIndex].albedoTexture.uScale=5
      scene.materials[panelSlIndex].albedoTexture.vScale=5
  
      scene.materials[panelSlIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelSlIndex].bumpTexture.uScale=5
      scene.materials[panelSlIndex].bumpTexture.vScale=5
    }
    if(matType === "panel_sl" || matType === "panel_sl"){
      scene.materials[panelSlIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelSlIndex].albedoTexture.uScale=5
      scene.materials[panelSlIndex].albedoTexture.vScale=5
  
      scene.materials[panelSlIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelSlIndex].bumpTexture.uScale=5
      scene.materials[panelSlIndex].bumpTexture.vScale=5
    }

    

  }


  if(matOver ==='Sleeves'){
  
      scene.materials[panelSlIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelSlIndex].albedoTexture.uScale=5
      scene.materials[panelSlIndex].albedoTexture.vScale=5
      scene.materials[panelSlIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelSlIndex].bumpTexture.uScale=5
      scene.materials[panelSlIndex].bumpTexture.vScale=5
      scene.materials[panelSlIndex].metallicTexture = new Texture(matMaps.occlusion,scene);
       

  }

  if(matOver ==='Sleeves'){
  
    if(matType === "panel_sl" || matType === "panel_sl"){
      scene.materials[panelSlIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
      scene.materials[panelSlIndex].albedoTexture.uScale=5
      scene.materials[panelSlIndex].albedoTexture.vScale=5
  
      scene.materials[panelSlIndex].bumpTexture = new Texture(matMaps.normal,scene);
      scene.materials[panelSlIndex].bumpTexture.uScale=5
      scene.materials[panelSlIndex].bumpTexture.vScale=5
    }
       

  }

  if(matType === "panel_zip"){
    
    scene.materials[panelZipIndex].albedoTexture = new Texture(matMaps.baseColor,scene);
    // scene.materials[panelZipIndex].albedoColor=new Color3(0,0,0)
    scene.materials[panelZipIndex].bumpTexture = new Texture(matMaps.normal,scene);

  }
 




  return null
}






