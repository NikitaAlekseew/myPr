// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer, { setCredentials } from "../features/auth/authSlice";
import editTourReducer from "../features/editTour/editTourSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    editTour: editTourReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export const initAuthState = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/refresh`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      const { accessToken, user } = data;
      store.dispatch(setCredentials({ accessToken, user }));
    } else {
      console.error("Failed to refresh token", response.status);
    }
  } catch (error) {
    console.error("Failed to initialize auth state", error);
  }
};

initAuthState();

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
