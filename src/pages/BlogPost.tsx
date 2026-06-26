import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AdPlaceholder from "@/components/AdPlaceholder";
import { usePost, useComments, usePosts } from "@/hooks/usePosts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading } = usePost(slug);
  const { data: comments = [] } = useComments(post?.id);
  const { data: related = [] } = usePosts({ category: post?.category, limit: 3 });
  const [comment, setComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const qc = useQueryClient();

  if (isLoading) return <div className="container py-20 text-center text-muted-foreground">Loading...</div>;
  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary font-medium">← Back to Blog</Link>
      </div>
    );
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !commenterName.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("comments").insert({
      post_id: post.id, author_name: commenterName.trim(), content: comment.trim(), approved: true
    });
    if (error) toast.error("Failed to post comment");
    else {
      toast.success("Comment posted!");
      setComment(""); setCommenterName("");
      qc.invalidateQueries({ queryKey: ["comments", post.id] });
    }
    setSubmitting(false);
  };

  const renderContent = (content: string) => content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-semibold mt-6 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg text-sm">{line.slice(2)}</blockquote>;
    if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{line.slice(2)}</li>;
    if (line.match(/^\d+\./)) return <li key={i} className="ml-4 mb-1 list-decimal text-muted-foreground">{line.replace(/^\d+\.\s*/, "")}</li>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
  });

  const relatedPosts = related.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="container py-10">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <div className="grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-6">
            {post.featured_image ? (
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><span className="text-6xl">📝</span></div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(post.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.read_time}</span>
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
          <div className="mt-6">{renderContent(post.content)}</div>
          <AdPlaceholder label="After-Article Ad" />

          <section className="mt-12 border-t pt-8">
            <h3 className="font-display text-xl font-bold mb-6">Comments ({comments.length})</h3>
            {comments.map((c) => (
              <div key={c.id} className="bg-muted rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{c.author_name}</span>
                  <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{c.content}</p>
              </div>
            ))}

            <form onSubmit={handleComment} className="mt-6 space-y-3">
              <input type="text" placeholder="Your name" value={commenterName} onChange={(e) => setCommenterName(e.target.value)} maxLength={100}
                className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <textarea placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} rows={3} maxLength={2000}
                className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              <button type="submit" disabled={submitting}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </section>
        </article>

        <aside className="space-y-6">
          <AdPlaceholder label="Sidebar Ad" />
          {relatedPosts.length > 0 && (
            <div className="bg-card rounded-xl border p-5">
              <h3 className="font-display font-semibold mb-4">Related Posts</h3>
              {relatedPosts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="block mb-3 last:mb-0">
                  <p className="text-sm font-medium hover:text-primary transition-colors">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.read_time}</p>
                </Link>
              ))}
            </div>
          )}
          <div className="bg-primary/5 rounded-xl border border-primary/10 p-5">
            <h3 className="font-display font-semibold mb-2">📧 Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">Get weekly earning tips in your inbox.</p>
            <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg border text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Subscribe</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
