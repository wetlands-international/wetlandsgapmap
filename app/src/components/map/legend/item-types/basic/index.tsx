import React from "react";

import { cn } from "@/lib/utils";

import { LegendTypeProps } from "../../types";

export const LegendTypeBasic: React.FC<LegendTypeProps> = ({ className = "", items = [] }) => {
  return (
    <div
      className={cn({
        [className]: !!className,
      })}
    >
      <ul className="flex w-full flex-col space-y-1.5">
        {items.map(({ label, color }) => (
          <li key={`${label}`} className="flex gap-2">
            <div
              className="border-navy-700 mt-1 h-2.5 w-2.5 shrink-0 rounded-full border"
              style={{
                backgroundColor: color ?? "transparent",
              }}
            />
            <span className="mt-px text-xs leading-tight font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegendTypeBasic;
