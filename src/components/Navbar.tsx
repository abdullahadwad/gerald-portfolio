"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { colors, typography } from "@/assets/util";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300"
      style={{
        backgroundColor: colors.background.main,
        borderBottom: `1px solid ${scrolled ? colors.border : "transparent"}`,
        fontFamily: typography.fonts.primary,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200"
        style={{ color: colors.text.primary }}
      >
        Gerald Gyimah
      </Link>

      {/* Links */}
      <ul className="flex items-center gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 hover:opacity-100"
              style={{
                color: colors.text.secondary,
                letterSpacing: typography.tracking.wider,
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
