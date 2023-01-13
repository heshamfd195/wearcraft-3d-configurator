import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
  _customize: {
    style: {
      list: [
        { name: "Front", selected: true ,id:"front"},
        { name: "Back", selected: false ,id:"back"},
        { name: "Collar", selected: false ,id:"collar"},
        { name: "Sleeves", selected: false ,id:"sleeves"},
        { name: "Waist Pockets", selected: false ,id:"waistPockets"},
        { name: "Chest Pockets", selected: false ,id:"chestPockets"},
        { name: "Shoulder", selected: false ,id:"shoulder"},
        { name: "Hem", selected: false ,id:"hem"},
      
      ],
      dList: [
        {
          name: "Pockets",
          options: [
            { label: "Waist", selected: false, value: "wp" },
            { label: "Chest", selected: false, value: "cp" },
          ],
        },
        {
          name: "Cuffs",
          options: [
            { label: "Zipper", selected: false, value: "zcf" },
            { label: "Attach", selected: false, value: "acf" },
          ],
        },
      ],
      selection: {
        prev: 0,
        curr: 0,
      },
    },
    material: {},
    color: {},
    artwork: {},
  },
  _stages: {
    list: [
      { label: "Style" },
      { label: "Material" },
      { label: "Color" },
      { label: "Artwork" },
    ],

    cur: "Style",
    pointer: 0,
    initialStage: 0,
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
    base:{
      id:"",
      isFetched:false
    }
  },
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    _setGender(state, action) {
      state._appState.gender = action.payload;
    },
    _setBase(state, action) {
      state._appState.base = action.payload;
    },
    _updateStagePointer(state, action) {
      let pointer = action.payload;
      state._stages.pointer = pointer;
      state._stages.cur = state._stages.list[pointer].label;
    },
    _resetStages(state) {
      state._stages.pointer = state._stages.initialStage;
    },
    _updateStyleList(state, action) {
      let selectedData = action.payload;
      state._customize.style.selection = selectedData;
      if (selectedData.curr != selectedData.prev) {
        state._customize.style.list[selectedData.curr].selected = true;
        state._customize.style.list[selectedData.prev].selected = false;
      }
      if (selectedData.cur === 0) {
        state._customize.style.list[selectedData.curr].selected = true;
      }
    },
  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice.reducer;
