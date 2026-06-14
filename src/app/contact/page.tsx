import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { colors, typography } from "@/assets/util";

const enquiries = [
  {
    label: "General",
    href: "mailto:hello@geraldgyimah.com",
    value: "hello@geraldgyimah.com",
  },
  {
    label: "Press",
    href: "mailto:press@geraldgyimah.com",
    value: "press@geraldgyimah.com",
  },
  {
    label: "Still Room Productions",
    href: "https://stillroomproductions.com",
    value: "stillroomproductions.com",
  },
];

const links = [
  { label: "IMDb", href: "https://imdb.com", value: "/geraldgyimah" },
  { label: "Vimeo", href: "https://vimeo.com", value: "/geraldgyimah" },
  { label: "Instagram", href: "https://instagram.com", value: "@geraldgyimah" },
];

function ContactRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex justify-between items-center py-4 transition-colors duration-200 group"
      style={{
        borderBottom: `1px solid ${colors.border}`,
        textDecoration: "none",
      }}
    >
      <span
        className="text-[10px] uppercase"
        style={{
          color: colors.text.tertiary,
          letterSpacing: typography.tracking.widest,
          minWidth: "160px",
        }}
      >
        {label}
      </span>
      <span
        className="text-[11px] transition-colors duration-200"
        style={{
          color: colors.text.secondary,
          letterSpacing: typography.tracking.wide,
        }}
      >
        {value}
      </span>
      <span
        className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: colors.text.tertiary }}
      >
        →
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] uppercase pb-3"
      style={{
        color: colors.text.tertiary,
        letterSpacing: typography.tracking.widest,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-[72px]"
        style={{
          backgroundColor: colors.background.main,
          fontFamily: typography.fonts.primary,
        }}
      >
        {/* ── Page header ── */}
        <div
          className="flex items-end justify-between px-12 py-10"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <span
            className="text-[10px] uppercase"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
            }}
          >
            Contact
          </span>
          <span
            className="text-[10px] uppercase"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
            }}
          >
            London, UK
          </span>
        </div>

        {/* ── Two column grid ── */}
        <div
          className="grid px-12 py-16"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "0" }}
        >
          {/* Left — Enquiries */}
          <div
            className="pr-16"
            style={{ borderRight: `1px solid ${colors.border}` }}
          >
            <SectionLabel>Representation &amp; Enquiries</SectionLabel>

            <p
              className="font-light mt-8 mb-10 max-w-sm"
              style={{
                fontSize: "14px",
                color: colors.text.secondary,
                lineHeight: typography.leading.loose,
              }}
            >
              For enquiries regarding projects, commissions, collaboration, or
              press — please use the contacts below.
            </p>

            <div className="flex flex-col">
              {enquiries.map((item) => (
                <ContactRow
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  value={item.value}
                />
              ))}
            </div>
          </div>

          {/* Right — Links */}
          <div className="pl-16">
            <SectionLabel>Links</SectionLabel>

            <div className="flex flex-col mt-8">
              {links.map((item) => (
                <ContactRow
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  value={item.value}
                />
              ))}
            </div>

            {/* Location block */}
            <div
              className="mt-16 pt-8"
              style={{ borderTop: `1px solid ${colors.border}` }}
            >
              <p
                className="text-[9px] uppercase mb-4"
                style={{
                  color: colors.text.tertiary,
                  letterSpacing: typography.tracking.widest,
                }}
              >
                Location
              </p>
              <p
                className="font-light"
                style={{
                  fontSize: "13px",
                  color: colors.text.secondary,
                  lineHeight: typography.leading.relaxed,
                }}
              >
                London, United Kingdom
                <br />
                Available for projects internationally.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
