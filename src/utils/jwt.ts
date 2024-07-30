export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(value: string) {
  localStorage.setItem("token", value);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function hasToken(): boolean {
  return Boolean(localStorage.getItem("token"));
}
