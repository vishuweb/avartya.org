"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false); // ✅ added

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/avartya.png"
            alt="Avartya Foundation Logo"
            width={40}
            height={60}
            className="object-contain"
          />
          <span className="text-xl font-extrabold tracking-wide text-black">
            Avartya Foundation
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <li>
            <Link href="/about" className="hover:text-green-600 transition">
              About Us
            </Link>
          </li>

          <li>
            <Link href="/work" className="hover:text-green-600 transition">
              Our Work
            </Link>
          </li>

          <li>
            <Link href="/centre" className="hover:text-green-600 transition">
              Our centres
            </Link>
          </li>

          <li>
            <Link href="/impact" className="hover:text-green-600 transition">
              Our Impact
            </Link>
          </li>

          {/* Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="cursor-pointer hover:text-green-600 transition">
              Get Involved
            </span>

            {open && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-3 w-44 border">
                <Link href="/volunteer" className="block px-4 py-2 hover:bg-green-50">
                  Volunteer
                </Link>
                <Link href="/partners" className="block px-4 py-2 hover:bg-green-50">
                  Partner With Us
                </Link>
                <Link href="/careers" className="block px-4 py-2 hover:bg-green-50">
                  Careers
                </Link>
              </div>
            )}
          </li>

        </ul>

        {/* SUPPORT BUTTON */}
        <Link
          href="/donate"
          className="hidden md:inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          SUPPORT US
        </Link>

        {/* ✅ Hamburger (mobile only) */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </div>

      </div>

      {/* ✅ Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-700 font-medium bg-white border-t">

          <Link href="/about" onClick={() => setMobileMenu(false)}>
            About Us
          </Link>

          <Link href="/work" onClick={() => setMobileMenu(false)}>
            Our Work
          </Link>

          <Link href="/centre" onClick={() => setMobileMenu(false)}>
            Our centres
          </Link>

          <Link href="/impact" onClick={() => setMobileMenu(false)}>
            Our Impact
          </Link>

          <Link href="/volunteer" onClick={() => setMobileMenu(false)}>
            Volunteer
          </Link>

          <Link href="/partners" onClick={() => setMobileMenu(false)}>
            Partner With Us
          </Link>

          <Link href="/careers" onClick={() => setMobileMenu(false)}>
            Careers
          </Link>

          <Link
            href="/donate"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-center"
            onClick={() => setMobileMenu(false)}
          >
            SUPPORT US
          </Link>

        </div>
      )}

    </nav>
  );
}