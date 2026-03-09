import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { blogPosts } from "@/data/blogData";

export default function CategoryPage({ category, title, description }: { category: string; title: string; description: string }) {
  const posts = blogPosts.filter((p) => p.category === category);

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>

      <AdPlaceholder />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center py-16 text-muted-foreground">No articles in this category yet. Check back soon!</p>
      )}
    </div>
  );
}
