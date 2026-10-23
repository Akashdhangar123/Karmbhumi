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
        { label: "कम्पनी का नाम", value: "कर्मभूमि इंडिया लिमिटेड" },
        { label: "संस्थापक", value: "डॉ. शिव करन कर्मयोद्धा" },
        { label: "स्थापना वर्ष", value: "18 जून 2006 (निगमन 22 अक्टूबर 2012)" },
        { label: "कम्पनी का प्रकार", value: "पब्लिक कम्पनी (अंशधारिता से निगमित)" },
        { label: "कार्यक्षेत्र", value: "सम्पूर्ण भारत (अनुसूचित राज्यों को छोड़कर)" },
        { label: "मुख्य व्यवसाय", value: "रियल एस्टेट, उत्पाद एवं सेवा उद्योग" },
        { label: "उद्देश्य", value: "कर्मभूमि बैंक ऑफ इंडिया की स्थापना" },
        {
          label: "मुख्य उद्देश्य",
          value: "बेरोजगारी निर्मूलन, उत्पाद एवं सेवाओं के माध्यम से देश का विकास करना",
        },
        { label: "आग्रह", value: "सहभागिता से पूँजी निर्माण, सहकारिता से विस्तार करना" },
        { label: "CIN", value: "U70102UP2012PLC053219" },
      ]
    : [
        { label: "Company Name", value: "Karmbhumi India Limited" },
        { label: "Founder", value: "Dr. Shiv Karan Karmayoddha" },
        { label: "Year of Establishment", value: "18 June 2006 (Incorporated 22 October 2012)" },
        { label: "Company Type", value: "Public Company (Incorporated by Shares)" },
        { label: "Area of Operation", value: "All India (excluding scheduled states)" },
        { label: "Main Business", value: "Real Estate, Products & Services Industry" },
        { label: "Objective", value: "Establishment of Karmbhumi Bank of India" },
        {
          label: "Main Objective",
          value: "Eradicating unemployment and developing the nation through products and services",
        },
        { label: "Aagrah (Motto)", value: "Capital creation through participation, expansion through cooperation" },
        { label: "CIN", value: "U70102UP2012PLC053219" },
      ];

  // Vision & Mission text taken directly from the company document
  const VISION_TITLE = hi ? "हमारा कल्पना दर्शन" : "Our Vision";
  const VISION_DESC = hi
    ? "अन्तर्राष्ट्रीय स्तर की एक विशाल प्रतिस्पर्धी वित्तीय समूह, जो विभिन्न सभाओं के लिए महत्त्वपूर्ण हो एवं भारत का गौरव हो।"
    : "A large, internationally competitive financial group that is significant for various forums and is a source of pride for India.";

  const MISSION_TITLE = hi ? "हमारा लक्ष्य" : "Our Mission";
  const MISSION_DESC = hi
    ? "आकांक्षाओं के अनुरूप पूँजी नियोजन, उत्पाद एवं सेवाओं के माध्यम से समुचित लाभ के साथ वित्तीय सुरक्षा प्रदान कर सभी के जीवन स्तर को निरापद रखना एवं उन्नति करना तथा आर्थिक विकास के लिए संसाधन सुनिश्चित कर देश का विकास करना।"
    : "To provide financial security with fair returns through capital planning aligned with aspirations, and through products and services; to keep the standard of living of all safe and to improve it; and to develop the nation by ensuring resources for economic growth.";

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

  const JOURNEY_TITLE = hi ? "हमारी यात्रा" : "Our Journey";
  const JOURNEY = hi
    ? [
        { y: "18 जून 2006", d: "कर्मभूमि की स्थापना, डॉ. शिव करन कर्मयोद्धा के नेतृत्व में, रोज़गार और आर्थिक सशक्तिकरण के संकल्प के साथ।" },
        { y: "22 अक्टूबर 2012", d: "कर्मभूमि इंडिया लिमिटेड के रूप में पब्लिक कम्पनी का निगमन, CIN: U70102UP2012PLC053219।" },
        { y: "आज", d: "रियल एस्टेट, उत्पाद एवं सेवा उद्योग में कार्यरत, और कर्मभूमि बैंक ऑफ इंडिया की स्थापना की दिशा में प्रयासरत।" },
      ]
    : [
        { y: "18 June 2006", d: "Karmbhumi is established under Dr. Shiv Karan Karmayoddha with a resolve to create employment and economic empowerment." },
        { y: "22 October 2012", d: "Incorporated as Karmbhumi India Limited, a public company, CIN: U70102UP2012PLC053219." },
        { y: "Today", d: "Working in the real estate, products and services industry, and moving toward the establishment of Karmbhumi Bank of India." },
      ];

  const WHAT_TITLE = hi ? "हम क्या करते हैं" : "What We Do";
  const WHAT_INTRO = hi
    ? "कर्मभूमि तीन क्षेत्रों में काम करती है, ताकि लोगों को सुरक्षित निवेश और रोज़गार, दोनों मिल सकें।"
    : "Karmbhumi works across three areas so that people get both secure investment opportunities and employment.";
  const WHAT = hi
    ? [
        { t: "रियल एस्टेट", d: "भूमि और परिसंपत्ति-आधारित परियोजनाएँ, जो निवेशकों को ठोस और टिकाऊ आधार देती हैं।" },
        { t: "उत्पाद", d: "आम लोगों की ज़रूरतों से जुड़े उत्पाद, जो व्यवसाय के साथ-साथ रोज़गार के अवसर भी बनाते हैं।" },
        { t: "सेवाएँ", d: "भरोसेमंद सेवाएँ, जो ग्राहकों और सदस्यों को हर कदम पर सहयोग देती हैं।" },
      ]
    : [
        { t: "Real Estate", d: "Land and asset-based projects that give investors a solid and lasting foundation." },
        { t: "Products", d: "Products built around everyday needs, creating business and employment opportunities together." },
        { t: "Services", d: "Dependable services that support customers and members at every step." },
      ];

  const APPROACH_TITLE = hi ? "हमारा तरीका" : "Our Approach";
  const APPROACH = hi
    ? [
        { t: "सहभागिता से पूँजी निर्माण", d: "जब बहुत से लोग थोड़ा-थोड़ा जुड़ते हैं, तो मिलकर एक मज़बूत पूँजी बनती है।" },
        { t: "सहकारिता से विस्तार", d: "आपसी सहयोग से कार्यक्षेत्र बढ़ता है और उसका लाभ सभी सदस्यों तक पहुँचता है।" },
        { t: "रोज़गार से राष्ट्र विकास", d: "बेरोजगारी निर्मूलन हमारा मुख्य उद्देश्य है, क्योंकि रोज़गार से ही देश आगे बढ़ता है।" },
      ]
    : [
        { t: "Capital through participation", d: "When many people contribute a little, together they build a strong pool of capital." },
        { t: "Expansion through cooperation", d: "Working together widens our reach, and the benefit reaches every member." },
        { t: "Nation-building through employment", d: "Eradicating unemployment is our main objective, because jobs are what move a country forward." },
      ];

  const TRUST_TITLE = hi ? "आप हम पर भरोसा क्यों कर सकते हैं" : "Why You Can Trust Us";
  const TRUST = hi
    ? [
        "कम्पनी कॉर्पोरेट कार्य मंत्रालय (MCA) में पंजीकृत है और CIN से सत्यापित की जा सकती है।",
        "हर निवेश परिसंपत्ति-समर्थित रिटर्न के सिद्धांत पर आधारित है।",
        "निष्पक्षता, नैतिकता और कानूनी अनुपालन हमारे काम का आधार है।",
        "हर निवेशक की गरिमा और सुरक्षा हमारी सर्वोच्च प्राथमिकता है।",
      ]
    : [
        "The company is registered with the Ministry of Corporate Affairs (MCA) and can be verified using its CIN.",
        "Every investment follows the principle of asset-backed returns.",
        "Fairness, ethics, and legal compliance are the base of our work.",
        "The dignity and safety of every investor is our highest priority.",
      ];

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
                {VISION_TITLE}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{VISION_DESC}</p>
            </div>

            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-[9px] font-semibold" style={{ color: RUST }}>
                {hi ? "मिशन" : "Mission"}
              </p>
              <h3 className="mt-2 text-base font-bold" style={{ color: NAVY }}>
                {MISSION_TITLE}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{MISSION_DESC}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section className={`${container} py-12 sm:py-14`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {JOURNEY_TITLE}
        </h2>
        <div className="mt-6 max-w-3xl space-y-6 border-l-2 pl-5" style={{ borderColor: RUST }}>
          {JOURNEY.map((j) => (
            <div key={j.y}>
              <p className="text-xs font-semibold" style={{ color: RUST }}>
                {j.y}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{j.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
            {WHAT_TITLE}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{WHAT_INTRO}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {WHAT.map((w) => (
              <div key={w.t} className="rounded-md bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold" style={{ color: NAVY }}>
                  {w.t}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className={`${container} py-12 sm:py-14`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {APPROACH_TITLE}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3">
          {APPROACH.map((a) => (
            <div key={a.t} className="border-t-2 pt-4" style={{ borderColor: NAVY }}>
              <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
                {a.t}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY TRUST US ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
            {TRUST_TITLE}
          </h2>
          <ul className="mt-5 max-w-3xl space-y-3">
            {TRUST.map((x) => (
              <li key={x} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: RUST }} />
                <span>{x}</span>
              </li>
            ))}
          </ul>
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