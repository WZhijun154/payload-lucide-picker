import { Field } from 'payload';
import { IconSelectField } from '../admin/components/IconSelectField';

// Define the icon configuration type
export interface LucideIconPickerType {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export const LucideIconPicker = (overrides = {}): Field => {
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
