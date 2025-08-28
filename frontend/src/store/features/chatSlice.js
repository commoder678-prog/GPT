import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
  },
});

export default chatSlice.reducer;
export const {} = chatSlice.actions;
