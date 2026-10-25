import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

// ================= IMAGE ASSETS =================
const DIRECTOR_PHOTO_SRC = "/img/dr.jpg"; // Founder message photo

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";

const NAVY = "#0B2545";
const RUST = "#B84A12";

type PillarText = {
  title: string;
  desc: string;
  pointsTitle?: string;
  points?: string[];
};

// Icons pillars ke order me hain (translations.ts ke pillars ka same order)
const PILLAR_ICONS: React.ReactNode[] = [
  <path key="i1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  <path key="i2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
  <path key="i3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M5 21V10l5 3V10l5 3V6h4v15M9 17h2M14 17h2" />,
  <path key="i4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18" />,
  <path key="i5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 21h16M6 21V9l6-5 6 5v12M10 21v-6h4v6" />,
  <path key="i6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
];

const Arrow: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Home: React.FC = () => {
  const [founderImgError, setFounderImgError] = useState(false);

  const { t } = useLanguage();
  const h = t.home;

  // Translations se data
  const STATS = h.stats;
  const PILLARS = h.pillars as PillarText[];
  const PEN_PARAS = h.penParas as string[];

  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  return (
    <div
      className="min-h-screen bg-white text-slate-900 antialiased"
      style={{ fontFamily: FONT }}
    >
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#F1F5F9]">
        {/* subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,37,69,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,37,69,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 60%, black 20%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at 30% 60%, black 20%, transparent 75%)",
          }}
        />

        {/* Hero: title + logo on the right, text on the left */}
        <div className="relative" style={{ backgroundColor: "#ECEBEA" }}>
          <div className={`${container} relative py-10 lg:py-14`}>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
              {/* RIGHT on desktop: Title + Logo (mobile par sabse upar) */}
              <div className="flex flex-col items-center text-center lg:order-2">
                <h1
                  className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-[56px] xl:text-[64px]"
                  style={{ color: "#E5231B" }}
                >
                  {h.title1} {h.title2}
                </h1>

                <div className="mt-6 flex h-[250px] w-[250px] items-center justify-center sm:h-[320px] sm:w-[320px] lg:h-[340px] lg:w-[340px] xl:h-[400px] xl:w-[400px]">
                  <img
                    src="/img/Karmbhumi.png"
                    alt={h.logoAlt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* LEFT on desktop: Slogan + Couplet + Description */}
              <div className="text-center lg:order-1 lg:text-left">
                <p
                  className="text-2xl font-bold sm:text-4xl lg:text-[40px] lg:leading-tight"
                  style={{ color: RUST }}
                >
                  {h.slogan}
                </p>

                <p
                  className="mt-4 whitespace-pre-line text-base font-bold leading-relaxed sm:text-xl lg:text-2xl"
                  style={{ color: NAVY }}
                >
                  {h.couplet}
                </p>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 mx-auto">
                  {h.desc}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <Link
                    to="/About"
                    className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: RUST }}
                  >
                    <span>{h.btnPlans}</span>
                    <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className={`${container} pt-12 sm:pt-14`}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold text-amber-400">{h.overviewBadge}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-[28px]">{h.overviewTitle}</h2>
            </div>

            <div className="grid grid-cols-2 gap-y-8 lg:col-span-8 lg:grid-cols-4">
              {STATS.map((s, idx) => (
                <div
                  key={s.l}
                  className={`px-0 lg:px-6 ${
                    idx > 0 ? "lg:border-l lg:border-white/15" : ""
                  } ${idx === 0 ? "lg:pl-0" : ""}`}
                >
                  <p className="text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-[56px]">
                    {s.n}
                  </p>
                  <p className="mt-3 text-sm font-medium text-white">{s.l}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 py-5 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-300">{h.mantra}</p>
          </div>
        </div>
      </section>

      {/* ================= MAHATVAKANKSHA (Founder's pen) ================= */}
      <section className={`${container} pt-14 sm:pt-16`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          {/* LEFT: content */}
          <div>
            <p className="text-[11px] font-semibold" style={{ color: RUST }}>
              {h.penBadge}
            </p>

            <h2 className="mt-2 text-2xl font-bold leading-snug sm:text-[32px]" style={{ color: NAVY }}>
              {h.penTitle}
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
              {PEN_PARAS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-6 border-l-4 pl-4" style={{ borderColor: RUST }}>
              <p className="text-sm font-bold sm:text-base" style={{ color: NAVY }}>
                {h.penAuthor}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{h.penAuthorSub}</p>
            </div>
          </div>

          {/* RIGHT: image - desktop par left text ki poori height ke barabar */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg shadow-xl lg:aspect-auto">
            <img
              src="/img/pehla-kadam.png"
              alt={h.penImageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ================= CORE PILLARS ================= */}
      <section className={`${container} pb-16 pt-14 sm:pt-16`}>
        <p className="text-[11px] font-semibold" style={{ color: RUST }}>
          {h.pillarsBadge}
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {h.pillarsTitle}
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">{h.pillarsSubtitle}</p>

        <div className="mt-6 border-t border-slate-200">
          {PILLARS.map((p, idx) => (
            <div
              key={p.title}
              className="grid grid-cols-1 gap-3 border-b border-slate-200 py-5 md:grid-cols-12 md:items-start md:gap-6"
            >
              <div className="flex items-start gap-4 md:col-span-5">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {idx + 1}
                </span>
                <svg
                  className="mt-1 h-5 w-5 shrink-0"
                  style={{ color: RUST }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {PILLAR_ICONS[idx]}
                </svg>
                <h3 className="text-base font-semibold leading-snug sm:text-[17px]" style={{ color: NAVY }}>
                  {p.title}
                </h3>
              </div>

              <div className="md:col-span-7">
                <p className="text-xs leading-relaxed text-slate-600 sm:text-[13px]">{p.desc}</p>

                {p.points && p.points.length > 0 && (
                  <div className="mt-3 rounded-md bg-[#EEF2F6] px-4 py-3.5">
                    <p className="text-[11px] font-bold" style={{ color: RUST }}>
                      {p.pointsTitle}
                    </p>
                    <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                      {p.points.map((pt, i) => (
                        <li key={pt} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-4 shrink-0 text-[10px] font-bold text-slate-400">
                            {i + 1}.
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOUNDER'S MESSAGE ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-14 sm:py-16`}>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[130px_1fr] md:gap-8 lg:grid-cols-[150px_1fr]">
            <div className="h-[170px] w-[130px] overflow-hidden rounded-sm bg-slate-300 lg:h-[190px] lg:w-[150px]">
              {!founderImgError ? (
                <img
                  src={DIRECTOR_PHOTO_SRC}
                  alt={h.founderName}
                  onError={() => setFounderImgError(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  Dr.
                </div>
              )}
            </div>

            <div>
              <p className="text-[11px] font-semibold" style={{ color: RUST }}>
                {h.founderBadge}
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-[34px] sm:leading-tight" style={{ color: NAVY }}>
                {h.founderTitle}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                “{h.founderQuote}”
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {h.founderNote}
              </p>

              <Link
                to="/AuthorProfile"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold hover:underline"
                style={{ color: NAVY }}
              >
                <span>{h.founderBtn}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOIN CTA ================= */}
      <section className="bg-[#E6EDF4]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {h.ctaBadge}
          </p>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-[34px]" style={{ color: NAVY }}>
            {h.ctaTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {h.ctaDesc}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: RUST }}
          >
            <span>{h.ctaBtn}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;