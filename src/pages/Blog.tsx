import { useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { categories } from "@/data/blogData";
import { usePosts } from "@/hooks/usePosts";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: posts = [], isLoading } = usePosts({ category: activeCategory === "all" ? undefined : activeCategory });

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="relative overflow-hidden hero-gradient text-surface-dark-foreground">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />
        <div className="container relative py-14 md:py-20">
          <span className="chip bg-surface-dark-foreground/10 border border-surface-dark-foreground/15 mb-4">
            All Articles
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">The Hustle Blog</h1>
          <p className="text-surface-dark-foreground/70 max-w-2xl text-lg">
            Guides, tips and strategies to earn money online from Ethiopia.
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <AdPlaceholder label="Top Banner Ad" />

        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">Loading articles...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl font-semibold mb-2">No articles found</p>
            <p className="text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </>
  );
}
