import { createStore } from "solid-js/store";

interface State {
  isAuthenticated: boolean;
}

export class AuthStore {
  private readonly _current = createStore<State>({
    isAuthenticated: false,
  });

  setIsAuthenticated(authenticated: boolean) {
    this.setStore("isAuthenticated", authenticated);
  }

  private setStore<K extends keyof State>(key: K, value: State[K]) {
    this._current[1](key, value);
  }

  get current(): State {
    return this._current[0];
  }
}
