import React, { Fragment } from 'react';
import { FeaturesBlock } from '../blocks/Features/component';

// More generic type to handle Payload's blocks
export type BlockType = {
  blockType: string;
  blockName?: string | null;
  id?: string | null;
  [key: string]: any;
};

export type BlockRendererProps = {
  blocks: BlockType[];
};

export const RenderBlocks: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'features':
            return <FeaturesBlock key={index} {...block} />;
          default:
            return null;
        }
      })}
    </Fragment>
  );
}; 