"use client";

import React, { Children, PropsWithChildren, isValidElement, useMemo } from "react";

import { LuGripVertical } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { LegendItemProps } from "@/components/map/legend/types";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";

import LegendItemToolbar from "./toolbar";

export const LegendItem: React.FC<PropsWithChildren & LegendItemProps> = ({
  id,
  children,
  name,
  className = "",
  // sortable
  sortable,
  // attributes,
  listeners,
  // settings
  settingsManager,
  settings,
  // components
  InfoContent,
  // events
  onChangeOpacity,
  onChangeVisibility,
  onRemove,
}) => {
  const validChildren = useMemo(() => {
    const chldn = Children.map(children, (Child) => {
      return isValidElement(Child);
    });
    return chldn && chldn.some((c) => !!c);
  }, [children]);

  return (
    <Accordion type="single" defaultValue={`${id}`} asChild>
      <AccordionItem value={`${id}`} asChild>
        <div
          className={cn({
            "w-full border-none px-4": true,
            [className]: !!className,
          })}
        >
          <header className="sticky top-0 z-10 flex items-start justify-between space-x-8 border-t border-neutral-200 bg-white py-2.5">
            <div
              className={cn({
                "relative flex items-start space-x-0.5": true,
                "-ml-1": sortable?.handle,
              })}
            >
              {sortable?.handle && (
                <button
                  aria-label="drag"
                  type="button"
                  className="text-navy-700 hover:text-navy-700/50 mt-0.5 cursor-pointer transition-colors"
                  {...listeners}
                >
                  <LuGripVertical className="h-5 w-5" />
                </button>
              )}

              <div
                className={cn({
                  "text-navy-700 mt-px text-xs leading-snug font-bold": true,
                })}
              >
                {name}
              </div>
            </div>

            {/* TOOLBAR */}
            <LegendItemToolbar
              settings={settings}
              settingsManager={settingsManager}
              onChangeOpacity={onChangeOpacity}
              onChangeVisibility={onChangeVisibility}
              onRemove={onRemove}
              InfoContent={InfoContent}
            />
          </header>

          {validChildren && (
            <AccordionContent className="grow bg-white px-2.5 pb-4 transition-all">
              <div className="pl-2">{children}</div>
            </AccordionContent>
          )}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default LegendItem;
