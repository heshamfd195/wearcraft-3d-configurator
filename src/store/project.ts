import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const projectSlice = createSlice({
  name: "projectState",
  initialState:initialState,
  reducers: {

  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
