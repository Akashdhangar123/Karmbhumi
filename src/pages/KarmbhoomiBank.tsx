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

/* ───────── simple line icons for the 8 zonal HQs ───────── */
type IconKey = "boat" | "gate" | "gateway" | "church" | "temple" | "dome" | "hand" | "chapel";

const ZoneIcon: React.FC<{ name: IconKey }> = ({ name }) => {
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: NAVY,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "boat":
      return (
        <svg {...common}>
          <path d="M24 8v24" />
          <path d="M24 10l12 18H24" />
          <path d="M24 14L14 28h10" />
          <path d="M8 32h32l-4 6H12z" />
          <path d="M6 43c3-2 5-2 8 0s5 2 8 0 5-2 8 0 5 2 8 0" />
        </svg>
      );
    case "gate":
      return (
        <svg {...common}>
          <path d="M8 40V14h32v26" />
          <path d="M6 14h36" />
          <path d="M10 10h28v4" />
          <path d="M17 40V26a7 7 0 0 1 14 0v14" />
          <path d="M6 40h36" />
        </svg>
      );
    case "gateway":
      return (
        <svg {...common}>
          <path d="M6 40V18h8v22" />
          <path d="M34 40V18h8v22" />
          <path d="M14 22h20" />
          <path d="M14 40V28a10 10 0 0 1 20 0v12" />
          <path d="M24 10a6 6 0 0 1 6 6H18a6 6 0 0 1 6-6z" />
          <path d="M24 5v5" />
          <path d="M4 40h40" />
        </svg>
      );
    case "church":
      return (
        <svg {...common}>
          <path d="M24 4v10" />
          <path d="M20 8h8" />
          <path d="M18 18l6-4 6 4v22H18z" />
          <path d="M18 24H8v16h10" />
          <path d="M30 24h10v16H30" />
          <path d="M21 40v-8a3 3 0 0 1 6 0v8" />
          <path d="M6 40h36" />
        </svg>
      );
    case "temple":
      return (
        <svg {...common}>
          <path d="M24 5v4" />
          <path d="M19 9h10l3 6H16z" />
          <path d="M15 15h18l3 7H12z" />
          <path d="M11 22h26l3 8H8z" />
          <path d="M9 30h30v10H9z" />
          <path d="M21 40v-6h6v6" />
          <path d="M6 40h36" />
        </svg>
      );
    case "dome":
      return (
        <svg {...common}>
          <path d="M24 5v5" />
          <path d="M10 32a14 17 0 0 1 28 0" />
          <path d="M8 32h32" />
          <path d="M12 32l-4 8" />
          <path d="M36 32l4 8" />
          <path d="M16 36h16" />
          <path d="M6 40h36" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path d="M16 28V14a2 2 0 0 1 4 0v10" />
          <path d="M20 24V8a2 2 0 0 1 4 0v16" />
          <path d="M24 24V10a2 2 0 0 1 4 0v14" />
          <path d="M28 24V16a2 2 0 0 1 4 0v14" />
          <path d="M16 28l-4-4a2 2 0 0 0-3 3l8 11c2 3 5 4 8 4h4a8 8 0 0 0 8-8v-8" />
        </svg>
      );
    case "chapel":
    default:
      return (
        <svg {...common}>
          <path d="M24 4v8" />
          <path d="M21 7h6" />
          <path d="M24 12l8 8v20H16V20z" />
          <path d="M16 28H8v12h8" />
          <path d="M32 28h8v12h-8" />
          <path d="M21 40v-7a3 3 0 0 1 6 0v7" />
          <path d="M6 40h36" />
        </svg>
      );
  }
};

const KarmbhoomiBank: React.FC = () => {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  // Same container as Home / About / Header / Footer
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  const ZONES: { icon: IconKey; name: string }[] = hi
    ? [
        { icon: "boat", name: "भोपाल" },
        { icon: "gate", name: "दिल्ली" },
        { icon: "gateway", name: "मुंबई" },
        { icon: "church", name: "कोलकाता" },
        { icon: "temple", name: "चेन्नई" },
        { icon: "dome", name: "पटना" },
        { icon: "hand", name: "चंडीगढ़" },
        { icon: "chapel", name: "शिमला" },
      ]
    : [
        { icon: "boat", name: "Bhopal" },
        { icon: "gate", name: "Delhi" },
        { icon: "gateway", name: "Mumbai" },
        { icon: "church", name: "Kolkata" },
        { icon: "temple", name: "Chennai" },
        { icon: "dome", name: "Patna" },
        { icon: "hand", name: "Chandigarh" },
        { icon: "chapel", name: "Shimla" },
      ];

  const REASONS = hi
    ? [
        {
          title: "धार्मिक ट्रस्टों के राजस्व में भागीदारी का अभाव",
          text: "धार्मिक ट्रस्टों से होने वाले विशाल संस्थागत राजस्व में व्यापक सामाजिक-आर्थिक जनता के लिए सीधी भागीदारी के रास्ते नहीं हैं।",
        },
        {
          title: "नीति-निर्माण में सीमित प्रतिनिधित्व",
          text: "प्रशासनिक शासन में व्यापक भागीदारी के बिना कर राजस्व का लाभ जमीनी स्तर के सृजनकर्ताओं तक पूरी तरह नहीं पहुँच पाता।",
        },
        {
          title: "समर्पित वित्तीय संस्थान का अभाव",
          text: "बैंकिंग से होने वाला भारी मुनाफा कुछ हाथों में सिमटा रहता है; समुदाय के पास अपना कोई स्वायत्त आर्थिक नेटवर्क नहीं है।",
        },
        {
          title: "मुख्यधारा मीडिया में शून्य हिस्सेदारी",
          text: "प्रिंट और प्रसारण विज्ञापनों से रोज़ अरबों रुपये की कमाई होती है, पर ज़मीनी कार्यकर्ताओं की उसमें कोई हिस्सेदारी नहीं है।",
        },
        {
          title: "उच्च-मूल्य विनिर्माण में अनुपस्थिति",
          text: "उपभोक्ता वस्तुओं (ऊर्जा, इलेक्ट्रॉनिक्स, परिवहन) के बड़े पैमाने पर उत्पादन में सीधी भागीदारी न होने से वास्तविक आर्थिक स्वतंत्रता रुक जाती है।",
        },
      ]
    : [
        {
          title: "Lack of Revenue from Religious Trusts",
          text: "Massive institutional revenues generated through religious trusts lack direct participatory channels for the broader socioeconomic public.",
        },
        {
          title: "Limited Policy Representation",
          text: "Without widespread participation in administrative governance, benefits from tax revenues rarely cascade fully to grassroots creators.",
        },
        {
          title: "Absence of a Dedicated Financial Institution",
          text: "Vast profits generated in banking remain concentrated; community members lack an autonomous economic network of their own.",
        },
        {
          title: "Zero Stake in Mainstream Media",
          text: "Billions generated daily in print and broadcasting advertising offer zero equity participation for grassroots workers.",
        },
        {
          title: "Absence in High-Value Manufacturing",
          text: "Lack of direct involvement in large-scale production of consumer goods (energy, electronics, mobility) stunts genuine financial independence.",
        },
      ];

  const STATS = hi
    ? [
        { n: "08", l: "ज़ोन" },
        { n: "36", l: "राज्य / केंद्रशासित प्रदेश" },
        { n: "171", l: "मंडल" },
        { n: "707", l: "जिले" },
        { n: "5,410", l: "तहसीलें" },
        { n: "6,612", l: "विकास खंड" },
      ]
    : [
        { n: "08", l: "Zones" },
        { n: "36", l: "States / Union Territories" },
        { n: "171", l: "Divisions" },
        { n: "707", l: "Districts" },
        { n: "5,410", l: "Tehsils" },
        { n: "6,612", l: "Development Blocks" },
      ];

  const TABLE_HEAD = hi
    ? ["स्तर", "प्रतिनिधि", "योगदान इकाई", "निवेश पर रिटर्न"]
    : ["Level", "Representatives", "Contribution Unit", "Return on Investment"];

  const PARTICIPATION_LEVELS = hi
    ? [
        { level: "राज्य स्तर", people: "36 राज्यों में 36 प्रतिनिधि", contribution: "₹1 लाख की इकाइयों में 100 व्यक्तियों की भागीदारी", returnRate: "5 वर्ष: 250% (50% वार्षिक) + छठे वर्ष में 200% अतिरिक्त" },
        { level: "मंडल स्तर", people: "171 मंडलों में 171 प्रतिनिधि", contribution: "₹2 लाख की इकाइयों में 250 व्यक्तियों की भागीदारी", returnRate: "40% वार्षिक रिटर्न, 6 वर्ष बाद मूलधन का 200%" },
        { level: "जिला स्तर", people: "707 जिलों में 707 प्रतिनिधि", contribution: "₹1 लाख की इकाइयों में 200 व्यक्तियों की भागीदारी", returnRate: "30% वार्षिक लाभ + 6 वर्ष बाद मूलधन वापसी" },
        { level: "तहसील स्तर", people: "5,410 तहसीलों में 5,410 प्रतिनिधि", contribution: "₹1 लाख की इकाइयों में 100 व्यक्तियों की भागीदारी", returnRate: "25% वार्षिक लाभ, 6 वर्ष बाद मूलधन + 25%" },
        { level: "ब्लॉक स्तर", people: "6,612 ब्लॉकों में 6,612 प्रतिनिधि", contribution: "₹1 लाख की इकाइयों में 50 व्यक्तियों की भागीदारी", returnRate: "20% वार्षिक लाभ, 6 वर्ष बाद मूलधन + 20%" },
      ]
    : [
        { level: "State Level", people: "36 Representatives in 36 States", contribution: "Participation of 100 individuals in ₹1 Lakh units", returnRate: "5 Yrs: 250% (50% annually) + 200% extra at 6th yr" },
        { level: "Divisional Level", people: "171 Representatives in 171 Divisions", contribution: "Participation of 250 individuals in ₹2 Lakh units", returnRate: "40% annual return, 200% principal value after 6 yrs" },
        { level: "District Level", people: "707 Representatives in 707 Districts", contribution: "Participation of 200 individuals in ₹1 Lakh units", returnRate: "30% annual gain + principal returned after 6 yrs" },
        { level: "Tehsil Level", people: "5,410 Representatives in 5,410 Tehsils", contribution: "Participation of 100 individuals in ₹1 Lakh units", returnRate: "25% annual gain, principal + 25% after 6 yrs" },
        { level: "Block Level", people: "6,612 Representatives in 6,612 Blocks", contribution: "Participation of 50 individuals in ₹1 Lakh units", returnRate: "20% annual gain, principal + 20% after 6 yrs" },
      ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {t.bank.badge}
          </p>
          <h1
            className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: NAVY }}
          >
            {t.bank.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
            {t.bank.desc}
          </p>
        </div>
      </section>

      {/* ================= 5 CHALLENGES ================= */}
      <section className={`${container} pt-10 sm:pt-12`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {t.bank.analysisTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-[11px] leading-relaxed text-slate-600 sm:text-xs">
          {t.bank.analysisSub}
        </p>

        <div className="mt-6 space-y-5">
          {REASONS.map((r) => (
            <div key={r.title}>
              <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
                {r.title}
              </h3>
              <p className="mt-1.5 max-w-4xl text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8 ZONAL COMMANDS ================= */}
      <section className={`${container} pb-12 pt-12 sm:pb-14 sm:pt-14`}>
        <h2 className="text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
          {hi ? "8 प्रमुख क्षेत्रीय मुख्यालय (ज़ोनल कमांड)" : "8 Key Regional Headquarters (Zonal Commands)"}
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 md:grid-cols-4">
          {ZONES.map((z) => (
            <div
              key={z.name}
              className="flex flex-col items-center justify-center gap-3 bg-white px-4 py-6"
            >
              <ZoneIcon name={z.icon} />
              <span className="text-[11px] font-bold sm:text-xs" style={{ color: NAVY }}>
                {z.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STRUCTURE AT A GLANCE ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} grid grid-cols-1 gap-6 py-8 md:grid-cols-[1fr_2fr] md:gap-10`}>
          <div>
            <p className="text-[9px] font-semibold" style={{ color: RUST }}>
              {t.bank.networkBadge}
            </p>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
              {t.bank.networkTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 bg-white p-5 sm:grid-cols-3 sm:p-6">
            {STATS.map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold leading-none sm:text-[28px]" style={{ color: RUST }}>
                  {s.n}
                </p>
                <p className="mt-2 text-[11px] font-semibold sm:text-xs" style={{ color: NAVY }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARTICIPATION TABLE ================= */}
      <section className={`${container} py-10 sm:py-12`}>
        <h2 className="text-2xl font-bold sm:text-[32px]" style={{ color: NAVY }}>
          {t.bank.chartTitle}
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="bg-[#F1F5F9]">
              <tr>
                {TABLE_HEAD.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[9px] font-semibold sm:text-[10px]"
                    style={{ color: RUST }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARTICIPATION_LEVELS.map((p) => (
                <tr key={p.level}>
                  <td className="px-4 py-6 text-left align-top text-xs text-slate-600 sm:text-[13px]">
                    {p.level}
                  </td>
                  <td className="px-4 py-6 text-left align-top text-xs text-slate-600 sm:text-[13px]">
                    {p.people}
                  </td>
                  <td className="max-w-[220px] px-4 py-6 text-left align-top text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                    {p.contribution}
                  </td>
                  <td className="max-w-[260px] px-4 py-6 text-left align-top text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                    {p.returnRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-600 sm:text-[13px]">
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

export default KarmbhoomiBank;