import { Field } from 'payload';

// Define the icon configuration type
export interface LucideIconPickerType {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

// Define the icon data type
export type LucideIconData = {
  name: string;
  size: number;
  color: string;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
}

// Define the overrides type
export type LucideIconPickerOverrides = Partial<{
  name: string;
  label: string;
  required: boolean;
  defaultValue: Partial<LucideIconData>;
  interfaceName: string;
}>

export const LucideIconPicker = (overrides: LucideIconPickerOverrides = {}): Field => {
  return {
    type: 'json' as const,
    name: overrides.name || 'LucideIconPicker',
    label: overrides.label || 'Lucide Icon Picker',
    defaultValue: overrides.defaultValue || {
      name: '',
      size: 24,
      color: 'currentColor',
      strokeWidth: 2,
      absoluteStrokeWidth: false,
    },
    admin: {
      components: {
        Field: {
          path: 'payload-lucide-picker/dist/fields/component/index#IconSelectField',
        },
      },
    },
    required: overrides.required || false,
  };
};

export default LucideIconPicker;
