"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif text-4xl font-medium">Something went wrong</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-sm">
          An unexpected error occurred. Please try again — if it keeps happening, let us know.
        </p>
        <div className="mt-8 flex justify-center">
          <Button variant="lime" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
