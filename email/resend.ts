import { Resend } from "resend";
import  EmailTemplate  from "@/components/email-template";
import { NewsletterEmailTemplate } from "@/components/newsletter-email-template";
import SaleNotificationEmail from "@/components/sale-notification-email";
import ThankYouEmailTemplate from "@/components/thank-you-email-template";
import {
  upcomingEventsQrBase64,
  upcomingEventsQrContentId,
} from "@/email/upcoming-events-qr";
import FeedbackNotificationEmail from "@/components/feedback-notification-email";
import {
  feedbackNotificationEmail,
  saleNotificationEmail,
} from "@/utils/constant/const";


let resend: Resend | null = null;

function getEmailConfig() {
  const resendSecretKey = process.env.NEXT_RESEND_SECRET_KEY;
  const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM;

  if (!resendSecretKey) {
    throw new Error("NEXT_RESEND_SECRET_KEY não está configurada");
  }

  if (!emailFrom) {
    throw new Error("NEXT_PUBLIC_EMAIL_FROM não está configurada");
  }

  resend ??= new Resend(resendSecretKey);

  return { emailFrom, resend };
}

export const sendEmailConfirmation = async function(
  mailTo: string,
  customerName?: string,
  eventDate?: string,
  eventYear?: string,
  orderId?: string,
){

    if (!mailTo){
        throw new Error("O email do cliente é obrigatório")
    }

    try {
      const { emailFrom, resend } = getEmailConfig();

      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: [mailTo],
        subject: 'Welcome to BeyondNorms — booking confirmed',
        react: EmailTemplate({ emailTo: mailTo, customerName, eventDate, eventYear, orderId })
    });

    if(error){
        console.log("Houve um erro ao enviar confirmação: ", error)
        throw new Error("A Resend recusou o envio do email de confirmação")
    }

    console.log("Email enviado com sucesso: ", data)

    } catch(err){
        console.log("ERRO NO ENVIO DE EMAIL: ", err)
        throw new Error("Houve um erro ao enviar email de confirmação: ")
    }

}

interface SaleNotificationInput {
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  eventDate?: string;
  eventYear?: string;
  orderId?: string;
  amountTotal?: string;
  dietaryRestrictions?: string[];
  dietaryOther?: string | null;
  hasAllergies?: boolean;
  allergyDetails?: string | null;
}

// Aviso interno de "nova compra recebida", enviado a par do email de
// confirmação do cliente. Falhas aqui não devem impedir o resto do fluxo —
// quem chama trata o erro (ver app/api/stripe/webhook/route.ts).
export const sendSaleNotification = async function (input: SaleNotificationInput) {
  try {
    const { emailFrom, resend } = getEmailConfig();

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [saleNotificationEmail],
      subject: `New purchase — ${input.customerName ?? input.customerEmail}`,
      react: SaleNotificationEmail({
        customerEmail: input.customerEmail,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        eventDate: input.eventDate,
        eventYear: input.eventYear,
        orderId: input.orderId,
        amountTotal: input.amountTotal,
        dietaryRestrictions: input.dietaryRestrictions,
        dietaryOther: input.dietaryOther,
        hasAllergies: input.hasAllergies,
        allergyDetails: input.allergyDetails,
      }),
    });

    if (error) {
      console.log("Houve um erro ao enviar aviso interno de venda: ", error);
      throw new Error("A Resend recusou o envio do aviso interno de venda");
    }

    console.log("Aviso interno de venda enviado com sucesso: ", data);
  } catch (err) {
    console.log("ERRO NO ENVIO DO AVISO INTERNO DE VENDA: ", err);
    throw new Error("Houve um erro ao enviar aviso interno de venda");
  }
};

export const sendNewsletterConfirmation = async function(mailTo: string) {
  if (!mailTo) {
    throw new Error("O email do subscritor é obrigatório");
  }

  try {
    const { emailFrom, resend } = getEmailConfig();

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [mailTo],
      subject: "Welcome to Beyond Norms community",
      react: NewsletterEmailTemplate({ emailTo: mailTo }),
    });

    if (error) {
      console.log("Houve um erro ao enviar confirmação da newsletter: ", error);
      throw new Error("A Resend recusou o envio do email da newsletter");
    }

    console.log("Email de newsletter enviado com sucesso: ", data);
  } catch (err) {
    console.log("ERRO NO ENVIO DE EMAIL DA NEWSLETTER: ", err);
    throw new Error("Houve um erro ao enviar email de confirmação da newsletter");
  }
};

export const sendThankYouEmail = async function (
  mailTo: string,
  subject = "Thank you for being part of our first chapter",
) {
  if (!mailTo) {
    throw new Error("O email do destinatário é obrigatório");
  }

  try {
    const { emailFrom, resend } = getEmailConfig();

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [mailTo],
      subject,
      react: ThankYouEmailTemplate({
        qrSrc: `cid:${upcomingEventsQrContentId}`,
      }),
      attachments: [
        {
          filename: "beyond-norms-qr-code.png",
          content: upcomingEventsQrBase64,
          contentType: "image/png",
          contentId: upcomingEventsQrContentId,
        },
      ],
    });

    if (error) {
      console.log("Houve um erro ao enviar email de agradecimento: ", error);
      throw new Error("A Resend recusou o envio do email de agradecimento");
    }

    console.log("Email de agradecimento enviado com sucesso: ", data);
    return data;
  } catch (err) {
    console.log("ERRO NO ENVIO DO EMAIL DE AGRADECIMENTO: ", err);
    throw new Error("Houve um erro ao enviar email de agradecimento");
  }
};

interface FeedbackNotificationInput {
  name: string;
  email: string;
  message: string;
}

// Aviso interno de "novo feedback" enviado sempre que alguém submete o
// formulário em /feedback. O reply-to é o email da pessoa, para quem
// recebe poder responder diretamente.
export const sendFeedbackNotification = async function (
  input: FeedbackNotificationInput,
  // Por omissão vai para FEEDBACK_NOTIFICATION_EMAIL (o Nande). Só se passa
  // outro destino em testes.
  to: string = feedbackNotificationEmail,
) {
  try {
    const { emailFrom, resend } = getEmailConfig();

    const submittedAt = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Lisbon",
    }).format(new Date());

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [to],
      replyTo: input.email,
      subject: `New feedback — ${input.name}`,
      react: FeedbackNotificationEmail({ ...input, submittedAt }),
    });

    if (error) {
      console.log("Houve um erro ao enviar aviso de feedback: ", error);
      throw new Error("A Resend recusou o envio do aviso de feedback");
    }

    console.log("Aviso de feedback enviado com sucesso: ", data);
  } catch (err) {
    console.log("ERRO NO ENVIO DO AVISO DE FEEDBACK: ", err);
    throw new Error("Houve um erro ao enviar aviso de feedback");
  }
};
