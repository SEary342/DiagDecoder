import { configureStore } from "@reduxjs/toolkit"
import faultCodesReducer from "./faultCodesSlice"
import selectionReducer from "./selectionSlice"

export const store = configureStore({
  reducer: {
    faultCodes: faultCodesReducer,
    selection: selectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
