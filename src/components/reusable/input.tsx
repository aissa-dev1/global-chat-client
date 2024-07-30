import { ComponentProps, splitProps } from "solid-js";
import { cn } from "../../utils/cn";

interface Props extends ComponentProps<"input"> {}

export default function Input(props: Props) {
  const [, rest] = splitProps(props, ["class", "value"]);

  return (
    <input
      class={cn(
        "text-black border border-[#ddd] py-2 px-4 rounded-md",
        props.class
      )}
      value={props.value}
      {...rest}
    />
  );
}
