import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

// ================= IMAGE ASSETS =================
const FOUNDER_SPEECH_IMG = "/img/founder-speech.jpg"; // Hero card photo
const DIRECTOR_PHOTO_SRC = "/img/dr.jpg"; // Founder message photo

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";

const NAVY = "#0B2545";
const RUST = "#B84A12";

const Arrow: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Home: React.FC = () => {
  const [speechImgError, setSpeechImgError] = useState(false);
  const [founderImgError, setFounderImgError] = useState(false);

  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  // ---------- DATA ----------
  const STATS = hi
    ? [
        { n: "36", l: "राज्य / केंद्रशासित प्रदेश", sub: "पैन-इंडिया विस्तार" },
        { n: "707", l: "जिले", sub: "प्रशासनिक पहुँच" },
        { n: "5,410", l: "तहसील", sub: "स्थानीय समन्वय" },
        { n: "6,612", l: "विकास खंड", sub: "जमीनी संगठन" },
      ]
    : [
        { n: "36", l: "States / UTs", sub: "Pan-India Expansion" },
        { n: "707", l: "Districts", sub: "Administrative Reach" },
        { n: "5,410", l: "Tehsils", sub: "Local Coordination" },
        { n: "6,612", l: "Development Blocks", sub: "Grassroot Organization" },
      ];

  const FACTS = hi
    ? [
        { label: "कम्पनी का नाम", value: "कर्मभूमि इंडिया लिमिटेड" },
        { label: "संस्थापक", value: "डॉ. शिव करन कर्मयोद्धा" },
        { label: "स्थापना व निगमन", value: "18 जून 2006 (निगमन: 22 अक्टूबर 2012)" },
        { label: "कम्पनी का प्रकार", value: "पब्लिक लिमिटेड (अंशधारिता से निगमित)" },
        { label: "कार्यक्षेत्र", value: "सम्पूर्ण भारत (अनुसूचित राज्यों को छोड़कर)" },
        { label: "मुख्य व्यवसाय", value: "रियल एस्टेट, उत्पाद एवं सेवा उद्योग" },
        { label: "केंद्रीय उद्देश्य", value: "कर्मभूमि बैंक ऑफ इंडिया की स्थापना" },
        { label: "मूल मंत्र", value: "सहभागिता से पूँजी निर्माण, सहकारिता से विस्तार" },
      ]
    : [
        { label: "Company Name", value: "Karmbhumi India Limited" },
        { label: "Founder", value: "Dr. Shiv Karan Karmayoddha" },
        { label: "Establishment & Incorp.", value: "18 June 2006 (Incorp: 22 Oct 2012)" },
        { label: "Company Type", value: "Public Limited (Incorporated by Shares)" },
        { label: "Jurisdiction", value: "Pan India (Except Scheduled Territories)" },
        { label: "Core Business", value: "Real Estate, Products & Services" },
        { label: "Primary Mission", value: "Establishment of Karmbhumi Bank of India" },
        { label: "Core Mantra", value: "Capital through Participation, Expansion via Cooperation" },
      ];

  const PILLARS = hi
    ? [
        {
          title: "रियल एस्टेट एवं परिसंपत्ति सुरक्षा",
          desc: "भूमि और संपत्तियों में ठोस निवेश द्वारा समर्थित, जिससे प्रत्येक सहभागिता सुदृढ़ परिसंपत्तियों से सुरक्षित रहती है।",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3" />
          ),
        },
        {
          title: "सहकारी आर्थिक मॉडल",
          desc: "ऐसी वित्तीय संरचना जो कुछ के लिए नहीं, बल्कि मेहनतकश नागरिकों के सामूहिक उत्थान के लिए बनी है।",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h18v4H3zM5 11v9h14v-9M10 15h4" />
          ),
        },
        {
          title: "पारदर्शिता एवं सुशासन",
          desc: "MCA-पंजीकृत कॉर्पोरेट ढांचा, जो कानूनी, वैधानिक और नैतिक शासन मानकों का कड़ाई से पालन करता है।",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM2 20a6 6 0 0112 0M14 20a6 6 0 018 0" />
          ),
        },
      ]
    : [
        {
          title: "Real Estate & Asset Security",
          desc: "Backed by tangible investments in land and properties, ensuring every participation is supported by solid assets.",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3" />
          ),
        },
        {
          title: "Cooperative Economic Model",
          desc: "A financial structure designed not for a few, but for the collective upliftment of hardworking citizens.",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h18v4H3zM5 11v9h14v-9M10 15h4" />
          ),
        },
        {
          title: "Transparency & Governance",
          desc: "An MCA-registered corporate framework strictly adhering to legal, statutory, and ethical governance standards.",
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM2 20a6 6 0 0112 0M14 20a6 6 0 018 0" />
          ),
        },
      ];

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

       {/* Hero: centered letterhead-style design */}
        <div className="relative" style={{ backgroundColor: "#ECEBEA" }}>
          <div className={`${container} relative py-10 lg:py-14`}>
            {/* Top: small logo + company details (left aligned like the letterhead) */}
            {/* <div className="flex items-start gap-3 sm:gap-4">
              <div className="leading-snug">
                <p className="text-base font-bold sm:text-xl" style={{ color: "#E5231B" }}>
                  Karmbhumi India Limited
                </p>
                <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-slate-700 sm:text-sm">
                  Regd. Office : Surya Complex, Sarveshwari Nagar, Naka Bypass, Faizabad, (U.P.), INDIA
                  <br />
                  Regd. No. U70102UP2012PLC053219
                  <br />
                  Query us: www.mca21.gov.in
                  <br />
                  visit us : www.karmbhumiindia.com
                </p>
              </div>
            </div> */}

            {/* Center content */}
            <div className="mt-8 flex flex-col items-center text-center lg:mt-10">
              {/* Big title */}
              <h1
                className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-[72px]"
                style={{ color: "#E5231B" }}
              >
                {t.home.title1} {t.home.title2}
              </h1>

              {/* Center big logo */}
              {/* Center big logo */}
              <div className="mt-8 flex h-[400px] w-[400px] items-center justify-center sm:h-[480px] sm:w-[480px] lg:mt-10 lg:h-[520px] lg:w-[520px]">
                <img
                  src="/img/Karmbhumi.png"
                  alt="कर्मभूमि इंडिया लिमिटेड लोगो"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Slogan */}
              <p
                className="mt-8 text-2xl font-bold sm:text-4xl lg:text-[44px]"
                style={{ color: RUST }}
              >
                {t.home.slogan}
              </p>

              {/* Couplet */}
              <p
                className="mt-3 max-w-3xl whitespace-pre-line text-base font-bold leading-relaxed sm:text-xl lg:text-2xl"
                style={{ color: NAVY }}
              >
                {t.home.couplet}
              </p>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {t.home.desc}
              </p>

              {/* Buttons */}
              {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <Link
                  to="/investment-plans"
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: RUST }}
                >
                  <span>{t.home.btnPlans}</span>
                  <Arrow />
                </Link>

                <Link
                  to="/karmbhoomi-bank"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: NAVY }}
                >
                  <span>{t.home.btnBank}</span>
                  <Arrow />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section style={{ backgroundColor: NAVY }} className="text-white">
        <div className={`${container} pt-12 sm:pt-14`}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold text-amber-400">
                {hi ? "कम्पनी अवलोकन" : "Company Overview"}
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-[28px]">
                {hi ? "एक नज़र में कम्पनी" : "Company at a Glance"}
              </h2>
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
            <p className="text-xs text-slate-300">
              {hi
                ? "सहभागिता से पूँजी निर्माण, सहकारिता से विस्तार"
                : "Capital through Participation, Expansion via Cooperation"}
            </p>
            <Link
              to="/karmbhoomi-bank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
            >
              <span>{t.home.btnBank}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= COMPANY AT A GLANCE ================= */}
      <section className={`${container} pt-14 sm:pt-16`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {hi ? "एक नज़र में कम्पनी" : "Company at a Glance"}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-md bg-[#EEF2F6] px-4 py-3.5">
              <p className="text-[10px] font-medium text-slate-500">{f.label}</p>
              <p className="mt-1.5 text-sm font-semibold leading-snug" style={{ color: NAVY }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SYMBOL OF PUBLIC PARTICIPATION ================= */}
      <section className={`${container} pt-14 sm:pt-16`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {hi
            ? "राष्ट्र निर्माण में सहभागिता और जन-विश्वास का प्रतीक"
            : "Symbol of Public Participation & National Trust"}
        </h2>

        <p className="mt-4 text-xs text-slate-600">
          {hi ? "पारदर्शी नीतियां एवं राष्ट्रीय विजन" : "Transparent Governance & National Vision"}
        </p>

        <p className="mt-4 max-w-4xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
          {hi
            ? "कर्मभूमि इंडिया लिमिटेड संपूर्ण भारत में सहकारिता, रियल एस्टेट और उत्पाद एवं सेवा क्षेत्र के माध्यम से आत्मनिर्भरता की नई गाथा लिख रहा है। हमारा मुख्य संकल्प 'कर्मभूमि बैंक ऑफ इंडिया' की स्थापना कर प्रत्येक नागरिक को वित्तीय संबल प्रदान करना है।"
            : "Karmbhumi India Limited is scripting a new saga of self-reliance across India through cooperation, real estate, and product-service sectors. Our central mission is the establishment of Karmbhumi Bank of India."}
        </p>

        <p className="mt-4 text-xs text-slate-600 sm:text-[13px]">
          {hi
            ? "प्रेस व मीडिया में पारदर्शी छवि — प्रत्येक कार्य सार्वजनिक व नियमबद्ध"
            : "Transparent Media Presence — Fully compliant and verified"}
        </p>
        <p className="mt-4 text-xs text-slate-600 sm:text-[13px]">
          {hi
            ? "सहकारिता से पूंजी निर्माण — जन-जन की सामूहिक शक्ति"
            : "Cooperative Capital Growth — Collective strength of investors"}
        </p>

        <Link
          to="/about"
          className="mt-4 inline-block text-xs font-medium text-slate-600 hover:underline sm:text-[13px]"
        >
          {hi ? "संस्थान के बारे में विस्तार से जानें" : "Learn more about our institution"}
        </Link>
      </section>

      {/* ================= CORE PILLARS ================= */}
      <section className={`${container} pb-16 pt-14 sm:pt-16`}>
        <p className="text-[11px] font-semibold" style={{ color: RUST }}>
          {hi ? "मुख्य स्तंभ" : "Core Pillars"}
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {hi ? "प्रमुख गतिविधियां एवं संस्थागत आधार" : "Key Activities & Institutional Foundations"}
        </h2>

        <div className="mt-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="grid grid-cols-1 gap-3 border-b border-slate-200 py-5 md:grid-cols-12 md:items-center md:gap-6"
            >
              <div className="flex items-center gap-4 md:col-span-5">
                <svg
                  className="h-4 w-4 shrink-0"
                  style={{ color: NAVY }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {p.icon}
                </svg>
                <h3 className="text-base font-semibold leading-snug sm:text-[17px]" style={{ color: NAVY }}>
                  {p.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 md:col-span-7">{p.desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/investment-plans"
          className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-all hover:brightness-125 active:scale-95"
          style={{ backgroundColor: NAVY }}
        >
          <span>{t.home.btnPlans}</span>
          <Arrow className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* ================= FOUNDER'S MESSAGE ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-14 sm:py-16`}>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[130px_1fr] md:gap-8 lg:grid-cols-[150px_1fr]">
            <div className="h-[170px] w-[130px] overflow-hidden rounded-sm bg-slate-300 lg:h-[190px] lg:w-[150px]">
              {!founderImgError ? (
                <img
                  src={DIRECTOR_PHOTO_SRC}
                  alt={t.home.founderName}
                  onError={() => setFounderImgError(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: NAVY }}>
                  Dr.
                </div>
              )}
            </div>

            <div>
              <p className="text-[11px] font-semibold" style={{ color: RUST }}>
                {hi ? "संस्थापक एवं मुख्य मार्गदर्शक" : "Founder & Chief Mentor"}
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-[34px] sm:leading-tight" style={{ color: NAVY }}>
                {hi ? "संस्थापक का प्रेरक संदेश" : "Founder’s Inspiring Message"}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                “{t.home.founderQuote}”
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {hi
                  ? "शिक्षा, समाज उत्थान और आर्थिक स्वावलंबन के क्षेत्र में कर्मभूमि परिवार निरंतर अग्रसर है। प्रतिभाओं का सम्मान और गरीब व वंचित वर्ग को आगे बढ़ाना हमारी सर्वोच्च प्राथमिकता है।"
                  : "The Karmbhumi family is constantly striving in education, social upliftment, and economic independence. Honoring talents and empowering every section of society is our top priority."}
              </p>

              <Link
                to="/AuthorProfile"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold hover:underline"
                style={{ color: NAVY }}
              >
                <span>{hi ? "पूरा प्रोफ़ाइल पढ़ें" : "Read Full Profile"}</span>
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
            {hi ? "हमसे जुड़ें" : "Join Us"}
          </p>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-[34px]" style={{ color: NAVY }}>
            {hi
              ? "कर्मभूमि बैंक ऑफ इंडिया आर्थिक आंदोलन से जुड़ें"
              : "Join the Karmbhumi Bank of India Economic Movement"}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {hi
              ? "अपना वित्तीय भविष्य सुरक्षित करें और समतामूलक एवं आत्मनिर्भर भारत के निर्माण में योगदान दें। हमारी विश्वसनीय निवेश योजनाओं को जानें।"
              : "Secure your financial future and contribute toward an egalitarian and self-reliant India. Explore our trusted investment schemes today."}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: RUST }}
          >
            <span>{hi ? "संपर्क करें" : "Contact Us"}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;