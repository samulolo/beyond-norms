import { Resend } from "resend";
import  EmailTemplate  from "@/components/email-template";


const resendSecretKey = process.env.NEXT_RESEND_SECRET_KEY!
const resend = new Resend(resendSecretKey)

export const sendEmailConfirmation = async function(
  mailTo: string,
  customerName?: string,
  eventDate?: string,
  eventYear?: string,
){

    if (!mailTo){
        throw new Error("O email do cliente é obrigatório")
    }

    try {

      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['eliseufranco26@gmail.com'],
        subject: 'Hello world',
        react: EmailTemplate({ emailTo: mailTo, customerName, eventDate, eventYear })
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