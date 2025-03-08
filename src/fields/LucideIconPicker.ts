import { Field } from 'payload';

// Define the icon configuration type
export interface LucideIconPickerType {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

type LucideIconPickerOverrides = Partial<Omit<Field, 'type' | 'name' | 'admin'>>;

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
