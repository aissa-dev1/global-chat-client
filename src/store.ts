import { AuthStore } from "./features/auth";
import { ChatStore } from "./features/chat";
import { NotificationStore } from "./features/notification";
import { UserStore } from "./features/user";

class Store {
  readonly user = new UserStore();
  readonly auth = new AuthStore();
  readonly notification = new NotificationStore();
  readonly chat = new ChatStore();
}

export const store = new Store();
