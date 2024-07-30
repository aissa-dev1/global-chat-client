import { createStore } from "solid-js/store";

export type NotificationVariant = "default" | "success" | "error";

interface PushData {
  title?: string;
  description: string;
  variant?: NotificationVariant;
}

interface State {
  title: string;
  description: string;
  variant: NotificationVariant;
  active: boolean;
}

export class NotificationStore {
  private readonly _current = createStore<State>({
    title: "",
    description: "",
    variant: "default",
    active: false,
  });
  private timeout = 2000;

  push(data: PushData) {
    this.setStore("title", data.title ? data.title : "");
    this.setStore("description", data.description);
    this.setStore("variant", data.variant ? data.variant : "default");
    this.setStore("active", true);
    const pushTimeout = setTimeout(() => {
      this.disactivate();
      clearTimeout(pushTimeout);
    }, this.timeout);
  }

  updateTimeout(timout: number) {
    this.timeout = timout;
  }

  disactivate() {
    this.setStore("active", false);
  }

  private setStore<K extends keyof State>(key: K, value: State[K]) {
    this._current[1](key, value);
  }

  get current(): State {
    return this._current[0];
  }
}
