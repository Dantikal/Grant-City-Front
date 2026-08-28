import Image from "next/image";
import Link from "next/link";
import type { Agent } from "../model/agent.types";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/cn";

export function AgentCard({ agent, className }: { agent: Agent; className?: string }) {
  return (
    <article className={cn("group relative", className)}>
      <Link href={ROUTES.agent(agent.slug)} className="absolute inset-0 z-10">
        <span className="sr-only">{agent.name}</span>
      </Link>
      <div className="relative mb-[18px] h-[300px] overflow-hidden rounded-lg">
        <Image
          src={agent.photo}
          alt={agent.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <h3 className="mb-1 font-serif text-[23px] font-semibold">{agent.name}</h3>
      <div className="text-brand-accent mb-2.5 text-[13px] font-semibold tracking-[0.04em] uppercase">
        {agent.role}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{agent.bio}</p>
    </article>
  );
}
