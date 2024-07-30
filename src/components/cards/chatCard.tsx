import { createEffect, on, onCleanup, onMount, Show } from "solid-js";
import { store } from "../../store";
import ChatMessageList from "../chat/chatMessageList";
import { service } from "../../service";
import Loader from "../reusable/loader";
import Button from "../reusable/button";

async function getMessages() {
  store.chat.setMessagesLoading(true);
  const response = await service.message.getMessages(
    service.message.messageslimit
  );
  store.chat.updateMessages(response.messages);
  store.chat.setMessagesLoading(false);
}

async function loadMoreMessages(limit: number) {
  store.chat.setMessagesLoading(true);
  const response = await service.message.getMessages(limit);
  store.chat.updateMessages(response.messages);
  store.chat.setMessagesLoading(false);
}

function chatCardScroll(chatCardContainer: HTMLDivElement) {
  if (!chatCardContainer) return;

  chatCardContainer.scrollTo({
    top: chatCardContainer.scrollHeight,
    behavior: "smooth",
  });
}

function applyChatCardScroll(chatCardContainer: HTMLDivElement) {
  if (!chatCardContainer || chatCardContainer.scrollTop === 0) return;

  chatCardContainer.scrollTop = chatCardContainer.scrollTop + 250;
}

export default function ChatCard() {
  let chatCardContainer!: HTMLDivElement;
  const messages = () => store.chat.current.messages;

  function windowResize() {
    if (chatCardContainer.scrollTop >= chatCardContainer.scrollHeight) return;
    chatCardScroll(chatCardContainer);
  }

  onMount(async () => {
    await getMessages();
    chatCardScroll(chatCardContainer);
    window.addEventListener("resize", windowResize);
  });

  createEffect(
    on(messages, () => {
      applyChatCardScroll(chatCardContainer);
    })
  );

  onCleanup(() => {
    window.removeEventListener("resize", windowResize);
  });

  return (
    <Show
      when={!store.chat.current.messagesLoading}
      fallback={
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader childClassName="border-purple-700 size-10" />
        </div>
      }
    >
      <div
        class="h-[calc(100vh-125px)] overflow-y-auto px-2 lg:px-0"
        ref={chatCardContainer}
      >
        <div class="flex items-center gap-4 mb-2">
          <Button
            onClick={() => {
              loadMoreMessages(
                messages().length + service.message.messagesLoadLimitAdd
              );
            }}
          >
            Load more
          </Button>
          <Button
            onClick={() => {
              chatCardScroll(chatCardContainer);
            }}
          >
            Scroll
          </Button>
        </div>
        <ChatMessageList list={store.chat.current.messages} />
      </div>
    </Show>
  );
}
