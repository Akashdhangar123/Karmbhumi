import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../components/Home";
import About from "../pages/About";
import KarmbhoomiBank from "../pages/KarmbhoomiBank";
import InvestmentPlans from "../pages/InvestmentPlans";
import Contact from "../pages/Contact";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      <div className="h-20 w-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-black text-3xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-black text-[#0B2545]">
        {lang === "hi" ? "पेज नहीं मिला" : "Page Not Found"}
      </h1>
      <p className="mt-2 text-sm text-gray-600 max-w-sm">
        {lang === "hi" 
          ? "क्षमा करें, जिस पृष्ठ की आप तलाश कर रहे हैं वह उपलब्ध नहीं है या स्थानांतरित कर दिया गया है।"
          : "Sorry, the page you are looking for does not exist or has been relocated."}
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-[#0B2545] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#133E72] transition-colors"
      >
        {lang === "hi" ? "मुख्य पृष्ठ (होम) पर लौटें" : "Return to Home"}
      </Link>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/karmbhoomi-bank" element={<KarmbhoomiBank />} />
        <Route path="/investment-plans" element={<InvestmentPlans />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
};

export default AppRoutes;