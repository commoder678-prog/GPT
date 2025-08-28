import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice
  },
});
