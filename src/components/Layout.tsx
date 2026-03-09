import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, TrendingUp, ChevronDown } from "lucide-react";

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="hero-gradient text-surface-dark-foreground text-xs py-1.5 text-center font-medium tracking-wide">
        🇪🇹 Helping Ethiopians earn online — one hustle at a time
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>A Plus Hustler</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t bg-background">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm font-medium border-b border-border/50 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="hero-gradient text-surface-dark-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
                <TrendingUp className="h-5 w-5" />
                A Plus Hustler
              </div>
              <p className="text-sm opacity-70">
                Helping people in Ethiopia learn how to make money online through guides, apps, and tips.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Categories</h4>
              <div className="flex flex-col gap-2 text-sm opacity-70">
                <Link to="/earning-apps" className="hover:opacity-100 transition-opacity">Earning Apps</Link>
                <Link to="/online-jobs" className="hover:opacity-100 transition-opacity">Online Jobs</Link>
                <Link to="/internet-tips" className="hover:opacity-100 transition-opacity">Internet Tips</Link>
                <Link to="/crypto-guides" className="hover:opacity-100 transition-opacity">Crypto Guides</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Pages</h4>
              <div className="flex flex-col gap-2 text-sm opacity-70">
                <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
                <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
                <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Newsletter</h4>
              <p className="text-sm opacity-70 mb-3">Get the latest hustle tips delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-md text-sm bg-background/10 border border-surface-dark-foreground/20 placeholder:text-surface-dark-foreground/40 text-surface-dark-foreground"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-surface-dark-foreground/10 mt-8 pt-6 text-center text-xs opacity-50">
            © {new Date().getFullYear()} A Plus Hustler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
