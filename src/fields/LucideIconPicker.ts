// Define the icon configuration type
export interface LucideIconPickerType {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

/**
 * Creates an icon field that displays Lucide icons
 * This implementation uses a text field type to avoid database schema issues
 * while still providing the custom UI for icon selection
 *
 * Usage example:
 * ```typescript
 * import iconField from '../fields/iconField';
 *
 * const YourCollection = {
 *   fields: [
 *     {
 *       name: 'title',
 *       type: 'text'
 *     },
 *     iconField({
 *       name: 'featureIcon',
 *       label: 'Feature Icon'
 *     })
 *   ]
 * }
 * ```
 */
export const LucideIconPicker = (overrides = {}) => {
  return {
    type: 'json' as const,
    name: 'icon',
    label: 'Icon',
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
