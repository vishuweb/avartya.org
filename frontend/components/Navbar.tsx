"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileMenu(false);

  return (
    <nav
      className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md border-b border-gray-100" : "border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded flex-shrink-0" 
          onClick={closeMobile}
        >
          {/* Using the full Avartya logo provided */}
          <div className="relative flex items-center justify-start w-32 h-12 sm:w-40 sm:h-14 transition-transform duration-300 ease-out group-hover:scale-105">
            <Image
              src="/avartya.png"
              alt="Avartya Foundation Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-sm">
          <li>
            <Link href="/about" className="hover:text-green-600 transition-colors">About Us</Link>
          </li>
          <li>
            <Link href="/campaigns" className="hover:text-green-600 transition-colors">Campaigns</Link>
          </li>
          <li>
            <Link href="/updates" className="hover:text-green-600 transition-colors">Updates</Link>
          </li>
          <li>
            <Link href="/centre" className="hover:text-green-600 transition-colors">Our Centres</Link>
          </li>
          <li>
            <Link href="/women-help" className="hover:text-green-600 transition-colors">Women Help</Link>
          </li>

          {/* Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className="cursor-pointer hover:text-green-600 transition-colors flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={open}
            >
              Get Involved
              <svg
                className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="dropdown-menu absolute top-8 left-0 bg-white shadow-xl rounded-xl py-2 w-48 border border-gray-100 z-50">
                <Link
                  href="/volunteer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-green-50 hover:text-green-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                Become a Volunteer
                </Link>
                <Link
                  href="/partners"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-green-50 hover:text-green-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                Partner With Us
                </Link>
                <Link
                  href="/careers"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-green-50 hover:text-green-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  💼 Careers
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* Support Button (Desktop) */}
        <Link
          href="/donate"
          className="hidden md:inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-sm"
        >
          ❤️ SUPPORT US
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 cursor-pointer p-1 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              mobileMenu ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              mobileMenu ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              mobileMenu ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-2 flex flex-col gap-1 bg-white border-t border-gray-100">
          {[
            { href: "/about", label: "About Us", icon: "🏛️" },
            { href: "/campaigns", label: "Campaigns", icon: "📢" },
            { href: "/updates", label: "Updates", icon: "📰" },
            { href: "/centre", label: "Our Centres", icon: "📍" },
            { href: "/women-help", label: "Women Help", icon: "💜" },
            { href: "/volunteer", label: "Volunteer", icon: "🌱" },
            { href: "/partners", label: "Partner With Us", icon: "🤝" },
            { href: "/careers", label: "Careers", icon: "💼" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              href="/donate"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl text-center font-semibold hover:bg-green-700 transition-colors"
              onClick={closeMobile}
            >
              ❤️ SUPPORT US
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}