import { createStore } from "solid-js/store";

export interface ChatMessageType {
  userId: string;
  username: string;
  content: string;
  createdAt: number;
}

interface State {
  messages: ChatMessageType[];
  messagesLoading: boolean;
}

export class ChatStore {
  private readonly _current = createStore<State>({
    messages: [],
    messagesLoading: false,
  });

  updateMessages(messages: ChatMessageType[]) {
    this.setStore("messages", messages);
  }

  setMessagesLoading(loading: boolean) {
    this.setStore("messagesLoading", loading);
  }

  addMessage(data: ChatMessageType) {
    this.setStore("messages", [...this.current.messages, data]);
  }

  private setStore<K extends keyof State>(key: K, value: State[K]) {
    this._current[1](key, value);
  }

  get current(): State {
    return this._current[0];
  }
}
