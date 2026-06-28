import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import type { DbPost } from "@/hooks/usePosts";

const categoryStyles: Record<string, string> = {
  "earning-apps": "bg-primary/10 text-primary",
  "online-jobs": "bg-info/10 text-info",
  "internet-tips": "bg-warning/15 text-warning",
  "crypto-guides": "bg-accent/15 text-accent",
};

export default function BlogCard({ post }: { post: DbPost }) {
  const label = post.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <article className="bg-card rounded-2xl border card-hover overflow-hidden h-full flex flex-col">
        <div className="aspect-[16/10] bg-muted overflow-hidden relative">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full accent-gradient flex items-center justify-center">
              <span className="font-display text-3xl text-primary-foreground/80">A+</span>
            </div>
          )}
          <span className={`absolute top-3 left-3 chip backdrop-blur bg-background/85 ${categoryStyles[post.category] || "text-foreground"}`}>
            {label}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {post.read_time}
            </span>
            <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
