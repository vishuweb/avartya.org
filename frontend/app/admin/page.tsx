"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin-login");
      return;
    }

    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://avartya-org-1.onrender.com/api/volunteers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("API response:", data);

      if (data.volunteers) {
        setVolunteers(data.volunteers);
      } else {
        setVolunteers([]);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setVolunteers([]);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Volunteers</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Education</th>
            <th className="p-2 border">City</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(volunteers) && volunteers.length > 0 ? (
            volunteers.map((v: any, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border">{v.name}</td>
                <td className="p-2 border">{v.email}</td>
                <td className="p-2 border">{v.education}</td>
                <td className="p-2 border">{v.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No volunteers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}