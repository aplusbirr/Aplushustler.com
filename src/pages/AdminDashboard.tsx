import { useState } from "react";
import { Link, useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard, FileText, PlusCircle, BarChart3, Settings, LogOut,
  TrendingUp, Users, Eye, DollarSign, Menu, X, Edit2, Trash2, MessageSquare, ExternalLink
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { DbPost } from "@/hooks/usePosts";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "All Posts", path: "/admin/posts", icon: FileText },
  { name: "New Post", path: "/admin/posts/new", icon: PlusCircle },
  { name: "Comments", path: "/admin/comments", icon: MessageSquare },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col h-screen transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 font-display font-bold">
            <TrendingUp className="h-5 w-5 text-primary" /> CMS Admin
          </Link>
          <button onClick={onClose} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.end ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}>
                <item.icon className="h-4 w-4" /> {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <ExternalLink className="h-4 w-4" /> View Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, label, value, change }: any) {
  return (
    <div className="bg-card rounded-xl border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="font-display text-2xl font-bold">{value}</p>
      {change && <p className="text-xs text-primary mt-1">{change}</p>}
    </div>
  );
}

function DashboardHome() {
  const { data: posts = [] } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      return (data || []) as DbPost[];
    },
  });
  const { data: commentCount = 0 } = useQuery({
    queryKey: ["admin-comment-count"],
    queryFn: async () => {
      const { count } = await supabase.from("comments").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Total Posts" value={posts.length} />
        <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} />
        <StatCard icon={MessageSquare} label="Comments" value={commentCount} />
        <StatCard icon={DollarSign} label="Est. Revenue" value="$0.00" change="AdSense ready" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold">Recent Posts</h2>
        <Link to="/admin/posts/new" className="text-sm text-primary font-medium flex items-center gap-1">
          <PlusCircle className="h-4 w-4" /> New
        </Link>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Title</th>
              <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 5).map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell capitalize">{p.category.replace("-", " ")}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostsList() {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      return (data || []) as DbPost[];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Post deleted"); qc.invalidateQueries({ queryKey: ["admin-posts"] }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">All Posts</h1>
        <Link to="/admin/posts/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> New Post
        </Link>
      </div>
      {isLoading ? <p className="text-muted-foreground text-sm">Loading...</p> : (
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3 text-muted-foreground hidden sm:table-cell capitalize">{p.category.replace("-", " ")}</td>
                  <td className="p-3 hidden md:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1 justify-end">
                      <Link to={`/admin/posts/${p.id}`} className="p-1.5 rounded hover:bg-primary/10 hover:text-primary" title="Edit">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Link>
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="p-1.5 rounded hover:bg-muted" title="View">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10 hover:text-destructive" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

function PostEditor({ id }: { id?: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isEdit = !!id;

  const { data: existing } = useQuery({
    queryKey: ["admin-post", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
      return data as DbPost | null;
    },
    enabled: isEdit,
  });

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "earning-apps",
    featured_image: "", read_time: "5 min read", tags: "", featured: false, published: true,
  });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  if (isEdit && existing && !loaded) {
    setForm({
      title: existing.title, slug: existing.slug, excerpt: existing.excerpt, content: existing.content,
      category: existing.category, featured_image: existing.featured_image || "", read_time: existing.read_time,
      tags: existing.tags.join(", "), featured: existing.featured, published: existing.published,
    });
    setLoaded(true);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      featured_image: form.featured_image || null,
      read_time: form.read_time,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      featured: form.featured,
      published: form.published,
    };

    const { error } = isEdit
      ? await supabase.from("posts").update(payload).eq("id", id!)
      : await supabase.from("posts").insert(payload);

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isEdit ? "Post updated" : "Post created");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
    navigate("/admin/posts");
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">{isEdit ? "Edit Post" : "Create New Post"}</h1>
      <form onSubmit={handleSave} className="bg-card rounded-xl border p-6 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Title *</label>
          <input required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="earning-apps">Earning Apps</option>
              <option value="online-jobs">Online Jobs</option>
              <option value="internet-tips">Internet Tips</option>
              <option value="crypto-guides">Crypto Guides</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Featured Image URL</label>
          <input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Content (Markdown supported)</label>
          <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={18}
            placeholder="## Heading\nYour content here..."
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="ethiopia, crypto, tips"
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Read Time</label>
            <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
            Featured post
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
            Published
          </label>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
          </button>
          <button type="button" onClick={() => navigate("/admin/posts")} className="px-6 py-2.5 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function PostEditorRoute() {
  const path = useLocation().pathname;
  const id = path.split("/").pop();
  if (id === "new") return <PostEditor />;
  return <PostEditor id={id} />;
}

function CommentsManager() {
  const qc = useQueryClient();
  const { data: comments = [] } = useQuery({
    queryKey: ["admin-comments"],
    queryFn: async () => {
      const { data } = await supabase.from("comments").select("*, posts(title, slug)").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete comment?")) return;
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-comments"] }); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Comments</h1>
      <div className="space-y-3">
        {comments.map((c: any) => (
          <div key={c.id} className="bg-card rounded-xl border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 text-sm">
                  <span className="font-medium">{c.author_name}</span>
                  <span className="text-xs text-muted-foreground">on {c.posts?.title || "Unknown"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(c.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-muted-foreground text-sm text-center py-12">No comments yet.</p>}
      </div>
    </div>
  );
}

function Analytics() {
  const { data: posts = [] } = useQuery({
    queryKey: ["admin-posts-analytics"],
    queryFn: async () => {
      const { data } = await supabase.from("posts").select("*").order("views", { ascending: false });
      return (data || []) as DbPost[];
    },
  });
  const totalViews = posts.reduce((s, p) => s + (p.views || 0), 0);
  const published = posts.filter(p => p.published).length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} />
        <StatCard icon={FileText} label="Published Posts" value={published} />
        <StatCard icon={Users} label="Avg. Views/Post" value={published ? Math.round(totalViews / published) : 0} />
      </div>
      <h2 className="font-display text-lg font-bold mb-4">Top Posts by Views</h2>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr><th className="text-left p-3">Title</th><th className="text-left p-3">Category</th><th className="text-right p-3">Views</th></tr>
          </thead>
          <tbody>
            {posts.slice(0, 10).map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3 text-muted-foreground capitalize">{p.category.replace("-", " ")}</td>
                <td className="p-3 text-right">{p.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPage() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });
  const [form, setForm] = useState({ site_name: "", tagline: "", adsense_id: "" });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  if (settings && !loaded) {
    setForm({ site_name: settings.site_name, tagline: settings.tagline, adsense_id: settings.adsense_id || "" });
    setLoaded(true);
  }
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Settings saved"); qc.invalidateQueries({ queryKey: ["site-settings"] }); }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSave} className="bg-card rounded-xl border p-6 space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium mb-1 block">Site Name</label>
          <input value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">AdSense Publisher ID</label>
          <input value={form.adsense_id} onChange={(e) => setForm({ ...form, adsense_id: e.target.value })}
            placeholder="ca-pub-XXXXXXXXXXXXXXXX"
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const pageTitle = navItems.find(n => location.pathname === n.path || (n.path !== "/admin" && location.pathname.startsWith(n.path)))?.name || "Admin";

  return (
    <div className="min-h-screen flex bg-muted">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b h-14 flex items-center px-4 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-5 w-5" /></button>
          <h2 className="font-display font-semibold">{pageTitle}</h2>
          <div className="ml-auto text-xs text-muted-foreground hidden sm:block">{user?.email}</div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/:id" element={<PostEditorRoute />} />
            <Route path="comments" element={<CommentsManager />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
