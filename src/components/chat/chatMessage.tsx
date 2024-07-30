import { createSignal, onCleanup, onMount } from "solid-js";
import { ChatMessageType } from "../../features/chat";
import { store } from "../../store";
import { timeAgo } from "../../utils/time";

export default function ChatMessage({
  userId,
  username,
  content,
  createdAt,
}: ChatMessageType) {
  let createdAtTextInterval!: number;
  let timeAgoDuration = 5000;
  const [createdAtText, setCreatedAtText] = createSignal(timeAgo(createdAt));

  onMount(() => {
    createdAtTextInterval = setInterval(() => {
      setCreatedAtText(timeAgo(createdAt));
    }, timeAgoDuration);
  });

  onCleanup(() => {
    clearInterval(createdAtTextInterval);
  });

  return (
    <div class="flex flex-col gap-2 bg-white text-black p-4 rounded-lg">
      <div class="flex items-center justify-between">
        <h3
          class="text-xl font-bold"
          classList={{
            "text-purple-300": userId === store.user.current.id,
          }}
        >
          {username}
        </h3>
        <span class="text-sm shrink-0 text-slate-700">{createdAtText()}</span>
      </div>
      <p class="text-sm font-medium">{content}</p>
    </div>
  );
}
