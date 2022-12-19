import { Scene } from "babylonjs"
import { useMemo } from "react"
import { createPBRMat } from "../../setup/PBRmat"
import { useScene } from "babylonjs-hook"
import { MeshAssetTask } from "@babylonjs/core"


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






