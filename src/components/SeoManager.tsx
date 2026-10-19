import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SITE_URL = "https://karmbhumiindialtd.com";
const OG_IMAGE = `${SITE_URL}/img/founder-speech.jpg`;

type Lang = "en" | "hi";

type PageSeo = {
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  noindex?: boolean;
};

// Har page ka title + description (English / Hindi).
// Title ~50-60 characters, description ~150-160 characters rakho.
const PAGES: Record<string, PageSeo> = {
  "/": {
    title: {
      en: "Karmbhumi India Limited | Real Estate & Investment Plans",
      hi: "कर्मभूमि इंडिया लिमिटेड | रियल एस्टेट एवं निवेश योजनाएं",
    },
    description: {
      en: "Karmbhumi India Limited is a public limited company founded by Dr. Shiv Karan Karmayoddha, working in real estate, products and services across India.",
      hi: "कर्मभूमि इंडिया लिमिटेड, डॉ. शिव करन कर्मयोद्धा द्वारा स्थापित पब्लिक लिमिटेड कम्पनी है, जो पूरे भारत में रियल एस्टेट, उत्पाद एवं सेवा क्षेत्र में कार्यरत है।",
    },
  },
  "/about": {
    title: {
      en: "About Karmbhumi India Limited | Founder & Company Profile",
      hi: "कर्मभूमि इंडिया लिमिटेड के बारे में | संस्थापक एवं कम्पनी परिचय",
    },
    description: {
      en: "Know about Karmbhumi India Limited: founder Dr. Shiv Karan Karmayoddha, company details, vision and Pan-India work in real estate and services.",
      hi: "कर्मभूमि इंडिया लिमिटेड के बारे में जानें: संस्थापक डॉ. शिव करन कर्मयोद्धा, कम्पनी की जानकारी, विजन और पूरे भारत में रियल एस्टेट व सेवा क्षेत्र का कार्य।",
    },
  },
  "/karmbhoomi-bank": {
    title: {
      en: "Karmbhumi Bank of India Mission | Karmbhumi India Limited",
      hi: "कर्मभूमि बैंक ऑफ इंडिया मिशन | कर्मभूमि इंडिया लिमिटेड",
    },
    description: {
      en: "Learn about the Karmbhumi Bank of India mission of Karmbhumi India Limited, built on public participation, cooperation and real asset backing.",
      hi: "कर्मभूमि इंडिया लिमिटेड के 'कर्मभूमि बैंक ऑफ इंडिया' मिशन के बारे में जानें, जो जन-सहभागिता, सहकारिता और ठोस परिसंपत्तियों पर आधारित है।",
    },
  },
  "/investment-plans": {
    title: {
      en: "Investment Plans | Karmbhumi India Limited",
      hi: "निवेश योजनाएं | कर्मभूमि इंडिया लिमिटेड",
    },
    description: {
      en: "Explore the investment plans of Karmbhumi India Limited, based on a cooperative model and real estate assets. Read the details and contact us.",
      hi: "कर्मभूमि इंडिया लिमिटेड की निवेश योजनाएं देखें, जो सहकारी मॉडल और रियल एस्टेट परिसंपत्तियों पर आधारित हैं। विवरण पढ़ें और हमसे संपर्क करें।",
    },
  },
  "/contact": {
    title: {
      en: "Contact Karmbhumi India Limited | Enquiry & Office Details",
      hi: "संपर्क करें | कर्मभूमि इंडिया लिमिटेड",
    },
    description: {
      en: "Contact Karmbhumi India Limited for enquiries about plans, membership and services. Send your message and our team will get back to you.",
      hi: "योजनाओं, सदस्यता और सेवाओं की जानकारी के लिए कर्मभूमि इंडिया लिमिटेड से संपर्क करें। अपना संदेश भेजें, हमारी टीम आपसे संपर्क करेगी।",
    },
  },
  "/AuthorProfile": {
    title: {
      en: "Dr. Shiv Karan Karmayoddha | Founder, Karmbhumi India Limited",
      hi: "डॉ. शिव करन कर्मयोद्धा | संस्थापक, कर्मभूमि इंडिया लिमिटेड",
    },
    description: {
      en: "Read the profile of Dr. Shiv Karan Karmayoddha, founder of Karmbhumi India Limited, and his vision for cooperative growth and self-reliance in India.",
      hi: "कर्मभूमि इंडिया लिमिटेड के संस्थापक डॉ. शिव करन कर्मयोद्धा का प्रोफ़ाइल पढ़ें और भारत में सहकारी विकास व आत्मनिर्भरता के उनके विजन को जानें।",
    },
  },
  // Admin panel Google me nahi aana chahiye
  "/cpanel": {
    title: { en: "Admin Panel | Karmbhumi India Limited", hi: "एडमिन पैनल | कर्मभूमि इंडिया लिमिटेड" },
    description: { en: "Admin panel", hi: "एडमिन पैनल" },
    noindex: true,
  },
};

// Jo URL exist nahi karta (404 page)
const NOT_FOUND: PageSeo = {
  title: { en: "Page Not Found | Karmbhumi India Limited", hi: "पेज नहीं मिला | कर्मभूमि इंडिया लिमिटेड" },
  description: { en: "The page you are looking for does not exist.", hi: "आप जो पेज खोज रहे हैं वह उपलब्ध नहीं है।" },
  noindex: true,
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const SeoManager = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const l: Lang = lang === "hi" ? "hi" : "en";
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const page = PAGES[path] ?? NOT_FOUND;
    const url = `${SITE_URL}${path}`;
    const title = page.title[l];
    const description = page.description[l];

    document.documentElement.lang = l;
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", page.noindex ? "noindex, nofollow" : "index, follow");
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [pathname, lang]);

  return null;
};

export default SeoManager;