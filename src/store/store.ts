import { configureStore } from '@reduxjs/toolkit';
import faultCodesReducer from './faultCodesSlice';

export const store = configureStore({
  reducer: {
    faultCodes: faultCodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
