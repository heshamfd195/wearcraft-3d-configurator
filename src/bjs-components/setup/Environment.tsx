
import { CubeTexture } from '@babylonjs/core';
import { useScene } from 'babylonjs-hook';
import React, { useMemo } from 'react'

export const  EnvironmnetLoader=()=> {
    useMemo(()=>{
        let scene = useScene();
        var hdrTexture = new CubeTexture("https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/SceneSettings/environment.env", scene!);
        scene!.createDefaultSkybox(hdrTexture, true, 10000);
        for (let mat of scene!.materials){
         
          if(mat.id==="skyBox"){
            mat.backFaceCulling=true
           
          }
        }
      },[])
  return null
}

