import { ComponentProps, splitProps } from "solid-js";
import { cn } from "../../utils/cn";

interface Props extends ComponentProps<"button"> {}

export default function Button(props: Props) {
  const [, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      class={cn(
        "text-sm font-bold bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 active:bg-purple-900 duration-300",
        props.class
      )}
      children={props.children}
      {...rest}
    />
  );
}
