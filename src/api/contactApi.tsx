// src/services/contactApi.ts

/**
 * Apna backend URL yaha daalo (end me "/" mat lagana).
 *  - Local testing:  "http://localhost:5000/api"
 *  - Production:     "https://api.tumhari-site.com/api"
 */
const API_BASE_URL = "https://karmbhumi-backend.vercel.app/api";

/**
 * Login ke baad token jis key me save hota hai wo yaha daalo.
 * (AuthContext me jo localStorage.setItem("...") hai wahi naam.)
 */
const TOKEN_KEY = "token";

/**
 * contact_messages.status ki values (DB ke CHECK constraint se match honi chahiye).
 * NEW = abhi khola nahi, READ = admin ne dekh liya.
 */
const STATUS_NEW = "new";
const STATUS_READ = "read";

const REQUEST_TIMEOUT_MS = 15000;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

// Contact.tsx ke form state se match karta hai
export interface ContactFormData {
  name: string;
  fatherName: string;
  motherName?: string;
  address: string;
  village: string;
  pincode: string;
  postOffice?: string; // sirf UI ke liye, backend ko nahi bhejte
  block: string;
  district: string;
  state: string;
  education: string;
  occupation: string;
  phone: string;
  email?: string;
  website?: string; // honeypot
}

// Backend ke contact_messages table jaisa payload
interface ContactPayload {
  full_name: string;
  father_name: string;
  mother_name?: string;
  village: string;
  address: string;
  pincode: string;
  state: string;
  district: string;
  block: string;
  education: string;
  occupation: string;
  contact_number: string;
  email?: string;
  website: string; // honeypot (backend isse check karta hai)
}

export interface ContactSuccessResponse {
  success: true;
  message: string;
  data?: {
    id: string;
    full_name: string;
    status: string;
    created_at: string;
  };
}

interface FieldError {
  field: string;
  message: string;
}

/** Custom error: status code aur field-wise errors ke saath */
export class ApiError extends Error {
  status: number;
  fieldErrors: FieldError[];

  constructor(message: string, status = 0, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const trim = (v?: string) => (typeof v === "string" ? v.trim() : "");

/** Frontend form -> backend payload (empty optional fields hata deta hai) */
const toPayload = (form: ContactFormData): ContactPayload => {
  const payload: ContactPayload = {
    full_name: trim(form.name),
    father_name: trim(form.fatherName),
    village: trim(form.village),
    address: trim(form.address),
    pincode: trim(form.pincode),
    state: trim(form.state),
    district: trim(form.district),
    // India Post API kabhi-kabhi Block khali/NA deti hai, backend khali block reject karta hai
    block: trim(form.block) || "NA",
    education: trim(form.education),
    occupation: trim(form.occupation),
    contact_number: trim(form.phone),
    website: form.website || "",
  };

  const mother = trim(form.motherName);
  if (mother) payload.mother_name = mother;

  const email = trim(form.email);
  if (email) payload.email = email;

  return payload;
};

/** Backend ke errors ko ek readable message me badalta hai */
const buildErrorMessage = (status: number, body: any): string => {
  if (status === 429) {
    return "Bahut zyada requests ho gayi hain. Thodi der baad try karo.";
  }
  if (status === 400 && Array.isArray(body?.errors) && body.errors.length) {
    return body.errors.map((e: FieldError) => e.message).join(", ");
  }
  if (body?.message) return body.message;
  if (status >= 500) return "Server me problem hai. Baad me try karo.";
  return "Form submit nahi ho paya. Please try again.";
};

/* ------------------------------------------------------------------ */
/* API: public contact form                                           */
/* ------------------------------------------------------------------ */

/**
 * POST /api/contact
 * Success par response return karta hai, fail par ApiError throw karta hai
 * (Contact.tsx me `err.message` seedha user ko dikh jata hai).
 */
export const submitContactForm = async (
  form: ContactFormData
): Promise<ContactSuccessResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(form)),
      signal: controller.signal,
    });

    let body: any = null;
    try {
      body = await res.json();
    } catch {
      // response JSON nahi tha
    }

    if (!res.ok || !body?.success) {
      throw new ApiError(
        buildErrorMessage(res.status, body),
        res.status,
        Array.isArray(body?.errors) ? body.errors : []
      );
    }

    return body as ContactSuccessResponse;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;

    if (err?.name === "AbortError") {
      throw new ApiError("Request time out ho gayi. Internet check karke dobara try karo.");
    }
    throw new ApiError("Server se connect nahi ho paya. Internet check karo.");
  } finally {
    clearTimeout(timeoutId);
  }
};

/* ------------------------------------------------------------------ */
/* API: CPanel (login ke baad, Bearer token ke saath)             */
/* ------------------------------------------------------------------ */

/** CPanel table / popup me dikhne wala record */
export interface ContactRecord {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  village: string;
  address: string;
  pincode: string;
  state: string;
  district: string;
  block: string;
  education: string;
  occupation: string;
  phone: string;
  email: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactListResult {
  contacts: ContactRecord[];
  total: number;
  unread: number;
  page: number;
  pages: number;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Backend ki raw row (full_name, father_name, ...) -> ContactRecord */
const normalizeContact = (r: any): ContactRecord => ({
  id: String(r.id),
  name: str(r.full_name) || str(r.name),
  fatherName: str(r.father_name),
  motherName: str(r.mother_name),
  village: str(r.village),
  address: str(r.address),
  pincode: str(r.pincode),
  state: str(r.state),
  district: str(r.district),
  block: str(r.block),
  education: str(r.education),
  occupation: str(r.occupation),
  phone: str(r.contact_number) || str(r.phone),
  email: str(r.email),
  is_read: str(r.status).toLowerCase() !== STATUS_NEW,
  created_at: r.created_at,
});

/** Token ke saath request (CPanel ke liye) */
async function authFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const token = localStorage.getItem(TOKEN_KEY);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });

    let body: any = null;
    try {
      body = await res.json();
    } catch {
      // response JSON nahi tha
    }

    if (res.status === 401 || res.status === 403) {
      throw new ApiError("Session expire ho gaya. Dobara login karo.", res.status);
    }
    if (!res.ok || body?.success === false) {
      throw new ApiError(body?.message || "Request fail ho gayi.", res.status);
    }
    return body as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    if (err?.name === "AbortError") {
      throw new ApiError("Request time out ho gayi. Internet check karke dobara try karo.");
    }
    throw new ApiError("Server se connect nahi ho paya. Internet check karo.");
  } finally {
    clearTimeout(timeoutId);
  }
}

/** GET /api/contact?page=&limit=&search=&status=new */
export const fetchContacts = async (opts: {
  page: number;
  q?: string;
  unreadOnly?: boolean;
}): Promise<ContactListResult> => {
  const params = new URLSearchParams({ page: String(opts.page), limit: "20" });
  if (opts.q) params.set("search", opts.q);
  if (opts.unreadOnly) params.set("status", STATUS_NEW);

  const res = await authFetch<{
    data: any[];
    unread?: number;
    pagination: { total: number; page: number; totalPages: number };
  }>(`/contact?${params.toString()}`);

  return {
    contacts: (res.data || []).map(normalizeContact),
    total: res.pagination.total,
    unread: res.unread ?? 0,
    page: res.pagination.page,
    pages: res.pagination.totalPages || 1,
  };
};

/** PATCH /api/contact/:id/status */
export const updateContactRead = (id: string, is_read: boolean) =>
  authFetch(`/contact/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: is_read ? STATUS_READ : STATUS_NEW }),
  });

/** DELETE /api/contact/:id */
export const deleteContact = (id: string) =>
  authFetch(`/contact/${id}`, { method: "DELETE" });