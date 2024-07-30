import { cn } from "../../utils/cn";

interface Props {
  parentClassName?: string;
  childClassName?: string;
}

export default function Loader({ parentClassName, childClassName }: Props) {
  return (
    <div class={cn("relative size-6", parentClassName)}>
      <div
        class={cn(
          "absolute size-6 border-4 border-white rounded-full !border-t-transparent animate-spin",
          childClassName
        )}
      ></div>
    </div>
  );
}
