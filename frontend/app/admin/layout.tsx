"use client";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Permanent Sidebar */}
      <div className="w-64 bg-green-700 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Avartya Admin</h2>
        <ul className="space-y-4 font-semibold">
          <li>
            <Link href="/admin" className="hover:text-green-300">Volunteers</Link>
          </li>
          <li>
            <Link href="/admin/impactstories" className="hover:text-green-300">Add Impact Story</Link>
          </li>
          <li>Campaigns</li>
          <li>Gallery</li>
        </ul>
      </div>

      {/* Dynamic Main Content (This is where your pages will render) */}
      <div className="flex-1 p-10 bg-gray-50">
        {children}
      </div>
      
    </div>
  );
}