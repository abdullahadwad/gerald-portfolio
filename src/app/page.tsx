import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { colors, typography } from "@/assets/util";
// import { projects } from "@/assets/data";

// ── Images ─────────────────────────────────────────────
// Swap these with your final assets — paths/names are placeholders.
import heroStill from "@/assets/images/background4.png";
import headshot from "@/assets/images/headshot.jpg";
import directingBTS from "@/assets/images/back3.jpeg";
import atmosphericStop from "@/assets/images/back1.jpeg";
import atmosphericIncidents from "@/assets/images/back2.jpeg";
import { urlFor } from "@/lib/sanity";
import { getAllProjects } from "@/lib/queries";
export const dynamic = 'force-dynamic'
// ── Section divider ─────────────────────────────────────
function Divider() {
  return (
    <div
      style={{ borderTop: `1px solid ${colors.border}` }}
      aria-hidden="true"
    />
  );
}

// ── Section eyebrow label ───────────────────────────────
function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      className="text-[9px] uppercase"
      style={{
        color: colors.text.tertiary,
        letterSpacing: typography.tracking.widest,
        fontFamily: typography.fonts.primary,
        ...style
      }}
    >
      {children}
    </p>
  );
}

// ── Full-width atmospheric band ─────────────────────────
function AtmosphericBand({
  src,
  alt,
  caption,
}: {
  src: typeof atmosphericStop;
  alt: string;
  caption: string;
}) {
  return (
    <section>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "21/9" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
        <span
          className="absolute bottom-4 left-6 text-[9px] uppercase"
          style={{
            color: "rgba(255,255,255,0.4)",
            letterSpacing: typography.tracking.widest,
          }}
        >
          {caption}
        </span>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════
export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <Navbar />

      <main
        style={{
          fontFamily: typography.fonts.primary,
          backgroundColor: colors.background.main,
        }}
      >
        {/* ══ 1. HERO ══════════════════════════════════════════
            Restrained, typographic. No dominant portrait —
            a small still sits low-opacity in the background. */}
        <section
          id="home"
          className="relative flex flex-col justify-center items-center px-6 md:px-12 py-28 md:py-40 min-h-[70vh] overflow-hidden text-center"
        >
          <div className="relative z-10 w-full flex flex-col items-center">
            <h1
              className="font-light leading-[1.03] tracking-[-0.025em] mt-6 mb-5 whitespace-nowrap"
              style={{
                fontSize: "clamp(48px, 10vw, 88px)",
                color: colors.text.primary,
              }}
            >
              Gerald Gyimah
            </h1>

            <p
              className="text-[12px] uppercase mb-8"
              style={{
                color: colors.text.secondary,
                letterSpacing: typography.tracking.widest,
              }}
            >
              Writer &nbsp;/&nbsp; Director
            </p>

            <p
              className="font-light max-w-xs"
              style={{
                fontSize: "13px",
                color: colors.text.tertiary,
                lineHeight: typography.leading.relaxed,
              }}
            >
              Work concerned with stillness, institutional space, and the weight
              of what remains unspoken.
            </p>
          </div>
        </section>

        <Divider />

        {/* ══ 2. FILMS ═════════════════════════════════════════ */}
        <section id="work" className="py-14 md:py-20">
          <div className="flex items-center justify-between mb-10 md:mb-12 px-6 md:px-12">
            <SectionLabel>Films</SectionLabel>
            <Link
              href="/work"
              className="text-[9px] uppercase transition-opacity duration-200 hover:opacity-50"
              style={{
                color: colors.text.tertiary,
                letterSpacing: typography.tracking.widest,
                textDecoration: "none",
              }}
            >
              View Projects List →
            </Link>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ backgroundColor: colors.border }}
          >
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block"
                style={{
                  textDecoration: "none",
                  backgroundColor: colors.background.main,
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  {/* <Image
            src={project.stills[0]}
            alt={`${project.title} — film still`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          /> */}
                  {console.log('stills debug:', JSON.stringify(project.stills))}
                  {project.stills?.[0]?.url ? (
                    <Image
                      src={project.stills[0].url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      No project image
                    </div>
                  )}
                </div>

                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <span
                    className="text-[12px] font-light"
                    style={{ color: colors.text.primary }}
                  >
                    {project.title}
                  </span>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tabular-nums"
                      style={{ color: colors.text.tertiary }}
                    >
                      {project.year}
                    </span>
                    <span
                      className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: colors.text.tertiary }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ 3. ABOUT ═════════════════════════════════════════
            Single professional headshot beside the bio. */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="flex flex-col justify-center px-6 md:px-12 py-14 md:py-20 md:border-r"
            style={{ borderColor: colors.border }}
          >
            <SectionLabel>About</SectionLabel>

            <div className="flex flex-col gap-5 mt-8 max-w-sm">
              <p
                className="font-light"
                style={{
                  fontSize: "14px",
                  color: colors.text.primary,
                  lineHeight: typography.leading.loose,
                }}
              >
                Gerald Gyimah is a writer and director based in London. His work examines institutional spaces, procedural language, and the quiet pressures through which systems produce outcomes.

              </p>

              <p
                className="font-light"
                style={{
                  fontSize: "14px",
                  color: colors.text.primary,
                  lineHeight: typography.leading.loose,
                }}
              >
                He is the founder of Still Room Productions, through which he develops and produces independent work.
              </p>
            </div>
          </div>

          <div className="relative bg-gray-300" style={{ minHeight: "300px" }}>
            <Image
              src={headshot}
              alt="Gerald Gyimah — headshot"
              fill
              className="object-cover object-top hidden"
            />
          </div>
        </section>

        <Divider />

        {/* ══ 4. DIRECTING ═════════════════════════════════════
            Black-and-white BTS — director with crew around the monitor. */}
        <section id="directing" className="px-0 md:px-12 py-14 md:py-20">
          <SectionLabel style={{ paddingLeft: 12 }}>Directing</SectionLabel>

          <div
            className="relative w-full overflow-hidden mt-8"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={directingBTS}
              alt="Gerald Gyimah on set with crew, reviewing the monitor"
              fill
              className="object-cover grayscale"
            />
          </div>

          {/* <p
            className="text-[11px] uppercase mt-4"
            style={{
              color: colors.text.tertiary,
              letterSpacing: typography.tracking.widest,
              paddingLeft: 12,
            }}
          >
            On set, undated
          </p> */}
        </section>

        <Divider />

        {/* ══ 5. ATMOSPHERE — STOP ═════════════════════════════ */}
        <AtmosphericBand
          src={atmosphericIncidents}
          alt="STOP door"
          caption=""
        />

        <Divider />

        {/* ══ 6. ATMOSPHERE — INCIDENTS MUST BE RECORDED ══════ */}
        <AtmosphericBand
          src={atmosphericStop}
          alt="Incidents must be recorded sign"
          caption=""
        />

        <Divider />

        {/* ══ 7. CONTACT ═══════════════════════════════════════ */}
        <section id="contact" className="px-6 md:px-12 py-6 mt-6">
          <div className="flex items-start justify-between">
            <SectionLabel>Contact</SectionLabel>
            <span
              className="text-[9px] uppercase"
              style={{
                color: colors.text.tertiary,
                letterSpacing: typography.tracking.widest,
              }}
            >
              London, UK
            </span>
          </div>

          <div className="flex flex-col max-w-sm">
            {[
              {
                label: "Email",
                href: "gerald@geraldgyimah.com",
                value: "gerald@geraldgyimah.com",
              },
              {
                label: "Instagram",
                href: "https://instagram.com/geraldgyimah",
                value: "@geraldgyimah",
              },
              {
                label: "IMDb",
                href: "https://imdb.com/name/geraldgyimah",
                value: "Gerald Gyimah",
              },
            ].map(({ label, href, value }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group flex justify-between items-center py-4 transition-opacity duration-200 hover:opacity-60"
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
                  }}
                >
                  {label}
                </span>
                <span
                  className="text-[11px] flex items-center gap-2"
                  style={{ color: colors.text.secondary }}
                >
                  {value}
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: colors.text.tertiary }}
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}