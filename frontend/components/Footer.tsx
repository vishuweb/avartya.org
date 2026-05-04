"use client";
import React from "react";
import Link from "next/link";

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const footerColumns = [
  {
    heading: "ABOUT US",
    links: [
      { label: "About Avartya", href: "/about" },
      { label: "Impact", href: "/impact" },
      { label: "Reach & Presence", href: "/centres" },
      { label: "Milestones", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    heading: "OUR WORK",
    links: [
      { label: "Education", href: "/work/education" },
      { label: "Health", href: "/work/health" },
      { label: "Livelihood", href: "/work/livelihood" },
      { label: "Women Empowerment", href: "/work/women" },
      { label: "Disaster Response", href: "/work/disaster" },
    ],
  },
  {
    heading: "CAMPAIGNS",
    links: [
      { label: "Tree Plantation", href: "/campaigns/tree-plantation" },
      { label: "Women Safety", href: "/campaigns/women-safety" },
      { label: "Pollution Awareness", href: "/campaigns/pollution-awareness" },
      { label: "Clean City Drive", href: "/campaigns/clean-city" },
    ],
  },
  {
    heading: "GET INVOLVED",
    links: [
      { label: "Individual Support", href: "/donate" },
      { label: "Corporate Partnerships", href: "/partners" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "School Partnerships", href: "#" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "RESOURCE CENTRE",
    links: [
      { label: "Annual Report", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Stories of Change", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Films", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#555555] text-white">

      {/* Top Links */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {footerColumns.map((col) => (
            <div key={col.heading}>

              <h3 className="text-base font-extrabold text-cyan-100 tracking-wide uppercase mb-4 border-b border-gray-400 pb-2">
                {col.heading}
              </h3>

              <ul className="space-y-2">

                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-200 hover:text-[#7ED957] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-400 mt-14 pt-10 flex flex-col lg:flex-row justify-between gap-10">

          {/* Contact Info with Logo */}
          <div className="text-sm text-gray-200 space-y-3">
            <div className="flex items-center gap-3 mb-2 opacity-80 hover:opacity-100 transition-opacity">
              <div className="relative w-8 h-8 grayscale contrast-200 brightness-200">
                {/* Note: Use monochrome logo here in the future (e.g., avartya-white.svg) */}
                <img src="/avartya.png" alt="Avartya Mark" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-lg tracking-wide">
                Avartya Foundation
              </p>
            </div>

            <p>
              Gorakhpur, Uttar Pradesh, India
            </p>

            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <a
                href="tel:8881171609"
                className="hover:text-[#7ED957]"
              >
                +91 8881171609
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope />
              <a
                href="mailto:avartyafoundation@gmail.com"
                className="hover:text-[#7ED957]"
              >
                avartyafoundation@gmail.com
              </a>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#7ED957] hover:scale-110 transition"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#7ED957] hover:scale-110 transition"
            >
              <FaTwitter size={16} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#7ED957] hover:scale-110 transition"
            >
              <FaYoutube size={16} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#7ED957] hover:scale-110 transition"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#7ED957] hover:scale-110 transition"
            >
              <FaLinkedinIn size={16} />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}