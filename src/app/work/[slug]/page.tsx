import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { colors, typography } from "@/assets/util";
// import { projects, statusColor, Project } from "@/assets/data";
import { getAllProjects } from "@/lib/queries";

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
      className="px-4 md:px-6 py-3"
      style={{ borderRight: last ? "none" : `1px solid ${colors.border}` }}
    >
      <p
        className="text-[9px] uppercase mb-1 whitespace-nowrap"
        style={{
          color: colors.text.tertiary,
          letterSpacing: typography.tracking.widest,
        }}
      >
        {label}
      </p>
      <p
        className="text-[12px] whitespace-nowrap"
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
  const projects = await getAllProjects();
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
          <div className="text-center px-6">
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
          className="px-6 md:px-12 pb-8 md:pb-12 pt-8 md:pt-12"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          {/* Back link */}
          <Link
            href="/work"
            className="inline-block text-[10px] uppercase mb-6 md:mb-10 transition-colors duration-200"
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
            className="font-light tracking-[-0.02em] mb-6 md:mb-8"
            style={{
              fontSize: "clamp(28px, 3vw, 42px)",
              color: colors.text.primary,
              lineHeight: typography.leading.tight,
            }}
          >
            {project.title}
          </h1>

          {/* Meta strip */}
          <div className="-mx-6 md:mx-0 overflow-x-auto">
            <div
              className="inline-grid px-6 md:px-0"
              style={{
                gridTemplateColumns: "repeat(3, auto)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <MetaCell label="Format" value={project.format} />
              <MetaCell label="Duration" value={project.duration} />
              <MetaCell label="Status" value={project.status} last />
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="grid grid-cols-1"
          style={{ gridTemplateColumns: undefined }}
        >
          <div className="md:hidden contents">{/* placeholder to keep structure clear on mobile */}</div>
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_320px]"
          >
            {/* Main */}
            <div
              className="px-6 md:px-12 py-8 md:py-12 md:border-r"
              style={{ borderColor: colors.border, borderRightWidth: undefined }}
            >
              {/* Logline */}
              {project.logline && (
                <p
                  className="font-light mb-10 md:mb-12 max-w-xl"
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
              )}

              {/* Short paragraph */}
              {/* @ts-ignore */}
              {project.shortParagraph && (
                <p
                  className="font-light mb-10 md:mb-12 max-w-xl text-[14px]"
                  style={{
                    color: colors.text.secondary,
                    lineHeight: typography.leading.loose,
                  }}
                >
                  {/* @ts-ignore */}
                  {project.shortParagraph}
                </p>
              )}

              {/* Trailer */}
              {/* @ts-ignore */}
              {project.trailerUrl && (
                <div className="mb-10 md:mb-12">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "16/9", backgroundColor: colors.background.alt }}
                  >
                    <iframe
                      /* @ts-ignore */
                      src={project.trailerUrl}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Festival laurels / Awards */}
              {/* @ts-ignore */}
              {project.awards && project.awards.length > 0 && (
                <div className="mb-10 md:mb-12">
                  <p
                    className="text-[9px] uppercase mb-4"
                    style={{
                      color: colors.text.tertiary,
                      letterSpacing: typography.tracking.widest,
                    }}
                  >
                    Awards & Laurels
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {/* @ts-ignore */}
                    {project.awards.map((award: any, i: number) => (
                      <div key={i} className="text-[12px]" style={{ color: colors.text.secondary }}>
                        {award.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

              {project.stills && project.stills.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ gap: "1px", backgroundColor: colors.border }}
                >
                  {project.stills.map((src: any, i: number) => (
                    <div
                      key={i}
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: "16/10",
                        backgroundColor: colors.background.alt,
                      }}
                    >
                      <Image
                        src={src.url}
                        alt={`${project.title} — still ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ gap: "1px", backgroundColor: colors.border }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <StillPlaceholder key={n} index={n} />
                  ))}
                </div>
              )}

              {/* Press Kit PDF */}
              {/* @ts-ignore */}
              {project.pressKitUrl && (
                <div className="mt-10 md:mt-12">
                  <a
                    /* @ts-ignore */
                    href={project.pressKitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] uppercase transition-opacity duration-200 hover:opacity-60"
                    style={{
                      color: colors.text.primary,
                      letterSpacing: typography.tracking.widest,
                      borderBottom: `1px solid ${colors.border}`,
                      paddingBottom: "4px",
                    }}
                  >
                    Download Press Kit ↓
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div
              className="px-6 md:px-8 py-8 md:py-12 flex flex-col gap-10 border-t md:border-t-0"
              style={{ borderColor: colors.border }}
            >
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
              {/* @ts-ignore */}
              {project.festivals && project.festivals.length > 0 && (
                <div>
                  <SidebarLabel>Festivals</SidebarLabel>
                  {/* @ts-ignore */}
                  {project.festivals.map((f: string) => (
                    <CreditRow key={f} role={f} name="" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}