import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  students: [],
  isLoading: true,
  error: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState: INITIAL_STATE,
  reducers: {
    loadingStudents: ((state) => {
      return {
        ...state,
        isLoading: true,
      }
    }),
    successStudents: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        students: [...action.payload],
      }
    }),
    errorStudents: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }),
  },
});

export const { loadingStudents, successStudents, errorStudents } = studentsSlice.actions;

export default studentsSlice.reducer;