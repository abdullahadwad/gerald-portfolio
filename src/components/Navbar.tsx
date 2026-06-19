"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { colors, typography } from "@/assets/util";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    // Only intercept hash links
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const id = href.slice(1);

    if (pathname === "/") {
      // Already on home — just scroll
      scrollToSection(id);
    } else {
      // Navigate home first, then scroll after the page loads
      router.push("/");
      // Small delay to let the page render before scrolling
      setTimeout(() => scrollToSection(id), 300);
    }
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
      style={{
        backgroundColor: colors.background.main,
        borderBottom: `1px solid ${scrolled ? colors.border : "transparent"}`,
        fontFamily: typography.fonts.primary,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-[11px] font-medium uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-60"
        style={{ color: colors.text.primary }}
      >
        Gerald Gyimah
      </Link>

      {/* Links */}
      <ul className="flex items-center gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[11px] uppercase tracking-[0.08em] transition-opacity duration-200 hover:opacity-60 cursor-pointer"
              style={{
                color: colors.text.secondary,
                letterSpacing: typography.tracking.wider,
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
