import { PropertyManager } from "@/features/admin-property-manager";

export default function AdminPropertiesPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Properties</h1>
      <p className="text-muted-foreground mt-1 text-sm">All listings currently on the books.</p>
      <div className="mt-8">
        <PropertyManager />
      </div>
    </div>
  );
}
