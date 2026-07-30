
import { sendEmailConfirmation } from "@/email/resend";

async function main() {
  await sendEmailConfirmation(
    "eliseufranco26@gmail.com",
    "Eliseu",
    "August 20",
    "2026",
  );
}

main();