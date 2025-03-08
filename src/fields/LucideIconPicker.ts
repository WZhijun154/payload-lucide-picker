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
  admin: Record<string, any>;
}>

export const LucideIconPicker = (overrides: LucideIconPickerOverrides = {}): Field => {
  return {
    type: 'json' as const,
    name: 'LucideIconPicker',
    label: 'Lucide Icon Picker',
    defaultValue: {
      name: '',
      size: 24,
      color: 'currentColor',
      strokeWidth: 2,
      absoluteStrokeWidth: false,
    },
    admin: {
      components: {
        Field: {
          path: '@/admin/components/IconSelectField/index#IconSelectField',
        },
      },
    },
    required: true,
    ...overrides,
  };
};

export default LucideIconPicker;
