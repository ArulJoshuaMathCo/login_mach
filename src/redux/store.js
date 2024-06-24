import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth reducer
import { authapi } from './authapi'; // Assuming your api file is in the redux folder

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authapi.reducerPath]: authapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authapi.middleware),
});
