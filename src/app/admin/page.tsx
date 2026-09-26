"use client";

import { useQuery } from "@tanstack/react-query";
import { Home, Users, Wrench, ClipboardList } from "lucide-react";
import { fetchProperties } from "@/entities/property";
import { fetchAgents } from "@/entities/agent";
import { fetchServices } from "@/entities/service";
import { listRequests } from "@/entities/request";
import { queryKeys } from "@/shared/api/query-client";
import Link from "next/link";
import { RequestManager } from "@/features/admin-request-manager";
import { CrmSummaryCards } from "@/features/admin-crm";
import { ROUTES } from "@/shared/constants/routes";

export default function AdminDashboard() {
  const { data: properties } = useQuery({
    queryKey: queryKeys.properties(),
    queryFn: () => fetchProperties(),
  });
  const { data: agents } = useQuery({ queryKey: queryKeys.agents(), queryFn: fetchAgents });
  const { data: services } = useQuery({ queryKey: queryKeys.services(), queryFn: fetchServices });
  const { data: requests } = useQuery({ queryKey: queryKeys.requests(), queryFn: listRequests });
  const newCount = (requests ?? []).filter((r) => r.status === "new").length;

  const cards = [
    { label: "Properties", value: properties?.length ?? 0, icon: Home },
    { label: "Agents", value: agents?.length ?? 0, icon: Users },
    { label: "Services", value: services?.length ?? 0, icon: Wrench },
    { label: "New requests", value: newCount, icon: ClipboardList },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Dashboard</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Live overview of the catalog and incoming requests.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="border-border bg-card rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">{c.label}</span>
                <Icon className="text-brand-accent size-4" />
              </div>
              <div className="mt-3 font-serif text-4xl font-semibold">{c.value}</div>
            </div>
          );
        })}
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold">CRM</h2>
          <Link href={ROUTES.adminCrm} className="text-brand-accent text-sm font-semibold hover:underline">
            Открыть воронку →
          </Link>
        </div>
        <CrmSummaryCards />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Recent requests</h2>
        <RequestManager />
      </section>
    </div>
  );
}
