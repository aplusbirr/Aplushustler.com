import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string | null;
  author: string;
  read_time: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export function usePosts(opts?: { category?: string; featuredOnly?: boolean; limit?: number; includeUnpublished?: boolean }) {
  return useQuery({
    queryKey: ["posts", opts],
    queryFn: async () => {
      let q = supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (!opts?.includeUnpublished) q = q.eq("published", true);
      if (opts?.category) q = q.eq("category", opts.category);
      if (opts?.featuredOnly) q = q.eq("featured", true);
      if (opts?.limit) q = q.limit(opts.limit);
      const { data, error } = await q;
      if (error) throw error;
      return data as DbPost[];
    },
  });
}

export function usePost(slug: string | undefined) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data as DbPost | null;
    },
    enabled: !!slug,
  });
}

export function useComments(postId: string | undefined) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) return [];
      const { data, error } = await supabase.from("comments").select("*").eq("post_id", postId).eq("approved", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!postId,
  });
}
