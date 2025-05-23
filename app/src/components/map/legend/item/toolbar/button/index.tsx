import { cn } from "@/lib/utils";

import { LegendItemButtonProps } from "@/components/map/legend/types";

export const LegendItemButton = ({
  Icon,
  className = "",
  selected = false,
  value,
}: LegendItemButtonProps) => {
  return (
    <div
      className={cn({
        "group relative": true,
        [className]: !!className,
      })}
    >
      <Icon
        className={cn({
          "relative z-10 flex h-4 w-4 items-center justify-center rounded-full text-slate-800 transition-colors":
            true,
          "group-hover:text-slate-800/50 group-active:text-slate-500": true,
          "fill-slate-800": selected,
        })}
        style={{ fillOpacity: selected ? value : 1 }}
      />
      <span
        className={cn({
          "absolute top-1/2 left-1/2 z-0 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full border border-transparent transition-all":
            true,
          "group-active:bg-lightblue-50 group-active:scale-100": true,
        })}
      />
    </div>
  );
};

export default LegendItemButton;
