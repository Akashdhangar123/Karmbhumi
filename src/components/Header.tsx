import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  const NAV_ITEMS = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.bank, to: "/karmbhoomi-bank" },
    { label: t.nav.plans, to: "/investment-plans" },
    { label: t.nav.contact, to: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      {/* Top Corporate Ticker Bar */}
      <div className="bg-[#07182D] text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-white/10">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-2">


          <div className="flex items-center gap-4 text-gray-300"> 
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline">{t.nav.tickerNationwide}</span>
          </div>
        </div>
      </div>

      {/* Main Logo & Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        {/* Tricolor Accent Stripe matching Logo */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF6B00] via-[#FFD700] via-white to-[#138808]" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
          {/* Brand Logo with actual Logo Image */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white/50 overflow-hidden transition-transform group-hover:scale-105">
              <img
                src="/Karmbhumi.jpeg"
                alt="कर्मभूमि लोगो"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-lg sm:text-xl font-black tracking-tight text-[#0B2545]">
                  {t.nav.companyName}
                </p>
                <span className="hidden lg:inline-block rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#FF6B00] border border-orange-200">
                  PUBLIC LTD.
                </span>
              </div>
              <p className="text-xs font-semibold text-[#138808] tracking-wide">
                {t.nav.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:gap-2 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active
                      ? "text-[#0B2545] bg-blue-50 font-bold"
                      : "text-gray-700 hover:text-[#0B2545] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF6B00] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Change Language"
              className="ml-2 inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm transition-all"
            >
              <span>🌐</span>
              <span className={lang === "hi" ? "text-[#0B2545] font-black" : "text-gray-400"}>
                हिं
              </span>
              <span className="text-gray-300">/</span>
              <span className={lang === "en" ? "text-[#0B2545] font-black" : "text-gray-400"}>
                EN
              </span>
            </button>

            <Link
              to="/contact"
              className="ml-2 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#103565] to-[#138808] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
            >
              <span>{t.nav.join}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleLang}
              className="rounded-xl border border-gray-300 bg-gray-100 px-2.5 py-1.5 text-xs font-bold text-gray-800 flex items-center gap-1"
            >
              <span>🌐</span>
              <span>{lang === "hi" ? "EN" : "हिं"}</span>
            </button>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b border-gray-200 bg-white px-5 py-4 shadow-xl md:hidden animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#0B2545] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="text-xs bg-[#FF9933] px-2 py-0.5 rounded text-white font-bold">✓</span>}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#138808] px-4 py-3 text-sm font-bold text-white shadow-md"
              >
                {t.nav.join}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;