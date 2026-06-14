import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { colors, typography } from "@/assets/util";
import Link from "next/link";

type ProjectStatus = "Complete" | "In Development" | "Post-Production";

interface Project {
  slug: string;
  year: number;
  title: string;
  format: string;
  status: ProjectStatus;
}

const projects: Project[] = [
  {
    slug: "nocturne",
    year: 2024,
    title: "Nocturne",
    format: "Feature Film",
    status: "In Development",
  },
  {
    slug: "the-waiting-room",
    year: 2023,
    title: "The Waiting Room",
    format: "Short Film",
    status: "Complete",
  },
  {
    slug: "corridor",
    year: 2022,
    title: "Corridor",
    format: "Short Film",
    status: "Complete",
  },
  {
    slug: "after-hours",
    year: 2021,
    title: "After Hours",
    format: "Documentary",
    status: "Complete",
  },
  {
    slug: "still",
    year: 2019,
    title: "Still",
    format: "Short Film",
    status: "Complete",
  },
  {
    slug: "the-empty-house",
    year: 2017,
    title: "The Empty House",
    format: "Short Film",
    status: "Complete",
  },
];

const statusColor: Record<ProjectStatus, string> = {
  Complete: colors.accent.mid,
  "In Development": colors.text.tertiary,
  "Post-Production": colors.text.secondary,
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main
        className="h-full pt-16"
        style={{
          fontFamily: typography.fonts.primary,
          backgroundColor: colors.background.main,
        }}
      >
        {/* Header */}
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
            Work — Index
          </span>
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

        {/* Column labels */}
        <div
          className="grid px-12 py-3"
          style={{
            gridTemplateColumns: "80px 1fr 140px 140px 40px",
            gap: "24px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {["Year", "Title", "Format", "Status", ""].map((col) => (
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
                className="group grid px-12 py-5 transition-colors duration-200 hover:bg-opacity-100"
                style={{
                  gridTemplateColumns: "80px 1fr 140px 140px 40px",
                  gap: "24px",
                  alignItems: "center",
                  borderBottom: `1px solid ${colors.border}`,
                  textDecoration: "none",
                }}
              >
                <span
                  className="text-[11px] tabular-nums"
                  style={{
                    color: colors.text.tertiary,
                    letterSpacing: typography.tracking.wide,
                  }}
                >
                  {project.year}
                </span>

                <span
                  className="text-[14px] font-light tracking-[-0.01em]"
                  style={{ color: colors.text.primary }}
                >
                  {project.title}
                </span>

                <span
                  className="text-[10px] uppercase"
                  style={{
                    color: colors.text.tertiary,
                    letterSpacing: typography.tracking.widest,
                  }}
                >
                  {project.format}
                </span>

                <span
                  className="text-[10px] uppercase"
                  style={{
                    color: statusColor[project.status],
                    letterSpacing: typography.tracking.widest,
                  }}
                >
                  {project.status}
                </span>

                <span
                  className="text-[11px] text-right transition-colors duration-200"
                  style={{ color: colors.border }}
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
