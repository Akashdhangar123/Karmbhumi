import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { INDIAN_STATES, STATE_DISTRICTS } from "../data/indiaStatesDistricts";

// Free, public, no-key-required India Post Pincode API.
// Returns real Post Office / Block / District / State data for a given 6-digit PIN code.
// Docs: https://www.postalpincode.in/Api-Details
const PINCODE_API = "https://api.postalpincode.in/pincode/";

interface PostOfficeResult {
  Name: string;
  Block: string;
  District: string;
  State: string;
}

type PinStatus = "idle" | "loading" | "success" | "error";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [manualMode, setManualMode] = useState(false); // fallback if API/internet unavailable
  const [pinStatus, setPinStatus] = useState<PinStatus>("idle");
  const [postOffices, setPostOffices] = useState<PostOfficeResult[]>([]);

  const [form, setForm] = useState({
    name: "",
    parentName: "",
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
  });

  const { t, lang } = useLanguage();

  const L = lang === "hi"
    ? {
        formTitle: "संपर्क फॉर्म",
        formDesc: "कृपया अपनी सभी जानकारी सही-सही भरें।",
        name: "नाम",
        parentName: "पिता का नाम / माता का नाम",
        address: "पता",
        village: "गाँव",
        pincode: "पिन कोड",
        pincodeHelp: "6 अंकों का पिन कोड डालें — राज्य, जिला व ब्लॉक अपने आप भर जाएंगे",
        pincodeLoading: "जानकारी खोजी जा रही है...",
        pincodeError: "यह पिन कोड नहीं मिला, कृपया दोबारा जाँचें या मैन्युअल तरीका इस्तेमाल करें",
        postOffice: "पोस्ट ऑफिस चुनें",
        selectPostOffice: "पोस्ट ऑफिस चुनें",
        state: "राज्य",
        district: "जिला",
        block: "ब्लॉक",
        selectState: "राज्य चुनें",
        selectDistrict: "पहले राज्य चुनें",
        selectDistrictReady: "जिला चुनें",
        blockPlaceholderLocked: "पहले जिला चुनें",
        blockPlaceholderReady: "अपना ब्लॉक/तहसील लिखें",
        education: "शिक्षा",
        occupation: "व्यवसाय",
        phone: "संपर्क नंबर",
        email: "ईमेल आईडी",
        submit: "फॉर्म जमा करें",
        manualToggleOn: "पिन कोड से जानकारी नहीं मिल रही? यहाँ से मैन्युअल भरें",
        manualToggleOff: "पिन कोड से अपने आप जानकारी भरें",
      }
    : {
        formTitle: "Contact Form",
        formDesc: "Please fill in all your details accurately.",
        name: "Full Name",
        parentName: "Father's Name / Mother's Name",
        address: "Address",
        village: "Village",
        pincode: "PIN Code",
        pincodeHelp: "Enter 6-digit PIN code — State, District & Block fill in automatically",
        pincodeLoading: "Looking up details...",
        pincodeError: "PIN code not found. Please check, or use manual entry.",
        postOffice: "Select Post Office",
        selectPostOffice: "Select Post Office",
        state: "State",
        district: "District",
        block: "Block",
        selectState: "Select State",
        selectDistrict: "Select state first",
        selectDistrictReady: "Select District",
        blockPlaceholderLocked: "Select district first",
        blockPlaceholderReady: "Enter your Block / Tehsil",
        education: "Education",
        occupation: "Occupation",
        phone: "Contact No.",
        email: "Email ID",
        submit: "Submit Form",
        manualToggleOn: "Can't find your PIN code? Fill address manually",
        manualToggleOff: "Auto-fill address using PIN code instead",
      };

  const DOCS = lang === "hi" ? [
    "शैक्षिक योग्यता प्रमाण पत्र",
    "आधार कार्ड की छायाप्रति",
    "बैंक पासबुक / एकाउंट की फोटो कॉपी",
    "2 पासपोर्ट साइज़ नवीनतम फोटो",
    "₹250 पंजीयन शुल्क (अप्रतिदेय)",
  ] : [
    "Educational Qualification Certificates",
    "Photocopy of Aadhaar Card",
    "Bank Account / Passbook Photocopy",
    "2 Recent Passport Size Photographs",
    "₹250 Registration Fee (Non-Refundable)",
  ];

  // Manual-mode district options (depends on manually selected state)
  const districtOptions = useMemo(
    () => (form.state ? STATE_DISTRICTS[form.state] || [] : []),
    [form.state]
  );

  const resetLocationFields = () =>
    setForm((f) => ({
      ...f,
      postOffice: "",
      block: "",
      district: "",
      state: "",
    }));

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

      // Auto-select if only one post office matches this PIN code
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    // Manual-mode cascading
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0B2545] focus:ring-2 focus:ring-[#0B2545]/15 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

  const Field: React.FC<{
    label: string;
    name: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
  }> = ({ label, name, required, type = "text", placeholder, disabled, value }) => (
    <div>
      <label className="text-xs font-bold text-gray-700 block mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        value={value !== undefined ? value : (form as any)[name]}
        onChange={handleChange}
        className={inputClass}
      />
    </div>
  );

  const resetForm = () => {
    setSubmitted(false);
    setPinStatus("idle");
    setPostOffices([]);
    setForm({
      name: "",
      parentName: "",
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
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased">
      <Header />

      <section className="bg-[#0B2545] text-white py-16 text-center border-b-4 border-[#FF9933]">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-3">
            {t.contact.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.contact.desc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT SIDE — Logo & Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white/50  overflow-hidden">
                <img
                  src="/Karmbhumi.jpeg"
                  alt="कर्मभूमि लोगो"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-black text-[#0B2545]">
                {t.nav.companyName}
              </h3>
              <p className="text-xs font-semibold text-[#138808]">
                {t.nav.tagline}
              </p>

              <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-sm text-left">
                <div>
                  <span className="text-xs font-bold text-gray-400 block">
                    {t.contact.officeBadge}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    {t.footer.officeAddress}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block">{t.footer.cinLabel}</span>
                  <span className="font-mono font-bold text-gray-800">U70102UP2012PLC053219</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block">{lang === "hi" ? "आधिकारिक वेबसाइट" : "Official Website"}</span>
                  <span className="text-[#0B2545] font-semibold">www.karmbhumiindia.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
                {t.contact.checklistBadge}
              </span>
              <h4 className="mt-1 text-base font-bold text-gray-900">
                {t.contact.checklistTitle}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-700">
                {DOCS.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-[#138808]">
                      ✓
                    </span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE — Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-lg">
              <h3 className="text-xl font-black text-[#0B2545]">
                {L.formTitle}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                {L.formDesc}
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#138808] text-white text-2xl font-bold mb-4">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-[#138808]">{t.contact.successTitle}</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-6 rounded-xl bg-[#0B2545] px-6 py-2.5 text-xs font-bold text-white"
                  >
                    {t.contact.btnNewMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Field label={L.name} name="name" required placeholder="e.g. Rahul Verma" />
                  <Field label={L.parentName} name="parentName" required placeholder="e.g. Suresh Verma / Sunita Devi" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={L.village} name="village" required />
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {L.address} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={form.address}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Toggle between PIN-code auto-fill and manual entry */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setManualMode((m) => !m);
                        resetLocationFields();
                        setForm((f) => ({ ...f, pincode: "" }));
                        setPinStatus("idle");
                        setPostOffices([]);
                      }}
                      className="text-xs font-bold text-[#0B2545] underline underline-offset-2 hover:text-[#138808]"
                    >
                      {manualMode ? L.manualToggleOff : L.manualToggleOn}
                    </button>
                  </div>

                  {!manualMode ? (
                    <>
                      {/* PIN-code driven auto-fill (India Post Pincode API — free, public) */}
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          {L.pincode} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          name="pincode"
                          required
                          maxLength={6}
                          placeholder="e.g. 282001"
                          value={form.pincode}
                          onChange={handleChange}
                          className={inputClass}
                        />
                        <p className="mt-1 text-[11px] text-gray-400">{L.pincodeHelp}</p>
                        {pinStatus === "loading" && (
                          <p className="mt-1 text-[11px] font-semibold text-[#0B2545]">{L.pincodeLoading}</p>
                        )}
                        {pinStatus === "error" && (
                          <p className="mt-1 text-[11px] font-semibold text-red-500">{L.pincodeError}</p>
                        )}
                      </div>

                      {postOffices.length > 0 && (
                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            {L.postOffice} <span className="text-red-500">*</span>
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
                              <option key={po.Name} value={po.Name}>{po.Name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label={L.state} name="state" disabled value={form.state} />
                        <Field label={L.district} name="district" disabled value={form.district} />
                        <Field label={L.block} name="block" disabled value={form.block} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Manual fallback: static State -> District list, free-text Block */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            {L.state} <span className="text-red-500">*</span>
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
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            {L.district} <span className="text-red-500">*</span>
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
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            {L.block} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="block"
                            required
                            disabled={!form.district}
                            placeholder={form.district ? L.blockPlaceholderReady : L.blockPlaceholderLocked}
                            value={form.block}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={L.education} name="education" required />
                    <Field label={L.occupation} name="occupation" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={L.phone}
                      name="phone"
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                    />
                    <Field
                      label={L.email}
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.01] active:scale-95"
                  >
                    {L.submit}
                  </button>
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