import { Resend } from "resend";
import  EmailTemplate  from "@/components/email-template";
import { NewsletterEmailTemplate } from "@/components/newsletter-email-template";
import SaleNotificationEmail from "@/components/sale-notification-email";
import { saleNotificationEmail } from "@/utils/constant/const";


const resendSecretKey = process.env.NEXT_RESEND_SECRET_KEY!
const resend = new Resend(resendSecretKey)
const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM!

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

      const { data, error } = await resend.emails.send({
        from: emailFrom,
        to: [mailTo],
        subject: 'Welcome to BeyondNorms — booking confirmed',
        react: EmailTemplate({ emailTo: mailTo, customerName, eventDate, eventYear, orderId })
    });

    if(error){
        console.log("Houve um erro ao enviar confirmação: ", error)
        return
    }

    console.log("Email enviado com sucesso: ", data)

    } catch(err){
        console.log("ERRO NO ENVIO DE EMAIUL: ", err)
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
      return;
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
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: [mailTo],
      subject: "Welcome to Beyond Norms community",
      react: NewsletterEmailTemplate({ emailTo: mailTo }),
    });

    if (error) {
      console.log("Houve um erro ao enviar confirmação da newsletter: ", error);
      return;
    }

    console.log("Email de newsletter enviado com sucesso: ", data);
  } catch (err) {
    console.log("ERRO NO ENVIO DE EMAIL DA NEWSLETTER: ", err);
    throw new Error("Houve um erro ao enviar email de confirmação da newsletter");
  }
};
