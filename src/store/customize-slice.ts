import { createAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "react-babylonjs";


const initialState = {
  _material:[],
  _meshTaskLoader:[] as any[],
  _meshTaskStates:{
    isProcessed:false
  },
  _sceneSettingState:{
    sceneSettings:{},
    isProcessed:false
  },
  _matDefaultState:{
    matDefault:{},
    isProcessed:false
  },
  _assetSliderState:{
    part:"front"
  },

  currParts:{
    front:{
      jpId:'',
    },
    back:{
      jpId:'',
    },
    collar:{
      jpId:'',
    },
    closureZipper:{
      jpId:'',
    },
    sleeves:{
      jpId:'',
    },
    hem:{
      jpId:'',
    },
    waistPockets:{
      jpId:'',
    },
    cuffs:{
      jpId:'',
    }
  
  },

  _jpMeshStates:{
    isMeshState:false,
    disposePart:'',
    disposeState:false,
    firstMeshLoad:true,
    partName:'',
    partMeshLoad:false,
    prevPartName:'',
    partEnableId:'',
  },
  currJacketData:[],


   _switchMeshStates:{
    meshTaskLoader:{},
    meshLoadState:{
      isMeshLoaded:false,
      mcr:8,
      mbr:6,
      mdr:4
    },
    meshStates:{
     meshCount:0,
     loadCount:0,
     loaded:false
    },
    curPartsId:{
     front:{
       jpId:'',
     },
     back:{
       jpId:'',
     },
     collar:{
       jpId:'',
     },
     closureZipper:{
       jpId:'',
     },
     sleeves:{
       jpId:'',
     },
     hem:{
       jpId:'',
     },
     waistPockets:{
       jpId:'',
     }
    },
    partDisable:{
      name:"",
      flag:false,
      mode:""
    },
    partEnable:{
     name:"",
     flag:false,
    },
    sceneList:["crm-fr-L1D1"] as string[],
    disableList:[] as string[],
   }

};

const customizeSlice = createSlice({
  name: "customizeState",
  initialState:initialState,
  
  reducers: {
    _setMeshTask(state,action){
      let meshTask =action.payload
      state._meshTaskLoader=meshTask
      state._meshTaskStates.isProcessed=true
    },
    _resetMeshTask(state){
  
      state._meshTaskLoader=[]
      state._meshTaskStates.isProcessed=false
    },
    _setScene(state,action){
      state._sceneSettingState.sceneSettings=action.payload
      state._sceneSettingState.isProcessed=true
    },
    _setMatDefault(state,action){
      state._matDefaultState.matDefault=action.payload
      state._matDefaultState.isProcessed=true
    },
    _updateAssetSlider(state,action){
      state._assetSliderState.part=action.payload
    },
    _jpRemoveMesh(state,action){
      let part=action.payload;
      state._jpMeshStates.prevPartName = state._meshTaskLoader[part].pop()
    },
    _jpAddMeshLoader(state,action){
      let meshData =action.payload;
      let meshtask =meshData.jpMeshTask
      let name =meshData.jpName
      state._meshTaskLoader[name].push({ taskType: TaskType.Mesh, rootUrl:meshtask.rootUrl, sceneFilename:meshtask.sceneFilename , name:meshtask.name})
  
     },

     _jpMeshDisposer(state,action){
      let val =action.payload;
      state._jpMeshStates.disposeState=val.flag;
      state._jpMeshStates.disposePart=val.name;
    },
    _jpUpdateEnableId(state,action){
      state._jpMeshStates.partEnableId =action.payload;
    },
    _updateCurrSwitchPart(state,action){
      let jPart =action.payload;
      state.currParts[jPart.name].jpId =jPart.jpId;
    },
    _updateCurrJData(state,action){
      let jParts =action.payload
      state.currJacketData =jParts;
  
      Object.keys(state.currParts).map(
        function(key, index){
          let partData = jParts.filter(part=>part.jpName === key)
          if(partData[0] !== undefined){
          state.currParts[key].jpId =partData[0].jpId
          }
  
        })
    },
    _updateMeshState(state,action){
      let meshState = action.payload;
      state._switchMeshStates.meshStates=meshState;
    },
    _addCurrPartIds(state,action){
      state._switchMeshStates.curPartsId=action.payload
    },
    _updatePartMeshTask(state,action){
      let part= action.payload
      let meshTask =part.meshTask
      state._switchMeshStates.meshTaskLoader[part.name]=[{ taskType: TaskType.Mesh, rootUrl:meshTask.rootUrl, sceneFilename:meshTask.sceneFilename , name:meshTask.name}]
    },
    _updateCurPartId(state,action){
      let part= action.payload
      state._switchMeshStates.curPartsId[part.name].jpId=part.jpId
    },
    _addToDisableList(state,action){
      const partID=action.payload;
      let uDisableList = state._switchMeshStates.disableList
      uDisableList.push(partID)
      const set =new Set(uDisableList)
      state._switchMeshStates.disableList=[...set]
     },

     _updatePartDisable(state,action){
      let part=action.payload;
      state._switchMeshStates.partDisable.name=part.name
      state._switchMeshStates.partDisable.flag=part.flag
      state._switchMeshStates.partDisable.mode=part.mode
    },
    _removeFromDisableList(state,action){
      let pId =action.payload;
      let uDisableList = state._switchMeshStates.disableList
      const index= uDisableList.findIndex((partID) => partID === pId);
      uDisableList.splice(index, 1);
      state._switchMeshStates.disableList =uDisableList
    },
    _addMeshTaskLoader(state,action){
      state._switchMeshStates.meshTaskLoader=action.payload
     },

    _updadeMeshLoadedState(state,action){
      state._switchMeshStates.meshLoadState.isMeshLoaded=action.payload
    },
    reset(state){
      return initialState
    }



  },
});

export const customizeActions = customizeSlice.actions;

export default customizeSlice.reducer;
