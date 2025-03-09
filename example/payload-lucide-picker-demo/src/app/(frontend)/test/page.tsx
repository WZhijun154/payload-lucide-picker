import React from 'react';
import { redirect } from 'next/navigation';
import payload from 'payload';
import { RenderBlocks } from '../../../components/RenderBlocks';

export default async function Home() {
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  });

  const homePage = pages.docs[0];

  if (!homePage) {
    // If no home page exists, redirect to the admin to create one
    redirect('/admin');
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">{homePage.title}</h1>
        {homePage.layout && <RenderBlocks blocks={homePage.layout} />}
      </div>
    </main>
  );
} 