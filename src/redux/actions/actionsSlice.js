import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  actions: [],
  isLoading: true,
  error: false,
};

const actionsSlice = createSlice({
  name: "actions",
  initialState: INITIAL_STATE,
  reducers: {
    loadingActions: ((state) => {
      return {
        ...state,
        isLoading: true,
      }
    }),
    successActions: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        actions: [...action.payload],
      }
    }),
    loadedActions: ((state) => {
      return {
        ...state,
        isLoading: false,
        error: false,
      }
    }),
    errorActions: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }),
  },
});

export const { loadingActions, successActions, errorActions, loadedActions } = actionsSlice.actions;

export default actionsSlice.reducer;