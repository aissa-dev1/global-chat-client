import { For } from "solid-js";
import { ChatMessageType } from "../../features/chat";
import ChatMessage from "./chatMessage";

interface Props {
  list: ChatMessageType[];
}

export default function ChatMessageList(props: Props) {
  return (
    <div class="flex flex-col gap-2">
      <For each={props.list}>
        {(chatMesage) => <ChatMessage {...chatMesage} />}
      </For>
    </div>
  );
}
