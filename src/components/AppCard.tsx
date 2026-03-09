import { Star } from "lucide-react";
import type { EarningApp } from "@/data/blogData";

export default function AppCard({ app }: { app: EarningApp }) {
  return (
    <div className="bg-card rounded-xl border card-hover p-5">
      <div className="flex items-start gap-4">
        <span className="text-3xl">{app.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold">{app.name}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {app.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-warning">
              <Star className="h-3.5 w-3.5 fill-current" /> {app.rating}
            </span>
            <span className="text-primary font-medium">{app.earnings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
