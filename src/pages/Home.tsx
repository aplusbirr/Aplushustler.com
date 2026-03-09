import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Smartphone, Briefcase, Wifi, Bitcoin } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import AppCard from "@/components/AppCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { blogPosts, earningApps } from "@/data/blogData";

const categories = [
  { name: "Earning Apps", path: "/earning-apps", icon: Smartphone, desc: "Top apps to earn money" },
  { name: "Online Jobs", path: "/online-jobs", icon: Briefcase, desc: "Remote work opportunities" },
  { name: "Internet Tips", path: "/internet-tips", icon: Wifi, desc: "Save data & browse smart" },
  { name: "Crypto Guides", path: "/crypto-guides", icon: Bitcoin, desc: "Cryptocurrency basics" },
];

export default function Home() {
  const featuredPosts = blogPosts.filter(p => p.featured);
  const latestPosts = blogPosts.slice(0, 4);
  const topApps = earningApps.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-surface-dark-foreground py-16 md:py-24">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" /> #1 Ethiopian Online Earning Guide
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Learn How to <span className="text-primary">Make Money</span> Online
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-8">
            Step-by-step guides on earning apps, online jobs, crypto, and internet tips designed for people in Ethiopia.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/blog"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Learning
            </Link>
            <Link
              to="/earning-apps"
              className="px-6 py-3 bg-surface-dark-foreground/10 border border-surface-dark-foreground/20 rounded-lg font-medium hover:bg-surface-dark-foreground/20 transition-colors"
            >
              Browse Apps
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.path} to={cat.path} className="group bg-card rounded-xl border card-hover p-5 text-center">
              <cat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdPlaceholder label="Horizontal Ad Banner" />

      {/* Latest Posts */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Latest Articles</h2>
          <Link to="/blog" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Popular Apps */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Popular Earning Apps</h2>
            <Link to="/earning-apps" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {topApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder label="In-Content Ad" />

      {/* Featured Guides */}
      <section className="container py-12">
        <h2 className="font-display text-2xl font-bold mb-6">Featured Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-surface-dark-foreground py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="opacity-70 mb-6 max-w-lg mx-auto">
            Join thousands of Ethiopians who are already making money online with our free guides.
          </p>
          <Link
            to="/blog"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Explore All Guides
          </Link>
        </div>
      </section>
    </>
  );
}
