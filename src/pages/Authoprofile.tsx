import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const FONT = "'Manrope', 'Noto Sans Devanagari', 'Segoe UI', Arial, sans-serif";
const NAVY = "#0B2545";
const RUST = "#B84A12";

// 👇 apni images ke paths yahan change kar lena
const FOUNDER_IMG = "/img/dr.jpg";
const EVENT_IMG = "/img/founder-speech.jpg";

const Arrow: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const AuthorProfile: React.FC = () => {
  const { lang } = useLanguage();
  const hi = lang === "hi";

  // Same container as Home / About / Header / Footer
  const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

  const C = hi
    ? {
        heroTag: "संस्थापक",
        heroTitle: "सोच जो आगे बढ़ने की प्रेरणा दे।",
        heroMeta: "डॉ. शिव करन कर्मयोद्धा · संस्थापक, कर्मभूमि इंडिया लिमिटेड",
        founderAlt: "डॉ. शिव करन कर्मयोद्धा",
        msgTag: "संस्थापक का संदेश",
        msgQuote: "“व्यवस्था तो साधनाभाव में ठहर जाती है परन्तु विचारधारा कभी नहीं ठहरती।”",
        msgSub: "वह अवरोधों और मान्यताओं को पार करते हुए प्रत्येक दिशा में प्रवाहित होती रहती है।",
        ambTag: "महत्वाकांक्षा / ब्लॉग से",
        ambTitle: "लक्ष्य, श्रम और सत्यनिष्ठा।",
        ambDesc:
          "संस्थापक के लेख में महत्वाकांक्षा को केवल उपलब्धि नहीं, बल्कि कर्तव्य, विनम्रता और नैतिक सिद्धांतों के साथ आगे बढ़ने की प्रेरणा माना गया है। समाज के संगठन और देश के निर्माण में प्रत्येक व्यक्ति के प्रयास का महत्व है।",
        cards: [
          { t: "कर्तव्य", d: "अपने काम और ज़िम्मेदारी के प्रति सजग रहना।" },
          { t: "सत्यनिष्ठा", d: "नैतिक सिद्धांतों के साथ लक्ष्य की ओर बढ़ना।" },
          { t: "समता", d: "मानवीय सम्मान और समाज में समानता को महत्व देना।" },
        ],
        socTag: "सामाजिक सहभागिता",
        socLine1: "प्रतिभा का सम्मान।",
        socLine2: "अगली पीढ़ी को प्रोत्साहन।",
        socCaption: "प्रतिभा सम्मान कार्यक्रम में डॉ. शिव करन कर्मयोद्धा।",
        eventAlt: "प्रतिभा सम्मान कार्यक्रम",
        ctaTag: "आइए, बात करें",
        ctaTitle: "प्रगति की दिशा में, संवाद से शुरुआत।",
        ctaDesc: "संस्था, परियोजनाओं या अवसरों के बारे में जानकारी के लिए हमारी टीम से संपर्क करें।",
        ctaBtn: "हमसे संपर्क करें",
      }
    : {
        heroTag: "Founder",
        heroTitle: "A mindset that inspires you to move forward.",
        heroMeta: "Dr. Shiv Karan Karmayoddha · Founder, Karmbhumi India Limited",
        founderAlt: "Dr. Shiv Karan Karmayoddha",
        msgTag: "Founder's Message",
        msgQuote: "“Systems come to a standstill in the absence of effort, but ideology never stops.”",
        msgSub: "It keeps flowing in every direction, crossing barriers and beliefs.",
        ambTag: "Ambition / From the Blog",
        ambTitle: "Goal, Hard Work and Integrity.",
        ambDesc:
          "In the founder's writing, ambition is seen not merely as an achievement, but as an inspiration to move ahead with duty, humility and ethical principles. Every individual's effort matters in organising society and building the nation.",
        cards: [
          { t: "Duty", d: "Staying alert to your work and responsibilities." },
          { t: "Integrity", d: "Moving toward your goals with ethical principles." },
          { t: "Equality", d: "Valuing human dignity and equality in society." },
        ],
        socTag: "Social Engagement",
        socLine1: "Honouring talent.",
        socLine2: "Encouraging the next generation.",
        socCaption: "Dr. Shiv Karan Karmayoddha at the Pratibha Samman programme.",
        eventAlt: "Pratibha Samman programme",
        ctaTag: "Let's Talk",
        ctaTitle: "Progress begins with a conversation.",
        ctaDesc: "Reach out to our team for information about the organisation, projects or opportunities.",
        ctaBtn: "Contact Us",
      };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: FONT }}>
      <Header />

      {/* ================= HERO ================= */}
      <section className="bg-[#F1F5F9]">
        <div
          className={`${container} flex flex-col-reverse items-start justify-between gap-8 py-12 sm:py-14 md:flex-row md:items-center md:gap-10`}
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold" style={{ color: RUST }}>
              {C.heroTag}
            </p>
            <h1
              className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[40px]"
              style={{ color: NAVY }}
            >
              {C.heroTitle}
            </h1>
            <p className="mt-6 text-xs text-slate-600 sm:text-[13px]">{C.heroMeta}</p>
          </div>

          <div className="h-[257px] w-[200px] shrink-0 overflow-hidden rounded bg-slate-300 sm:h-[306px] sm:w-[238px]">
            <img src={FOUNDER_IMG} alt={C.founderAlt} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ================= FOUNDER MESSAGE ================= */}
      <section style={{ backgroundColor: NAVY }}>
        <div className={`${container} py-10 sm:py-12`}>
          <p className="text-[10px] font-semibold text-white">{C.msgTag}</p>
          <blockquote className="mt-4 max-w-4xl text-2xl font-bold leading-snug text-white sm:text-3xl md:text-[34px]">
            {C.msgQuote}
          </blockquote>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-[15px]">
            {C.msgSub}
          </p>
        </div>
      </section>

      {/* ================= AMBITION / VALUES ================= */}
      <section className={`${container} py-10 sm:py-12`}>
        <p className="text-[10px] font-semibold" style={{ color: RUST }}>
          {C.ambTag}
        </p>
        <h2 className="mt-3 text-2xl font-bold sm:text-[30px]" style={{ color: NAVY }}>
          {C.ambTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
          {C.ambDesc}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {C.cards.map((c, i) => (
            <div key={c.t} className="bg-[#EEF2F6] px-5 py-4">
              <p className="text-[10px] font-semibold" style={{ color: RUST }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-bold sm:text-[17px]" style={{ color: NAVY }}>
                {c.t}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SOCIAL ENGAGEMENT ================= */}
      <section className="bg-[#F1F5F9]">
        <div
          className={`${container} flex flex-col items-start gap-6 py-8 sm:py-10 md:flex-row md:items-center md:gap-10`}
        >
          <div className="h-[260px] w-full max-w-[320px] shrink-0 overflow-hidden rounded bg-slate-300 md:w-[240px]">
            <img src={EVENT_IMG} alt={C.eventAlt} className="h-full w-full object-cover" />
          </div>

          <div>
            <p className="text-[10px] font-semibold" style={{ color: RUST }}>
              {C.socTag}
            </p>
            <h2
              className="mt-3 text-2xl font-bold leading-snug sm:text-[26px]"
              style={{ color: NAVY }}
            >
              {C.socLine1}
              <br />
              {C.socLine2}
            </h2>
            <p className="mt-4 text-[11px] text-slate-600 sm:text-xs">{C.socCaption}</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#E6EDF4]">
        <div className={`${container} py-12 sm:py-14`}>
          <p className="text-[10px] font-semibold" style={{ color: RUST }}>
            {C.ctaTag}
          </p>
          <h2
            className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-[32px]"
            style={{ color: NAVY }}
          >
            {C.ctaTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
            {C.ctaDesc}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: RUST }}
          >
            <span>{C.ctaBtn}</span>
            <Arrow />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthorProfile;