import { Star, ArrowUpRight } from "lucide-react";
import type { EarningApp } from "@/data/blogData";

export default function AppCard({ app }: { app: EarningApp }) {
  return (
    <div className="group bg-card rounded-2xl border card-hover p-5 cursor-pointer">
      <div className="flex items-start gap-4">
        <span className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/15 transition-colors">
          {app.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold leading-tight group-hover:text-primary transition-colors">{app.name}</h3>
            <span className="chip bg-muted text-muted-foreground shrink-0">{app.category}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{app.description}</p>
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-warning font-medium">
                <Star className="h-3.5 w-3.5 fill-current" /> {app.rating}
              </span>
              <span className="text-primary font-semibold">{app.earnings}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
