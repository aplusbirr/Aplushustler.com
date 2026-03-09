import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, PlusCircle, BarChart3, Settings, LogOut,
  TrendingUp, Users, Eye, DollarSign, Menu, X
} from "lucide-react";
import { blogPosts } from "@/data/blogData";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "All Posts", path: "/admin/posts", icon: FileText },
  { name: "New Post", path: "/admin/new", icon: PlusCircle },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 font-display font-bold">
            <TrendingUp className="h-5 w-5 text-primary" />
            Admin Panel
          </Link>
          <button onClick={onClose} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut className="h-4 w-4" /> Back to Site
          </Link>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, label, value, change }: { icon: any; label: string; value: string; change: string }) {
  return (
    <div className="bg-card rounded-xl border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-xs text-primary mt-1">{change}</p>
    </div>
  );
}

function DashboardHome() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Eye} label="Page Views" value="12,459" change="+14% from last month" />
        <StatCard icon={Users} label="Visitors" value="3,842" change="+8% from last month" />
        <StatCard icon={FileText} label="Published Posts" value={String(blogPosts.length)} change="+2 this week" />
        <StatCard icon={DollarSign} label="Est. Revenue" value="$45.20" change="+22% from last month" />
      </div>

      <h2 className="font-display text-lg font-bold mb-4">Recent Posts</h2>
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
            {blogPosts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="p-3 font-medium">{post.title}</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell capitalize">{post.category.replace("-", " ")}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{post.date}</td>
                <td className="p-3"><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Published</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostsList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">All Posts</h1>
        <Link to="/admin/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <PlusCircle className="h-4 w-4" /> New Post
        </Link>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Title</th>
              <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
              <th className="text-left p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="p-3 font-medium">{post.title}</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell capitalize">{post.category.replace("-", " ")}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{post.date}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="text-xs bg-muted px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Edit</button>
                    <button className="text-xs bg-muted px-2 py-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewPost() {
  const [form, setForm] = useState({ title: "", category: "earning-apps", content: "", excerpt: "" });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Create New Post</h1>
      <div className="bg-card rounded-xl border p-6 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter post title..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="earning-apps">Earning Apps</option>
            <option value="online-jobs">Online Jobs</option>
            <option value="internet-tips">Internet Tips</option>
            <option value="crypto-guides">Crypto Guides</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Short description..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Content (Markdown)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={15}
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
            placeholder="Write your article in markdown..."
          />
        </div>
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Publish Post
        </button>
      </div>
    </div>
  );
}

function Analytics() {
  const stats = [
    { page: "Homepage", views: 4520, unique: 1890 },
    { page: "Best Earning Apps", views: 3210, unique: 1450 },
    { page: "Freelancing Guide", views: 2100, unique: 980 },
    { page: "Crypto Beginners", views: 1890, unique: 760 },
    { page: "Data Saving Tips", views: 1200, unique: 540 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Eye} label="Total Views (30d)" value="12,920" change="+18% vs prev" />
        <StatCard icon={Users} label="Unique Visitors" value="5,620" change="+12% vs prev" />
        <StatCard icon={BarChart3} label="Avg. Read Time" value="3m 42s" change="+5% vs prev" />
      </div>

      <h2 className="font-display text-lg font-bold mb-4">Top Pages</h2>
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Page</th>
              <th className="text-left p-3 font-medium">Views</th>
              <th className="text-left p-3 font-medium">Unique</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.page} className="border-t">
                <td className="p-3 font-medium">{s.page}</td>
                <td className="p-3 text-muted-foreground">{s.views.toLocaleString()}</td>
                <td className="p-3 text-muted-foreground">{s.unique.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-card rounded-xl border p-6 space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium mb-1 block">Site Name</label>
          <input defaultValue="A Plus Hustler" className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Tagline</label>
          <input defaultValue="Helping Ethiopians earn online" className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">AdSense Publisher ID</label>
          <input placeholder="ca-pub-XXXXXXXXXXXXXXXX" className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Save Settings
        </button>
      </div>
    </div>
  );
}

type AdminView = "dashboard" | "posts" | "new" | "analytics" | "settings";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getView = (): AdminView => {
    if (location.pathname === "/admin/posts") return "posts";
    if (location.pathname === "/admin/new") return "new";
    if (location.pathname === "/admin/analytics") return "analytics";
    if (location.pathname === "/admin/settings") return "settings";
    return "dashboard";
  };

  const view = getView();

  return (
    <div className="min-h-screen flex bg-muted">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b h-14 flex items-center px-4 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="font-display font-semibold capitalize">{view === "new" ? "New Post" : view}</h2>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {view === "dashboard" && <DashboardHome />}
          {view === "posts" && <PostsList />}
          {view === "new" && <NewPost />}
          {view === "analytics" && <Analytics />}
          {view === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
