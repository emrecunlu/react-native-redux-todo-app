import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./services/todoApi";
import modalReducer from './features/modalSlice'

export const store = configureStore({
    reducer: {
      modal: modalReducer,
      [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
  })
  