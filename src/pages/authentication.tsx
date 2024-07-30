import { createEffect, createSignal, onMount, Show } from "solid-js";
import { useTitle } from "../hooks/use-title";
import AuthTitle from "../components/authentication/authTitle";
import AuthCard from "../components/authentication/authCard";
import AuthCopyright from "../components/authentication/authCopyright";
import Input from "../components/reusable/input";
import Button from "../components/reusable/button";
import { AuthenticateData } from "../services/auth";
import { store } from "../store";
import { service } from "../service";
import Loader from "../components/reusable/loader";
import { getToken, setToken } from "../utils/jwt";
import { Navigator, useNavigate } from "@solidjs/router";
import { jwtDecode } from "jwt-decode";
import { JWTUser } from "../features/user";

async function authenticate(data: AuthenticateData, navigate: Navigator) {
  if (store.user.current.loading) return;

  try {
    store.user.setLoading(true);
    const response = await service.auth.authenticate(data);
    setToken(response.token);
    const decodedToken: JWTUser = jwtDecode(getToken()!);
    store.user.update(decodedToken);
    if (response.status === "exist") {
      store.notification.push({
        description: `Welcome back ${store.user.current.username}`,
      });
    } else {
      store.notification.push({
        description: `Say Hi ${store.user.current.username}`,
        variant: "success",
      });
    }
    store.auth.setIsAuthenticated(true);
    store.user.setLoading(false);
    navigate("/");
  } catch (error: any) {
    store.notification.push({
      title: "Cannot Authenticate",
      description: error.response.data.message,
      variant: "error",
    });
    store.user.setLoading(false);
  }
}

export default function AuthenticationPage() {
  const navigate = useNavigate();
  const isAuthenticated = () => store.auth.current.isAuthenticated;
  const [data, setData] = createSignal<AuthenticateData>({
    username: "",
    password: "",
  });

  onMount(() => {
    useTitle("Authentication");
  });

  createEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div class="flex flex-col gap-6 w-full md:w-[750px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:gap-4">
      <AuthCard class="flex flex-col text-center gap-6 p-10 lg:gap-4 lg:p-8">
        <AuthTitle />
        <div class="flex flex-col gap-3 lg:gap-2">
          <Input
            type="text"
            placeholder="Enter your username"
            value={data().username}
            onChange={(e) => {
              setData((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={data().password}
            onChange={(e) => {
              setData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <Button
          class="flex items-center justify-center"
          onClick={() => {
            authenticate(data(), navigate);
          }}
        >
          <Show when={store.user.current.loading} fallback={"Authenticate"}>
            <Loader />
          </Show>
        </Button>
      </AuthCard>
      <AuthCard>
        <AuthCopyright />
      </AuthCard>
    </div>
  );
}
