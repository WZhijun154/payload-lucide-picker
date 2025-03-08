import { Block, Field } from 'payload';
import { LucideIconPicker } from 'payload-lucide-picker';

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
        LucideIconPicker({
          name: 'featureIcon',
          label: 'Feature Icon',
          required: true,
        }) as unknown as Field,
      ],
    },
  ],
};
