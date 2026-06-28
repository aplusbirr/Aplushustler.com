import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, TrendingUp, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Earning Apps", path: "/earning-apps" },
  { name: "Online Jobs", path: "/online-jobs" },
  { name: "Internet Tips", path: "/internet-tips" },
  { name: "Crypto Guides", path: "/crypto-guides" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="hero-gradient text-surface-dark-foreground text-xs py-2 text-center font-medium tracking-wide">
        🇪🇹 Helping Ethiopians earn online — one hustle at a time
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="h-9 w-9 rounded-xl accent-gradient flex items-center justify-center shadow-sm">
              <TrendingUp className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">A Plus <span className="text-primary">Hustler</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <Link to="/blog" className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition">
            Start Learning <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t bg-background">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-3 text-sm font-medium border-b border-border/50 ${
                  isActive(item.path) ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative overflow-hidden hero-gradient text-surface-dark-foreground mt-8">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" aria-hidden />
        <div className="container relative py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="h-9 w-9 rounded-xl bg-surface-dark-foreground/10 border border-surface-dark-foreground/15 flex items-center justify-center">
                  <TrendingUp className="h-4.5 w-4.5 text-primary-glow" strokeWidth={2.5} />
                </span>
                <span className="font-display font-bold text-lg">A Plus Hustler</span>
              </div>
              <p className="text-sm text-surface-dark-foreground/65 leading-relaxed max-w-sm">
                Helping people in Ethiopia learn how to make money online through guides, apps, and tips that actually work.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-surface-dark-foreground/90">Topics</h4>
              <div className="flex flex-col gap-2.5 text-sm text-surface-dark-foreground/65">
                <Link to="/earning-apps" className="hover:text-primary-glow transition-colors">Earning Apps</Link>
                <Link to="/online-jobs" className="hover:text-primary-glow transition-colors">Online Jobs</Link>
                <Link to="/internet-tips" className="hover:text-primary-glow transition-colors">Internet Tips</Link>
                <Link to="/crypto-guides" className="hover:text-primary-glow transition-colors">Crypto Guides</Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-surface-dark-foreground/90">Site</h4>
              <div className="flex flex-col gap-2.5 text-sm text-surface-dark-foreground/65">
                <Link to="/about" className="hover:text-primary-glow transition-colors">About</Link>
                <Link to="/contact" className="hover:text-primary-glow transition-colors">Contact</Link>
                <Link to="/privacy" className="hover:text-primary-glow transition-colors">Privacy</Link>
                <Link to="/blog" className="hover:text-primary-glow transition-colors">Blog</Link>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-surface-dark-foreground/90">Get hustle tips weekly</h4>
              <p className="text-sm text-surface-dark-foreground/65 mb-4">No spam. Unsubscribe anytime.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-surface-dark-foreground/[0.06] border border-surface-dark-foreground/15 placeholder:text-surface-dark-foreground/40 text-surface-dark-foreground focus:outline-none focus:border-primary-glow/50"
                />
                <button className="px-4 py-2.5 bg-surface-dark-foreground text-primary rounded-lg text-sm font-semibold hover:opacity-90 transition">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-dark-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-dark-foreground/50">
            <span>© {new Date().getFullYear()} A Plus Hustler. All rights reserved.</span>
            <span>Made with care in Addis Ababa 🇪🇹</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
