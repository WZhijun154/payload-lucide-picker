import React from 'react';
import { notFound } from 'next/navigation';
import payload from 'payload';
import { RenderBlocks } from '../../components/RenderBlocks';

interface PageParams {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug = 'home' } }: PageParams) {
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page = pages.docs[0];

  if (!page) {
    return notFound();
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">{page.title}</h1>
        {page.layout && <RenderBlocks blocks={page.layout} />}
      </div>
    </main>
  );
} 