"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/volunteers", label: "Volunteers", icon: "🌱" },
  { href: "/admin/impact", label: "Impact Tracker", icon: "🌿" },
  { href: "/admin/team", label: "Team Members", icon: "👤" },
  { href: "/admin/donations", label: "Donations", icon: "💛" },
  { href: "/admin/updates", label: "News & Updates", icon: "📰" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "📢" },
  { href: "/admin/impactstories", label: "Impact Stories", icon: "📸" },
  { href: "/admin/women-help", label: "Women Help", icon: "💜" },
  { href: "/admin/sustainability", label: "Sustainability", icon: "♻️" },
  { href: "/admin/resources", label: "Resources", icon: "🔗" },
  { href: "/admin/email", label: "Send Email", icon: "✉️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/adminlogin");
    }
    const name = localStorage.getItem("adminName");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (name) setAdminName(name);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    router.push("/adminlogin");
  };

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Avartya Admin</h2>
              <p className="text-green-300 text-xs mt-0.5">Management Portal</p>
            </div>
            <button
              className="lg:hidden text-green-300 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest px-3 mb-3">
            Management
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href, item.exact)
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-green-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-green-700">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">
              {adminName[0]}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{adminName}</p>
              <p className="text-green-400 text-xs">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 text-red-300 hover:bg-red-600/40 hover:text-red-200 transition-all text-sm font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-800">Avartya Admin</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}