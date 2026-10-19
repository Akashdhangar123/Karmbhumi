import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  fetchContacts,
  updateContactRead,
  deleteContact,
  type ContactRecord as Contact,
} from "../api/contactApi";

const NAVY = "#0B2545";
const RUST = "#B84A12";

const dash = (v: string) => (v && v !== "NA" ? v : "-");

export default function CPanel() {
  const { user } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // debounce ke baad wali value
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
      const data = await fetchContacts({ page, q: query, unreadOnly });
      setContacts(data.contacts);
      setTotal(data.total);
      setUnread(data.unread);
      setPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [page, query, unreadOnly]);

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
    if (!window.confirm(`Delete the record of ${c.name}?`)) return;
    try {
      await deleteContact(c.id);
      setSelected(null);
      if (contacts.length === 1 && page > 1) setPage(page - 1);
      else load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  // Row click: popup kholo, unread ho to read mark kar do
  function openDetails(c: Contact) {
    setSelected(c);
    if (!c.is_read) setRead(c, true);
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const Detail = ({ label, value, wide }: { label: string; value: React.ReactNode; wide?: boolean }) => (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="text-[10px] font-bold text-slate-500">{label}</p>
      <p className="mt-0.5 break-words text-sm text-slate-900">{value || "-"}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-8 sm:px-8">
        {/* Title */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold" style={{ color: RUST }}>
            CPanel
          </p>
          <h1 className="text-2xl font-extrabold" style={{ color: NAVY }}>
            Contact Us Records
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Welcome, {user?.name}. Website ke contact form se aaye saare records yahan dikhte hain.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-2 gap-4 sm:max-w-md">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500">Total</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: NAVY }}>{total}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500">Unread</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: RUST }}>{unread}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or pincode"
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545] sm:max-w-sm"
          />
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
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:ml-auto"
          >
            Refresh
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Occupation</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">Loading...</td>
                </tr>
              )}

              {!loading && contacts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    Koi record nahi mila.
                  </td>
                </tr>
              )}

              {!loading &&
                contacts.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => openDetails(c)}
                    className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${
                      c.is_read ? "" : "bg-orange-50/50 font-semibold"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{fmt(c.created_at)}</td>
                    <td className="px-4 py-3" style={{ color: NAVY }}>
                      {!c.is_read && (
                        <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: RUST }} />
                      )}
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{c.phone || "-"}</div>
                      {c.email && <div className="text-xs">{c.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{dash(c.district)}</div>
                      <div className="text-xs">{dash(c.state)}</div>
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-slate-600">{dash(c.occupation)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          c.is_read ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {c.is_read ? "Read" : "New"}
                      </span>
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

      {/* ================= DETAILS POPUP ================= */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Record details"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold" style={{ color: NAVY }}>
                  {selected.name}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">Submitted {fmt(selected.created_at)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
              <Detail label="Father's Name" value={selected.fatherName} />
              <Detail label="Mother's Name" value={selected.motherName} />
              <Detail
                label="Contact No."
                value={
                  selected.phone && (
                    <a href={`tel:${selected.phone}`} className="hover:underline" style={{ color: NAVY }}>
                      {selected.phone}
                    </a>
                  )
                }
              />
              <Detail
                label="Email ID"
                value={
                  selected.email && (
                    <a href={`mailto:${selected.email}`} className="hover:underline" style={{ color: NAVY }}>
                      {selected.email}
                    </a>
                  )
                }
              />
              <Detail label="Village" value={selected.village} />
              <Detail label="PIN Code" value={selected.pincode} />
              <Detail label="State" value={selected.state} />
              <Detail label="District" value={selected.district} />
              <Detail label="Block" value={dash(selected.block)} />
              <Detail label="Address" value={selected.address} wide />
              <Detail label="Education" value={selected.education} />
              <Detail label="Occupation" value={selected.occupation} />
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-3">
              <button
                type="button"
                onClick={() => setRead(selected, !selected.is_read)}
                className="rounded-md border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                {selected.is_read ? "Mark unread" : "Mark read"}
              </button>
              <button
                type="button"
                onClick={() => remove(selected)}
                className="rounded-md border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md px-4 py-2 text-xs font-semibold text-white hover:brightness-110"
                style={{ backgroundColor: RUST }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}