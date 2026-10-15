import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

const monthlyRD = [
  { sr: 1, monthly: 300, plot: 18, deposit5yr: 18000, refund7yr: 36000 },
  { sr: 2, monthly: 600, plot: 36, deposit5yr: 36000, refund7yr: 72000 },
  { sr: 3, monthly: 900, plot: 54, deposit5yr: 54000, refund7yr: 108000 },
  { sr: 4, monthly: 1000, plot: 60, deposit5yr: 60000, refund7yr: 120000 },
  { sr: 5, monthly: 1200, plot: 72, deposit5yr: 72000, refund7yr: 144000 },
  { sr: 6, monthly: 1500, plot: 90, deposit5yr: 90000, refund7yr: 180000 },
  { sr: 7, monthly: 2000, plot: 120, deposit5yr: 120000, refund7yr: 240000 },
  { sr: 8, monthly: 2500, plot: 150, deposit5yr: 150000, refund7yr: 300000 },
  { sr: 9, monthly: 3000, plot: 180, deposit5yr: 180000, refund7yr: 360000 },
  { sr: 10, monthly: 4000, plot: 240, deposit5yr: 240000, refund7yr: 480000 },
  { sr: 11, monthly: 5000, plot: 300, deposit5yr: 300000, refund7yr: 600000 },
  { sr: 12, monthly: 10000, plot: 600, deposit5yr: 600000, refund7yr: 1200000 },
];

const yearlyRD = [
  { yearly: 10000, deposit5yr: 50000, plot: 50, after6yr: 110000, after11yr: 220000 },
  { yearly: 20000, deposit5yr: 100000, plot: 100, after6yr: 220000, after11yr: 440000 },
  { yearly: 30000, deposit5yr: 150000, plot: 150, after6yr: 330000, after11yr: 660000 },
  { yearly: 50000, deposit5yr: 250000, plot: 250, after6yr: 550000, after11yr: 1100000 },
  { yearly: 100000, deposit5yr: 500000, plot: 500, after6yr: 1100000, after11yr: 2200000 },
];

const chequePlan = [
  { sr: 1, amount: 50000, gross: 60000, benefit: 10000, rate: "20% p.a." },
  { sr: 2, amount: 100000, gross: 125000, benefit: 25000, rate: "25% p.a." },
  { sr: 3, amount: 500000, gross: 650000, benefit: 150000, rate: "30% p.a." },
  { sr: 4, amount: 1000000, gross: 1350000, benefit: 350000, rate: "35% p.a." },
];

const fmt = (n: number) => n.toLocaleString("en-IN");

const Arrow: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

type TabId = "rd" | "yearly" | "cheque";

const InvestmentPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("rd");
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const sqft = hi ? "वर्ग फुट" : "sq.ft.";

  // Same container as Home / About / Header / Footer
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  const tabs: { id: TabId; label: string }[] = [
    { id: "rd", label: t.plans.tabRd },
    { id: "yearly", label: t.plans.tabYearly },
    { id: "cheque", label: t.plans.tabCheque },
  ];
  const activeLabel = tabs.find((x) => x.id === activeTab)?.label;

  // shared table classes (Figma look)
  const th = "px-4 py-3 text-left text-[9px] font-semibold sm:text-[10px]";
  const td = "px-4 py-5 text-left text-xs text-slate-600 sm:text-[13px]";

  let head: string[] = [];
  let rows: React.ReactNode[][] = [];

  if (activeTab === "rd") {
    head = [
      t.plans.srNo,
      t.plans.monthlyDeposit,
      `${t.plans.plotSize} (${sqft})`,
      t.plans.totalDeposit5Yr,
      t.plans.refundable7Yr,
    ];
    rows = monthlyRD.map((r) => [
      r.sr,
      `₹${fmt(r.monthly)}`,
      `${r.plot} ${sqft}`,
      `₹${fmt(r.deposit5yr)}`,
      `₹${fmt(r.refund7yr)}`,
    ]);
  } else if (activeTab === "yearly") {
    head = [
      t.plans.yearlyDeposit,
      t.plans.totalDeposit5Yr,
      t.plans.plotSize,
      t.plans.valAfter6Yr,
      t.plans.valAfter11Yr,
    ];
    rows = yearlyRD.map((r) => [
      `₹${fmt(r.yearly)}`,
      `₹${fmt(r.deposit5yr)}`,
      `${r.plot} ${sqft}`,
      `₹${fmt(r.after6yr)}`,
      `₹${fmt(r.after11yr)}`,
    ]);
  } else {
    head = [
      t.plans.srNo,
      t.plans.monthlyDeposit,
      t.plans.rate,
      t.plans.grossAmount,
      t.plans.netBenefit,
    ];
    rows = chequePlan.map((r) => [
      r.sr,
      `₹${fmt(r.amount)}`,
      r.rate,
      `₹${fmt(r.gross)}`,
      `+₹${fmt(r.benefit)}`,
    ]);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {t.plans.badge}
          </p>
          <h1
            className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: NAVY }}
          >
            {t.plans.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
            {t.plans.desc}
          </p>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className={`${container} py-10 sm:py-12`}>
        {/* tab links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`text-[10px] font-semibold transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                activeTab === tab.id ? "underline underline-offset-4 opacity-100" : "opacity-70"
              }`}
              style={{ color: RUST }}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* active plan title */}
        <h2 className="mt-4 text-2xl font-bold sm:text-[32px]" style={{ color: NAVY }}>
          {activeLabel}
        </h2>

        {/* table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse">
            <thead className="bg-[#F1F5F9]">
              <tr>
                {head.map((h, i) => (
                  <th key={i} className={th} style={{ color: RUST }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={td}>
                      {cell}
                    </td>
                  ))}
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

export default InvestmentPlans;