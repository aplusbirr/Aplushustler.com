import { TrendingUp, Target, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-bold mb-6">About A Plus Hustler</h1>

      <div className="prose-content space-y-6 text-muted-foreground">
        <p className="text-lg">
          A Plus Hustler is Ethiopia's leading online earning guide. We help people discover legitimate ways to make money online through earning apps, freelancing, crypto, and more.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-8">
          {[
            { icon: Target, title: "Our Mission", text: "To empower Ethiopians with the knowledge and tools they need to earn money online." },
            { icon: Users, title: "Our Audience", text: "Students, job seekers, and anyone looking for extra income in Ethiopia." },
            { icon: Heart, title: "Our Values", text: "Honesty, transparency, and providing only legitimate earning opportunities." },
            { icon: TrendingUp, title: "Our Goal", text: "To become the most trusted resource for online earning in East Africa." },
          ].map((item) => (
            <div key={item.title} className="bg-card rounded-xl border p-5">
              <item.icon className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-display font-semibold mb-1">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl font-bold text-foreground">What We Cover</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Earning apps and platforms that work in Ethiopia</li>
          <li>Freelancing guides for beginners</li>
          <li>Cryptocurrency basics and P2P trading</li>
          <li>Internet saving tips and tricks</li>
          <li>Online job opportunities</li>
        </ul>

        <h2 className="font-display text-xl font-bold text-foreground">Our Team</h2>
        <p>
          We are a small team of tech enthusiasts and online earners based in Ethiopia. We test every app and method we recommend to ensure they are legitimate and accessible.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground">Disclaimer</h2>
        <p className="text-sm">
          A Plus Hustler provides information for educational purposes only. We do not guarantee any specific earnings. Results vary based on individual effort, location, and market conditions. Always do your own research before investing time or money.
        </p>
      </div>
    </div>
  );
}
