import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIconPickerType } from '../../../../../src';
import { DynamicIcon } from 'lucide-react/dynamic';

export type FeatureType = {
  title: string;
  description: string;
  icon: LucideIconPickerType;
  id?: string;
};

export type FeaturesBlockType = {
  blockType: 'features';
  blockName?: string | null;
  id?: string | null;
  features?: FeatureType[] | null;
};

export const FeaturesBlock: React.FC<FeaturesBlockType> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            // Safely access the icon name and create a component
            const iconName = feature.icon?.name as keyof typeof LucideIcons;
            const IconComponent = iconName && LucideIcons[iconName];

            return (
              <div key={feature.id || index} className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                {IconComponent && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                    {/* <DynamicIcon
                      name={iconName}
                      size={feature.icon?.size || 24}
                      color={feature.icon?.color || 'currentColor'}
                      strokeWidth={feature.icon?.strokeWidth || 2}
                      absoluteStrokeWidth={feature.icon?.absoluteStrokeWidth || false}
                    /> */}
                  </div>
                )}
                <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
