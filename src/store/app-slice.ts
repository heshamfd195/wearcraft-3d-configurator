import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
  _stages: {
    list: [
      { label: "Style" },
      { label: "Material" },
      { label: "Color" },
      { label: "Artwork" },
    ],

      cur: "Style",
      pointer: 0,
      initialStage:0,


  },
  _pages: {
    gender: "men",
  },

  _path: {
    allowed: ["style", "material", "color", "artwork"],
    initial: "/",
  },

  _appState: {
    gender: "men",
  },
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    _setGender(state, action) {
      state._appState.gender = action.payload;
    },
    _updateStagePointer(state, action) {
      let pointer = action.payload;
      state._stages.pointer = pointer;
      state._stages.cur = state._stages.list[pointer].label;
    },
    _resetStages(state) {
      state._stages.pointer=state._stages.initialStage;
    },
  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice.reducer;
