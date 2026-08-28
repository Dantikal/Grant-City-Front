import { AmbientBackground } from "@/widgets/ambient-background";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
