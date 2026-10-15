import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

const Arrow: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const About: React.FC = () => {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  // Same container as Home / Header / Footer
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  const REGISTRATION = hi
    ? [
        { label: "वैधानिक स्थिति", value: "कॉर्पोरेट पहचान (CIN): U70102UP2012PLC053219" },
        { label: "निगमन प्रमाणपत्र", value: "निगमन प्रमाणपत्र" },
        { label: "व्यवसाय प्रारंभ", value: "व्यवसाय प्रारंभ" },
        { label: "मंत्रालय", value: "कॉर्पोरेट कार्य मंत्रालय (MCA)" },
      ]
    : [
        { label: "Legal Status", value: "Corporate Identity Number (CIN): U70102UP2012PLC053219" },
        { label: "Incorporation Certificate", value: "Certificate of Incorporation" },
        { label: "Commencement of Business", value: "Commencement of Business" },
        { label: "Ministry", value: "Ministry of Corporate Affairs (MCA)" },
      ];

  const FACTS = hi
    ? [
        { label: "कंपनी", value: "कर्मभूमि इंडिया लिमिटेड" },
        { label: "संस्थापक", value: "डॉ. शिव करन कर्मयोद्धा" },
        { label: "मुख्य गतिविधियां", value: "रियल एस्टेट, उत्पाद एवं सेवाएँ" },
        { label: "कंपनी का प्रकार", value: "पब्लिक लिमिटेड" },
        { label: "निगमन", value: "22 अक्टूबर 2012" },
        { label: "CIN", value: "U70102UP2012PLC053219" },
      ]
    : [
        { label: "Company", value: "Karmbhumi India Limited" },
        { label: "Founder", value: "Dr. Shiv Karan Karmayoddha" },
        { label: "Core Activities", value: "Real Estate, Products & Services" },
        { label: "Company Type", value: "Public Limited" },
        { label: "Incorporation", value: "22 October 2012" },
        { label: "CIN", value: "U70102UP2012PLC053219" },
      ];

  const VALUES = hi
    ? [
        { t: "संरक्षण एवं मर्यादा", d: "हर निवेशक की गरिमा, सुरक्षा और सम्मान को सर्वोच्च प्राथमिकता।" },
        { t: "पहल एवं नवाचार", d: "पारंपरिक सीमाओं से आगे बढ़कर आधुनिक वित्तीय व्यवस्थाओं को बढ़ावा देना।" },
        { t: "सत्यनिष्ठा एवं पारदर्शिता", d: "निष्पक्षता, नैतिकता और कानूनी अनुपालन का दृढ़ता से पालन।" },
        { t: "गुणवत्ता एवं समृद्धि", d: "टिकाऊ, परिसंपत्ति-समर्थित रिटर्न और स्थायी मूल्य सृजन।" },
        { t: "सहयोग एवं संबंध", d: "सामूहिक सहयोग और साथ के माध्यम से समुदायों का सशक्तिकरण।" },
        { t: "विश्वसनीयता एवं भरोसा", d: "समयबद्ध और सत्यापन योग्य परिणामों से स्थायी भरोसा अर्जित करना।" },
      ]
    : [
        { t: "Custody & Decorum", d: "Highest priority to the dignity, safety, and respect of every investor." },
        { t: "Initiative & Innovation", d: "Transcending traditional constraints to foster modern financial mechanisms." },
        { t: "Integrity & Transparency", d: "Uncompromising adherence to fairness, ethics, and legal compliance." },
        { t: "Quality & Prosperity", d: "Delivering sustainable, asset-backed returns and enduring value creation." },
        { t: "Cooperation & Relationship", d: "Empowering communities through collective handholding and cooperation." },
        { t: "Credibility & Trust", d: "Earning enduring trust through punctual, verifiable outcomes." },
      ];

  const CULTURE = hi
    ? ["दक्षता", "अनुकूलनशीलता", "सहयोग", "प्रतिबद्धता", "अनुशासन", "सशक्तिकरण", "सहानुभूति", "उत्कृष्टता"]
    : ["Efficiency", "Adaptability", "Collaboration", "Commitment", "Discipline", "Empowerment", "Empathy", "Excellence"];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {t.about.heroTag}
          </p>
          <h1
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
            style={{ color: NAVY }}
          >
            {t.about.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {t.about.heroDesc}
          </p>
        </div>
      </section>

      {/* ================= REGISTRATION & VERIFICATION ================= */}
      <section className={`${container} pt-12 sm:pt-14`}>
        <h2 className="text-2xl font-bold sm:text-[32px]" style={{ color: NAVY }}>
          {t.about.legalTitle}
        </h2>

        <div className="mt-6 space-y-4">
          {REGISTRATION.map((r) => (
            <div key={r.label}>
              <p className="text-[10px] font-semibold" style={{ color: RUST }}>
                {r.label}
              </p>
              <p className="mt-1 text-sm text-slate-600">{r.value}</p>
            </div>
          ))}

          <a
            href="https://www.mca21.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[10px] font-semibold hover:underline"
            style={{ color: RUST }}
          >
            {t.about.mcaBtn}
          </a>
        </div>
      </section>

      {/* ================= COMPANY AT A GLANCE ================= */}
      <section className={`${container} pb-14 pt-14 sm:pb-16 sm:pt-16`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {hi ? "एक नज़र में कंपनी" : "Company at a Glance"}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3.5">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-md bg-[#EEF2F6] px-4 py-4">
              <p className="text-[10px] font-medium text-slate-500">{f.label}</p>
              <p className="mt-1.5 text-sm font-semibold leading-snug" style={{ color: NAVY }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-10 sm:py-12`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-[9px] font-semibold" style={{ color: RUST }}>
                {hi ? "विज़न" : "Vision"}
              </p>
              <h3 className="mt-2 text-base font-bold" style={{ color: NAVY }}>
                {t.about.visionTitle}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                {t.about.visionDesc}
              </p>
            </div>

            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-[9px] font-semibold" style={{ color: RUST }}>
                {hi ? "मिशन" : "Mission"}
              </p>
              <h3 className="mt-2 text-base font-bold" style={{ color: NAVY }}>
                {t.about.missionTitle}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                {t.about.missionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES & CULTURE ================= */}
      <section className={`${container} py-12 sm:py-14`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {t.about.valuesTitle}
        </h2>

        <div className="mt-6 space-y-5">
          {VALUES.map((v) => (
            <div key={v.t}>
              <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
                {v.t}
              </h3>
              <p className="mt-2 text-xs text-slate-600">{v.d}</p>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
              {hi ? "8 प्रमुख संगठनात्मक सांस्कृतिक स्तंभ" : "8 Key Organizational Cultural Pillars"}
            </h3>
            <p className="mt-3 text-xs text-slate-600">{CULTURE.join(" · ")}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
              {t.about.dedicationTitle}
            </h3>
            <p className="mt-3 max-w-4xl text-xs leading-relaxed text-slate-600">
              “{t.about.dedicationQuote}”
            </p>
            <p className="mt-4 text-[9px] font-semibold" style={{ color: RUST }}>
              — {t.home.founderName}
            </p>
          </div>
        </div>
      </section>

      {/* ================= JOIN CTA ================= */}
      <section className="bg-[#E6EDF4]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[10px] font-semibold" style={{ color: RUST }}>
            {hi ? "हमसे जुड़ें" : "Join Us"}
          </p>
          <h2
            className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-[32px]"
            style={{ color: NAVY }}
          >
            {hi
              ? "कर्मभूमि बैंक ऑफ़ इंडिया के आर्थिक आंदोलन से जुड़ें"
              : "Join the Karmbhumi Bank of India Economic Movement"}
          </h2>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
            {hi
              ? "अपना आर्थिक भविष्य सुरक्षित करें और एक समतामूलक व आत्मनिर्भर भारत के निर्माण में योगदान दें। आज ही हमारी विश्वसनीय निवेश योजनाएँ देखें।"
              : "Secure your financial future and contribute toward an egalitarian and self-reliant India. Explore our trusted investment schemes today."}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: RUST }}
          >
            <span>{hi ? "संपर्क करें" : "Contact Us"}</span>
            <Arrow />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 