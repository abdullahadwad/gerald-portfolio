import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { colors, typography } from "@/assets/util";
// import { projects, statusColor, Project } from "@/assets/data";
import { getAllProjects } from "@/lib/queries";

// ---------- sub-components ----------

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 py-3"
      style={{ borderBottom: `1px solid ${colors.border}` }}
    >
      <p
        className="text-[9px] uppercase whitespace-nowrap"
        style={{
          color: colors.text.tertiary,
          letterSpacing: typography.tracking.widest,
        }}
      >
        {label}
      </p>
      <p
        className="text-[12px] text-right"
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

  const stills = project.stills && project.stills.length > 0 ? project.stills : null;

  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: colors.background.main,
          fontFamily: typography.fonts.primary,
        }}
      >
        {/* ── Header: back link + title ── */}
        <div
          className="px-6 md:px-12 pt-[88px] pb-6 md:pt-[100px] md:pb-6"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <Link
            href="/work"
            className="inline-block text-[10px] uppercase mb-3 transition-colors duration-200"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
              textDecoration: "none",
            }}
          >
            ← Work Index
          </Link>
          <h1
            className="font-light tracking-[-0.02em]"
            style={{
              fontSize: "clamp(24px, 2.8vw, 36px)",
              color: colors.text.primary,
              lineHeight: typography.leading.tight,
            }}
          >
            {project.title}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* ── Images (primary content, shown first) ── */}
          <div className="order-1 md:order-1 md:flex-1">
            {/* Stills grid — same size images as before, just visible immediately */}
            {stills ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: "1px", backgroundColor: colors.border }}
              >
                {stills.map((src: any, i: number) => (
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
                      priority={i === 0}
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

            {/* Trailer */}
            {/* @ts-ignore */}
            {project.trailerUrl && (
              <div
                className="relative w-full"
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
            )}
          </div>

          {/* ── Info sidebar ── */}
          <div
            className="order-2 md:order-2 md:w-[340px] md:flex-shrink-0"
            style={{ borderLeft: `1px solid ${colors.border}` }}
          >
            <div className="px-6 md:px-8 py-8 flex flex-col gap-10">
              {/* Meta */}
              <div>
                <SidebarLabel>Details</SidebarLabel>
                <MetaRow label="Format" value={project.format} />
                <MetaRow label="Duration" value={project.duration} />
                <MetaRow label="Status" value={project.status} />
              </div>

              {/* Logline */}
              {project.logline && (
                <p
                  className="font-light text-[14px]"
                  style={{
                    color: colors.text.primary,
                    lineHeight: typography.leading.relaxed,
                    borderLeft: `1px solid ${colors.border}`,
                    paddingLeft: "16px",
                  }}
                >
                  {project.logline}
                </p>
              )}

              {/* Short paragraph */}
              {/* @ts-ignore */}
              {project.shortParagraph && (
                <p
                  className="font-light text-[13px]"
                  style={{
                    color: colors.text.secondary,
                    lineHeight: typography.leading.loose,
                  }}
                >
                  {/* @ts-ignore */}
                  {project.shortParagraph}
                </p>
              )}

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

              {/* Awards */}
              {/* @ts-ignore */}
              {project.awards && project.awards.length > 0 && (
                <div>
                  <SidebarLabel>Awards & Laurels</SidebarLabel>
                  {/* @ts-ignore */}
                  {project.awards.map((award: any, i: number) => (
                    <div
                      key={i}
                      className="py-2 text-[11px]"
                      style={{
                        color: colors.text.secondary,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {award.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Press Kit PDF */}
              {/* @ts-ignore */}
              {project.pressKitUrl && (
                <a
                  /* @ts-ignore */
                  href={project.pressKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] uppercase transition-opacity duration-200 hover:opacity-60 self-start"
                  style={{
                    color: colors.text.primary,
                    letterSpacing: typography.tracking.widest,
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: "4px",
                  }}
                >
                  Download Press Kit ↓
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}