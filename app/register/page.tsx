"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, User as UserIcon, Home, Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<"user" | "host">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Demo: in production this would POST to /api/register
    router.push(role === "host" ? "/host/dashboard" : "/user/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4 py-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#0066FF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#FFB800]/5 blur-[100px]" />

      <div className="relative w-full max-w-md">
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
            <h1 className="mb-1 text-2xl font-semibold text-white">Create an account</h1>
            <p className="text-sm text-[#94A3B8]">Pick what you want to do</p>
          </div>

          {/* Role cards */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                role === "user"
                  ? "border-[#0066FF] bg-[#0066FF]/10"
                  : "border-[#1E293B] bg-[#0A0E1A] hover:border-[#334155]"
              }`}
            >
              <UserIcon
                className={`mb-2 h-5 w-5 ${
                  role === "user" ? "text-[#0066FF]" : "text-[#64748B]"
                }`}
              />
              <p className="text-sm font-medium text-white">EV Driver</p>
              <p className="mt-0.5 text-xs text-[#94A3B8]">Find &amp; book stations</p>
            </button>
            <button
              type="button"
              onClick={() => setRole("host")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                role === "host"
                  ? "border-[#FFB800] bg-[#FFB800]/10"
                  : "border-[#1E293B] bg-[#0A0E1A] hover:border-[#334155]"
              }`}
            >
              <Home
                className={`mb-2 h-5 w-5 ${
                  role === "host" ? "text-[#FFB800]" : "text-[#64748B]"
                }`}
              />
              <p className="text-sm font-medium text-white">Station Host</p>
              <p className="mt-0.5 text-xs text-[#94A3B8]">List &amp; earn</p>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Full name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#1E293B] bg-[#0A0E1A] py-3 pl-10 pr-3 text-sm text-white placeholder-[#475569] outline-none transition-colors focus:border-[#0066FF]"
                  required
                />
              </div>
            </div>

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
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0066FF] py-3 font-medium text-white shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-colors hover:bg-[#0052CC]"
            >
              <UserPlus className="h-4 w-4" />
              Create {role === "host" ? "Host" : "Driver"} Account
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[#64748B]">
            By signing up, you agree to our Terms &amp; Privacy Policy.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#0066FF] hover:text-[#3B82F6]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}