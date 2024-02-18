import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  tutores: [],
  isLoading: true,
  error: false,
};

const tutoresSlice = createSlice({
  name: "tutores",
  initialState: INITIAL_STATE,
  reducers: {
    loadingTutores: ((state) => {
      return {
        ...state,
        isLoading: true,
      }
    }),
    successTutores: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        tutores: [...action.payload],
      }
    }),
    errorTutores: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }),
  },
});

export const { loadingTutores, successTutores, errorTutores } = tutoresSlice.actions;

export default tutoresSlice.reducer;