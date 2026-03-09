import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

export default function BlogCard({ post }: { post: BlogPost }) {
  const categoryColors: Record<string, string> = {
    "earning-apps": "bg-primary/10 text-primary",
    "online-jobs": "bg-info/10 text-info",
    "internet-tips": "bg-warning/10 text-warning",
    "crypto-guides": "bg-destructive/10 text-destructive",
  };

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-card rounded-xl border card-hover overflow-hidden">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
              {post.category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
