"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIconPickerType } from '../../../../../src';
import { FeaturesBlock as FeaturesBlockType } from '@/payload-types';

export type FeatureType = {
  title: string;
  description: string;
  icon: LucideIconPickerType;
  id?: string;
};

// export type FeaturesBlockType = {
//   blockType: 'features';
//   blockName?: string | null;
//   id?: string | null;
//   features?: FeatureType[] | null;
// };

export const FeaturesBlock: React.FC<FeaturesBlockType> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            // Safely access the icon name
            let iconName: string | undefined;
            
            if (feature.featureIcon && typeof feature.featureIcon === 'object' && !Array.isArray(feature.featureIcon)) {
              // If featureIcon is an object with a name property
              const iconObj = feature.featureIcon as Record<string, unknown>;
              if ('name' in iconObj && typeof iconObj.name === 'string') {
                iconName = iconObj.name;
              }
            } else if (typeof feature.featureIcon === 'string') {
              // If featureIcon is directly a string
              iconName = feature.featureIcon;
            }
            
            // Get the icon component if it exists in LucideIcons
            const IconComponent = iconName ? (LucideIcons as any)[iconName] : undefined;
            
            return (
              <div key={feature.id || index} className="flex flex-col items-start p-6 bg-gray-50 rounded-lg">
                {IconComponent && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                    <IconComponent 
                      size={24}
                      color="currentColor"
                      strokeWidth={2}
                    />
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
