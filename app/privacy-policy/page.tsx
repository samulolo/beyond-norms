import type { Metadata } from "next";

import { contactEmail, organizerName } from "@/utils/constant/const";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-serif text-2xl text-primary">{title}</h2>
      <div className="flex flex-col gap-3 font-sans text-sm leading-relaxed text-neutral">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <section className="flex flex-1 flex-col gap-10 bg-tertiary px-8 py-24 lg:px-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="h-px w-10 bg-secondary" />
          <h1 className="font-serif text-4xl text-primary">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-neutral">
            Last updated: July 2026
          </p>
        </div>

        <Section title="Who we are">
          <p>
            This experience is organized by {organizerName}. This policy explains
            what personal data we collect when you book a ticket through
            this website, why we collect it, and what rights you have over
            it. If anything here is unclear, contact us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary underline underline-offset-4 hover:text-secondary"
            >
              {contactEmail}
            </a>
            .
          </p>
        </Section>

        <Section title="What we collect">
          <p>When you book a ticket at /checkout, we collect:</p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="list-disc">
              Full name and phone number, entered directly in our form.
            </li>
            <li className="list-disc">
              Email address, collected by Stripe during payment and passed
              back to us to send your confirmation.
            </li>
            <li className="list-disc">
              The experience date you choose (20 August or 21 September 2026).
            </li>
            <li className="list-disc">
              Dietary restrictions and, if you choose to share them,
              allergy details — used only to prepare the Dinner Show
              catering safely.
            </li>
            <li className="list-disc">
              Payment details, which we never see directly — these are
              collected and processed entirely by Stripe, our payment
              processor.
            </li>
          </ul>
          <p>
            Allergy information can reveal details about your health. We
            treat it as sensitive data: we only ask for it with your
            explicit action (filling in the form), we only use it to brief
            our catering team, and we don&apos;t use it for any other
            purpose.
          </p>
        </Section>

        <Section title="Why we collect it">
          <p>
            We use this data to process your ticket purchase, send you a
            booking confirmation by email, verify your reservation on the
            night of the experience, and — where relevant — accommodate dietary
            restrictions or allergies during the Dinner Show.
          </p>
        </Section>

        <Section title="Who we share it with">
          <p>
            We share data with a small number of service providers, only as
            needed to host this experience:
          </p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="list-disc">
              <span className="text-primary">Stripe</span> — processes your
              payment and collects your email address. Stripe has its own
              privacy policy at{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-secondary"
              >
                stripe.com/privacy
              </a>
              .
            </li>
            <li className="list-disc">
              <span className="text-primary">Resend</span> — sends your
              booking confirmation email on our behalf.
            </li>
            <li className="list-disc">
              <span className="text-primary">Supabase</span> — stores your
              reservation record (name, phone, email, dietary/allergy
              information, experience date) securely in our database.
            </li>
          </ul>
          <p>We do not sell your data, and we do not use it for advertising.</p>
        </Section>

        <Section title="Cookies">
          <p>
            This site does not use marketing or analytics cookies. A small
            technical cookie is used only for the organizer&apos;s
            password-protected admin area — it is not set for regular
            visitors booking a ticket. Stripe&apos;s own checkout page may
            set its own cookies once you&apos;re redirected there, governed
            by Stripe&apos;s privacy policy.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep booking records for as long as reasonably necessary to
            host the experience and meet our accounting and legal obligations,
            and delete or anonymize them afterwards unless we&apos;re
            required to keep them for longer.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under the EU General Data Protection Regulation (GDPR), you can
            ask us to:
          </p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="list-disc">access the data we hold about you;</li>
            <li className="list-disc">
              correct it, if anything is inaccurate;
            </li>
            <li className="list-disc">
              delete it, once it&apos;s no longer needed for the reasons
              above;
            </li>
            <li className="list-disc">
              object to or restrict how we use it.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary underline underline-offset-4 hover:text-secondary"
            >
              {contactEmail}
            </a>
            . You can also lodge a complaint with your national data
            protection authority (in Portugal, the CNPD).
          </p>
        </Section>
      </div>
    </section>
  );
}
