import React, { useEffect, useMemo, useRef, useState } from "react";
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

// Pad (Post) list - order same as handwritten note. id backend/DB se match hona chahiye.
const POSTS: { id: string; en: string; hi: string }[] = [
  { id: "BOARD_OF_DIRECTOR", en: "Board of Director", hi: "बोर्ड ऑफ डायरेक्टर" },
  { id: "CEO", en: "CEO", hi: "CEO" },
  { id: "HRM", en: "HRM", hi: "HRM" },
  { id: "ZO", en: "ZO", hi: "ZO" },
  { id: "GCM", en: "GCM", hi: "GCM" },
  { id: "RM", en: "RM", hi: "RM" },
  { id: "DVM", en: "DVM", hi: "DVM" },
  { id: "DBM", en: "DBM", hi: "DBM" },
  { id: "SBM", en: "SBM", hi: "SBM" },
  { id: "BO", en: "BO", hi: "BO" },
  { id: "ADVISOR", en: "Advisor", hi: "सलाहकार (Advisor)" },
  { id: "MEMBER", en: "Member", hi: "सदस्य (Member)" },
];

// Shaikshik yogyata dropdown - order same as handwritten list (image).
// value DB me "education" column me save hoti hai (max 100 chars).
const EDUCATION_GROUPS: { en: string; hi: string; options: string[] }[] = [
  { en: "School", hi: "स्कूल", options: ["HSc", "Intermediate"] },
  {
    en: "Graduation",
    hi: "स्नातक",
    options: ["BA", "BSc", "B.Com", "BBA", "BCA", "B.Tech / BE"],
  },
  { en: "Post Graduation", hi: "स्नातकोत्तर", options: ["MA", "MSc", "MBA", "M.Tech"] },
  {
    en: "Professional",
    hi: "प्रोफेशनल",
    options: ["MBBS", "BDS", "BAMS", "LLB"],
  },
  { en: "Doctorate & Research", hi: "डॉक्टरेट एवं शोध", options: ["NET", "JRF", "PhD"] },
];

// "Other" select hone par user khud likhta hai
const EDU_OTHER = "__OTHER__";

// ---------- Compact custom dropdown (native select ka bada popup nahi aata) ----------
type DropdownGroup = { label: string; options: string[] };

const QualificationDropdown: React.FC<{
  value: string; // "" | option | EDU_OTHER
  groups: DropdownGroup[];
  placeholder: string;
  otherLabel: string;
  className: string; // inputClass se match karne ke liye
  onSelect: (v: string) => void;
}> = ({ value, groups, placeholder, otherLabel, className, onSelect }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Bahar click ya Esc par band
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (v: string) => {
    onSelect(v);
    setOpen(false);
  };

  const display = value === EDU_OTHER ? otherLabel : value;

  const optionCls = (active: boolean) =>
    `flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-[#E6EDF4] ${
      active ? "bg-[#E6EDF4] font-semibold" : "text-slate-800"
    }`;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className={display ? "text-slate-900" : "text-slate-400"}>{display || placeholder}</span>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-1 max-h-56 overflow-y-auto overscroll-contain rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          {groups.map((g) => (
            <div key={g.label}>
              <p className="sticky top-0 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {g.label}
              </p>
              {g.options.map((q) => (
                <button
                  key={q}
                  type="button"
                  role="option"
                  aria-selected={value === q}
                  onClick={() => pick(q)}
                  className={optionCls(value === q)}
                  style={{ color: value === q ? NAVY : undefined }}
                >
                  <span>{q}</span>
                  {value === q && <span style={{ color: RUST }}>✓</span>}
                </button>
              ))}
            </div>
          ))}
          <div className="mt-1 border-t border-slate-200">
            <button
              type="button"
              role="option"
              aria-selected={value === EDU_OTHER}
              onClick={() => pick(EDU_OTHER)}
              className={optionCls(value === EDU_OTHER)}
              style={{ color: value === EDU_OTHER ? NAVY : undefined }}
            >
              <span>{otherLabel}</span>
              {value === EDU_OTHER && <span style={{ color: RUST }}>✓</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface PostOfficeResult {
  Name: string;
  Block: string;
  District: string;
  State: string;
}

type PinStatus = "idle" | "loading" | "success" | "error";

const Arrow: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const EMPTY_FORM = {
  appliedPost: "",
  name: "",
  fatherName: "",
  dateOfBirth: "",
  aadhaarNumber: "",
  address: "",
  village: "",
  pincode: "",
  postOffice: "",
  block: "",
  district: "",
  state: "",
  education: "",
  occupation: "",
  previousCompanyName: "",
  experience: "",
  phone: "",
  email: "",
  website: "", // honeypot
};

// Aaj ki date (YYYY-MM-DD) - janm tithi ki max limit ke liye
const todayISO = () => new Date().toISOString().slice(0, 10);

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [pinStatus, setPinStatus] = useState<PinStatus>("idle");
  const [postOffices, setPostOffices] = useState<PostOfficeResult[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  // dropdown ka choice: "" | option | EDU_OTHER (form.education me final value rehti hai)
  const [eduChoice, setEduChoice] = useState("");

  const { lang } = useLanguage();
  const hi = lang === "hi";

  const L = hi
    ? {
        formTitle: "ऑनलाइन पंजीकरण फॉर्म",
        formDesc: "सबसे पहले अपना पद चुनें, उसके बाद अपना पूरा विवरण सही-सही भरें।",
        secPost: "पद चयन",
        postHelp: "पहले वह पद चुनें जिसके लिए आप पंजीकरण करना चाहते हैं",
        selectedPost: "चयनित पद",
        changePost: "बदलें",
        postFirst: "कृपया पहले पद चुनें",
        secPersonal: "व्यक्तिगत विवरण",
        secAddress: "पता",
        secBackground: "शिक्षा एवं अनुभव",
        name: "नाम",
        parentName: "पिता का नाम",
        dob: "जन्म तिथि",
        aadhaar: "आधार नंबर",
        aadhaarHelp: "12 अंकों का आधार नंबर दर्ज करें",
        aadhaarError: "आधार नंबर 12 अंकों का होना चाहिए",
        phoneError: "सही 10 अंकों का मोबाइल नंबर दर्ज करें",
        dobError: "कृपया सही जन्म तिथि चुनें",
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
        education: "शैक्षिक योग्यता",
        selectEducation: "शैक्षिक योग्यता चुनें",
        eduOther: "अन्य (Other)",
        eduOtherLabel: "अपनी योग्यता लिखें",
        eduOtherPh: "अपनी योग्यता लिखें, जैसे ITI, Diploma",
        eduError: "कृपया शैक्षिक योग्यता चुनें",
        eduOtherError: "कृपया अपनी शैक्षिक योग्यता लिखें",
        occupation: "व्यवसाय",
        previousCompany: "पिछली कंपनी का नाम (यदि अभी कार्यरत हैं)",
        phPreviousCompany: "जहाँ पहले काम किया, उस कंपनी का नाम",
        experience: "अनुभव (वैकल्पिक)",
        phExperience: "अपना कार्य अनुभव संक्षेप में लिखें",
        phone: "मोबाइल नंबर",
        email: "ईमेल आईडी",
        submit: "पंजीकरण जमा करें",
        submitting: "जमा हो रहा है...",
        required: "* आवश्यक फ़ील्ड",
        manualToggleOn: "पिन कोड नहीं मिल रहा? यहां स्वयं भरें",
        manualToggleOff: "पिन कोड से अपने आप भरें",
        phName: "उदा. राहुल वर्मा",
        phParent: "उदा. सुरेश वर्मा",
        successTitle: "पंजीकरण सफल रहा",
        successDesc: "आपका पंजीकरण प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
        btnNew: "नया पंजीकरण करें",
      }
    : {
        formTitle: "Online Registration Form",
        formDesc: "First select your post, then fill in your complete details accurately.",
        secPost: "Select Post",
        postHelp: "First choose the post you want to register for",
        selectedPost: "Selected post",
        changePost: "Change",
        postFirst: "Please select a post first",
        secPersonal: "Personal details",
        secAddress: "Address",
        secBackground: "Education & experience",
        name: "Name",
        parentName: "Father's Name",
        dob: "Date of Birth",
        aadhaar: "Aadhaar Number",
        aadhaarHelp: "Enter your 12-digit Aadhaar number",
        aadhaarError: "Aadhaar number must be 12 digits",
        phoneError: "Enter a valid 10-digit mobile number",
        dobError: "Please select a valid date of birth",
        address: "Full Address",
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
        education: "Educational Qualification",
        selectEducation: "Select qualification",
        eduOther: "Other",
        eduOtherLabel: "Enter your qualification",
        eduOtherPh: "Type your qualification, e.g. ITI, Diploma",
        eduError: "Please select your educational qualification",
        eduOtherError: "Please enter your educational qualification",
        occupation: "Occupation",
        previousCompany: "Previous Company Name (if currently working)",
        phPreviousCompany: "Name of the company you worked at before",
        experience: "Experience (optional)",
        phExperience: "Briefly describe your work experience",
        phone: "Mobile No.",
        email: "Email ID",
        submit: "Submit Registration",
        submitting: "Submitting...",
        required: "* Required fields",
        manualToggleOn: "Can't find your PIN code? Fill address manually",
        manualToggleOff: "Auto-fill address using PIN code instead",
        phName: "e.g. Rahul Verma",
        phParent: "e.g. Suresh Verma",
        successTitle: "Registration successful",
        successDesc: "Your registration has been received. Our team will contact you soon.",
        btnNew: "Register another person",
      };

  const selectedPost = POSTS.find((p) => p.id === form.appliedPost) || null;

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

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, phone: digitsOnly }));
      return;
    }

    if (name === "aadhaarNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 12);
      setForm((f) => ({ ...f, aadhaarNumber: digitsOnly }));
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

    if (!form.appliedPost) {
      setSubmitError(L.postFirst);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setSubmitError(L.phoneError);
      return;
    }
    if (!/^\d{12}$/.test(form.aadhaarNumber)) {
      setSubmitError(L.aadhaarError);
      return;
    }
    // Custom dropdown me native "required" nahi hota, isliye yaha check
    if (!form.education.trim()) {
      setSubmitError(eduChoice === EDU_OTHER ? L.eduOtherError : L.eduError);
      return;
    }
    if (!form.dateOfBirth || form.dateOfBirth > todayISO() || form.dateOfBirth < "1900-01-01") {
      setSubmitError(L.dobError);
      return;
    }

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
    setManualMode(false);
    setEduChoice("");
    setForm(EMPTY_FORM);
  };

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 sm:text-base";
  const labelClass = "mb-1.5 block text-sm font-semibold";

  const Req = () => <span style={{ color: RUST }}> *</span>;

  const Section: React.FC<{
    num: number;
    title: string;
    action?: React.ReactNode;
  }> = ({ num, title, action }) => (
    <div className="flex flex-wrap items-center gap-3 pt-3">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: NAVY }}
      >
        {num}
      </span>
      <h4 className="shrink-0 text-base font-bold sm:text-lg" style={{ color: NAVY }}>
        {title}
      </h4>
      <span className="hidden h-px flex-1 bg-slate-200 sm:block" />
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
    max?: string;
    min?: string;
    textarea?: boolean;
  }) => (
    <div key={p.name} className="min-w-0">
      <label className={labelClass} style={{ color: NAVY }}>
        {p.label}
        {p.required && <Req />}
      </label>
      {p.textarea ? (
        <textarea
          name={p.name}
          required={p.required}
          placeholder={p.placeholder}
          maxLength={p.maxLength}
          rows={4}
          value={p.value !== undefined ? p.value : (form as any)[p.name]}
          onChange={handleChange}
          className={inputClass}
        />
      ) : (
        <input
          type={p.type || "text"}
          name={p.name}
          required={p.required}
          placeholder={p.placeholder}
          disabled={p.disabled}
          inputMode={p.inputMode}
          maxLength={p.maxLength}
          max={p.max}
          min={p.min}
          value={p.value !== undefined ? p.value : (form as any)[p.name]}
          onChange={handleChange}
          className={inputClass}
        />
      )}
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
      className="shrink-0 text-xs font-semibold hover:underline sm:text-sm"
      style={{ color: RUST }}
    >
      {manualMode ? L.manualToggleOff : L.manualToggleOn}
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= ONLINE REGISTRATION FORM ONLY ================= */}
      <section className="min-h-[50vh] bg-[#F1F5F9]/60">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8 sm:py-16">
          <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(11,37,69,0.10)] sm:p-10">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: NAVY }}>
              {L.formTitle}
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">{L.formDesc}</p>

            {submitted ? (
              <div className="mt-8 rounded-md bg-[#E6EDF4] p-8 text-center sm:p-12">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold text-white"
                  style={{ backgroundColor: RUST }}
                >
                  ✓
                </div>
                <h4 className="text-xl font-bold sm:text-2xl" style={{ color: NAVY }}>
                  {L.successTitle}
                </h4>
                <p className="mt-3 text-sm text-slate-600 sm:text-base">{L.successDesc}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 rounded-md px-7 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 sm:text-base"
                  style={{ backgroundColor: RUST }}
                >
                  {L.btnNew}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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

                {/* ---- 1. Select post ---- */}
                <Section num={1} title={L.secPost} />

                {!selectedPost ? (
                  <>
                    <p className="text-xs text-slate-600 sm:text-sm">{L.postHelp}</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {POSTS.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSubmitError(null);
                            setForm((f) => ({ ...f, appliedPost: p.id }));
                          }}
                          className="flex items-center gap-3 rounded-md border border-slate-300 bg-white px-4 py-4 text-left text-sm font-semibold transition hover:border-[#0B2545] hover:bg-slate-50 sm:text-base"
                          style={{ color: NAVY }}
                        >
                          <span className="w-5 shrink-0 text-xs font-bold text-slate-400 sm:text-sm">
                            {idx + 1}
                          </span>
                          <span>{hi ? p.hi : p.en}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-md bg-[#E6EDF4] px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                        {L.selectedPost}
                      </p>
                      <p className="text-base font-bold sm:text-lg" style={{ color: NAVY }}>
                        {hi ? selectedPost.hi : selectedPost.en}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, appliedPost: "" }))}
                      className="text-sm font-semibold hover:underline sm:text-base"
                      style={{ color: RUST }}
                    >
                      {L.changePost}
                    </button>
                  </div>
                )}

                {/* Baaki form tabhi dikhega jab post select ho jaye */}
                {selectedPost && (
                  <>
                    {/* ---- 2. Personal details ---- */}
                    <Section num={2} title={L.secPersonal} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        label: L.dob,
                        name: "dateOfBirth",
                        required: true,
                        type: "date",
                        max: todayISO(),
                        min: "1900-01-01",
                      })}
                      <div className="min-w-0">
                        {renderField({
                          label: L.aadhaar,
                          name: "aadhaarNumber",
                          required: true,
                          type: "tel",
                          inputMode: "numeric",
                          maxLength: 12,
                          placeholder: "1234 5678 9012",
                        })}
                        <p className="mt-1 text-xs text-slate-500">{L.aadhaarHelp}</p>
                      </div>
                      {renderField({
                        label: L.phone,
                        name: "phone",
                        required: true,
                        type: "tel",
                        inputMode: "numeric",
                        maxLength: 10,
                        placeholder: "98765 43210",
                      })}
                      {renderField({
                        label: L.email,
                        name: "email",
                        type: "email",
                        placeholder: "name@example.com",
                      })}
                    </div>

                    {/* ---- 3. Address ---- */}
                    <Section num={3} title={L.secAddress} action={manualToggle} />

                    {!manualMode ? (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                        <p className="-mt-2 text-xs text-slate-600 sm:text-sm">{L.pincodeHelp}</p>
                        {pinStatus === "loading" && (
                          <p className="text-sm font-semibold" style={{ color: NAVY }}>
                            {L.pincodeLoading}
                          </p>
                        )}
                        {pinStatus === "error" && (
                          <p className="text-sm font-semibold text-red-600">{L.pincodeError}</p>
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                    {/* ---- 4. Education & experience ---- */}
                    <Section num={4} title={L.secBackground} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label className={labelClass} style={{ color: NAVY }}>
                          {L.education}
                          <Req />
                        </label>
                        <QualificationDropdown
                          value={eduChoice}
                          groups={EDUCATION_GROUPS.map((g) => ({
                            label: hi ? g.hi : g.en,
                            options: g.options,
                          }))}
                          placeholder={L.selectEducation}
                          otherLabel={L.eduOther}
                          className={inputClass}
                          onSelect={(v) => {
                            setEduChoice(v);
                            // Other me user ka text, warna chuni hui value
                            setForm((f) => ({ ...f, education: v === EDU_OTHER ? "" : v }));
                          }}
                        />
                        {/* Other: usi column me, chhota aur neat input */}
                        {eduChoice === EDU_OTHER && (
                          <input
                            type="text"
                            name="education"
                            autoFocus
                            maxLength={100}
                            aria-label={L.eduOtherLabel}
                            placeholder={L.eduOtherPh}
                            value={form.education}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/20"
                          />
                        )}
                      </div>
                      {renderField({ label: L.occupation, name: "occupation", required: true })}
                    </div>
                    {renderField({
                      label: L.previousCompany,
                      name: "previousCompanyName",
                      maxLength: 150,
                      placeholder: L.phPreviousCompany,
                    })}
                    {renderField({
                      label: L.experience,
                      name: "experience",
                      textarea: true,
                      maxLength: 500,
                      placeholder: L.phExperience,
                    })}
                  </>
                )}

                {submitError && (
                  <p className="text-sm font-semibold text-red-600">{submitError}</p>
                )}

                <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-3 sm:flex-row sm:items-center">
                  <span className="text-xs text-slate-600 sm:text-sm">{L.required}</span>
                  <button
                    type="submit"
                    disabled={submitting || !selectedPost}
                    className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
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
      </section>

      <Footer />
    </div>
  );
};

export default Contact;