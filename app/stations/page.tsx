"use client";

// app/stations/page.tsx

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap, MapPin, Plug, Clock, Star, ChevronDown,
  Search, SlidersHorizontal, Wifi, Coffee, ParkingSquare,
  ShieldCheck, Sun, Car, Leaf, Building2, Flame, Battery
} from "lucide-react";
import { stations, Station, ChargerType, StationStatus } from "../../lib/stations";

const CHARGER_TYPES: ChargerType[] = ["CCS", "CHAdeMO", "Type 2", "Tesla"];
const STATUS_OPTIONS: StationStatus[] = ["Available", "Busy", "Offline"];

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "speed";

function StationIcon({ id, className }: { id: number; className?: string }) {
  const icons: Record<number, React.ReactNode> = {
    1: <Zap className={className} />,
    2: <Leaf className={className} />,
    3: <Flame className={className} />,
    4: <Building2 className={className} />,
    5: <Plug className={className} />,
    6: <Zap className={className} />,
    7: <Car className={className} />,
    8: <Sun className={className} />,
    9: <MapPin className={className} />,
  };
  return <>{icons[id] ?? <Zap className={className} />}</>;
}

// Each card gets a subtle tinted glow matching the hero's blue/amber palette
const stationColors: Record<number, { bg: string; icon: string; border: string; glow: string }> = {
  1: { bg: "bg-blue-50",   icon: "text-[#0066FF]",  border: "border-blue-100",  glow: "shadow-blue-100" },
  2: { bg: "bg-emerald-50",icon: "text-emerald-500",border: "border-emerald-100",glow: "shadow-emerald-100" },
  3: { bg: "bg-amber-50",  icon: "text-[#FFB800]",  border: "border-amber-100", glow: "shadow-amber-100" },
  4: { bg: "bg-sky-50",    icon: "text-sky-500",    border: "border-sky-100",   glow: "shadow-sky-100" },
  5: { bg: "bg-blue-50",   icon: "text-[#0066FF]",  border: "border-blue-100",  glow: "shadow-blue-100" },
  6: { bg: "bg-indigo-50", icon: "text-indigo-500", border: "border-indigo-100",glow: "shadow-indigo-100" },
  7: { bg: "bg-rose-50",   icon: "text-rose-500",   border: "border-rose-100",  glow: "shadow-rose-100" },
  8: { bg: "bg-amber-50",  icon: "text-[#FFB800]",  border: "border-amber-100", glow: "shadow-amber-100" },
  9: { bg: "bg-blue-50",   icon: "text-[#0066FF]",  border: "border-blue-100",  glow: "shadow-blue-100" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-[#FFB800] fill-[#FFB800]" : "text-slate-200 fill-slate-200"}`}
        />
      ))}
    </span>
  );
}

function StatusBadge({ status }: { status: StationStatus }) {
  const map: Record<StationStatus, string> = {
    Available: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Busy:      "bg-amber-50  text-amber-700  border border-amber-200",
    Offline:   "bg-red-50    text-red-600    border border-red-200",
  };
  const dot: Record<StationStatus, string> = {
    Available: "bg-emerald-500",
    Busy:      "bg-amber-500",
    Offline:   "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: ChargerType }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
      {type}
    </span>
  );
}

function AmenityIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("wifi"))   return <Wifi className="w-3.5 h-3.5" />;
  if (lower.includes("café") || lower.includes("cafe")) return <Coffee className="w-3.5 h-3.5" />;
  if (lower.includes("park"))   return <ParkingSquare className="w-3.5 h-3.5" />;
  if (lower.includes("cctv") || lower.includes("shield")) return <ShieldCheck className="w-3.5 h-3.5" />;
  if (lower.includes("solar"))  return <Sun className="w-3.5 h-3.5" />;
  return <Plug className="w-3.5 h-3.5" />;
}

function StationCard({ station }: { station: Station }) {
  const colors = stationColors[station.id] ?? stationColors[1];

  return (
    <Link href={`/stations/${station.id}`} className="block group">
      <div className={`bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:${colors.glow} group-hover:border-slate-200 h-full flex flex-col`}>

        {/* Thumb */}
        <div className={`relative h-44 ${colors.bg} ${colors.border} border-b flex items-center justify-center flex-shrink-0`}>
          {/* Dot-grid pattern like hero */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
          <StationIcon id={station.id} className={`w-14 h-14 ${colors.icon} opacity-90 relative z-10`} />
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={station.status} />
          </div>
          <div className="absolute top-3 left-3 z-10">
            <TypeBadge type={station.type} />
          </div>
          {/* Speed pill */}
          <div className="absolute bottom-3 right-3 z-10 bg-white border border-slate-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
            <Battery className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-xs font-bold text-slate-800">{station.speed} kW</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-1">
            {station.name}
          </h3>
          <p className="text-slate-400 text-xs mb-3 flex items-center gap-1">
            <MapPin className="w-3 h-3 flex-shrink-0" /> {station.address}
          </p>

          {/* Stats row */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-xs text-slate-500 flex items-center gap-1.5">
              <Plug className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-700">{station.freeSlots}/{station.slots}</span> free
            </span>
            <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-700">{station.distance}</span>
            </span>
            <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-700">{station.hours}</span>
            </span>
          </div>

          {/* Amenity icons */}
          <div className="flex gap-1.5 mb-4">
            {station.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                title={a}
                className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400"
              >
                <AmenityIcon name={a} />
              </span>
            ))}
            {station.amenities.length > 4 && (
              <span className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                +{station.amenities.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
            <div>
              <div className="text-xl font-extrabold text-slate-900 leading-none">
                ₹{station.price}
                <span className="text-slate-400 text-xs font-normal ml-1">/kWh</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <StarRating rating={station.rating} />
                <span className="text-slate-400 text-xs">
                  {station.rating} <span className="text-slate-300">·</span> {station.reviewCount} reviews
                </span>
              </div>
            </div>
            <span className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-[0_0_16px_rgba(0,102,255,0.25)] group-hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              Book Now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
        active
          ? "bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]"
          : "bg-white border-slate-200 text-slate-500 hover:border-[#0066FF]/40 hover:text-[#0066FF]"
      }`}
    >
      {label}
    </button>
  );
}

export default function StationsPage() {
  const [query, setQuery]               = useState("");
  const [typeFilter, setTypeFilter]     = useState<ChargerType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StationStatus | "all">("all");
  const [sort, setSort]                 = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = stations.filter((s) => {
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q);
      const matchType   = typeFilter   === "all" || s.type   === typeFilter;
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchQuery && matchType && matchStatus;
    });
    if (sort === "price-asc")  result = [...result].sort((a, b) => a.price  - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price  - a.price);
    if (sort === "rating")     result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === "speed")      result = [...result].sort((a, b) => b.speed  - a.speed);
    return result;
  }, [query, typeFilter, statusFilter, sort]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100 px-4 pt-28 pb-10">

        {/* Ambient glows — light version */}
        <div className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-[#0066FF]/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#FFB800]/8 blur-[100px]" />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-[#0066FF]/30 bg-[#0066FF]/8 text-[#0066FF] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Zap className="w-3.5 h-3.5 fill-[#0066FF] text-[#0066FF]" />
            {stations.filter((s) => s.status === "Available").length} stations available right now
          </div>

          <h1 className="font-extrabold text-4xl md:text-5xl text-slate-900 mb-3 leading-tight tracking-tight">
            Find &amp; book{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">EV charging</span>
              <span className="absolute bottom-1 left-0 right-0 -z-0 h-3 bg-[#FFB800]/40" />
            </span>{" "}
            near you.
          </h1>
          <p className="text-slate-500 text-base mb-8 max-w-xl">
            Browse, filter and book EV charging points across thousands of locations in India.
          </p>

          {/* Search bar — matches hero */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, area or station name…"
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(0,102,255,0.35)] transition-colors hover:bg-[#0052CC] whitespace-nowrap">
              <Search className="h-4 w-4" /> Find Stations
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">50k+</p>
              <p className="text-xs text-slate-400">Active drivers</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-slate-900">2,500+</p>
              <p className="text-xs text-slate-400">Verified hosts</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-slate-900">4.9</p>
              <p className="text-xs text-slate-400">Avg rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />

          <span className="text-slate-400 text-xs uppercase tracking-wider mr-1">Type:</span>
          <FilterChip label="All" active={typeFilter === "all"} onClick={() => setTypeFilter("all")} />
          {CHARGER_TYPES.map((t) => (
            <FilterChip key={t} label={t} active={typeFilter === t} onClick={() => setTypeFilter(t)} />
          ))}

          <div className="w-px h-4 bg-slate-200 mx-1" />

          <span className="text-slate-400 text-xs uppercase tracking-wider mr-1">Status:</span>
          <FilterChip label="All" active={statusFilter === "all"} onClick={() => setStatusFilter("all")} />
          {STATUS_OPTIONS.map((s) => (
            <FilterChip key={s} label={s} active={statusFilter === s} onClick={() => setStatusFilter(s as StationStatus)} />
          ))}

          {/* Sort */}
          <div className="ml-auto relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-600 outline-none cursor-pointer hover:border-[#0066FF]/40 transition-colors font-medium"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="speed">Fastest Speed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          <span className="text-slate-400 text-xs font-medium ml-2 hidden sm:block">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-10 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-600 text-lg font-semibold mb-1">No stations found</p>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}