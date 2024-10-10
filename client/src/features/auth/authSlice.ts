// @ts-ignore
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  email: string;
  isActivated: boolean;
  name?: string;
  // id?: number;
  role_id?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
