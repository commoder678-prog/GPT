import api from "../../api/api";
import { loadChats } from "../features/chatSlice";

export const createChat = (title) => async (dispatch) => {
  try {
    const { data } = await api.post("/api/chat", title);

    return data.chat;
  } catch (error) {
    alert("An error Occured");
    console.log(error);
  }
};

export const getChats = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/chat/get-chats");

    dispatch(loadChats(data.chats));
  } catch (error) {
       alert("An error Occured");
       console.log(error);
  }
};
