import { ParentProps } from "solid-js";
import { useAuthValidation } from "../../hooks/use-auth-validation";

export default function AuthValidation({ children }: ParentProps) {
  useAuthValidation();

  return <>{children}</>;
}
