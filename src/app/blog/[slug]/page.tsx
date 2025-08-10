'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';
import DOMPurify from 'isomorphic-dompurify';
import { supabase } from '@/lib/supabase';

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  published: boolean;
  slug: string;
  featured_image?: string;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Post[]>([]);

  const readingTime = useMemo(() => {
    if (!post?.content) return null;
    const wordsPerMinute = 200;
    const words = post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }, [post?.content]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);

        // Fetch recommended posts (recent posts excluding current)
        const { data: recents, error: recErr } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .neq('id', data.id)
          .order('created_at', { ascending: false })
          .limit(3);
        if (!recErr && recents) setRecommended(recents);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-100 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-100 w-1/4 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-4 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const subtitle = readingTime ? `${publishedDate} • ${readingTime} min read` : publishedDate;

  return (
    <PageContainer title={post?.title || 'Blog Post'} breadcrumbLabel={post?.title} subtitle={subtitle}>
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-transparent"></div>
            <div
              className="prose prose-blue prose-lg max-w-none pl-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content || '', {
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
                }),
              }}
            />
          </div>

          {/* Recommended posts */}
          {recommended.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommended.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="relative h-40 w-full bg-gray-100">
                      {r.featured_image ? (
                        <Image
                          src={r.featured_image}
                          alt={r.title}
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
                        {r.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        {new Date(r.created_at).toLocaleDateString('en-US', {
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
          )}
        </motion.div>
      </article>
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.created_at,
            author: { '@type': 'Organization', name: 'Infinity Automated Solutions' },
            image: post.featured_image ? [post.featured_image] : undefined,
          }),
        }}
      />
    </PageContainer>
  );
} 