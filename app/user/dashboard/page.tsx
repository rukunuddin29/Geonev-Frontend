"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        User Dashboard
      </h1>

      <p className="mt-4">
        Welcome {user?.name}
      </p>
    </div>
  );
}