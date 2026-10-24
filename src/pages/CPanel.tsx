import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  fetchContacts,
  updateContactRead,
  deleteContact,
  POST_LABELS,
  type ContactRecord as Contact,
} from "../api/contactApi";

const NAVY = "#0B2545";
const RUST = "#B84A12";
const PAGE_SIZE = 20;

const dash = (v: string) => (v && v !== "NA" ? v : "-");
const appNo = (id: string) => `#${String(id).padStart(5, "0")}`;

export default function CPanel() {
  const { user } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // debounce ke baad wali value
  const [postFilter, setPostFilter] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search typing ke 400ms baad hi API call
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchContacts({
        page,
        q: query,
        unreadOnly,
        post: postFilter || undefined,
      });
      setContacts(data.contacts);
      setTotal(data.total);
      setUnread(data.unread);
      setPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [page, query, unreadOnly, postFilter]);

  useEffect(() => {
    load();
  }, [load]);

  // Popup: Esc se band + background scroll lock
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  async function setRead(c: Contact, value: boolean) {
    try {
      await updateContactRead(c.id, value);
      setContacts((list) => list.map((x) => (x.id === c.id ? { ...x, is_read: value } : x)));
      setSelected((s) => (s && s.id === c.id ? { ...s, is_read: value } : s));
      setUnread((u) => Math.max(0, u + (value ? -1 : 1)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function remove(c: Contact) {
    if (!window.confirm(`Delete the registration of ${c.name}?`)) return;
    try {
      await deleteContact(c.id);
      setSelected(null);
      if (contacts.length === 1 && page > 1) setPage(page - 1);
      else load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  // View click: form jaisa popup kholo, unread ho to read mark kar do
  function openDetails(c: Contact) {
    setSelected(c);
    if (!c.is_read) setRead(c, true);
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" });

  // Form jaisa ek field: upar chhota label, neeche value ki line
  const FormField = ({
    label,
    value,
    wide,
    tall,
  }: {
    label: string;
    value: React.ReactNode;
    wide?: boolean;
    tall?: boolean;
  }) => (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div
        className={`mt-1 break-words border-b border-slate-300 pb-1.5 text-sm font-medium text-slate-900 ${
          tall ? "min-h-[56px] whitespace-pre-line" : ""
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );

  const SectionTitle = ({ num, title }: { num: number; title: string }) => (
    <div className="mt-6 flex items-center gap-2.5 first:mt-0 sm:col-span-2">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: NAVY }}
      >
        {num}
      </span>
      <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: NAVY }}>
        {title}
      </h3>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      {/* Print: sirf registration form chhapega */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #registration-print, #registration-print * { visibility: visible !important; }
          #registration-print {
            position: absolute !important; left: 0; top: 0; width: 100% !important;
            max-height: none !important; overflow: visible !important;
            box-shadow: none !important; border-radius: 0 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <Header />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-5 py-8 sm:px-8">
        {/* Title */}
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold" style={{ color: RUST }}>
              CPanel
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: NAVY }}>
              Registration Records
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Welcome, {user?.name}. Online registration form se aaye saare applications yahan dikhte hain.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-2 gap-4 sm:max-w-md">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500">Total Registrations</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: NAVY }}>
              {total}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500">Unread</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: RUST }}>
              {unread}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, mobile, email or pincode"
            className="w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545] lg:max-w-sm"
          />
          <select
            value={postFilter}
            onChange={(e) => {
              setPostFilter(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545] lg:w-52"
          >
            <option value="">All posts</option>
            {Object.entries(POST_LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => {
                setUnreadOnly(e.target.checked);
                setPage(1);
              }}
            />
            Unread only
          </label>
          <button
            type="button"
            onClick={load}
            className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 lg:ml-auto"
          >
            Refresh
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">S.No</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && contacts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    Koi registration nahi mila.
                  </td>
                </tr>
              )}

              {!loading &&
                contacts.map((c, idx) => (
                  <tr
                    key={c.id}
                    onClick={() => openDetails(c)}
                    className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                      c.is_read ? "" : "bg-orange-50/40"
                    }`}
                  >
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                      {fmtDate(c.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-2 ${c.is_read ? "font-medium" : "font-bold"}`} style={{ color: NAVY }}>
                        {!c.is_read && (
                          <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: RUST }} />
                        )}
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-500">S/o {dash(c.fatherName)}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className="rounded px-2 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: "#E6EDF4", color: NAVY }}
                      >
                        {c.appliedPostLabel}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{c.phone || "-"}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{dash(c.district)}</div>
                      <div className="text-xs text-slate-500">{dash(c.state)}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          c.is_read ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {c.is_read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetails(c);
                        }}
                        className="rounded-md px-3.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 active:scale-95"
                        style={{ backgroundColor: NAVY }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>
              Page {page} of {pages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ================= REGISTRATION FORM POPUP ================= */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            id="registration-print"
            role="dialog"
            aria-modal="true"
            aria-label="Registration form"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            {/* Top accent */}
            <div className="h-1.5 w-full" style={{ backgroundColor: RUST }} />

            {/* Form header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <img src="/img/newlogo.png" alt="Karmbhumi logo" className="h-14 w-14 object-contain" />
                <div>
                  <p className="text-base font-extrabold leading-tight sm:text-lg" style={{ color: NAVY }}>
                    Karmbhumi India Limited
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: RUST }}>
                    Online Registration Form
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-right text-xs text-slate-500">
                  <p>
                    Application No.{" "}
                    <span className="font-bold" style={{ color: NAVY }}>
                      {appNo(selected.id)}
                    </span>
                  </p>
                  <p className="mt-0.5">{fmt(selected.created_at)}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      selected.is_read ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {selected.is_read ? "Read" : "New"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="no-print flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-slate-500 hover:bg-slate-100"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form body */}
            <div className="overflow-y-auto px-5 py-6 sm:px-8">
              {/* Selected post banner */}
              <div
                className="mb-6 flex items-center justify-between rounded px-4 py-3"
                style={{ backgroundColor: "#E6EDF4" }}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Post Applied For
                </p>
                <p className="text-base font-extrabold" style={{ color: NAVY }}>
                  {selected.appliedPostLabel}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <SectionTitle num={1} title="Personal details" />
                <FormField label="Name" value={selected.name} />
                <FormField label="Father's Name" value={selected.fatherName} />
                <FormField
                  label="Mobile No."
                  value={
                    selected.phone && (
                      <a href={`tel:${selected.phone}`} className="hover:underline" style={{ color: NAVY }}>
                        {selected.phone}
                      </a>
                    )
                  }
                />
                <FormField
                  label="Email ID"
                  value={
                    selected.email && (
                      <a href={`mailto:${selected.email}`} className="hover:underline" style={{ color: NAVY }}>
                        {selected.email}
                      </a>
                    )
                  }
                />

                <SectionTitle num={2} title="Address" />
                <FormField label="Village" value={selected.village} />
                <FormField label="PIN Code" value={selected.pincode} />
                <FormField label="State" value={selected.state} />
                <FormField label="District" value={selected.district} />
                <FormField label="Block" value={dash(selected.block)} />
                <FormField label="Full Address" value={selected.address} wide />

                <SectionTitle num={3} title="Education & experience" />
                <FormField label="Educational Qualification" value={selected.education} />
                <FormField label="Occupation" value={selected.occupation} />
                <FormField label="Experience" value={selected.experience} wide tall />
              </div>
            </div>

            {/* Footer actions */}
            <div className="no-print flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:px-8">
              <button
                type="button"
                onClick={() => remove(selected)}
                className="rounded-md border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRead(selected, !selected.is_read)}
                  className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {selected.is_read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-md border px-3.5 py-2 text-xs font-semibold hover:bg-slate-100"
                  style={{ borderColor: NAVY, color: NAVY }}
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-md px-5 py-2 text-xs font-semibold text-white hover:brightness-110"
                  style={{ backgroundColor: RUST }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}