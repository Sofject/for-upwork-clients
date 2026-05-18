// @ts-nocheck

"use server";

export async function submitContactForm(_: any, formData: FormData) {
  const portalId = process.env.PORTAL_ID;
  const formId = process.env.CONTACT_FORM_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const name = formData.get("name");
  const email = formData.get("email");
  const countryDialCode = formData.get("country-dial-code");
  const phone = formData.get("phone-number");
  const countryName = formData.get("country-name");
  const company = formData.get("company");
  const pageName = formData.get("page-name") ?? "";
  const pageUri = formData.get("page-uri") ?? "";

  const payload = {
    fields: [
      { name: "email", value: email },
      { name: "firstname", value: name },
      { name: "country_dial_code", value: countryDialCode },
      { name: "phone", value: `${countryDialCode}${phone}` },
      { name: "country_", value: countryName },
      { name: "company", value: company },
    ],
    context: {
      pageUri: `${baseUrl}${pageUri}`,
      pageName: `${pageName}`,
    },
  };

  const hubspotResponse = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  
  const hubspotData = await hubspotResponse.json();

  // Send to webhook regardless of HubSpot submission status
  try {
    const webhookResponse = await fetch(
      `https://example.net/webhook/leads/forms`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    
    const webhookData = await webhookResponse.json();
    
    if (!webhookResponse.ok) {
      console.error("Webhook error:", webhookData.message || webhookData?.errors?.[0]?.message || "Unknown webhook error");
    }
  } catch (error) {
    console.error("Error sending data to webhook:", error);
  }

  if (!hubspotResponse.ok) {
    return { status: "error", message: hubspotData.message || hubspotData?.errors[0]?.message };
  }

  return { status: "success", message: hubspotData.inlineMessage };
}
