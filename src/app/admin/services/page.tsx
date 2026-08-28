import { ServiceManager } from "@/features/admin-service-manager";

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Services</h1>
      <p className="text-muted-foreground mt-1 text-sm">The four things we do.</p>
      <div className="mt-8">
        <ServiceManager />
      </div>
    </div>
  );
}
