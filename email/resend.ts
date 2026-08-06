import { Resend } from "resend";
import  EmailTemplate  from "@/components/email-template";
import { NewsletterEmailTemplate } from "@/components/newsletter-email-template";


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
