import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

// ================= IMAGE ASSETS =================
// Note: Place your uploaded images in public/img/ with these filenames
const FOUNDER_SPEECH_IMG = "/img/founder-speech.jpg"; // Image 1: Dr. Shiv Karan addressing with Company Banner & Team
const KARMBHUMI_MEDIA_IMG = "/img/karmbhumi-media.jpg"; // Image 2: Karmbhumi Logo with Press & News Microphones
const FOUNDER_HONOR_IMG = "/img/founder-honor.jpg";   // Image 3: Dr. Shiv Karan at Pratibha Khoj Award Ceremony
const DIRECTOR_PHOTO_SRC = "/img/dr.jpg";              // Founder Avatar / Profile

const Home: React.FC = () => {
  const [speechImgError, setSpeechImgError] = useState(false);
  const [mediaImgError, setMediaImgError] = useState(false);
  const [honorImgError, setHonorImgError] = useState(false);
  const [founderAvatarError, setFounderAvatarError] = useState(false);

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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07182D] via-[#0B2545] to-[#0A1D37] py-14 lg:py-16 text-white">
        
        {/* Tricolor Ambient Glow Orbs */}
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9933] opacity-25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-[#138808] to-[#10b981] opacity-25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-300/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            
            {/* Left Column: Brand Hero & Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge with Pulse Dot */}
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

            {/* Right Column: IMAGE 1 - Founder Keynote & Ground Leadership Showcase (Replaces Video) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glowing Aura Ring */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#138808] opacity-35 blur-xl pointer-events-none" />

                <div className="relative rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
                  
                  {/* Top Bar with Live Tag */}
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-slate-950/80">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#138808] animate-pulse" />
                      <span className="text-xs font-semibold text-gray-200">
                        {lang === "hi" ? "संस्थापक उद्बोधन एवं जनसंवाद" : "Founder Keynote & Public Address"}
                      </span>
                    </div>
                    <span className="rounded bg-[#138808] px-2.5 py-0.5 text-[10px] font-bold text-white shadow tracking-wide">
                      OFFICIAL
                    </span>
                  </div>

                  {/* Main Event Photo Display */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    {!speechImgError ? (
                      <img
                        src={FOUNDER_SPEECH_IMG}
                        alt="Dr. Shiv Karan Karmayoddha addressing public meeting"
                        onError={() => setSpeechImgError(true)}
                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-gray-300 bg-slate-800">
                        <span className="text-3xl mb-2">🏛️</span>
                        <p className="text-sm font-bold text-amber-300">कर्मभूमि इंडिया लिमिटेड</p>
                        <p className="text-xs text-gray-400 mt-1">संस्थापक उद्बोधन एवं सम्मेलन</p>
                      </div>
                    )}

                    {/* Gradient Overlay & Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-lg bg-black/60 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md border border-white/15">
                        {lang === "hi" ? "✨ 18+ वर्षों का अटूट जनविश्वास" : "✨ 18+ Years of Public Trust"}
                      </span>
                      <span className="rounded-lg bg-[#FF6B00]/90 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                        Pan India
                      </span>
                    </div>
                  </div>

                  {/* Founder Profile Details Footer */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative shrink-0">
                        {!founderAvatarError ? (
                          <img
                            src={DIRECTOR_PHOTO_SRC}
                            alt={t.home.founderName}
                            onError={() => setFounderAvatarError(true)}
                            className="h-16 w-16 rounded-full border-2 border-[#FF7A00] object-top shadow-md"
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
                        <p className="text-[11px] text-gray-300 mt-0.5 line-clamp-1">
                          {t.home.founderDesc}
                        </p>
                      </div>
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

      {/* ================= IMAGE 2: NATIONAL MEDIA & MISSION SPOTLIGHT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-orange-50/40 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            
            {/* Left: Press & Media Graphic Card */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto max-w-sm rounded-2xl border-2 border-amber-300/60 bg-white p-2 shadow-xl shadow-slate-200/80">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                  {!mediaImgError ? (
                    <img
                      src={KARMBHUMI_MEDIA_IMG}
                      alt="Karmbhumi India Official Emblem and Press Coverage"
                      onError={() => setMediaImgError(true)}
                      className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#0B2545] font-black text-2xl border border-blue-200">
                        कर्मभूमि
                      </div>
                      <p className="mt-3 text-sm font-bold text-gray-700">प्रेस एवं मीडिया प्रसारण</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: National Mission & Transparent Vision Info */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-[#FF6B00] border border-orange-200">
                {lang === "hi" ? "पारदर्शी नीतियां एवं राष्ट्रीय विजन" : "Transparent Governance & National Vision"}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2545] tracking-tight">
                {lang === "hi" 
                  ? "राष्ट्र निर्माण में सहभागिता और जन-विश्वास का प्रतीक" 
                  : "Symbol of Public Participation & National Trust"}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                {lang === "hi"
                  ? "कर्मभूमि इंडिया लिमिटेड संपूर्ण भारत में सहकारिता, रियल एस्टेट और उत्पाद एवं सेवा क्षेत्र के माध्यम से आत्मनिर्भरता की नई गाथा लिख रहा है। हमारा मुख्य संकल्प 'कर्मभूमि बैंक ऑफ इंडिया' की स्थापना कर प्रत्येक नागरिक को वित्तीय संबल प्रदान करना है।"
                  : "Karmbhumi India Limited is scripting a new saga of self-reliance across India through cooperation, real estate, and product-service sectors. Our central mission is the establishment of Karmbhumi Bank of India."}
              </p>

              {/* Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 rounded-xl bg-white p-3.5 border border-gray-100 shadow-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#138808] text-white text-xs font-bold">✓</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      {lang === "hi" ? "प्रेस व मीडिया में पारदर्शी छवि" : "Transparent Media Presence"}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {lang === "hi" ? "प्रत्येक कार्य सार्वजनिक व नियमबद्ध" : "Fully compliant and verified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-white p-3.5 border border-gray-100 shadow-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-white text-xs font-bold">✓</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      {lang === "hi" ? "सहकारिता से पूंजी निर्माण" : "Cooperative Capital Growth"}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {lang === "hi" ? "जन-जन की सामूहिक शक्ति" : "Collective strength of investors"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#e65100] transition-colors"
                >
                  <span>{lang === "hi" ? "संस्थान के बारे में विस्तार से जानें" : "Learn more about our institution"}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
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

      {/* ================= IMAGE 3: FOUNDER HIGHLIGHT & SOCIAL DEDICATION ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Dr. Shiv Karan at Pratibha Khoj Award Ceremony Photo */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border-4 border-[#FF6B00] shadow-xl">
                {!honorImgError ? (
                  <img
                    src={FOUNDER_HONOR_IMG}
                    alt="Dr. Shiv Karan Karmayoddha at Talent Search Award Ceremony"
                    onError={() => setHonorImgError(true)}
                    className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-64 h-80 bg-[#0B2545] flex items-center justify-center text-white text-xl font-bold p-4">
                    प्रतिभा सम्मान समारोह
                  </div>
                )}
                
                {/* Floating Ribbon Badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] rounded-xl bg-[#0B2545]/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-amber-300 shadow border border-white/20">
                  {lang === "hi" ? "प्रतिभा सम्मान व सामाजिक सरोकार" : "Social Leadership & Youth Honor"}
                </div>
              </div>

              <h3 className="mt-5 text-xl font-black text-[#0B2545]">
                {t.home.founderName}
              </h3>
              <p className="text-xs font-bold text-[#138808] uppercase tracking-wide">
                {t.home.founderRole}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {lang === "hi" ? "संस्थापक एवं मुख्य मार्गदर्शक" : "Founder & Chief Mentor"}
              </p>
            </div>

            {/* Right: Founder Quote & Philosophical Vision */}
            <div className="lg:col-span-7 lg:border-l lg:border-gray-200 lg:pl-10 space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {t.home.founderQuoteBadge}
              </span>

              <blockquote className="text-base sm:text-lg italic leading-relaxed text-gray-800 font-medium border-l-4 border-[#0B2545] pl-4 sm:pl-6 bg-slate-50/60 py-3 rounded-r-xl">
                "{t.home.founderQuote}"
              </blockquote>

              <p className="text-sm leading-relaxed text-gray-600">
                {lang === "hi" 
                  ? "शिक्षा, समाज उत्थान और आर्थिक स्वावलंबन के क्षेत्र में कर्मभूमि परिवार निरंतर अग्रसर है। प्रतिभाओं का सम्मान और गरीब व वंचित वर्ग को आगे बढ़ाना हमारी सर्वोच्च प्राथमिकता है।"
                  : "The Karmbhumi family is constantly striving in education, social upliftment, and economic independence. Honoring talents and empowering every section of society is our top priority."}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0B2545] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#103565] transition-all"
                >
                  <span>{t.home.btnReadMore}</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <span>{lang === "hi" ? "संपर्क करें" : "Contact Us"}</span>
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