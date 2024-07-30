import { Show } from "solid-js";
import { NotificationVariant } from "../../features/notification";
import { store } from "../../store";

const NotificationVariants: Record<NotificationVariant, string> = {
  default: "bg-white text-black border-gray-300 shadow-md",
  success: "bg-green-400 text-white border-green-700 shadow-lg",
  error: "bg-red-400 text-white border-red-700 shadow-lg",
};

const NotificationIcons: Record<NotificationVariant, string> = {
  default: "",
  success: "✅",
  error: "❌",
};

export default function NotificationCard() {
  const title = () => store.notification.current.title;
  const active = () => store.notification.current.active;
  const notificationIcon = () =>
    NotificationIcons[store.notification.current.variant];

  return (
    <div
      class={`absolute w-full rounded-none p-4 duration-300 max-sm:left-0 max-sm:top-0 md:right-2 md:bottom-2 md:w-[450px] md:rounded-md border ${
        NotificationVariants[store.notification.current.variant]
      }`}
      classList={{
        "opacity-100 translate-y-0": active(),
        "opacity-0 -translate-y-full pointer-events-none": !active(),
      }}
    >
      <div class="flex items-center gap-3">
        <Show when={Boolean(notificationIcon())}>
          <span class="text-xl">{notificationIcon()}</span>
        </Show>
        <div class="flex flex-col gap-2">
          <Show when={Boolean(title())}>
            <h3 class="font-semibold text-lg">{title()}</h3>
          </Show>
          <p>{store.notification.current.description}</p>
        </div>
      </div>
      <span
        class="absolute right-1.5 top-1.5 text-3xl cursor-pointer"
        onClick={() => {
          store.notification.disactivate();
        }}
      >
        &times;
      </span>
    </div>
  );
}
