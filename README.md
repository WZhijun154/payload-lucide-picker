# Payload Lucide Picker

A custom field for [Payload CMS](https://payloadcms.com/) that allows you to select and configure [Lucide icons](https://lucide.dev/) in your admin panel.

## Features

- 🎨 Select from all available Lucide icons
- 🎯 Configure icon size, color, and stroke width
- ♿ Accessible and keyboard-friendly
- 🔄 Reset to default configuration

## Installation

```bash
# Using pnpm
pnpm add payload-lucide-picker-next

# Using npm
npm install payload-lucide-picker-next

# Using yarn
yarn add payload-lucide-picker-next
```

## Usage

1. Import and use the field in your Payload config:

```typescript
import { Block } from 'payload';
import { LucideIconPicker } from 'payload-lucide-picker-next';

export const MyBlock: Block = {
  slug: 'my-block',
  fields: [
    // Use as a single field
    LucideIconPicker({
      name: 'icon',
      label: 'Select an Icon',
      required: true,
    }),

    // Or within an array of fields
    {
      name: 'links',
      type: 'array',
      fields: [
        LucideIconPicker({
          name: 'icon',
          label: 'Link Icon',
          required: true,
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        // ... other fields
      ],
    },
  ],
};
```

2. The field will store the icon configuration with type `LucideIconPickerType`:

```typescript
interface LucideIconPickerType {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}
```

3. Use the icon in your frontend with the provided `getLucideIcon` helper:

```typescript
import { getLucideIcon } from 'payload-lucide-picker-next';

const MyComponent = ({ icon }) => {
  const Icon = getLucideIcon(icon); // Returns an icon component

  return (
    <div>
      <Icon className="h-6 w-6 text-blue-500" /> {/* Override size and color with Tailwind classes */}
    </div>
  );
};
```

## Development

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build the package: `pnpm build`
4. Run tests: `pnpm test`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [wangzhijun](https://github.com/wangzhijun)
