import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  open: false,
  action: null,
  title: "",
  text: ""
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState: INITIAL_STATE,
  reducers: {
    openConfirm: ((state, action) => {
      return {
        ...state,
        open: action.payload[0],
        action: action.payload[1],
        title: action.payload[2],
        text: action.payload[3],
      }
    }),
    closeConfirm: ((state) => {
      return {
        ...state,
        open: false,
        action: null,
        title: "",
        text: ""
      }
    }),
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;