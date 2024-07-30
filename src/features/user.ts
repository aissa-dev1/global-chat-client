import { createStore } from "solid-js/store";

export interface UserType {
  id: string;
  username: string;
}

export interface JWTUser {
  sub: string;
  username: string;
  exp: number;
  iat?: number;
  nbf?: number;
}

interface UserUpdate {
  sub: string;
  username: string;
}

interface State extends UserType {
  loading: boolean;
}

export class UserStore {
  private readonly _current = createStore<State>({
    id: "",
    username: "",
    loading: false,
  });

  update(state: UserUpdate) {
    this.setStore("id", state.sub);
    this.setStore("username", state.username);
  }

  setLoading(loading: boolean) {
    this.setStore("loading", loading);
  }

  private setStore<K extends keyof State>(key: K, value: State[K]) {
    this._current[1](key, value);
  }

  get current(): State {
    return this._current[0];
  }
}
