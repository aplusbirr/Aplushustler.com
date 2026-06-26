import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import type { DbPost } from "@/hooks/usePosts";

export default function BlogCard({ post }: { post: DbPost }) {
  const categoryColors: Record<string, string> = {
    "earning-apps": "bg-primary/10 text-primary",
    "online-jobs": "bg-info/10 text-info",
    "internet-tips": "bg-warning/10 text-warning",
    "crypto-guides": "bg-destructive/10 text-destructive",
  };

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-card rounded-xl border card-hover overflow-hidden h-full">
        <div className="aspect-video bg-muted overflow-hidden">
          {post.featured_image ? (
            <img src={post.featured_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><span className="text-4xl">📝</span></div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
              {post.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.read_time}
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
