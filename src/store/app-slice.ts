import { createSlice } from "@reduxjs/toolkit";


const initialAppState = {
   stages:{},
   pages:{
    gender:"men",

   },

   _appState:{
    gender:"men"
   }
}

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    _setGender(state,action){
      state._appState.gender=action.payload
    }
  

  }
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice.reducer;
