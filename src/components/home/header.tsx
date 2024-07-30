import { store } from "../../store";
import { removeToken } from "../../utils/jwt";
import Button from "../reusable/button";

export default function HomeHeader() {
  return (
    <div class="flex items-center justify-between bg-white text-black p-2">
      <p class="text-lg font-semibold">
        Authenticated as{" "}
        <span class="font-bold text-purple-700">
          {store.user.current.username}
        </span>
      </p>
      <Button
        class="py-2 px-4"
        onClick={() => {
          removeToken();
          store.auth.setIsAuthenticated(false);
        }}
      >
        Log out
      </Button>
    </div>
  );
}
