import { Metadata } from 'next';
import PageContainer from '@/components/PageContainer';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts, type Post } from '@/lib/supabase-server';

// Enable ISR with 30 minutes revalidation for blog listing
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
  description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology from Infinity Automated Solutions.',
  keywords: 'packaging automation blog, industrial automation insights, manufacturing technology, FMCG packaging, automation trends, Infinity Automated Solutions',
  openGraph: {
    title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
    description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology.',
    images: [
      {
        url: 'https://infinitysols.com/logos/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinity Automated Solutions Blog',
      },
    ],
    url: 'https://infinitysols.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Packaging Automation Insights | Infinity Automated Solutions',
    description: 'Discover insights, ideas, and perspectives on the future of packaging automation, industrial solutions, and manufacturing technology.',
    images: ['https://infinitysols.com/logos/logo.png'],
  },
  alternates: {
    canonical: 'https://infinitysols.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <PageContainer
        title="From the Blog"
        subtitle="Insights, ideas, and perspectives on the future of packaging automation."
      >
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts available yet. Check back soon!</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="From the Blog"
      subtitle="Insights, ideas, and perspectives on the future of packaging automation."
    >
      <div className="grid grid-cols-1 gap-12">
        {posts.map((post: Post, index: number) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}