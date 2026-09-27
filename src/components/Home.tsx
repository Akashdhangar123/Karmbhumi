import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

const DIRECTOR_PHOTO_SRC = "/director.jpg";
const DIRECTOR_VIDEO_SRC = "/director-message.mp4";

const Home: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const { t, lang } = useLanguage();

  const FACTS = lang === "hi" ? [
    { label: "कम्पनी का नाम", value: "कर्मभूमि इंडिया लिमिटेड", tag: "रजिस्टर्ड" },
    { label: "संस्थापक", value: "डॉ. शिव करन कर्मयोद्धा", tag: "मार्गदर्शक" },
    { label: "स्थापना व निगमन", value: "18 जून 2006 (निगमन: 22 अक्टूबर 2012)", tag: "मान्यता" },
    { label: "कम्पनी का प्रकार", value: "पब्लिक लिमिटेड (अंशधारिता से निगमित)", tag: "कॉर्पोरेट" },
    { label: "कार्यक्षेत्र", value: "सम्पूर्ण भारत (अनुसूचित राज्यों को छोड़कर)", tag: "राष्ट्रीय" },
    { label: "मुख्य व्यवसाय", value: "रियल एस्टेट, उत्पाद एवं सेवा उद्योग", tag: "उद्योग" },
    { label: "केंद्रीय उद्देश्य", value: "कर्मभूमि बैंक ऑफ इंडिया की स्थापना", tag: "मिशन" },
    { label: "मूल मंत्र", value: "सहभागिता से पूँजी निर्माण, सहकारिता से विस्तार", tag: "सिद्धांत" },
  ] : [
    { label: "Company Name", value: "Karmbhumi India Limited", tag: "Registered" },
    { label: "Founder", value: "Dr. Shiv Karan Karmayoddha", tag: "Mentor" },
    { label: "Establishment & Incorp.", value: "18 June 2006 (Incorp: 22 Oct 2012)", tag: "Certified" },
    { label: "Company Type", value: "Public Limited (Incorporated by Shares)", tag: "Corporate" },
    { label: "Jurisdiction", value: "Pan India (Except Scheduled Territories)", tag: "National" },
    { label: "Core Business", value: "Real Estate, Products & Services", tag: "Industry" },
    { label: "Primary Mission", value: "Establishment of Karmbhumi Bank of India", tag: "Mission" },
    { label: "Core Mantra", value: "Capital through Participation, Expansion via Cooperation", tag: "Principle" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased selection:bg-[#FF9933]/20 selection:text-[#0B2545]">
      <Header />

      {/* ================= HERO SECTION (THEMED EXACTLY LIKE THE LOGO) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07182D] via-[#0B2545] to-[#0A1D37] py-14 lg:py-10 text-white">
        
        {/* 2. Tricolor Ambient Glow Orbs directly inspired by the Logo */}
        {/* Saffron Glow (Top) */}
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9933] opacity-25 blur-3xl" />
        {/* Emerald Green Glow (Bottom) */}
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-[#138808] to-[#10b981] opacity-25 blur-3xl" />
        {/* Soft Golden Sunlight (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-300/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            
            {/* Left Column: Brand Hero & Logo Emblem */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge with Logo Mini Emblem */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-slate-900/80 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md shadow-lg">
                
                <span className="flex h-2 w-2 rounded-full bg-[#FF6B00] animate-ping" />
                <span>{t.home.badge}</span>
              </div>

              {/* Main Heading with Tricolor Gradient */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {t.home.title1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFD700] to-[#22c55e]">
                  {t.home.title2}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-amber-300">
                {t.home.slogan}
              </p>

              {/* Inspiring Couplet Card */}
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-inner">
                <p className="text-base sm:text-lg italic font-medium text-gray-100 leading-relaxed border-l-4 border-[#FF7A00] pl-4 whitespace-pre-line">
                  {t.home.couplet}
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
                {t.home.desc}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/investment-plans"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#e65100] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>{t.home.btnPlans}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                >
                  <span>{t.home.btnBank}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Founder Video Card + Logo Emblem Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glowing Aura Ring */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#138808] opacity-35 blur-xl" />

                <div className="relative rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
                  
                  {/* Top Bar with Karmbhoomi Emblem Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-slate-950/80">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-300">
                        {t.home.videoTitle}
                      </span>
                    </div>
                    <span className="rounded bg-[#138808] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      OFFICIAL
                    </span>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video w-full bg-black relative">
                    <video
                      className="h-full w-full object-cover"
                      src={DIRECTOR_VIDEO_SRC}
                      controls
                      poster={DIRECTOR_PHOTO_SRC}
                      preload="metadata"
                    >
                      Your browser does not support videos.
                    </video>
                  </div>

                  {/* Founder Profile Details */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative shrink-0">
                        {!imgError ? (
                          <img
                            src={DIRECTOR_PHOTO_SRC}
                            alt={t.home.founderName}
                            onError={() => setImgError(true)}
                            className="h-14 w-14 rounded-full border-2 border-[#FF7A00] object-cover shadow-md"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FF7A00] bg-[#0B2545] font-bold text-white">
                            Dr.
                          </div>
                        )}
                        <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#138808] text-[9px] text-white ring-2 ring-slate-900">
                          ✓
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-base font-bold text-white">
                          {t.home.founderName}
                        </p>
                        <p className="text-xs font-semibold text-amber-400">
                          {t.home.founderRole}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {t.home.founderDesc}
                        </p>
                      </div>
                    </div>

                    {/* Logo Watermark Pill on the right */}
                    <div className="hidden sm:flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-white/10 p-1 border border-white/20">
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="relative z-10 bg-[#07182D] border-t-4 border-[#FF6B00] text-white shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {t.home.stats.map((s, idx) => (
              <div
                key={s.l}
                className="group relative rounded-2xl bg-white/5 p-5 text-center transition-all hover:bg-white/10 border border-white/5"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-amber-400">
                  {s.n}
                </p>
                <p className="mt-1 text-sm font-bold text-white">{s.l}</p>
                <p className="mt-0.5 text-xs text-gray-300">{s.sub}</p>
                {idx < t.home.stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPANY PROFILE GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            {t.home.snapshotBadge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
            {t.home.snapshotTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00] hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#138808]">
                    {f.label}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm font-bold leading-relaxed text-gray-900">
                  {f.value}
                </p>
              </div>
              <div className="mt-5 h-1 w-8 rounded-full bg-gray-100 group-hover:w-full group-hover:bg-[#FF6B00] transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3 PILLARS SECTION ================= */}
      <section className="bg-slate-100/70 py-16 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#138808] bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {t.home.pillarsBadge}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
              {t.home.pillarsTitle}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#138808]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-[#0B2545] border border-blue-100">
                  {p.badge}
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUNDER QUOTE HIGHLIGHT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                {!imgError ? (
                  <img
                    src={DIRECTOR_PHOTO_SRC}
                    alt={t.home.founderName}
                    onError={() => setImgError(true)}
                    className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover border-4 border-[#FF6B00] shadow-lg mx-auto"
                  />
                ) : (
                  <div className="w-44 h-44 rounded-2xl bg-[#0B2545] flex items-center justify-center text-white text-2xl font-bold mx-auto border-4 border-[#FF6B00]">
                    Founder
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0B2545] px-4 py-1 text-xs font-bold text-white shadow">
                  मार्गदर्शक
                </div>
              </div>
              <h3 className="mt-5 text-lg font-black text-[#0B2545]">
                {t.home.founderName}
              </h3>
              <p className="text-xs font-bold text-[#138808]">
                {t.home.founderRole}
              </p>
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-gray-200 lg:pl-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {t.home.founderQuoteBadge}
              </span>
              <blockquote className="mt-4 text-base sm:text-lg italic leading-relaxed text-gray-800 font-medium border-l-4 border-[#0B2545] pl-4 sm:pl-6">
                {t.home.founderQuote}
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2545] hover:text-[#138808] transition-colors"
                >
                  <span>{t.home.btnReadMore}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= HIGH-IMPACT CTA BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0B2545] via-[#103565] to-[#138808] py-16 text-white shadow-2xl">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block rounded-full bg-[#FF6B00] px-3.5 py-1 text-xs font-black tracking-wide text-white">
            {t.home.ctaTag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-100 leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/investment-plans"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-black text-[#0B2545] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {t.home.ctaBtn1}
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border-2 border-white bg-transparent px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#0B2545] active:scale-95"
            >
              {t.home.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;