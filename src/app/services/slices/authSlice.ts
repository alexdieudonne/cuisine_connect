
import { RootState } from "@/app/store";
import IUser from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: IUser | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    resetCredentials: () => initialState,
  },
});

export const { setCredentials, resetCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;