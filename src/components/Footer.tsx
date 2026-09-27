import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";


const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#07182D] text-gray-300">
      {/* Tricolor Accent Stripe matching Logo */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF6B00] via-[#FFD700] via-white to-[#138808]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand & Logo Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white/50 overflow-hidden transition-transform group-hover:scale-105">
              <img
                src="/Karmbhumi.jpeg"
                alt="कर्मभूमि लोगो"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
              <div>
                <p className="text-lg font-black text-white tracking-wide">
                  {t.nav.companyName}
                </p>
                
                <p className="text-xs font-semibold text-[#FF6B00]">
                  {t.nav.tagline}
                </p>
              </div>
            </div>

            

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
              {t.footer.aboutText}
            </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 sm:pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-4">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: t.nav.home, to: "/" },
                { label: t.nav.about, to: "/about" },
                { label: t.nav.bank, to: "/karmbhoomi-bank" },
                { label: t.nav.plans, to: "/investment-plans" },
                { label: t.nav.contact, to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex transition-all items-center gap-1.5"
                  >
                    <span className="text-[#FF6B00]">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Objectives */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-4">
              {t.footer.objectiveTitle}
            </p>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs leading-relaxed text-gray-300">
                {t.footer.objectiveQuote}
              </p>
              <div className="mt-3 text-[11px] font-bold text-[#138808] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                <span>{t.footer.objectiveTag}</span>
              </div>
            </div>
          </div>

          {/* Registered Office */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-4">
              {t.footer.officeTitle}
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              {t.footer.officeAddress}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400">{t.footer.verifyText}</p>
              <a
                href="https://www.mca21.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
              >
                <span>{t.footer.verifyLink}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Rights Strip */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {t.nav.companyName}. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <span>•</span>
            <Link to="/investment-plans" className="hover:text-white transition-colors">{t.footer.transparency}</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">{t.footer.helpdesk}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;