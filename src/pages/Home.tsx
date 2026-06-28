import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Smartphone, Briefcase, Wifi, Bitcoin, Sparkles, Eye, Users, BookOpen } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import AppCard from "@/components/AppCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { earningApps } from "@/data/blogData";
import { usePosts } from "@/hooks/usePosts";

const categories = [
  { name: "Earning Apps", path: "/earning-apps", icon: Smartphone, desc: "Top apps that pay" },
  { name: "Online Jobs", path: "/online-jobs", icon: Briefcase, desc: "Remote work for ETH" },
  { name: "Internet Tips", path: "/internet-tips", icon: Wifi, desc: "Save data, browse smart" },
  { name: "Crypto Guides", path: "/crypto-guides", icon: Bitcoin, desc: "Crypto, Binance, P2P" },
];

export default function Home() {
  const { data: featuredPosts = [] } = usePosts({ featuredOnly: true });
  const { data: latestPosts = [] } = usePosts({ limit: 4 });
  const topApps = earningApps.slice(0, 3);

  const hero = featuredPosts[0] || latestPosts[0];
  const secondary = latestPosts.filter((p) => p.id !== hero?.id).slice(0, 3);

  return (
    <>
      {/* ====== HERO BENTO ====== */}
      <section className="relative overflow-hidden hero-gradient text-surface-dark-foreground">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />

        <div className="container relative py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Headline */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="chip bg-surface-dark-foreground/10 border border-surface-dark-foreground/15 text-surface-dark-foreground/90 w-fit mb-5">
                <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> #1 Ethiopian Online Earning Guide
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] mb-6">
                Make money <br className="hidden sm:block" />
                online from <span className="text-gradient">Ethiopia.</span>
              </h1>
              <p className="text-base md:text-lg text-surface-dark-foreground/70 max-w-xl mb-8">
                Honest, step-by-step playbooks on earning apps, freelancing, crypto and internet hacks — written for hustlers in Addis and beyond.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/blog" className="px-6 py-3 bg-surface-dark-foreground text-primary rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/earning-apps" className="px-6 py-3 border border-surface-dark-foreground/20 rounded-xl font-medium hover:bg-surface-dark-foreground/10 transition">
                  Browse Apps
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-10 text-sm">
                <Stat icon={BookOpen} label="Free guides" value={`${latestPosts.length}+`} />
                <Stat icon={Users} label="Hustlers helped" value="10k+" />
                <Stat icon={TrendingUp} label="Avg payout" value="$2–8/day" />
              </div>
            </div>

            {/* Featured card */}
            {hero && (
              <Link to={`/blog/${hero.slug}`} className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-surface-dark-foreground/15 bg-surface-dark-foreground/[0.04] backdrop-blur min-h-[360px] flex flex-col">
                {hero.featured_image && (
                  <img src={hero.featured_image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225_65%_8%)] via-[hsl(225_65%_8%/0.6)] to-transparent" />
                <div className="relative mt-auto p-6 md:p-8">
                  <span className="chip bg-primary-glow/20 text-primary-glow border border-primary-glow/30 mb-3">
                    <Sparkles className="h-3 w-3" /> Featured
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold leading-snug group-hover:text-primary-glow transition-colors">
                    {hero.title}
                  </h3>
                  <p className="text-sm text-surface-dark-foreground/70 mt-2 line-clamp-2">{hero.excerpt}</p>
                  <div className="mt-4 text-sm font-medium text-primary-glow flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ====== CATEGORY BENTO ====== */}
      <section className="container py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.path}
              to={cat.path}
              className={`group relative overflow-hidden rounded-2xl border bg-card card-hover p-6 ${
                i === 0 ? "sm:row-span-1" : ""
              }`}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-base mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.desc}</p>
              <ArrowRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      <div className="container"><AdPlaceholder label="Horizontal Ad Banner" /></div>

      {/* ====== LATEST – BENTO MIX ====== */}
      <section className="container py-16">
        <SectionHeader title="Latest Articles" link="/blog" linkLabel="View all" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.slice(0, 3).map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </section>

      {/* ====== APPS BAND ====== */}
      <section className="relative bg-muted/50 border-y">
        <div className="container py-16">
          <SectionHeader title="Popular Earning Apps" link="/earning-apps" linkLabel="See all" />
          <div className="grid md:grid-cols-3 gap-5">
            {topApps.map((app) => <AppCard key={app.id} app={app} />)}
          </div>
        </div>
      </section>

      <div className="container py-2"><AdPlaceholder label="In-Content Ad" /></div>

      {/* ====== FEATURED ====== */}
      {featuredPosts.length > 0 && (
        <section className="container py-16">
          <SectionHeader title="Featured Guides" subtitle="Hand-picked playbooks worth your time" />
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </section>
      )}

      {/* ====== CTA ====== */}
      <section className="relative overflow-hidden hero-gradient text-surface-dark-foreground">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
        <div className="container relative py-20 text-center">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-primary-glow/20 text-primary-glow items-center justify-center mb-5">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-surface-dark-foreground/70 mb-8 max-w-lg mx-auto">
            Free, no-fluff guides written by Ethiopians who've actually cashed out.
          </p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-3 bg-surface-dark-foreground text-primary rounded-xl font-semibold hover:opacity-90 transition">
            Explore all guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2 text-surface-dark-foreground/80">
      <Icon className="h-4 w-4 text-primary-glow" />
      <span className="font-semibold text-surface-dark-foreground">{value}</span>
      <span className="text-surface-dark-foreground/60">{label}</span>
    </div>
  );
}

function SectionHeader({ title, subtitle, link, linkLabel }: { title: string; subtitle?: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
