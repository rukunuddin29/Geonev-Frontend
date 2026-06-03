"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, User, Home, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/lib/dummyuser";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<"user" | "host">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
      return;
    }

    // Redirect using the actual role from the matched user, not the toggle
    const matched = users.find(
      (u) => u.email === email && u.password === password
    );
    router.push(matched?.role === "host" ? "/host/dashboard" : "/user/dashboard");
  };

  const fillDemo = (demoRole: "user" | "host") => {
    setRole(demoRole);
    setEmail(demoRole === "host" ? "host@gmail.com" : "user@gmail.com");
    setPassword("123456");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4 py-12">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#0066FF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#FFB800]/5 blur-[100px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0066FF]">
            <Zap className="h-5 w-5 text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-semibold text-white">
            Volt<span className="text-[#FFB800]">Grid</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-[#1E293B] bg-[#111827] p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-2xl font-semibold text-white">Welcome back</h1>
            <p className="text-sm text-[#94A3B8]">Sign in to continue charging</p>
          </div>

          {/* Role toggle */}
          <div className="mb-6 flex gap-1 rounded-xl border border-[#1E293B] bg-[#0A0E1A] p-1">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                role === "user"
                  ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <User className="h-4 w-4" />
              EV Driver
            </button>
            <button
              type="button"
              onClick={() => setRole("host")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                role === "host"
                  ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Home className="h-4 w-4" />
              Station Host
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#1E293B] bg-[#0A0E1A] py-3 pl-10 pr-3 text-sm text-white placeholder-[#475569] outline-none transition-colors focus:border-[#0066FF]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#0066FF] hover:text-[#3B82F6]">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#1E293B] bg-[#0A0E1A] py-3 pl-10 pr-10 text-sm text-white placeholder-[#475569] outline-none transition-colors focus:border-[#0066FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0066FF] py-3 font-medium text-white shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-colors hover:bg-[#0052CC]"
            >
              Sign in as {role === "host" ? "Station Host" : "EV Driver"}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 border-t border-[#1E293B] pt-6">
            <p className="mb-3 text-center text-xs uppercase tracking-wider text-[#64748B]">
              Try demo accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => fillDemo("user")}
                className="rounded-lg border border-[#1E293B] bg-[#0A0E1A] py-2 text-xs text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-white"
              >
                Driver demo
              </button>
              <button
                onClick={() => fillDemo("host")}
                className="rounded-lg border border-[#1E293B] bg-[#0A0E1A] py-2 text-xs text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-white"
              >
                Host demo
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-[#0066FF] hover:text-[#3B82F6]">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}