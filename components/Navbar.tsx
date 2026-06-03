"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Zap,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Stations",
      href: "/stations",
    },
    {
      name: "How it works",
      href: "/how-it-works",
    },
    {
      name: "Become Host",
      href: "/become-host",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const handleLogout = () => {
    logout();

    setDropdownOpen(false);

    router.push("/");
  };

  const dashboardHref =
    user?.role === "host"
      ? "/host/dashboard"
      : "/user/dashboard";

  return (
    <header className="fixed left-0 top-4 z-50 w-full">
      
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between rounded-full border border-white/30 bg-white/60 px-6 py-3 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-2xl">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066FF] transition-all duration-300 group-hover:scale-105">
            <Zap
              className="h-5 w-5 text-white"
              fill="currentColor"
            />
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            Geo
            <span className="text-[#FFB800]">
              NEV
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          
          {navLinks.map((link) => {
            const active =
              pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white/80 text-[#0066FF] shadow-sm"
                    : "text-gray-700 hover:bg-white/60 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Area */}
        <div className="hidden items-center gap-3 md:flex">
          
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#0052CC]"
              >
                Get started
              </Link>
            </>
          ) : (
            <div className="relative">
              
              <button
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
                className="flex items-center gap-3 rounded-full border border-white/30 bg-white/50 px-3 py-2 backdrop-blur-xl transition-all hover:bg-white/70"
              >
                
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066FF] text-sm font-semibold text-white">
                  {user.name.charAt(0)}
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>

                  <span className="text-xs capitalize text-gray-500">
                    {user.role}
                  </span>
                </div>

                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-2xl">
                  
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() =>
                      setDropdownOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-white/60"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Link
                    href={
                      user.role === "host"
                        ? "/host/profile"
                        : "/user/profile"
                    }
                    onClick={() =>
                      setDropdownOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-white/60"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-white/50 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-auto mt-3 w-[92%] max-w-6xl rounded-3xl border border-white/30 bg-white/70 p-4 shadow-2xl backdrop-blur-2xl md:hidden">
          
          <div className="flex flex-col gap-1">
            
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-2xl px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-white/60"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 border-t border-white/20 pt-3">
              
              {!user ? (
                <div className="flex flex-col gap-2">
                  
                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-2xl border border-white/30 bg-white/50 px-4 py-3 text-center text-sm font-medium text-gray-900"
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/register"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-2xl bg-[#0066FF] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Get started
                  </Link>

                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  
                  <Link
                    href={dashboardHref}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-2xl bg-[#0066FF] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-2xl border border-white/30 bg-white/50 px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    Sign out
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}