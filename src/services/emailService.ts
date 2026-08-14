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
};

type SendReadinessEmailResult = {
  success: boolean;
  mode: "resend";
  error?: string;
};

export async function sendReadinessScoreEmail(
  payload: ReadinessEmailPayload,
): Promise<SendReadinessEmailResult> {
  try {
    const response = await fetch("/api/send-readiness.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    if (!response.ok) {
      return {
        success: false,
        mode: "resend",
        error: result?.error || "We could not send your report. Please try again.",
      };
    }

    return { success: true, mode: "resend" };
  } catch (error) {
    return {
      success: false,
      mode: "resend",
      error:
        error instanceof Error
          ? error.message
          : "We could not send your report. Please try again.",
    };
  }
}
