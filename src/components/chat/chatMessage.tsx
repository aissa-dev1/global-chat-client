import { ChatMessageType } from "../../features/chat";
import { store } from "../../store";
import { formatDate, formatTime } from "../../utils/time";

export default function ChatMessage({
  userId,
  username,
  content,
  createdAt,
}: ChatMessageType) {
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
        <div class="flex flex-col gap-2">
          <span class="text-sm shrink-0 text-slate-700">
            {formatDate(createdAt)} | {formatTime(createdAt)}
          </span>
        </div>
      </div>
      <p class="text-sm font-medium">{content}</p>
    </div>
  );
}
