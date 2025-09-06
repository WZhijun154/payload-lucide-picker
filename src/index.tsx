import React from "react";
import { LucideIconPicker } from "./fields/lucide-icon-picker";
import type { LucideIconPickerType } from "./fields/lucide-icon-picker";
import { DynamicIcon } from "lucide-react/dynamic";
import { HelpCircle } from "lucide-react";
import type { LucideProps } from "lucide-react";

export { LucideIconPicker }
export type { LucideIconPickerType }

// Returns a component rendering the configured icon using Lucide's DynamicIcon
export const getLucideIcon = (iconConfig: LucideIconPickerType) => {
  return function IconWithProps(props: LucideProps) {
    const common = {
      size: iconConfig.size,
      color: iconConfig.color,
      strokeWidth: iconConfig.strokeWidth,
      absoluteStrokeWidth: iconConfig.absoluteStrokeWidth,
    } as const;

    if (!iconConfig.name) {
      return <HelpCircle {...props} {...common} />;
    }

    return (
      <DynamicIcon
        name={iconConfig.name as any}
        {...props}
        {...common}
        fallback={() => <HelpCircle {...props} {...common} />}
      />
    );
  };
};



