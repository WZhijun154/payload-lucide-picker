import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideIconPicker } from "./fields/lucide-icon-picker";
import type { LucideIconPickerType } from "./fields/lucide-icon-picker";

export { LucideIconPicker }
export type { LucideIconPickerType }

// Updated to accept LucideIconPickerType
export const getLucideIcon = (iconConfig: LucideIconPickerType) => {
    const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
    const IconComponent = iconConfig.name && iconMap[iconConfig.name] 
      ? iconMap[iconConfig.name] 
      : LucideIcons.HelpCircle;
  
    return function IconWithProps(props: React.ComponentProps<typeof IconComponent>) {
      return (
        <IconComponent 
          {...props}
          size={iconConfig.size}
          color={iconConfig.color}
          strokeWidth={iconConfig.strokeWidth}
          absoluteStrokeWidth={iconConfig.absoluteStrokeWidth}
        />
      );
    };
  };





