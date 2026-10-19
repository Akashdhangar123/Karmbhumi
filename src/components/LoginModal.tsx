import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CheckIcon = () => (
  <span
    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
    style={{ borderColor: RUST, color: RUST }}
  >
    <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const { login } = useAuth();
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Esc se band + background scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Band hone par form reset
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setShowPass(false);
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login(email.trim(), password);
      if (data.user.role === "super_admin") {
        onClose();
        navigate("/cpanel", { replace: true });
      } else {
        setError(
          hi
            ? "इस रोल का डैशबोर्ड अभी उपलब्ध नहीं है।"
            : "Dashboard for this role is not available yet."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : hi ? "लॉगिन विफल" : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  const points = hi
    ? [
        "सुरक्षित लॉगिन, आपका डेटा सुरक्षित",
        "आपका ईमेल केवल पहचान के लिए उपयोग होता है",
        "मदद चाहिए? हमारे संपर्क पेज पर जाएँ",
      ]
    : [
        "Secure login, your data stays protected",
        "Your email is used only for verification",
        "Need help? Visit our Contact & Onboarding Center",
      ];

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545]";

  return createPortal(
    // Backdrop: home page ke upar dim + blur, click karne par band
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      style={{ fontFamily: FONT }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Login"
    >
      {/* Center card */}
      <div
        className="relative my-auto grid w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT: sirf desktop pe */}
        <section className="hidden flex-col justify-center bg-[#F1F5F9] p-8 md:flex">
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {hi ? "सदस्य लॉगिन" : "Member login"}
          </p>

          <h1
            className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight"
            style={{ color: NAVY }}
          >
            {hi ? (
              <>
                कर्मभूमि में
                <br />
                आपका स्वागत है।
              </>
            ) : (
              <>
                Welcome back to
                <br />
                Karmbhumi.
              </>
            )}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {hi
              ? "अपना रजिस्टर्ड ईमेल और पासवर्ड दर्ज करें और अपने अकाउंट में साइन इन करें।"
              : "Enter your registered email and password to sign in to your account."}
          </p>

          <ul className="mt-6 space-y-3 rounded-lg bg-[#E4EBF3] p-5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-xs text-slate-700">
                <CheckIcon />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* RIGHT: form */}
        <section className="p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: RUST }}>
            {hi ? "सुरक्षित साइन इन" : "Secure sign in"}
          </p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ color: NAVY }}>
            {hi ? "लॉगिन" : "Login"}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {hi ? "जारी रखने के लिए अपने क्रेडेंशियल दर्ज करें।" : "Use your registered credentials to continue."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-[11px] font-bold text-slate-800">
                {hi ? "ईमेल" : "Email"} *
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-[11px] font-bold text-slate-800">
                {hi ? "पासवर्ड" : "Password"} *
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`${inputCls} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  {showPass ? (hi ? "छुपाएँ" : "Hide") : hi ? "दिखाएँ" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: RUST }}
            >
              <span>
                {submitting ? (hi ? "लॉगिन हो रहा है..." : "Logging in...") : hi ? "लॉगिन करें" : "Login"}
              </span>
              {!submitting && (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
            {hi ? "मदद चाहिए?" : "Need help?"}{" "}
            <Link to="/contact" onClick={onClose} className="font-bold" style={{ color: RUST }}>
              {hi ? "संपर्क करें" : "Contact us"}
            </Link>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;