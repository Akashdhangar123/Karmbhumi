import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();
  const hi = lang === "hi";

  const NAV_ITEMS = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.plans, to: "/investment-plans" },
    { label: t.nav.bank, to: "/karmbhoomi-bank" },
    { label: t.nav.contact, to: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const LangPill = () => (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Change Language"
      className="inline-flex items-center overflow-hidden rounded-full bg-white text-[10px] font-bold leading-none"
    >
      <span
        className={`px-2 py-1 ${hi ? "text-white" : "text-slate-500"}`}
        style={hi ? { backgroundColor: NAVY } : undefined}
      >
        हिं
      </span>
      <span
        className={`px-2 py-1 ${!hi ? "text-white" : "text-slate-500"}`}
        style={!hi ? { backgroundColor: NAVY } : undefined}
      >
        EN
      </span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white" style={{ fontFamily: FONT }}>
      {/* Top bar */}
      <div className="text-white" style={{ backgroundColor: NAVY }}>
        <div className="mx-auto flex h-[26px] w-full max-w-[1440x] items-center justify-between px-5 sm:px-8">
          <span className="text-[11px] font-normal">
            {hi
              ? "कर्मभूमि इंडिया लिमिटेड · जहाँ कर्म ही पूजा है"
              : "Karmbhumi India Limited · Where work is worshiped"}
          </span>
          <LangPill />
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-white">
              <img
                src="/Karmbhumi.jpeg"
                alt="कर्मभूमि लोगो"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
                {hi ? "कर्मभूमि" : "Karmbhumi"}
              </p>
              <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-500">
                {hi ? "इंडिया लिमिटेड" : "India Limited"}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-[13px] font-medium transition-colors ${
                    active ? "" : "text-slate-700 hover:text-slate-900"
                  }`}
                  style={active ? { color: RUST } : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Join button */}
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-125 active:scale-95 md:inline-flex"
            style={{ backgroundColor: NAVY }}
          >
            <span>{t.nav.join}</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Navigation"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-slate-200 bg-white px-5 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-medium ${
                    active ? "bg-slate-100" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  style={active ? { color: RUST } : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: NAVY }}
            >
              {t.nav.join}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;