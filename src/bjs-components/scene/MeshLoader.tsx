import React, { useRef, useContext, useEffect,useMemo ,useLayoutEffect} from 'react';

import { useScene } from 'babylonjs-hook';
import { MeshBuilder, Nullable, MeshAssetTask, Vector3,Texture, AssetsManager, Scene, TextureAssetTask } from '@babylonjs/core';
import { useAssetManager } from 'react-babylonjs';
import { JLoadMatAction, JLoadMatAction1 } from '../actions/materials/mat-action';













export const MeshLoader: React.FC<any> = ({jpMeshTaskLoader}) => {

    let scene =useScene()
    const meshName =jpMeshTaskLoader[0].name
    const loadedAssets = useAssetManager(jpMeshTaskLoader);
    const mesh =loadedAssets.taskNameMap[meshName] as MeshAssetTask;
    const part =mesh.loadedMeshes[0];
    part.name =meshName;
    
    
    


    return null;

}



