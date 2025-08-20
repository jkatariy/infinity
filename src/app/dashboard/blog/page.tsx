'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  published: boolean;
  approval_required: boolean;
  slug: string;
};

export default function BlogDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      try {
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setDeleting(true);
      const { error } = await supabase.from('blog_posts').delete().match({ id });
      if (error) throw error;
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <div className="animate-pulse bg-gray-100 h-10 w-1/4 mb-8 rounded"></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse mb-4">
            <div className="h-6 bg-gray-100 w-3/4 mb-2 rounded"></div>
            <div className="h-4 bg-gray-100 w-1/4 mb-4 rounded"></div>
            <div className="h-20 bg-gray-100 rounded mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md my-4">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-2 text-red-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Blog Posts Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage, create, edit and publish blog posts.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
        <Link 
          href="/dashboard/blog/create"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Create New Post
        </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
            <Link
              href="/dashboard/blog/create"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
            Create New Post
            </Link>
        </div>
      ) : (
        <div className="bg-white shadow-sm overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-2">{post.title}</h3>
                      {post.published ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : post.approval_required ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Pending Approval
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.content.substring(0, 100) + '...'}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-3">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="font-medium text-red-600 hover:underline"
                      disabled={deleting}
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <Link href={`/dashboard/blog/edit/${post.id}`} className="font-medium text-blue-600 hover:underline ml-4">
                      Edit
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 