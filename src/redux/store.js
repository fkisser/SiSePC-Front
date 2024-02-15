import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import confirmReducer from "./confirm/confirmSlice";
import studentsReducer from "./students/studentsSlice";
import studentReducer from "./students/studentSlice";
import curriculumsReducer from "./curriculums/curriculumsSlice";

const reducers = combineReducers({
  user: userReducer,
  confirm: confirmReducer,
  students: studentsReducer,
  student: studentReducer,
  curriculums: curriculumsReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "curriculums", "students", "student"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store);