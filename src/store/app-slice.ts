import { createSlice } from "@reduxjs/toolkit";


const initialAppState = {
   stages:["style","material","color","artwork"]

}

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
  

  }
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice.reducer;
