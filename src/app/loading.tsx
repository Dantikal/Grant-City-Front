import { Loader } from "@/shared/ui/loader";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Loader label="Loading…" />
    </div>
  );
}
