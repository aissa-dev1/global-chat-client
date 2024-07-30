import { createEffect, onMount } from "solid-js";
import { useTitle } from "./hooks/use-title";
import { store } from "./store";
import { useNavigate } from "@solidjs/router";
import ChatCard from "./components/cards/chatCard";
import Container from "./components/reusable/container";
import HomeHeader from "./components/home/header";
import SendChatMessage from "./components/chat/sendChatMessage";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = () => store.auth.current.isAuthenticated;

  onMount(() => {
    useTitle("Global Chat");
  });

  createEffect(() => {
    if (!isAuthenticated()) {
      navigate("/authentication", { replace: true });
    }
  });

  return (
    <Container class="flex flex-col gap-3">
      <HomeHeader />
      <ChatCard />
      <SendChatMessage />
    </Container>
  );
}

export default App;
