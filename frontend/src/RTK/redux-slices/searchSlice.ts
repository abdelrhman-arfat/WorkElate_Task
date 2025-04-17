import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  search: string;
  startsWith: string;
} = {
  search: "",
  startsWith: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStartsWith: (state, action) => {
      state.startsWith = action.payload;
    },
    deleteSearch: (state) => {
      state.search = "";
      return state;
    },
    deleteStartsWith: (state) => {
      state.startsWith = "";
      return state;
    },
  },
});

export const { setSearch, deleteSearch ,deleteStartsWith,setStartsWith} = searchSlice.actions;
export default searchSlice.reducer;
