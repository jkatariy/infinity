import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  published: boolean;
  slug: string;
  featured_image?: string;
};

export async function getBlogPost(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient();
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return null;
  }
}

export async function getBlogPosts(limit?: number): Promise<Post[]> {
  const supabase = await createServerSupabaseClient();
  
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
}

export async function getRecommendedPosts(currentPostId: string, limit: number = 3): Promise<Post[]> {
  const supabase = await createServerSupabaseClient();
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .neq('id', currentPostId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recommended posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRecommendedPosts:', error);
    return [];
  }
}



