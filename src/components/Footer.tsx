import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const FOOTER_BG = "#0A1F35";

const Footer: React.FC = () => {
  const { t, lang, toggleLang } = useLanguage();
  const hi = lang === "hi";

  const QUICK_LINKS = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.bank, to: "/karmbhoomi-bank" },
    { label: t.nav.plans, to: "/investment-plans" },
    { label: t.nav.contact, to: "/contact" },
  ];

  return (
    <footer
      className="w-full text-slate-300"
      style={{ backgroundColor: FOOTER_BG, fontFamily: FONT }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="h-22 w-22 shrink-0 overflow-hidden">
                <img
                  src="/img/newlogo.png"
                  alt="कर्मभूमि लोगो"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">
                  {hi ? "कर्मभूमि इंडिया लिमिटेड" : "Karmbhumi India Limited"}
                </p>
                <p className="mt-0.5 text-[10px] italic text-amber-400">
                  {hi ? "“जहाँ कर्म ही पूजा है...”" : "“Where Work is Worshipped...”"}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-[260px] text-[11px] leading-relaxed text-slate-300">
              {t.footer.aboutText}
            </p>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white hover:underline"
            >
              <span>{hi ? "संपर्क करें" : "Contact Us"}</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-[10px] font-semibold text-amber-400">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2.5 text-[11px]">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-200 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Objective */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-[10px] font-semibold text-amber-400">
              {t.footer.objectiveTitle}
            </p>
            <p className="max-w-[200px] text-[11px] leading-relaxed text-slate-200">
              {t.footer.objectiveQuote}
            </p>
            <p className="mt-3 text-[11px] text-slate-200">{t.footer.objectiveTag}</p>
          </div>

          {/* Registered Office */}
          <div className="lg:col-span-3">
            <p className="mb-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" strokeWidth={2} />
              </svg>
              {t.footer.officeTitle}
            </p>
            <p className="max-w-[220px] text-[11px] leading-relaxed text-slate-200">
              {t.footer.officeAddress}
            </p>
            <p className="mt-2 text-[9px] text-slate-400">
              CIN: U70102UP2012PLC053219
            </p>

            <p className="mt-3 text-[11px] text-slate-200">
              {hi ? "आधिकारिक सत्यापन:" : "Official Verification:"}
            </p>
            <a
              href="https://www.mca21.gov.in"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-[9px] text-slate-400 hover:text-white hover:underline"
            >
              {t.footer.verifyLink}
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-5 text-[10px] text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {t.nav.companyName}. {t.footer.rights}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Change Language"
              className="inline-flex items-center overflow-hidden rounded-full bg-white text-[9px] font-bold leading-none"
            >
              <span
                className={`px-2 py-1 ${hi ? "text-white" : "text-slate-500"}`}
                style={hi ? { backgroundColor: NAVY } : undefined}
              >
                EN
              </span>
              <span
                className={`px-2 py-1 ${!hi ? "text-white" : "text-slate-500"}`}
                style={!hi ? { backgroundColor: NAVY } : undefined}
              >
                हिं
              </span>
            </button>

            <Link to="/about" className="hover:text-white">{t.footer.privacy}</Link>
            <span>·</span>
            <Link to="/investment-plans" className="hover:text-white">{t.footer.transparency}</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-white">{t.footer.helpdesk}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;