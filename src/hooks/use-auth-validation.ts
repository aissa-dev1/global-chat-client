import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { getToken, hasToken, removeToken } from "../utils/jwt";
import { JWTUser } from "../features/user";
import { jwtDecode } from "jwt-decode";
import { store } from "../store";

export function useAuthValidation() {
  const navigate = useNavigate();

  function navigateToAuth() {
    navigate("/authentication", { replace: true });
  }

  onMount(() => {
    if (hasToken()) {
      try {
        const token = getToken()!;
        const decodedToken: JWTUser = jwtDecode(token);
        if (Date.now() / 1000 >= decodedToken.exp) {
          removeToken();
          navigateToAuth();
          return;
        }
        store.user.update(decodedToken);
        store.auth.setIsAuthenticated(true);
      } catch (error) {
        removeToken();
        navigateToAuth();
      }
    } else navigateToAuth();
  });
}
