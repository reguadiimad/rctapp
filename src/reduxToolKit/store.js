import { configureStore } from '@reduxjs/toolkit';
import personsReducer from './Slices/personSlice';

export const store = configureStore({
  reducer: {
    persons: personsReducer,
  },
});