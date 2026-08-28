"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../model/use-auth";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm() {
  const login = useAuth((s) => s.login);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(user, pass);
    if (ok) toast.success("Welcome back");
    else toast.error("Incorrect username or password");
  }

  return (
    <div className="bg-brand-sand dark:bg-background grid min-h-screen place-items-center px-6">
      <div className="border-border bg-card w-full max-w-sm rounded-2xl border p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="bg-brand-green grid size-9 place-items-center rounded-lg font-serif text-lg font-bold text-white">
            G
          </span>
          <div>
            <div className="font-serif text-xl font-bold tracking-[0.12em]">GRAND CITY</div>
            <div className="text-muted-foreground text-xs">Admin panel</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Username</Label>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" variant="lime" size="lg" className="w-full">
            <Lock className="size-4" />
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
