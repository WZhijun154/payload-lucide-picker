import React from "react";
// import * as LucideIcons from "lucide-react";
import { LucideIconPicker } from "./fields/lucide-icon-picker";
import type { LucideIconPickerType } from "./fields/lucide-icon-picker";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { HelpCircle } from "lucide-react";
import type { LucideProps } from "lucide-react";
import dynamic from 'next/dynamic';

export { LucideIconPicker }
export type { LucideIconPickerType }

// Preload and cache icons to improve performance
const iconCache: Record<string, React.ComponentType<LucideProps>> = {};

// Updated to accept LucideIconPickerType
export const getLucideIcon = (iconConfig: LucideIconPickerType) => {
    const IconComponent = iconConfig.name && dynamicIconImports[iconConfig.name as keyof typeof dynamicIconImports] 
      ? (() => {
          if (!iconCache[iconConfig.name]) {
            iconCache[iconConfig.name] = dynamic(dynamicIconImports[iconConfig.name as keyof typeof dynamicIconImports]);
          }
          return iconCache[iconConfig.name];
        })()
      : HelpCircle;
  
    return function IconWithProps(props: LucideProps) {
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





