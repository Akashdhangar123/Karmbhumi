import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

const CIN = "U70102UP2012PLC053219";
const COMPANY_SITE = "www.karmbhumiindialtd.com"; // flowchart image ke hisaab se
const VISIT_SITE = "www.karmbhumiindialtd.com"; // address image ke hisaab se

// Hero ke right side ki photo. public/img/ me rakho.
const HERO_IMAGE = "/img/founder-speech.jpg";

// Photos aane par yahan add karo (images public/img/about/ me rakho).
// Jab tak list khaali hai, gallery section nahi dikhega.
// Example: { src: "/img/about/office.jpg", hi: "कर्मभूमि कार्यालय", en: "Karmbhumi office" }
const COMPANY_IMAGES: { src: string; hi: string; en: string }[] = [];

const DownArrow: React.FC = () => (
  <div className="flex justify-center py-2.5" aria-hidden="true">
    <svg className="h-6 w-6" style={{ color: NAVY }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-6-6m6 6l6-6" />
    </svg>
  </div>
);

type Seg = { text: string; bold?: boolean };

const About: React.FC = () => {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const tx = (h: string, e: string) => (hi ? h : e);

  const [heroImgError, setHeroImgError] = useState(false);

  // Same container as Home / Header / Footer
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  // ---------- Hero intro paragraphs (company parichay ke neeche) ----------
  const INTRO_PARAS: Seg[][] = hi
    ? [
        [
          {
            text: "कर्मभूमि इण्डिया लिमिटेड मूलतः पब्लिक कंपनी है जिसका मुख्य कार्य रियल एस्टेट एवं इससे सम्बंधित अन्य सारे कार्य करना है।",
          },
        ],
        [
          {
            text: "जिसके माध्यम से कर्मभूमि इण्डिया लिमिटेड कम्पनी प्लानों के अन्तर्गत पब्लिक से फण्ड जुटाकर रियल एस्टेट जिसमें जमीन खरीदना, बेचना एवं जमीनों से सम्बन्धित अन्य सारे कार्य करके उसके द्वारा अर्जित लाभ से पब्लिक द्वारा जुटाए गये धन को लाभ के साथ वापस करना एवं कम्पनी का विकास करना है।",
          },
        ],
        [
          {
            text: "आज ही नहीं बीते हुए कल से ही कर्मभूमि इण्डिया लिमिटेड के संस्थापक का उद्देश्य था कि हमें आज नहीं तो कल भारत में एक आर्थिक संगठन बनाना है। आज डॉ. शिव करन कर्मयोद्धा लोगों का सहयोग प्राप्त करते हुए कर्मभूमि इण्डिया लिमिटेड के माध्यम से आर्थिक संगठन ",
          },
          { text: "(कर्मभूमि बैंक ऑफ इण्डिया)", bold: true },
          {
            text: " की स्थापना के लिए देश के 36 प्रान्तों, 707 जिलों, 5410 तहसीलों एवं 6612 विकास खण्डों सहित सम्पूर्ण भारत में संरचनात्मक एवं संगठनात्मक कार्य कर रहे हैं जिसका दूरगामी परिणाम देश की उन्नति, युवाओं की प्रगति एवं पीढ़ियों के लिए लाभकारी साबित होगा।",
          },
        ],
      ]
    : [
        [
          {
            text: "Karmbhumi India Limited is essentially a public company whose main work is real estate and all other related activities.",
          },
        ],
        [
          {
            text: "Through this, under its plans, Karmbhumi India Limited raises funds from the public and invests them in real estate, which includes buying and selling land and all other land-related work. The profit earned from this is used to return the money raised from the public along with returns, and to grow the company.",
          },
        ],
        [
          {
            text: "Not just today, but since yesterday, the founder of Karmbhumi India Limited has had one aim: that sooner or later we must build an economic organisation in India. Today, Dr. Shiv Karan Karmayoddha, with the support of the people, is carrying out structural and organisational work across the whole of India, including 36 states and union territories, 707 districts, 5410 tehsils and 6612 development blocks, for the establishment of an economic organisation ",
          },
          { text: "(Karmbhumi Bank of India)", bold: true },
          {
            text: " through Karmbhumi India Limited. Its far-reaching results will prove beneficial for the progress of the nation, the advancement of youth and for generations to come.",
          },
        ],
      ];

  // ---------- Image 2: company facts ----------
  const FACTS = hi
    ? [
        { label: "कम्पनी का नाम", value: "कर्मभूमि इण्डिया लिमिटेड" },
        { label: "संस्थापक", value: "डॉ. शिव करन कर्मयोद्धा" },
        { label: "स्थापना वर्ष", value: "18 जून 2006 (निगमन 22 अक्टूबर 2012)" },
        { label: "कम्पनी का प्रकार", value: "पब्लिक कम्पनी (अंशधारिता से निगमित)" },
        { label: "कार्यक्षेत्र", value: "सम्पूर्ण भारत (अनुसूचित राज्यों को छोड़कर)" },
        { label: "मुख्य व्यवसाय", value: "रियल एस्टेट, उत्पाद एवं सेवा उद्योग" },
        { label: "उद्देश्य", value: "कर्मभूमि बैंक ऑफ इण्डिया की स्थापना" },
        { label: "मुख्य उद्देश्य", value: "बेरोजगारी निर्मूलन, उत्पाद एवं सेवाओं के माध्यम से देश का विकास करना" },
        { label: "आग्रह", value: "सहभागिता से पूँजी निर्माण, सहकारिता से विस्तार करना" },
      ]
    : [
        { label: "Company Name", value: "Karmbhumi India Limited" },
        { label: "Founder", value: "Dr. Shiv Karan Karmayoddha" },
        { label: "Year of Establishment", value: "18 June 2006 (Incorporated 22 October 2012)" },
        { label: "Company Type", value: "Public Company (Incorporated by Shares)" },
        { label: "Area of Operation", value: "All India (excluding scheduled states)" },
        { label: "Main Business", value: "Real Estate, Products & Services Industry" },
        { label: "Objective", value: "Establishment of Karmbhumi Bank of India" },
        { label: "Main Objective", value: "Eradicating unemployment and developing the nation through products and services" },
        { label: "Aagrah (Motto)", value: "Capital creation through participation, expansion through cooperation" },
      ];

  const VISION_DESC = hi
    ? "अन्तर्राष्ट्रीय स्तर की एक विशाल प्रतिस्पर्धी वित्तीय समूह, जो विभिन्न सभाओं के लिए महत्त्वपूर्ण हो एवं भारत का गौरव हो।"
    : "A large, internationally competitive financial group that is significant for various forums and is a source of pride for India.";

  const MISSION_DESC = hi
    ? "आकांक्षाओं के अनुरूप पूँजी नियोजन, उत्पाद एवं सेवाओं के माध्यम से समुचित लाभ के साथ वित्तीय सुरक्षा प्रदान कर सभी के जीवन स्तर को निरापद रखना एवं उन्नति करना तथा आर्थिक विकास के लिए संसाधन सुनिश्चित कर देश का विकास करना।"
    : "To provide financial security with fair returns through capital planning aligned with aspirations, and through products and services; to keep the standard of living of all safe and to improve it; and to develop the nation by ensuring resources for economic growth.";

  // ---------- Image 1: govt base flowchart ----------
  const MINISTRIES = hi
    ? [
        { n: "रक्षा मंत्रालय", c: "(M.D.A.)", d: "थल, जल, वायु सेना इसके अन्तर्गत आती है।", hl: false },
        { n: "वित्त मंत्रालय", c: "(MFA)", d: "सभी वित्तीय संस्थान इसके अन्तर्गत आते हैं।", hl: true },
        { n: "गृह मंत्रालय", c: "(M.H.A.)", d: "सभी कर्मचारी इसके अन्तर्गत आते हैं।", hl: false },
      ]
    : [
        { n: "Ministry of Defence", c: "(M.D.A.)", d: "The Army, Navy and Air Force come under it.", hl: false },
        { n: "Ministry of Finance", c: "(MFA)", d: "All financial institutions come under it.", hl: true },
        { n: "Ministry of Home Affairs", c: "(M.H.A.)", d: "All employees come under it.", hl: false },
      ];

  const DEPTS = hi
    ? [
        { n: "RBI", d: "बैंकिंग, नॉन बैंकिंग सभी बैंकों की देख रेख की जाती है।", hl: false },
        { n: "SEBI", d: "समस्त शेयर एवं विदेशी व्यापार की देख रेख की जाती है।", hl: false },
        { n: "IRDA", d: "समस्त बीमा सेक्टर की देख-रेख की जाती है।", hl: false },
        {
          n: "MCA/21",
          d: "समस्त पोस्ट ऑफिस, प्राइमरी स्कूल, जच्चा बच्चा केन्द्र, सभी सरकारी यूनिवर्सिटी और रियल एस्टेट, जमीन एवं सभी औद्योगिक क्षेत्र से सम्बन्धित देख रेख की जाती है।",
          hl: true,
        },
      ]
    : [
        { n: "RBI", d: "Oversees banking and non-banking institutions, including all banks.", hl: false },
        { n: "SEBI", d: "Oversees all shares and foreign trade.", hl: false },
        { n: "IRDA", d: "Oversees the entire insurance sector.", hl: false },
        {
          n: "MCA/21",
          d: "Oversees all post offices, primary schools, mother-and-child centres, all government universities, and real estate, land and all industrial sectors.",
          hl: true,
        },
      ];

  const FAITH = hi ? ["सुन कर", "स्पर्श कर", "देखकर"] : ["By hearing", "By touching", "By seeing"];

  const GOVT_STEPS = [
    "www.mca21.gov.in",
    "SERVICES",
    "MASTER DATA",
    "L.L.P. NAME",
    "KARMBHUMI INDIA LIMITED",
    `CIN NO. ${CIN}`,
  ];

  // ---------- Address image ----------
  const ADDRESS_ROWS = [
    {
      label: tx("पंजीकृत कार्यालय", "Regd. Office"),
      value: tx(
        "सूर्या कॉम्प्लेक्स, सर्वेश्वरी नगर, नाका बाईपास, फैजाबाद (उ.प्र.), भारत",
        "Surya Complex, Sarveshwari Nagar, Naka Bypass, Faizabad, (U.P.), INDIA"
      ),
    },
    { label: tx("पंजीकरण सं.", "Regd. No."), value: CIN },
    { label: tx("पूछताछ करें", "Query us"), value: "www.mca21.gov.in", href: "https://www.mca21.gov.in" },
    { label: tx("हमारी वेबसाइट", "Visit us"), value: VISIT_SITE, href: `https://${VISIT_SITE}` },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LEFT: text */}
            <div>
              <p className="text-[11px] font-semibold" style={{ color: RUST }}>
                {t.about.heroTag}
              </p>
              <h1
                className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
                style={{ color: NAVY }}
              >
                {t.about.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {t.about.heroDesc}
              </p>

              {/* Company parichay ke neeche naya content */}
              <div className="mt-5 max-w-xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                {INTRO_PARAS.map((para, pi) => (
                  <p key={pi}>
                    {para.map((seg, si) =>
                      seg.bold ? (
                        <strong key={si} className="font-bold" style={{ color: NAVY }}>
                          {seg.text}
                        </strong>
                      ) : (
                        <React.Fragment key={si}>{seg.text}</React.Fragment>
                      )
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT: image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200 shadow-xl">
              {!heroImgError ? (
                <img
                  src={HERO_IMAGE}
                  alt={tx("कर्मभूमि इण्डिया लिमिटेड", "Karmbhumi India Limited")}
                  onError={() => setHeroImgError(true)}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-center text-sm font-semibold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {tx("कम्पनी की फोटो यहाँ आएगी", "Company photo goes here")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY AT A GLANCE ================= */}
      <section className={`${container} pb-14 pt-14 sm:pb-16 sm:pt-16`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {tx("एक नज़र में कंपनी", "Company at a Glance")}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3.5">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-md bg-[#EEF2F6] px-4 py-4">
              <p className="text-[10px] font-medium text-slate-500">{f.label}</p>
              <p className="mt-1.5 text-sm font-semibold leading-snug" style={{ color: NAVY }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-10 sm:py-12`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-[9px] font-semibold" style={{ color: RUST }}>
                {tx("विज़न", "Vision")}
              </p>
              <h3 className="mt-2 text-base font-bold" style={{ color: NAVY }}>
                {tx("हमारा कल्पना दर्शन", "Our Vision")}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{VISION_DESC}</p>
            </div>

            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-[9px] font-semibold" style={{ color: RUST }}>
                {tx("मिशन", "Mission")}
              </p>
              <h3 className="mt-2 text-base font-bold" style={{ color: NAVY }}>
                {tx("हमारा लक्ष्य", "Our Mission")}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{MISSION_DESC}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GOVT BASE FLOWCHART ================= */}
      <section className={`${container} py-12 sm:py-14`}>
        <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
          {tx("कर्मभूमि इण्डिया लिमिटेड कंपनी का आधार", "The Foundation of Karmbhumi India Limited")}
        </h2>
        <p className="mt-1.5 text-xs font-bold tracking-widest" style={{ color: RUST }}>
          GOVT OF INDIA
        </p>

        <div className="mx-auto mt-6 max-w-5xl">
          <div className="flex justify-center">
            <span
              className="rounded-full border-2 px-5 py-1.5 text-xs font-bold sm:text-sm"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              {tx("भारत सरकार के प्रमुख अंग", "Major Organs of the Government of India")}
            </span>
          </div>
          <DownArrow />

          {/* Ministries */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {MINISTRIES.map((m) => (
              <div
                key={m.n}
                className="rounded-md border-2 bg-white p-4 text-center shadow-sm"
                style={{ borderColor: m.hl ? RUST : "#CBD5E1" }}
              >
                <h3 className="text-base font-bold" style={{ color: NAVY }}>
                  {m.n}
                </h3>
                <p className="text-[11px] font-bold" style={{ color: RUST }}>
                  {m.c}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">{m.d}</p>
              </div>
            ))}
          </div>
          <DownArrow />

          {/* Departments */}
          <p className="text-center text-sm font-bold" style={{ color: NAVY }}>
            {tx("इसके चार विभाग हैं", "It has four departments")}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DEPTS.map((d) => (
              <div
                key={d.n}
                className="rounded-md border-2 p-4 shadow-sm"
                style={{
                  borderColor: d.hl ? RUST : "#CBD5E1",
                  backgroundColor: d.hl ? "#FFF7F1" : "#FFFFFF",
                }}
              >
                <h3 className="text-center text-lg font-extrabold" style={{ color: d.hl ? RUST : NAVY }}>
                  {d.n}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">{d.d}</p>
              </div>
            ))}
          </div>
          <DownArrow />

          {/* Trust pillars */}
          <p className="text-center text-sm font-bold" style={{ color: NAVY }}>
            {tx("विश्वास के मुख्य आधार तीन हैं", "Trust rests on three main pillars")}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {FAITH.map((f, i) => (
              <div key={f} className="flex items-center justify-center gap-3 rounded-md bg-[#EEF2F6] px-4 py-3.5">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-bold" style={{ color: NAVY }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
          <DownArrow />

          {/* Verify us */}
          <p className="text-center text-base font-bold" style={{ color: RUST }}>
            {tx("आप हमें देख सकते हैं", "You can verify us")}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.3fr]">
            <div className="rounded-md border-2 bg-white p-4 shadow-sm" style={{ borderColor: NAVY }}>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: RUST }}>
                {tx("कम्पनी साइट", "Company Site")}
              </p>
              <p className="mt-2 break-all text-sm font-bold sm:text-base" style={{ color: NAVY }}>
                {COMPANY_SITE}
              </p>
            </div>

            <div className="rounded-md border-2 bg-white p-4 shadow-sm" style={{ borderColor: NAVY }}>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: RUST }}>
                {tx("सरकारी साइट", "Govt. Site")}
              </p>
              <ol className="mt-2 flex flex-col gap-1">
                {GOVT_STEPS.map((s, i) => (
                  <li key={s}>
                    <div
                      className="rounded bg-[#EEF2F6] px-3 py-2 text-xs font-bold sm:text-[13px]"
                      style={{ color: NAVY }}
                    >
                      <span className="break-all">{s}</span>
                    </div>
                    {i < GOVT_STEPS.length - 1 && (
                      <div className="flex justify-center py-0.5" aria-hidden="true">
                        <svg
                          className="h-3.5 w-3.5"
                          style={{ color: RUST }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m0 0l-5-5m5 5l5-5" />
                        </svg>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY GALLERY (photos aane par dikhega) ================= */}
      {COMPANY_IMAGES.length > 0 && (
        <section className="bg-[#F1F5F9]">
          <div className={`${container} py-12 sm:py-14`}>
            <h2 className="text-2xl font-bold sm:text-[28px]" style={{ color: NAVY }}>
              {tx("कम्पनी की झलक", "Company Gallery")}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMPANY_IMAGES.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-md bg-white shadow-sm">
                  <div className="aspect-[4/3] w-full bg-slate-100">
                    <img
                      src={img.src}
                      alt={hi ? img.hi : img.en}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-xs font-semibold sm:text-sm" style={{ color: NAVY }}>
                    {hi ? img.hi : img.en}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= COMPANY ADDRESS (end) ================= */}
      <section className="bg-[#F1F5F9]">
        <div className={`${container} py-12 sm:py-14`}>
          <h2 className="text-xl font-bold sm:text-2xl" style={{ color: RUST }}>
            {tx("कर्मभूमि इण्डिया लिमिटेड", "Karmbhumi India Limited")}
          </h2>

          <div className="mt-5 max-w-3xl space-y-3 rounded-md bg-white p-5 shadow-sm sm:p-6">
            {ADDRESS_ROWS.map((r) => (
              <div key={r.label} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[170px_1fr] sm:gap-4">
                <p className="text-xs font-bold sm:text-sm" style={{ color: NAVY }}>
                  {r.label}
                </p>
                <p className="break-words text-xs text-slate-700 sm:text-sm">
                  <span className="mr-2 hidden text-slate-400 sm:inline">:</span>
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: RUST }}
                    >
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;