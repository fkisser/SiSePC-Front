import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  careers: [],
  curriculums: [],
  isLoading: true,
  error: false,
};

const curriculumsSlice = createSlice({
  name: "curriculums",
  initialState: INITIAL_STATE,
  reducers: {
    loadingCurriculums: ((state) => {
      return {
        ...state,
        isLoading: true,
      }
    }),
    successCurriculums: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        curriculums: [...action.payload],
      }
    }),
    successCareers: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        careers: [...action.payload],
      }
    }),
    errorCurriculums: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }),
  },
});

export const { loadingCurriculums, successCurriculums, successCareers, errorCurriculums } = curriculumsSlice.actions;

export default curriculumsSlice.reducer;