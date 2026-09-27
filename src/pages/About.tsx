import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const About: React.FC = () => {
  const { t, lang } = useLanguage();

  const VALUES = lang === "hi" ? [
    { t: "अभिरक्षण व शिष्टाचार", d: "प्रत्येक निवेशक व सदस्य के सम्मान और संरक्षण की प्राथमिकता।" },
    { t: "अभिक्रम व नवीनता", d: "पारंपरिक बाधाओं को तोड़कर आधुनिक वित्तीय सोच को अपनाना।" },
    { t: "सत्यनिष्ठा व पारदर्शिता", d: "हर स्तर पर निष्पक्षता एवं विधिक मानकों का पूर्ण पालन।" },
    { t: "गुणवत्ता व लाभ", d: "परिसंपत्तियों व निवेश पर समुचित एवं निरंतर प्रतिफल सुनिश्चित करना।" },
    { t: "सहयोग व सम्बन्ध", d: "एक-दूसरे के हाथ पकड़कर आर्थिक स्वावलंबन का मार्ग प्रशस्त करना।" },
    { t: "विश्वसनीयता व भरोसा", d: "शब्दों से नहीं, समयबद्ध परिणामों से विश्वास का निर्माण।" },
  ] : [
    { t: "Custody & Decorum", d: "Highest priority to the dignity, safety, and respect of every investor." },
    { t: "Initiative & Innovation", d: "Transcending traditional constraints to foster modern financial mechanisms." },
    { t: "Integrity & Transparency", d: "Uncompromising adherence to fairness, ethics, and legal compliance." },
    { t: "Quality & Prosperity", d: "Delivering sustainable, asset-backed returns and enduring value creation." },
    { t: "Cooperation & Relationship", d: "Empowering communities through collective handholding and cooperation." },
    { t: "Credibility & Trust", d: "Earning enduring trust through punctual, verifiable outcomes." },
  ];

  const CULTURE = lang === "hi" 
    ? ["दक्षता", "अनुकूलता", "सहयोग", "प्रतिबद्धता", "अनुशासन", "अधिकृत करना", "संवेदनशीलता", "उत्कृष्टता"]
    : ["Efficiency", "Adaptability", "Collaboration", "Commitment", "Discipline", "Empowerment", "Empathy", "Excellence"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased">
      <Header />

      <section className="bg-[#0B2545] text-white py-16 text-center border-b-4 border-[#FF9933] relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-3">
            {t.about.heroTag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {t.about.heroTitle}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.about.heroDesc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#138808] uppercase tracking-wide">
                {t.about.legalStatus}
              </span>
              <h2 className="text-xl font-black text-[#0B2545]">
                {t.about.legalTitle}
              </h2>
            </div>
            <a
              href="https://www.mca21.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B2545] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#133E72] transition-colors"
            >
              <span>{t.about.mcaBtn}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-50 p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-500">{t.footer.cinLabel}</p>
              <p className="mt-1 text-sm font-mono font-bold text-[#0B2545]">U70102UP2012PLC053219</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-500">{lang === "hi" ? "निगमन प्रमाणपत्र" : "Incorporation Certificate"}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">Certificate of Incorporation</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-500">{lang === "hi" ? "व्यवसाय प्रारंभ प्रमाणपत्र" : "Commencement of Business"}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">Commencement of Business</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-500">{lang === "hi" ? "मंत्रालय" : "Ministry"}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">Ministry of Corporate Affairs (MCA)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-100 py-16 border-y border-gray-200 mt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#FF9933] font-bold text-xl mb-4">
                🔭
              </div>
              <h3 className="text-xl font-black text-[#0B2545]">{t.about.visionTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{t.about.visionDesc}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-[#138808] font-bold text-xl mb-4">
                🎯
              </div>
              <h3 className="text-xl font-black text-[#0B2545]">{t.about.missionTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{t.about.missionDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Culture */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#138808] bg-green-50 px-3 py-1 rounded-full border border-green-200">
            {t.about.valuesBadge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
            {t.about.valuesTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#138808]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-base font-bold text-[#0B2545]">{v.t}</h4>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 border border-gray-200 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
            {lang === "hi" ? "संगठनात्मक संस्कृति के 8 स्तम्भ" : "8 Key Organizational Cultural Pillars"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CULTURE.map((c) => (
              <span
                key={c}
                className="rounded-xl border border-gray-200 bg-slate-50 px-4 py-2 text-xs font-bold text-gray-800"
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Dedication Banner */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B2545] to-[#133E72] p-8 sm:p-10 text-center text-white shadow-xl">
          <h3 className="text-xl font-bold text-amber-400">{t.about.dedicationTitle}</h3>
          <p className="mt-4 text-base leading-relaxed text-gray-200 max-w-2xl mx-auto">
            {t.about.dedicationQuote}
          </p>
          <p className="mt-4 text-xs font-semibold text-gray-400">— {t.home.founderName}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;