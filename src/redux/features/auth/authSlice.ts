import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  index_no: string;
  surname: string;
  first_name: string;
  other_name: string;
  role: "";
  isVerified: boolean;
};

type AuthState = {
  access_token: string;
  user: User | null;
};

const initialState: AuthState = {
  access_token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ access_token: string }>
    ) => {
      state.access_token = action.payload.access_token;
    },
    userLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.access_token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.access_token = "";
      state.user = null;
    },
  },
});

export const { userRegistration, userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
