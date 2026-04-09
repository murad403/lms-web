import { configureStore } from "@reduxjs/toolkit";
import pageHeaderReducer from "./slice/pageHeaderSlice";
import baseApi1 from "./api/baseApi";

export const store = configureStore({
  reducer: {
    pageHeader: pageHeaderReducer,
    [baseApi1.reducerPath]: baseApi1.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi1.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
