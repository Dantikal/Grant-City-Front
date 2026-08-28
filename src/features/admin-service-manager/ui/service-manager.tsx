import { Lock } from "lucide-react";
import { SERVICES } from "@/entities/service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

/** Read-only: service copy is now fixed site content, translated via the i18n
 *  dictionary (EN/RU/KY), so it is not edited here. */
export function ServiceManager() {
  return (
    <div>
      <p className="bg-muted text-muted-foreground mb-4 flex items-center gap-2 rounded-lg p-3 text-sm">
        <Lock className="size-4" />
        Service copy is fixed and translated in the site content — manage it in the translation
        files.
      </p>
      <div className="border-border bg-card rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SERVICES.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-brand-accent font-serif text-lg">{s.no}</TableCell>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="max-w-md">
                  <p className="text-muted-foreground line-clamp-2 text-sm">{s.body}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
