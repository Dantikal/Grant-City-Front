import { CertificateManager } from "@/features/admin-certificate-manager";

export default function AdminCertificatesPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Certificates</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Certificates and the company presentation shown on the About section.
      </p>
      <div className="mt-8">
        <CertificateManager />
      </div>
    </div>
  );
}
