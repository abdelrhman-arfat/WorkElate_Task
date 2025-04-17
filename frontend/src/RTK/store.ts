import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux-slices/authSlice";
import { RTKQuery } from "./RTK-query/RTKQuery";
import searchReducer from "./redux-slices/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [RTKQuery.reducerPath]: RTKQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RTKQuery.middleware),
  devTools: import.meta.env.VITE_NODE_DEV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
