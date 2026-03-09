import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";
import { useState } from "react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { blogPosts } from "@/data/blogData";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([]);
  const [commenterName, setCommenterName] = useState("");

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary font-medium">← Back to Blog</Link>
      </div>
    );
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && commenterName.trim()) {
      setComments([...comments, { name: commenterName, text: comment, date: new Date().toLocaleDateString() }]);
      setComment("");
      setCommenterName("");
    }
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-semibold mt-6 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg text-sm">{line.slice(2)}</blockquote>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{line.slice(2)}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold my-2">{line.slice(2, -2)}</p>;
      if (line.match(/^\d+\./)) return <li key={i} className="ml-4 mb-1 list-decimal text-muted-foreground">{line.replace(/^\d+\.\s*/, "")}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
    });
  };

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2);

  return (
    <div className="container py-10">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-6">
            {post.featuredImage ? (
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><span className="text-6xl">📝</span></div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-muted px-2.5 py-1 rounded-full flex items-center gap-1">
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>

          <AdPlaceholder label="In-Article Ad" />

          <div className="prose-content mt-6">{renderContent(post.content)}</div>

          <AdPlaceholder label="After-Article Ad" />

          {/* Comments */}
          <section className="mt-12 border-t pt-8">
            <h3 className="font-display text-xl font-bold mb-6">Comments ({comments.length})</h3>

            {comments.map((c, i) => (
              <div key={i} className="bg-muted rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}

            <form onSubmit={handleComment} className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Post Comment
              </button>
            </form>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AdPlaceholder label="Sidebar Ad" />

          {relatedPosts.length > 0 && (
            <div className="bg-card rounded-xl border p-5">
              <h3 className="font-display font-semibold mb-4">Related Posts</h3>
              {relatedPosts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="block mb-3 last:mb-0">
                  <p className="text-sm font-medium hover:text-primary transition-colors">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.readTime}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="bg-primary/5 rounded-xl border border-primary/10 p-5">
            <h3 className="font-display font-semibold mb-2">📧 Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">Get weekly earning tips in your inbox.</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-lg border text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
