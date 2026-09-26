"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  ClipboardList,
  ExternalLink,
  Home,
  KanbanSquare,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { LoginForm, useAuth } from "@/features/admin-auth";
import { Loader } from "@/shared/ui/loader";
import { cn } from "@/shared/lib/cn";

const NAV = [
  { label: "Dashboard", href: ROUTES.admin, icon: LayoutDashboard },
  { label: "CRM", href: ROUTES.adminCrm, icon: KanbanSquare },
  { label: "Properties", href: ROUTES.adminProperties, icon: Home },
  { label: "Agents", href: ROUTES.adminAgents, icon: Users },
  { label: "Services", href: ROUTES.adminServices, icon: Wrench },
  { label: "Requests", href: ROUTES.adminRequests, icon: ClipboardList },
  { label: "Certificates", href: ROUTES.adminCertificates, icon: Award },
  { label: "Settings", href: ROUTES.adminSettings, icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { authed, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader />
      </div>
    );
  }

  if (!authed) return <LoginForm />;

  return (
    <div className="bg-background flex min-h-screen flex-col md:flex-row">
      <aside className="border-border flex shrink-0 flex-col border-b md:sticky md:top-0 md:h-screen md:w-[240px] md:border-r md:border-b-0">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="bg-brand-green grid size-8 place-items-center rounded-lg font-serif text-lg font-bold text-white">
            G
          </span>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold tracking-[0.1em]">GRAND CITY</div>
            <div className="text-muted-foreground text-[11px] tracking-wider uppercase">Admin</div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-0">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-border mt-auto hidden flex-col gap-1 border-t p-3 md:flex">
          <Link
            href={ROUTES.home}
            className="text-muted-foreground hover:bg-accent flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors"
          >
            <ExternalLink className="size-4" />
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="border-border flex items-center justify-end gap-2 border-b px-6 py-3 md:hidden">
          <Link href={ROUTES.home} className="text-muted-foreground rounded-md px-3 py-1.5 text-sm">
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-destructive rounded-md px-3 py-1.5 text-sm font-medium"
          >
            Sign out
          </button>
        </div>
        <div className="mx-auto max-w-[1100px] p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
