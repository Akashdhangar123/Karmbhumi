import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const ZONES = [
  "दिल्ली (Delhi)", "मुंबई (Mumbai)", "कोलकाता (Kolkata)", "चेन्नई (Chennai)",
  "भोपाल (Bhopal)", "पटना (Patna)", "चंडीगढ़ (Chandigarh)", "शिमला (Shimla)"
];

const KarmbhoomiBank: React.FC = () => {
  const { t, lang } = useLanguage();

  const REASONS = lang === "hi" ? [
    { num: "01", title: "धार्मिक संगठनों से आय न होना", text: "धर्म और आस्था से होने वाली अरबों की आय में बहुसंख्यक समाज की कोई सीधी आर्थिक हिस्सेदारी या राष्ट्रव्यापी संस्थागत माध्यम नहीं है।" },
    { num: "02", title: "शासन-सत्ता में सीमित भागीदारी", text: "सत्ता व नीति निर्माण में पर्याप्त हिस्सेदारी न होने के कारण टैक्स से एकत्रित राष्ट्रीय कोष का लाभ जमीनी स्तर तक पूर्णतः नहीं पहुँच पाता।" },
    { num: "03", title: "राष्ट्रव्यापी आर्थिक संगठन (बैंक) का अभाव", text: "बैंकिंग व वित्तीय तंत्र से होने वाला विशाल लाभ पारंपरिक संस्थाओं तक सीमित रह जाता है; समाज के पास स्वयं का स्वायत्त आर्थिक ढांचा नहीं है।" },
    { num: "04", title: "मीडिया एवं संचार तंत्र में शून्य हिस्सेदारी", text: "प्रिंट व इलेक्ट्रॉनिक मीडिया में विज्ञापन व प्रसारण से प्रतिदिन होने वाले खरबों रुपये के वित्तीय लाभ में जनसामान्य की भागीदारी नहीं है।" },
    { num: "05", title: "उत्पादन व विनिर्माण क्षेत्र में अनुपस्थिति", text: "दैनिक उपभोग (ऊर्जा, संचार, वाहन, इलेक्ट्रॉनिक्स आदि) के बड़े उत्पादन तंत्र में सहभागिता न होने के कारण आत्मनिर्भरता अधूरी रह जाती है।" },
  ] : [
    { num: "01", title: "Lack of Revenue from Religious Trusts", text: "Massive institutional revenues generated through religious trusts lack direct participatory channels for the broader socioeconomic public." },
    { num: "02", title: "Limited Policy Representation", text: "Without widespread participation in administrative governance, benefits from tax revenues rarely cascade fully to grassroots creators." },
    { num: "03", title: "Absence of a Dedicated Financial Institution", text: "Vast profits generated in banking remain concentrated; community members lack an autonomous economic network of their own." },
    { num: "04", title: "Zero Stake in Mainstream Media", text: "Billions generated daily in print and broadcasting advertising offer zero equity participation for grassroots workers." },
    { num: "05", title: "Absence in High-Value Manufacturing", text: "Lack of direct involvement in large-scale production of consumer goods (energy, electronics, mobility) stunts genuine financial independence." },
  ];

  const PARTICIPATION_LEVELS = lang === "hi" ? [
    { level: "राज्य स्तर", people: "36 राज्यों में 36 लोग", contribution: "₹1 लाख के गुणक में 100 व्यक्तियों की सहभागिता", returnRate: "5 वर्ष: 250% (वार्षिक 50%) + 6 वर्ष पर 200% अतिरिक्त" },
    { level: "मंडल स्तर", people: "171 मंडलों में 171 लोग", contribution: "₹2 लाख के गुणक में 250 व्यक्तियों की सहभागिता", returnRate: "40% वार्षिक निवेश, 6 वर्ष बाद पूँजी का 200%" },
    { level: "जिला स्तर", people: "707 जिलों में 707 लोग", contribution: "₹1 लाख के गुणक में 200 व्यक्तियों की सहभागिता", returnRate: "30% वार्षिक लाभ + 6 वर्ष पश्चात पूँजी" },
    { level: "तहसील स्तर", people: "5,410 तहसीलों में 5,410 लोग", contribution: "₹1 लाख के गुणक में 100 व्यक्तियों की सहभागिता", returnRate: "25% वार्षिक लाभ, 6 वर्ष पश्चात निवेश + 25%" },
    { level: "ब्लॉक स्तर", people: "6,612 ब्लॉकों में 6,612 लोग", contribution: "₹1 लाख के गुणक में 50 व्यक्तियों की सहभागिता", returnRate: "20% वार्षिक लाभ, 6 वर्ष पश्चात धनराशि + 20%" },
  ] : [
    { level: "State Level", people: "36 Representatives in 36 States", contribution: "Participation of 100 individuals in ₹1 Lakh units", returnRate: "5 Yrs: 250% (50% annually) + 200% extra at 6th yr" },
    { level: "Divisional Level", people: "171 Representatives in 171 Divisions", contribution: "Participation of 250 individuals in ₹2 Lakh units", returnRate: "40% annual return, 200% principal value after 6 yrs" },
    { level: "District Level", people: "707 Representatives in 707 Districts", contribution: "Participation of 200 individuals in ₹1 Lakh units", returnRate: "30% annual gain + principal returned after 6 yrs" },
    { level: "Tehsil Level", people: "5,410 Representatives in 5,410 Tehsils", contribution: "Participation of 100 individuals in ₹1 Lakh units", returnRate: "25% annual gain, principal + 25% after 6 yrs" },
    { level: "Block Level", people: "6,612 Representatives in 6,612 Blocks", contribution: "Participation of 50 individuals in ₹1 Lakh units", returnRate: "20% annual gain, principal + 20% after 6 yrs" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 antialiased">
      <Header />

      <section className="bg-[#0B2545] text-white py-16 text-center border-b-4 border-[#FF9933] relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-3">
            {t.bank.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.bank.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.bank.desc}
          </p>
        </div>
      </section>

      {/* 5 Reasons Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            {t.bank.analysisBadge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
            {t.bank.analysisTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#FF9933]" />
          <p className="mt-3 text-sm text-gray-600">
            {t.bank.analysisSub}
          </p>
        </div>

        <div className="space-y-4">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-[#FF9933] transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B2545] font-black text-amber-400 text-lg shadow">
                {r.num}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{r.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="bg-slate-100 py-16 border-y border-gray-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#138808] bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {t.bank.networkBadge}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
              {t.bank.networkTitle}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#138808]" />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-4 text-center">
              {t.bank.zonesTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {ZONES.map((zone) => (
                <div key={zone} className="rounded-xl bg-slate-50 border border-gray-200 py-3 text-center text-xs font-bold text-gray-800">
                  {zone}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Participation Table */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            {t.bank.chartBadge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B2545]">
            {t.bank.chartTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#FF9933]" />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="px-5 py-4 font-bold">{lang === "hi" ? "संगठनात्मक स्तर" : "Level"}</th>
                <th className="px-5 py-4 font-bold">{lang === "hi" ? "सहभागिता संख्या" : "Participants"}</th>
                <th className="px-5 py-4 font-bold">{lang === "hi" ? "निवेश प्रारूप" : "Contribution Unit"}</th>
                <th className="px-5 py-4 font-bold">{lang === "hi" ? "निर्धारित लाभ / रिटर्न" : "Return on Investment"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PARTICIPATION_LEVELS.map((p) => (
                <tr key={p.level} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#0B2545]">{p.level}</td>
                  <td className="px-5 py-4 text-gray-700">{p.people}</td>
                  <td className="px-5 py-4 text-gray-700">{p.contribution}</td>
                  <td className="px-5 py-4 font-semibold text-[#138808]">{p.returnRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KarmbhoomiBank;