import React from "react";

import { formatNumber } from "@/lib/formats";
import { cn } from "@/lib/utils";

import { LegendTypeProps } from "../../types";

export const LegendTypeGradient: React.FC<LegendTypeProps> = ({ className = "", items }) => {
  return (
    <div
      className={cn({
        [className || ""]: !!className,
      })}
    >
      <div
        className={cn({
          "flex h-2 w-full": true,
        })}
        style={{
          backgroundImage: `linear-gradient(to right, ${items.map((i) => i.color).join(",")})`,
        }}
      />

      <ul className="mt-1 flex w-full justify-between">
        {items
          .filter(({ value }) => typeof value !== "undefined" && value !== null)
          .map(({ value }) => (
            <li
              key={`${value}`}
              className={cn({
                "flex-shrink-0 text-xs": true,
              })}
            >
              {formatNumber(value)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LegendTypeGradient;
