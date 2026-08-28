import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <div className="text-brand-accent font-serif text-[120px] leading-none font-semibold">
          404
        </div>
        <h1 className="mt-2 font-serif text-4xl font-medium">We couldn&apos;t find that page</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-sm">
          The page may have moved, or the listing may have just gone under offer.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="lime">
            <Link href={ROUTES.home}>Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={ROUTES.properties}>Browse properties</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
