import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

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

const InvestmentPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"rd" | "yearly" | "cheque">("rd");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased">
      <Header />

      <section className="bg-[#0B2545] text-white py-16 text-center border-b-4 border-[#FF9933]">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-3">
            {t.plans.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.plans.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.plans.desc}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2.5 shadow-xl border border-gray-200">
          {[
            { id: "rd", label: t.plans.tabRd },
            { id: "yearly", label: t.plans.tabYearly },
            { id: "cheque", label: t.plans.tabCheque },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#0B2545] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === "rd" && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[650px] text-center text-sm">
              <thead className="bg-[#0B2545] text-white">
                <tr>
                  <th className="px-4 py-3.5 font-bold">{t.plans.srNo}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.monthlyDeposit}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.plotSize} (sq.ft.)</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.totalDeposit5Yr}</th>
                  <th className="px-4 py-3.5 font-bold text-amber-300">{t.plans.refundable7Yr}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlyRD.map((r) => (
                  <tr key={r.sr} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{r.sr}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">₹{fmt(r.monthly)}</td>
                    <td className="px-4 py-3 text-gray-700">{r.plot} sq.ft.</td>
                    <td className="px-4 py-3 text-gray-700">₹{fmt(r.deposit5yr)}</td>
                    <td className="px-4 py-3 font-black text-[#138808]">₹{fmt(r.refund7yr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "yearly" && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[650px] text-center text-sm">
              <thead className="bg-[#0B2545] text-white">
                <tr>
                  <th className="px-4 py-3.5 font-bold">{t.plans.yearlyDeposit}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.totalDeposit5Yr}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.plotSize}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.valAfter6Yr}</th>
                  <th className="px-4 py-3.5 font-bold text-amber-300">{t.plans.valAfter11Yr}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yearlyRD.map((r) => (
                  <tr key={r.yearly} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900">₹{fmt(r.yearly)}</td>
                    <td className="px-4 py-3 text-gray-700">₹{fmt(r.deposit5yr)}</td>
                    <td className="px-4 py-3 text-gray-700">{r.plot} sq.ft.</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">₹{fmt(r.after6yr)}</td>
                    <td className="px-4 py-3 font-black text-[#138808]">₹{fmt(r.after11yr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "cheque" && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[600px] text-center text-sm">
              <thead className="bg-[#0B2545] text-white">
                <tr>
                  <th className="px-4 py-3.5 font-bold">{t.plans.srNo}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.monthlyDeposit}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.rate}</th>
                  <th className="px-4 py-3.5 font-bold">{t.plans.grossAmount}</th>
                  <th className="px-4 py-3.5 font-bold text-amber-300">{t.plans.netBenefit}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chequePlan.map((r) => (
                  <tr key={r.sr} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{r.sr}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">₹{fmt(r.amount)}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">{r.rate}</td>
                    <td className="px-4 py-3 text-gray-800">₹{fmt(r.gross)}</td>
                    <td className="px-4 py-3 font-black text-[#138808]">+₹{fmt(r.benefit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default InvestmentPlans;