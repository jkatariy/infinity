import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import DOMPurify from 'isomorphic-dompurify';
import StructuredData from '@/components/StructuredData';
import { getBlogPost, getRecommendedPosts, type Post } from '@/lib/supabase-server';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Infinity Automated Solutions',
      description: 'The requested blog post could not be found.',
    };
  }

  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return {
    title: `${post.title} | Infinity Automated Solutions Blog`,
    description: post.content ? 
      post.content.replace(/<[^>]+>/g, ' ').substring(0, 160).trim() + '...' : 
      `Read ${post.title} on the Infinity Automated Solutions blog.`,
    keywords: `${post.title}, packaging automation, industrial automation, blog, Infinity Automated Solutions`,
    authors: [{ name: 'Infinity Automated Solutions' }],
    openGraph: {
      title: post.title,
      description: post.content ? 
        post.content.replace(/<[^>]+>/g, ' ').substring(0, 160).trim() + '...' : 
        `Read ${post.title} on the Infinity Automated Solutions blog.`,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Infinity Automated Solutions'],
      images: post.featured_image ? [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [
        {
          url: 'https://infinitysols.com/logos/logo.png',
          width: 1200,
          height: 630,
          alt: 'Infinity Automated Solutions',
        },
      ],
      url: `https://infinitysols.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content ? 
        post.content.replace(/<[^>]+>/g, ' ').substring(0, 160).trim() + '...' : 
        `Read ${post.title} on the Infinity Automated Solutions blog.`,
      images: post.featured_image ? [post.featured_image] : ['https://infinitysols.com/logos/logo.png'],
    },
    alternates: {
      canonical: `https://infinitysols.com/blog/${post.slug}`,
    },
  };
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function RecommendedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [content-visibility:auto] [contain-intrinsic-size:1px_300px]">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="relative h-40 w-full bg-gray-100">
              {post.featured_image ? (
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                {post.title}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/blog" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Back to blog
        </Link>
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const [recommended] = await Promise.all([
    getRecommendedPosts(post.id, 3)
  ]);

  const readingTime = getReadingTime(post.content || '');
  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const subtitle = `${publishedDate} • ${readingTime} min read`;

  // Generate article structured data
  const articleSchema = {
    headline: post.title,
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      '@type': 'Organization',
      name: 'Infinity Automated Solutions',
      url: 'https://infinitysols.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Infinity Automated Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://infinitysols.com/logos/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://infinitysols.com/blog/${post.slug}`
    },
    ...(post.featured_image && {
      image: {
        '@type': 'ImageObject',
        url: post.featured_image,
        width: 1200,
        height: 630
      }
    })
  };

  return (
    <PageContainer title={post.title} breadcrumbLabel={post.title} subtitle={subtitle}>
      <StructuredData type="Article" data={articleSchema} />
      
      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative mb-8 rounded-xl overflow-hidden h-96">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-transparent"></div>
          <div
            className="prose prose-blue prose-lg max-w-none pl-6 [content-visibility:auto] [contain-intrinsic-size:1px_1000px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content || '', {
                ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
              }),
            }}
          />
        </div>

        <RecommendedPosts posts={recommended} />
      </article>
    </PageContainer>
  );
}