import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { usePosts } from "@/hooks/usePosts";

export default function CategoryPage({ category, title, description }: { category: string; title: string; description: string }) {
  const { data: posts = [], isLoading } = usePosts({ category });

  return (
    <>
      <section className="relative overflow-hidden hero-gradient text-surface-dark-foreground">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />
        <div className="container relative py-14 md:py-20">
          <span className="chip bg-surface-dark-foreground/10 border border-surface-dark-foreground/15 mb-4">
            Category
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">{title}</h1>
          <p className="text-surface-dark-foreground/70 max-w-2xl text-lg">{description}</p>
        </div>
      </section>

      <div className="container py-10">
        <AdPlaceholder />
        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl font-semibold mb-2">Nothing here yet</p>
            <p className="text-muted-foreground">Articles in this category are coming soon. Check back!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </>
  );
}
