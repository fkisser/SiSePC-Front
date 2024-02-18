import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentStudent: null,
  isLoading: true,
  error: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState: INITIAL_STATE,
  reducers: {
    loadingStudent: ((state) => {
      return {
        ...state,
        isLoading: true,
      }
    }),
    successStudent: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: false,
        currentStudent: { ...action.payload },
      }
    }),
    newDetallePlanStudent: ((state, action) => {
      return {
        ...state,
        currentStudent: { ...state.currentStudent, detallePlan: action.payload },
      }
    }),
    newActionsStudent: ((state, action) => {
      return {
        ...state,
        currentStudent: { ...state.currentStudent, acciones: [...action.payload] },
      }
    }),
    errorStudent: ((state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }),
  },
});

export const { loadingStudent, successStudent, errorStudent, newDetallePlanStudent, newActionsStudent } = studentSlice.actions;

export default studentSlice.reducer;