import { Scene } from "babylonjs"

export{}

export const acMatUpdate=(scene:any)=>{
  // console.log("Materials :",scene.materials[0])
  for (const mat of scene.materials){
     if(mat.name ==="panel")
     console.log("mat name: ",mat.name)
  }

}