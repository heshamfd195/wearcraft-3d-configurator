import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _material:[],
  _meshTaskLoader:[],
  _meshTaskStates:{
    isProcessed:false
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


  },
});

export const customizeActions = customizeSlice.actions;

export default customizeSlice.reducer;
