import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/UserType";

const initialState: {
  isAuthenticated: boolean;
  user: TUser;
} = {
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    role: "",
    username: "",
    image: "",
  },
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authReducer.actions;
export default authReducer.reducer;
