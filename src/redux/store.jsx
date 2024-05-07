import { configureStore, combineReducers } from "@reduxjs/toolkit";
import quiz from "./slices/quiz";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
    quizApp:quiz
})

const persistedReducer = persistReducer(persistConfig,reducer);

export default configureStore ({
    reducer:persistedReducer
})