const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export async function submitContactForm(formData: Record<string, any>) {
  // Frontend → Backend field mapping
  const payload = {
    full_name: formData.name,
    father_name: formData.fatherName,
    mother_name: formData.motherName || null,
    village: formData.village,
    address: formData.address,
    pincode: formData.pincode,
    state: formData.state,
    district: formData.district,
    block: formData.block,
    education: formData.education,
    occupation: formData.occupation,
    contact_number: formData.phone,
    email: formData.email || null,
    website: formData.website || "", // honeypot
  };

  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error: any = new Error(
      result.message || "Form submit nahi ho paya."
    );
    error.status = response.status;
    error.details = result.missingFields || [];
    throw error;
  }

  return result;
}