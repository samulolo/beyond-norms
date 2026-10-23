"use server";

import { sendFeedbackNotification } from "@/email/resend";
import { createClient } from "@/supabase/server";

export type FeedbackState = {
  status: "idle" | "success" | "error";
  message: string;
};

const feedbackTable = "feedback";
const maxNameLength = 100;
const maxEmailLength = 254;
const maxMessageLength = 2000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitFeedback(
  _previousState: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  // Campo escondido (honeypot): pessoas não o veem, bots preenchem-no.
  // Fingimos sucesso para o bot não insistir, mas não gravamos nada.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: "" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) {
    return { status: "error", message: "Please tell us your name." };
  }

  if (!email) {
    return { status: "error", message: "Please add your email address." };
  }

  if (email.length > maxEmailLength || !isValidEmail(email)) {
    return { status: "error", message: "Please add a valid email address." };
  }

  if (!message) {
    return {
      status: "error",
      message: "Please share a few words about your experience.",
    };
  }

  if (name.length > maxNameLength) {
    return {
      status: "error",
      message: `Please keep your name under ${maxNameLength} characters.`,
    };
  }

  if (message.length > maxMessageLength) {
    return {
      status: "error",
      message: `Please keep your message under ${maxMessageLength} characters.`,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from(feedbackTable)
      .insert({ name, email, message });

    if (error) {
      console.log("Erro ao guardar feedback: ", error);
      return {
        status: "error",
        message: "We couldn't save your message. Please try again.",
      };
    }

    // O feedback já está gravado: se o aviso por email falhar, a pessoa
    // continua a ver sucesso e a mensagem não se perde (está no Supabase).
    try {
      await sendFeedbackNotification({ name, email, message });
    } catch (err) {
      console.log("Feedback gravado, mas o aviso por email falhou: ", err);
    }

    return { status: "success", message: "" };
  } catch (err) {
    console.log("Erro ao guardar feedback: ", err);
    return {
      status: "error",
      message: "We couldn't save your message. Please try again.",
    };
  }
}
