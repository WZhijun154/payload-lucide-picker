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
pnpm add payload-lucide-picker

# Using npm
npm install payload-lucide-picker

# Using yarn
yarn add payload-lucide-picker
```

## Usage

1. Import the field in your Payload config:

```typescript
import { LucideIconPicker } from 'payload-lucide-picker';

// In your collection config
{
  fields: [
    {
      name: 'icon',
      type: 'lucide-icon',
      required: true,
      label: 'Select an Icon',
      admin: {
        description: 'Choose an icon and configure its appearance'
      }
    }
  ]
}
```

2. The field will store the icon configuration in the following format:

```typescript
{
  name: string;
  config: {
    size: number;
    color: string;
    strokeWidth: number;
  }
}
```

3. Use the icon in your frontend:

```typescript
import { Icon } from 'lucide-react';

const MyComponent = ({ icon }) => {
  const IconComponent = Icon[icon.name];
  
  return (
    <IconComponent
      size={icon.config.size}
      color={icon.config.color}
      strokeWidth={icon.config.strokeWidth}
    />
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

MIT © [Vectras](https://github.com/Vectras)