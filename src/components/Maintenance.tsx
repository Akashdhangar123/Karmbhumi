import React from "react";

const COMPANY_NAME = "Karmbhumi India Limited";
const SUPPORT_EMAIL = "karmyodha6@gmail.com";

const Maintenance: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center">
          <span className="text-base font-semibold tracking-tight">
            {COMPANY_NAME}
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center px-6 py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-lg border border-slate-200 bg-white p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              We'll be back soon
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Our website is currently undergoing scheduled maintenance. We
              apologize for the inconvenience and expect to be back online
              shortly. Thank you for your patience.
            </p>

            <p className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
              If you need urgent help, contact us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-sm"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center text-xs text-slate-500">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Maintenance;