import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { INDIAN_STATES, STATE_DISTRICTS } from "../data/indiaStatesDistricts";
import { submitContactForm } from "../api/contactApi";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

// Free, public, no-key-required India Post Pincode API
const PINCODE_API = "https://api.postalpincode.in/pincode/";

interface PostOfficeResult {
  Name: string;
  Block: string;
  District: string;
  State: string;
}

type PinStatus = "idle" | "loading" | "success" | "error";

const Arrow: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg className="h-3 w-3" fill="none" stroke={NAVY} strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const EMPTY_FORM = {
  name: "",
  fatherName: "",
  motherName: "",
  address: "",
  village: "",
  pincode: "",
  postOffice: "",
  block: "",
  district: "",
  state: "",
  education: "",
  occupation: "",
  phone: "",
  email: "",
  website: "", // honeypot
};

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [pinStatus, setPinStatus] = useState<PinStatus>("idle");
  const [postOffices, setPostOffices] = useState<PostOfficeResult[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  const L = hi
    ? {
        formTitle: "संपर्क फॉर्म",
        formDesc: "कृपया अपना पूरा विवरण सही-सही भरें।",
        secPersonal: "व्यक्तिगत विवरण",
        secAddress: "पता",
        secBackground: "पृष्ठभूमि",
        name: "पूरा नाम",
        parentName: "पिता / माता का नाम",
        address: "पूरा पता",
        village: "गाँव",
        pincode: "पिन कोड",
        pincodeHelp: "6 अंकों का पिन कोड दर्ज करें — राज्य, जिला और ब्लॉक अपने आप भर जाएँगे",
        pincodeLoading: "जानकारी खोजी जा रही है...",
        pincodeError: "यह पिन कोड नहीं मिला, कृपया दोबारा जाँचें या मैन्युअल तरीका इस्तेमाल करें",
        postOffice: "पोस्ट ऑफिस",
        selectPostOffice: "पोस्ट ऑफिस चुनें",
        state: "राज्य",
        district: "जिला",
        block: "ब्लॉक",
        autoFilled: "अपने आप भरेगा",
        selectState: "राज्य चुनें",
        selectDistrict: "पहले राज्य चुनें",
        selectDistrictReady: "जिला चुनें",
        blockPlaceholderLocked: "पहले जिला चुनें",
        blockPlaceholderReady: "ब्लॉक / तहसील लिखें",
        education: "शिक्षा",
        occupation: "व्यवसाय",
        phone: "संपर्क नंबर",
        email: "ईमेल आईडी",
        submit: "फॉर्म जमा करें",
        submitting: "जमा हो रहा है...",
        required: "* आवश्यक फ़ील्ड",
        manualToggleOn: "पिन कोड नहीं मिल रहा? यहां स्वयं भरें",
        manualToggleOff: "पिन कोड से अपने आप भरें",
        phName: "उदा. राहुल वर्मा",
        phParent: "उदा. सुरेश वर्मा",
        website: "आधिकारिक वेबसाइट",
      }
    : {
        formTitle: "Contact Form",
        formDesc: "Please fill in all your details accurately.",
        secPersonal: "Personal details",
        secAddress: "Address",
        secBackground: "Background",
        name: "Full Name",
        parentName: "Father's Name / Mother's Name",
        address: "Address",
        village: "Village",
        pincode: "PIN Code",
        pincodeHelp: "Enter 6-digit PIN code — State, District & Block fill in automatically",
        pincodeLoading: "Looking up details...",
        pincodeError: "PIN code not found. Please check, or use manual entry.",
        postOffice: "Post Office",
        selectPostOffice: "Select Post Office",
        state: "State",
        district: "District",
        block: "Block",
        autoFilled: "Auto-filled",
        selectState: "Select State",
        selectDistrict: "Select state first",
        selectDistrictReady: "Select District",
        blockPlaceholderLocked: "Select district first",
        blockPlaceholderReady: "Enter Block / Tehsil",
        education: "Education",
        occupation: "Occupation",
        phone: "Contact No.",
        email: "Email ID",
        submit: "Submit Form",
        submitting: "Submitting...",
        required: "* Required fields",
        manualToggleOn: "Can't find your PIN code? Fill address manually",
        manualToggleOff: "Auto-fill address using PIN code instead",
        phName: "e.g. Rahul Verma",
        phParent: "e.g. Suresh Verma",
        website: "Official Website",
      };

  const DOCS = hi
    ? [
        "शैक्षिक योग्यता प्रमाण पत्र",
        "आधार कार्ड की छायाप्रति",
        "बैंक पासबुक / एकाउंट की फोटो कॉपी",
        "2 पासपोर्ट साइज़ नवीनतम फोटो",
        "₹250 पंजीयन शुल्क (अप्रतिदेय)",
      ]
    : [
        "Educational Qualification Certificates",
        "Photocopy of Aadhaar Card",
        "Bank Account / Passbook Photocopy",
        "2 Recent Passport Size Photographs",
        "₹250 Registration Fee (Non-Refundable)",
      ];

  const districtOptions = useMemo(
    () => (form.state ? STATE_DISTRICTS[form.state] || [] : []),
    [form.state]
  );

  const resetLocationFields = () =>
    setForm((f) => ({ ...f, postOffice: "", block: "", district: "", state: "" }));

  const lookupPincode = async (pin: string) => {
    setPinStatus("loading");
    setPostOffices([]);
    try {
      const res = await fetch(`${PINCODE_API}${pin}`);
      const data = await res.json();
      const record = Array.isArray(data) ? data[0] : null;

      if (!record || record.Status !== "Success" || !record.PostOffice?.length) {
        setPinStatus("error");
        resetLocationFields();
        return;
      }

      const offices: PostOfficeResult[] = record.PostOffice.map((po: any) => ({
        Name: po.Name,
        Block: po.Block,
        District: po.District,
        State: po.State,
      }));

      setPostOffices(offices);
      setPinStatus("success");

      if (offices.length === 1) {
        const po = offices[0];
        setForm((f) => ({
          ...f,
          postOffice: po.Name,
          block: po.Block,
          district: po.District,
          state: po.State,
        }));
      } else {
        setForm((f) => ({ ...f, postOffice: "", block: "", district: "", state: "" }));
      }
    } catch {
      setPinStatus("error");
      resetLocationFields();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
      setForm((f) => ({ ...f, pincode: digitsOnly }));
      if (digitsOnly.length === 6) {
        lookupPincode(digitsOnly);
      } else {
        setPinStatus("idle");
        setPostOffices([]);
        resetLocationFields();
      }
      return;
    }

    if (name === "postOffice") {
      const po = postOffices.find((p) => p.Name === value);
      setForm((f) => ({
        ...f,
        postOffice: value,
        block: po?.Block || "",
        district: po?.District || "",
        state: po?.State || "",
      }));
      return;
    }

    if (name === "state") {
      setForm((f) => ({ ...f, state: value, district: "", block: "" }));
      return;
    }
    if (name === "district") {
      setForm((f) => ({ ...f, district: value, block: "" }));
      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Form submit nahi ho paya. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
    setPinStatus("idle");
    setPostOffices([]);
    setForm(EMPTY_FORM);
  };

  const inputClass =
    "w-full rounded border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545]/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";
  const labelClass = "mb-1 block text-[10px] font-bold";

  const Req = () => <span style={{ color: RUST }}> *</span>;

  const Section: React.FC<{
    num: number;
    title: string;
    action?: React.ReactNode;
  }> = ({ num, title, action }) => (
    <div className="flex items-center gap-2.5 pt-1">
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ backgroundColor: NAVY }}
      >
        {num}
      </span>
      <h4 className="shrink-0 text-xs font-bold" style={{ color: NAVY }}>
        {title}
      </h4>
      <span className="h-px flex-1 bg-slate-200" />
      {action}
    </div>
  );

  const renderField = (p: {
    label: string;
    name: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    inputMode?: "numeric";
    maxLength?: number;
  }) => (
    <div key={p.name} className="min-w-0">
      <label className={labelClass} style={{ color: NAVY }}>
        {p.label}
        {p.required && <Req />}
      </label>
      <input
        type={p.type || "text"}
        name={p.name}
        required={p.required}
        placeholder={p.placeholder}
        disabled={p.disabled}
        inputMode={p.inputMode}
        maxLength={p.maxLength}
        value={p.value !== undefined ? p.value : (form as any)[p.name]}
        onChange={handleChange}
        className={inputClass}
      />
    </div>
  );

  const manualToggle = (
    <button
      type="button"
      onClick={() => {
        setManualMode((m) => !m);
        resetLocationFields();
        setForm((f) => ({ ...f, pincode: "" }));
        setPinStatus("idle");
        setPostOffices([]);
      }}
      className="shrink-0 text-[10px] font-semibold hover:underline"
      style={{ color: RUST }}
    >
      {manualMode ? L.manualToggleOff : L.manualToggleOn}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-10 sm:py-12`}>
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            {t.contact.badge}
          </p>
          <h1
            className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: NAVY }}
          >
            {t.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
            {t.contact.desc}
          </p>
        </div>
      </section>

      {/* ================= OFFICE INFO + FORM ================= */}
      <section className="bg-[#F1F5F9]/60">
        <div className={`${container} py-8 sm:py-10`}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
            {/* ---------- LEFT ---------- */}
            <div className="max-w-md">
              <div className="flex items-center gap-1.5">
                <PinIcon />
                <p className="text-[10px] font-semibold" style={{ color: RUST }}>
                  {t.contact.officeBadge}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden ">
                  <img
                    src="/img/newlogo.png"
                    alt="कर्मभूमि लोगो"
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
                  {t.nav.companyName}
                </h2>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {t.footer.officeAddress}
              </p>
              <p className="mt-2 text-[10px] text-slate-500">
                {t.footer.cinLabel}: U70102UP2012PLC053219
              </p>

              <div className="mt-5 bg-[#E6EDF4] px-5 py-5">
                <h3 className="text-sm font-bold sm:text-[15px]" style={{ color: NAVY }}>
                  {t.contact.checklistTitle}
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  {DOCS.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-semibold" style={{ color: RUST }}>
                  {L.website}
                </p>
                <p className="mt-1 text-xs text-slate-600">www.karmbhumiindia.com</p>
              </div>
            </div>

            {/* ---------- RIGHT: form ---------- */}
            <div className="rounded border border-slate-100 bg-white p-5 shadow-[0_2px_14px_rgba(11,37,69,0.08)] sm:p-6">
              <h3 className="text-base font-bold sm:text-lg" style={{ color: NAVY }}>
                {L.formTitle}
              </h3>
              <p className="mt-1 text-[11px] text-slate-500">{L.formDesc}</p>

              {submitted ? (
                <div className="mt-6 bg-[#E6EDF4] p-6 text-center">
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white"
                    style={{ backgroundColor: RUST }}
                  >
                    ✓
                  </div>
                  <h4 className="text-base font-bold" style={{ color: NAVY }}>
                    {t.contact.successTitle}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600">{t.contact.successDesc}</p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-5 rounded-md px-5 py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: RUST }}
                  >
                    {t.contact.btnNewMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                  {/* Honeypot - bots fill this, humans don't */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      height: 0,
                      width: 0,
                    }}
                    aria-hidden="true"
                  />

                  {/* ---- 1. Personal details ---- */}
                  <Section num={1} title={L.secPersonal} />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {renderField({
                      label: L.name,
                      name: "name",
                      required: true,
                      placeholder: L.phName,
                    })}
                    {renderField({
                      label: L.parentName,
                      name: "fatherName",
                      required: true,
                      placeholder: L.phParent,
                    })}
                    {renderField({
                      label: L.phone,
                      name: "phone",
                      required: true,
                      type: "tel",
                      placeholder: "+91 98765 43210",
                    })}
                    {renderField({
                      label: L.email,
                      name: "email",
                      type: "email",
                      placeholder: "name@example.com",
                    })}
                  </div>

                  {/* ---- 2. Address ---- */}
                  <Section num={2} title={L.secAddress} action={manualToggle} />

                  {!manualMode ? (
                    <>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {renderField({
                          label: L.pincode,
                          name: "pincode",
                          required: true,
                          placeholder: "e.g. 282001",
                          inputMode: "numeric",
                          maxLength: 6,
                        })}
                        {renderField({
                          label: L.village,
                          name: "village",
                          required: true,
                        })}
                      </div>

                      <p className="-mt-1 text-[10px] text-slate-500">{L.pincodeHelp}</p>
                      {pinStatus === "loading" && (
                        <p className="text-[11px] font-semibold" style={{ color: NAVY }}>
                          {L.pincodeLoading}
                        </p>
                      )}
                      {pinStatus === "error" && (
                        <p className="text-[11px] font-semibold text-red-600">{L.pincodeError}</p>
                      )}

                      {postOffices.length > 1 && (
                        <div>
                          <label className={labelClass} style={{ color: NAVY }}>
                            {L.postOffice}
                            <Req />
                          </label>
                          <select
                            name="postOffice"
                            required
                            value={form.postOffice}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">{L.selectPostOffice}</option>
                            {postOffices.map((po) => (
                              <option key={po.Name} value={po.Name}>
                                {po.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {renderField({
                          label: L.state,
                          name: "state",
                          disabled: true,
                          placeholder: L.autoFilled,
                          value: form.state,
                        })}
                        {renderField({
                          label: L.district,
                          name: "district",
                          disabled: true,
                          placeholder: L.autoFilled,
                          value: form.district,
                        })}
                        {renderField({
                          label: L.block,
                          name: "block",
                          disabled: true,
                          placeholder: L.autoFilled,
                          value: form.block,
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {renderField({
                          label: L.village,
                          name: "village",
                          required: true,
                        })}
                        <div className="min-w-0">
                          <label className={labelClass} style={{ color: NAVY }}>
                            {L.state}
                            <Req />
                          </label>
                          <select
                            name="state"
                            required
                            value={form.state}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">{L.selectState}</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="min-w-0">
                          <label className={labelClass} style={{ color: NAVY }}>
                            {L.district}
                            <Req />
                          </label>
                          <select
                            name="district"
                            required
                            value={form.district}
                            onChange={handleChange}
                            disabled={!form.state}
                            className={inputClass}
                          >
                            <option value="">
                              {form.state ? L.selectDistrictReady : L.selectDistrict}
                            </option>
                            {districtOptions.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                        {renderField({
                          label: L.block,
                          name: "block",
                          required: true,
                          disabled: !form.district,
                          placeholder: form.district
                            ? L.blockPlaceholderReady
                            : L.blockPlaceholderLocked,
                        })}
                      </div>
                    </>
                  )}

                  {renderField({ label: L.address, name: "address", required: true })}

                  {/* ---- 3. Background ---- */}
                  <Section num={3} title={L.secBackground} />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {renderField({ label: L.education, name: "education", required: true })}
                    {renderField({ label: L.occupation, name: "occupation", required: true })}
                  </div>

                  {submitError && (
                    <p className="text-[11px] font-semibold text-red-600">{submitError}</p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="text-[10px] text-slate-500">{L.required}</span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: RUST }}
                    >
                      <span>{submitting ? L.submitting : L.submit}</span>
                      {!submitting && <Arrow />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;