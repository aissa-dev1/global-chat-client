import { createSignal, onCleanup, onMount } from "solid-js";
import Button from "../reusable/button";
import Container from "../reusable/container";
import Input from "../reusable/input";
import { store } from "../../store";
import { io } from "socket.io-client";
import { ChatMessageType } from "../../features/chat";

export default function SendChatMessage() {
  const socket = io(`ws://${import.meta.env.VITE_WS_SERVER}`);
  const [input, setInput] = createSignal("");

  onMount(() => {
    socket.on("message", handleMessage);
  });

  onCleanup(() => {
    socket.off("message", handleMessage);
  });

  function handleMessage(text: ChatMessageType) {
    store.chat.addMessage(text);
  }

  function sendMessage() {
    if (!input()) return;

    socket.emit("message", {
      userId: store.user.current.id,
      username: store.user.current.username,
      content: input(),
      createdAt: Date.now(),
    });
    setInput("");
  }

  return (
    <Container class="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2 px-2 lg:px-0">
      <Input
        class="w-full"
        type="text"
        placeholder="Say Hi"
        value={input()}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </Container>
  );
}
