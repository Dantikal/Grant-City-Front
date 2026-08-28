import { RequestManager } from "@/features/admin-request-manager";

export default function AdminRequestsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Requests</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Enquiries submitted through the site, stored locally in IndexedDB.
      </p>
      <div className="border-border bg-card mt-8 rounded-xl border">
        <RequestManager />
      </div>
    </div>
  );
}
