import { ComponentProps } from "solid-js";
import { cn } from "../../utils/cn";

interface Props extends ComponentProps<"div"> {}

export default function AuthCard({ class: className, ...rest }: Props) {
  return <div class={cn("bg-white text-black p-4", className)} {...rest} />;
}
