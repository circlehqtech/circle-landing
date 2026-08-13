import emailjs from "@emailjs/browser";

export type ReadinessEmailPayload = {
  user_name: string;
  user_email: string;
  user_phone?: string;
  user_company?: string;
  total_score: number;
  max_score: number;
  tier_name: string;
  tier_desc: string;
  insights: string[];
  company_email?: string;
};

export async function sendReadinessScoreEmail(
  payload: ReadinessEmailPayload,
): Promise<{
  success: boolean;
  mode: "emailjs" | "web3forms" | "mailto";
  error?: string;
}> {
  // EmailJS Credentials
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

  // Web3Forms access key
  const web3FormsKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    "8ac746da-7f0c-4977-9804-816050ebae7b";

  const formattedInsights = payload.insights
    .map((item, idx) => `${idx + 1}. ${item}`)
    .join("\n");

  const emailSubject = `Your AI Readiness Score: ${payload.total_score}/${payload.max_score} (${payload.tier_name})`;

  const userMessageBody = `Hello ${payload.user_name || "Valued Leader"},

Thank you for completing the Circle HQ AI Readiness Assessment.

YOUR AI READINESS SCORE: ${payload.total_score} / ${payload.max_score}
STAGE: ${payload.tier_name}

${payload.tier_desc}

KEY OPERATIONAL INSIGHTS:
${formattedInsights}

Contact Details on File:
- Name: ${payload.user_name || "N/A"}
- Email: ${payload.user_email}
- Phone: ${payload.user_phone || "N/A"}
- Company: ${payload.user_company || "N/A"}

Best regards,
Flora Nnamaka & The Circle HQ Team
hello@circlehqcompany.com`;

  const templateParams = {
    to_name: payload.user_name || "Valued Leader",
    to_email: payload.user_email, // EmailJS template 'To Email' variable
    user_name: payload.user_name || "Not provided",
    user_email: payload.user_email,
    user_phone: payload.user_phone || "Not provided",
    user_company: payload.user_company || "Not provided",
    total_score: payload.total_score,
    max_score: payload.max_score,
    tier_name: payload.tier_name,
    tier_desc: payload.tier_desc,
    insights: formattedInsights,
    company_email: payload.company_email || "hello@circlehqcompany.com",
    subject: emailSubject,
    message: userMessageBody,
  };

  try {
    // 1. Primary: EmailJS Integration
    if (publicKey && serviceId && templateId) {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return { success: true, mode: "emailjs" };
    }

    // 2. Secondary: Web3Forms Integration
    if (web3FormsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: payload.user_name || "Valued Leader",
          email: payload.user_email,
          subject: emailSubject,
          from_name: "Circle HQ",
          replyto: payload.user_email,
          message: userMessageBody,
          autoresponder: "yes",
          autoresponder_subject: emailSubject,
          autoresponder_message: userMessageBody,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        return { success: true, mode: "web3forms" };
      }
      console.warn("Web3Forms submission response:", resData);
    }

    // 3. Fallback: Pre-filled Mailto link addressed TO user
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(userMessageBody);
    const mailtoUrl = `mailto:${encodeURIComponent(payload.user_email)}?cc=${encodeURIComponent(payload.company_email || "hello@circlehqcompany.com")}&subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    return { success: true, mode: "mailto" };
  } catch (err) {
    console.error("Failed to send readiness score email via EmailJS:", err);
    return {
      success: false,
      mode: "emailjs",
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}
