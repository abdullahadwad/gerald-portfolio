import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { colors, typography } from "@/assets/util";

type ProjectStatus = "Complete" | "In Development" | "Post-Production";

interface Credit {
  role: string;
  name: string;
}

interface Project {
  slug: string;
  title: string;
  year: number;
  format: string;
  duration: string;
  status: ProjectStatus;
  logline: string;
  stills: string[];
  credits: Credit[];
  production: {
    company: string;
    country: string;
    language: string;
  };
  festivals: string[];
}

const projects: Project[] = [
  {
    slug: "the-waiting-room",
    title: "The Waiting Room",
    year: 2023,
    format: "Short Film",
    duration: "18 min",
    status: "Complete",
    logline:
      "A hospital waiting room at 4am. Three strangers sit with what they cannot say. Time passes. Nothing is resolved.",
    stills: [
      "/images/stills/waiting-room-01.jpg",
      "/images/stills/waiting-room-02.jpg",
      "/images/stills/waiting-room-03.jpg",
      "/images/stills/waiting-room-04.jpg",
    ],
    credits: [
      { role: "Director", name: "Gerald Gyimah" },
      { role: "Writer", name: "Gerald Gyimah" },
      { role: "Producer", name: "—" },
      { role: "Cinematographer", name: "—" },
      { role: "Editor", name: "—" },
      { role: "Sound", name: "—" },
    ],
    production: {
      company: "Still Room Productions",
      country: "United Kingdom",
      language: "English",
    },
    festivals: [],
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    year: 2024,
    format: "Feature Film",
    duration: "TBC",
    status: "In Development",
    logline:
      "A film about the hours between. What lingers in spaces after people have left.",
    stills: [],
    credits: [
      { role: "Director", name: "Gerald Gyimah" },
      { role: "Writer", name: "Gerald Gyimah" },
    ],
    production: {
      company: "Still Room Productions",
      country: "United Kingdom",
      language: "English",
    },
    festivals: [],
  },
];

const statusColor: Record<ProjectStatus, string> = {
  Complete: colors.accent.mid,
  "In Development": colors.text.tertiary,
  "Post-Production": colors.text.secondary,
};

// ---------- sub-components ----------

function MetaCell({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className="px-6 py-3"
      style={{ borderRight: last ? "none" : `1px solid ${colors.border}` }}
    >
      <p
        className="text-[9px] uppercase mb-1"
        style={{
          color: colors.text.tertiary,
          letterSpacing: typography.tracking.widest,
        }}
      >
        {label}
      </p>
      <p
        className="text-[12px]"
        style={{
          color: colors.text.primary,
          letterSpacing: typography.tracking.normal,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] uppercase pb-3 mb-0"
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

function CreditRow({ role, name }: { role: string; name: string }) {
  return (
    <div
      className="flex justify-between py-2 text-[11px]"
      style={{ borderBottom: `1px solid ${colors.border}` }}
    >
      <span style={{ color: colors.text.tertiary }}>{role}</span>
      <span style={{ color: colors.text.secondary }}>{name}</span>
    </div>
  );
}

function StillPlaceholder({ index }: { index: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        aspectRatio: "16/10",
        backgroundColor: colors.background.alt,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span
        className="text-[10px] uppercase"
        style={{
          color: colors.text.tertiary,
          letterSpacing: typography.tracking.widest,
        }}
      >
        Still {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}

// ---------- page ----------

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  console.log(slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main
          className="min-h-screen pt-[72px] flex items-center justify-center"
          style={{
            backgroundColor: colors.background.main,
            fontFamily: typography.fonts.primary,
          }}
        >
          <div className="text-center">
            <p
              className="text-[10px] uppercase mb-4"
              style={{
                color: colors.text.tertiary,
                letterSpacing: typography.tracking.widest,
              }}
            >
              Project not found
            </p>
            <Link
              href="/work"
              className="text-[11px] uppercase underline underline-offset-4"
              style={{
                color: colors.text.secondary,
                letterSpacing: typography.tracking.wider,
              }}
            >
              ← Return to index
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
        {/* ── Header ── */}
        <div
          className="px-12 pb-12 pt-12"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          {/* Back link */}
          <Link
            href="/work"
            className="inline-block text-[10px] uppercase mb-10 transition-colors duration-200"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
              textDecoration: "none",
            }}
          >
            ← Work Index
          </Link>

          {/* Title */}
          <h1
            className="font-light tracking-[-0.02em] mb-8"
            style={{
              fontSize: "clamp(28px, 3vw, 42px)",
              color: colors.text.primary,
              lineHeight: typography.leading.tight,
            }}
          >
            {project.title}
          </h1>

          {/* Meta strip */}
          <div
            className="inline-grid"
            style={{
              gridTemplateColumns: "repeat(4, auto)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <MetaCell label="Year" value={String(project.year)} />
            <MetaCell label="Format" value={project.format} />
            <MetaCell label="Duration" value={project.duration} />
            <MetaCell label="Status" value={project.status} last />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 320px" }}>
          {/* Main */}
          <div
            className="px-12 py-12"
            style={{ borderRight: `1px solid ${colors.border}` }}
          >
            {/* Logline */}
            <p
              className="font-light mb-12 max-w-xl"
              style={{
                fontSize: "16px",
                color: colors.text.primary,
                lineHeight: typography.leading.relaxed,
                borderLeft: `1px solid ${colors.border}`,
                paddingLeft: "24px",
              }}
            >
              {project.logline}
            </p>

            {/* Stills */}
            <p
              className="text-[9px] uppercase mb-4"
              style={{
                color: colors.text.tertiary,
                letterSpacing: typography.tracking.widest,
              }}
            >
              Stills
            </p>

            {project.stills.length > 0 ? (
              <div
                className="grid grid-cols-2"
                style={{ gap: "1px", backgroundColor: colors.border }}
              >
                {project.stills.map((src, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "16/10",
                      backgroundColor: colors.background.alt,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — still ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="grid grid-cols-2"
                style={{ gap: "1px", backgroundColor: colors.border }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <StillPlaceholder key={n} index={n} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="px-8 py-12 flex flex-col gap-10">
            {/* Credits */}
            <div>
              <SidebarLabel>Credits</SidebarLabel>
              {project.credits.map((c) => (
                <CreditRow key={c.role} role={c.role} name={c.name} />
              ))}
            </div>

            {/* Production */}
            <div>
              <SidebarLabel>Production</SidebarLabel>
              <CreditRow role="Company" name={project.production.company} />
              <CreditRow role="Country" name={project.production.country} />
              <CreditRow role="Language" name={project.production.language} />
            </div>

            {/* Festivals */}
            <div>
              <SidebarLabel>Festivals</SidebarLabel>
              {project.festivals.length > 0 ? (
                project.festivals.map((f) => (
                  <CreditRow key={f} role={f} name="" />
                ))
              ) : (
                <p
                  className="text-[11px] pt-3"
                  style={{ color: colors.text.tertiary }}
                >
                  Submissions forthcoming
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
