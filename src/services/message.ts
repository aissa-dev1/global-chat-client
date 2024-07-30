import axios from "axios";
import { ChatMessageType } from "../features/chat";
import { getToken } from "../utils/jwt";

interface GetMessagesData {
  messages: ChatMessageType[];
}

export class MessageService {
  readonly messageslimit = 25;
  readonly messagesLoadLimitAdd = 10;

  async getMessages(limit: number): Promise<GetMessagesData> {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/messages?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  }
}
