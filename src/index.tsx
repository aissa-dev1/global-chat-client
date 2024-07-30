/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import AppRouter from "./appRouter";
import NotificationCard from "./components/cards/notificationCard";

const root = document.getElementById("root");

render(
  () => (
    <>
      <AppRouter />
      <NotificationCard />
    </>
  ),
  root!
);
