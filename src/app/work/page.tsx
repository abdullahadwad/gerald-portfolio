import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { colors, typography } from "@/assets/util";
import Link from "next/link";
import { statusColor } from "@/lib/types";
import { getAllProjects } from "@/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geraldgyimah.com";

export const metadata: Metadata = {
  title: "Films",
  description:
    "The complete film work of Gerald Gyimah — On Record, Protocol, Consultation, and Assessment. Short films produced under Still Room Productions, London.",
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: "Films | Gerald Gyimah",
    description:
      "The complete film work of Gerald Gyimah — On Record, Protocol, Consultation, and Assessment. Short films produced under Still Room Productions, London.",
    url: `${siteUrl}/work`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Films | Gerald Gyimah",
    description:
      "The complete film work of Gerald Gyimah — On Record, Protocol, Consultation, and Assessment. Short films produced under Still Room Productions, London.",
  },
};
export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const projects = await getAllProjects();
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-16"
        style={{
          fontFamily: typography.fonts.primary,
          backgroundColor: colors.background.main,
        }}
      >
        {/* Header */}
        <div
          className="flex items-end justify-between px-6 md:px-12 py-10"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <h1
            className="text-[10px] uppercase font-normal m-0"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
            }}
          >
            Work — Index
          </h1>
          <span
            className="text-[10px] uppercase"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
            }}
          >
            {projects.length} Projects
          </span>
        </div>

        {/* Column labels — desktop only */}
        <div
          className="hidden md:grid px-12 py-3"
          style={{
            gridTemplateColumns: "1fr 140px 140px 40px",
            gap: "24px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {["Title", "Format", "Status", ""].map((col) => (
            <span
              key={col}
              className="text-[9px] uppercase"
              style={{
                color: colors.text.tertiary,
                letterSpacing: typography.tracking.widest,
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Project rows */}
        <ul className="list-none">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-2 px-6 py-5 md:grid md:gap-6 md:py-5 md:px-12 transition-colors duration-200 hover:bg-opacity-100"
                style={{
                  
                  gridTemplateColumns: "1fr 140px 140px 40px",
                  alignItems: "center",
                  borderBottom: `1px solid ${colors.border}`,
                  textDecoration: "none",
                }}
              >
                {/* Title row (mobile: title + arrow on same line) */}
                <div className="flex items-center justify-between md:contents">
                  <span
                    className="text-[14px] font-light tracking-[-0.01em] md:order-2"
                    style={{ color: colors.text.primary }}
                  >
                    {project.title}
                  </span>

                  <span
                    className="text-[11px] transition-colors duration-200 md:order-5 md:text-right"
                    style={{ color: colors.border }}
                  >
                    →
                  </span>
                </div>

                {/* Meta row (mobile: format · status inline) */}
                <div className="flex items-center gap-4 md:contents">
                  <span
                    className="text-[10px] uppercase md:order-3"
                    style={{
                      color: colors.text.tertiary,
                      letterSpacing: typography.tracking.widest,
                    }}
                  >
                    {project.format}
                  </span>

                  <span
                    className="text-[10px] uppercase md:order-4"
                    style={{
                      color: statusColor[project.status],
                      letterSpacing: typography.tracking.widest,
                    }}
                  >
                    {project.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}