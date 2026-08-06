"use server";

import { sendNewsletterConfirmation } from "@/email/resend";
import { createClient } from "@/supabase/server";

type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

const newsletterTable = "newsletter";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeToNewsletter(
  _previousState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return {
      status: "error",
      message: "Please add your email address.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please add a valid email address.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from(newsletterTable).insert({ email });

    if (error && error.code !== "23505") {
      console.log("Erro ao guardar subscrição da newsletter: ", error);
      return {
        status: "error",
        message: "We couldn't save your subscription. Please try again.",
      };
    }

    await sendNewsletterConfirmation(email);

    return {
      status: "success",
      message:
        error?.code === "23505"
          ? "You're already in the community. Check your inbox for confirmation."
          : "You're in the community. Check your inbox for confirmation.",
    };
  } catch {
    return {
      status: "error",
      message: "We couldn't confirm your subscription. Please try again.",
    };
  }
}
