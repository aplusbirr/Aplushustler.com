import BlogCard from "@/components/BlogCard";
import AppCard from "@/components/AppCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { earningApps } from "@/data/blogData";
import { usePosts } from "@/hooks/usePosts";

export default function EarningApps() {
  const { data: posts = [] } = usePosts({ category: "earning-apps" });

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold mb-2">Earning Apps</h1>
      <p className="text-muted-foreground mb-8">Discover the best apps to earn money online from Ethiopia.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {earningApps.map((app) => <AppCard key={app.id} app={app} />)}
      </div>

      <AdPlaceholder />

      <h2 className="font-display text-2xl font-bold mt-10 mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
