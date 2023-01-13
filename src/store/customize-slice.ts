import { createAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "react-babylonjs";


const initialState = {
  _material:[],
  _meshTaskLoader:[] as any[],
  _jpUniMeshLoader:[] as any[],
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


  currJacketData:[],

  _stageFlags:{
    is_style:true,
    is_material:false,
    is_color:false,
    is_artwork:false
  },


   _switchMeshStates:{
    meshTaskLoader:{},
    currMeshList:[] as any,
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
     chestPockets:{
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
   },
   _matDefualtData:{},
  _matState:{
  state:false,
  selectedMat:'',
  matType:'',
  matMaps:{},
  matOver:'Full Jacket',
  matLeatherType:'Cowhide',
  option:'leather',
  
},

_matColor:{
  mode:'zipper',
  color:'black'

},

_matOptions:{
  leather:{
    selected:true,
    name:'Leather Type',
    options:['Cowhide','SheepSkin']
  },
  fabric:{
    selected:false,
    name:'Fabric Type',
    options:['Wool','Polyester']
  },
},

_artworklogoState:{
  position:"left Chest",
  part:"fr",
  imgFile:"",
  flag:false,
  decal:"Left Chest",
  remove:false,
  load:false,
  mat:'',
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

    _jpAddMeshLoader(state,action){
      let meshData =action.payload;
      let meshtask =meshData.jpMeshTask
      let name =meshData.jpName
      state._meshTaskLoader[name].push({ taskType: TaskType.Mesh, rootUrl:meshtask.rootUrl, sceneFilename:meshtask.sceneFilename , name:meshtask.name})
  
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
    _updateUniMeshTask(state){
    
      let currMeshTaskLoader =state._switchMeshStates.meshTaskLoader
      
      Object.keys(currMeshTaskLoader).map(
        function(key, index){
          if(currMeshTaskLoader[key][0] !== undefined)
          state._jpUniMeshLoader.push(currMeshTaskLoader[key][0])
        })
  
    },

    _updateStageStates(state,action){
      let stageChange =action.payload
      let stageFlags =state._stageFlags

      Object.keys(stageFlags).map(
        function(key, index){
          state._stageFlags[key]=false;
        })

      state._stageFlags[stageChange]=true

    },
    _setCurMeshList(state){
     let curParts = state._switchMeshStates.curPartsId

     Object.keys(curParts).map(
      function(key, index){
        state._switchMeshStates.currMeshList.push(curParts[key].jpId)
        
      })
    


    },

    _resetPartSwitch(state){
      state._switchMeshStates.partDisable.flag=false
      state._switchMeshStates.partDisable.mode=""
      state._switchMeshStates.partDisable.name=""
      state._switchMeshStates.partEnable.flag=false
      state._switchMeshStates.partEnable.name=""
      state._switchMeshStates.disableList=[]
    },
    _updateMatData(state,action){
      let matData =action.payload;
      state._matDefualtData =matData;
    },
    _updateMatState(state,action){
      let matData =action.payload;
      state._matState =matData;
    },
    _updateMatOptions(state,action){
      state._matOptions.leather.selected=false
      state._matOptions.fabric.selected=false
      let matOption =action.payload;
      state._matOptions[matOption].selected=true

     
    },
    _updateMatColor(state,action){
      state._matColor.mode =action.payload
    },
    _updateMatOver(state,action){
      state._matState.matOver=action.payload
    },
    _updateArtworkPos(state,action){
      state._artworklogoState.position=action.payload

    },
    _loadArtwork(state,action){
      let data=action.payload
      state._artworklogoState.imgFile=data.imgFile
      state._artworklogoState.flag=true
    },

    _loadArtworkState(state,action){
      let data=action.payload
  
      state._artworklogoState.decal=data.decal
      state._artworklogoState.part=data.part
      state._artworklogoState.mat=data.mat

    },

    

   
    reset(state){
      return initialState
    }



  },
});

export const customizeActions = customizeSlice.actions;

export default customizeSlice.reducer;
