import { AgentManager } from "@/features/admin-agent-manager";

export default function AdminAgentsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Agents</h1>
      <p className="text-muted-foreground mt-1 text-sm">The studio roster.</p>
      <div className="mt-8">
        <AgentManager />
      </div>
    </div>
  );
}
