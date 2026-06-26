import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { usePosts } from "@/hooks/usePosts";

export default function CategoryPage({ category, title, description }: { category: string; title: string; description: string }) {
  const { data: posts = [], isLoading } = usePosts({ category });

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>
      <AdPlaceholder />
      {isLoading ? (
        <p className="text-center py-12 text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      )}
      {!isLoading && posts.length === 0 && (
        <p className="text-center py-16 text-muted-foreground">No articles in this category yet. Check back soon!</p>
      )}
    </div>
  );
}
