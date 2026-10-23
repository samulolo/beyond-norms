import type { CSSProperties, ReactNode } from "react";

import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneHref,
  eventAddress,
  instagramHandle,
  instagramUrl,
  organizerName,
} from "@/utils/constant/const";

const colors = {
  bg: "#f7f5f0",
  dark: "#212c23",
  white: "#ffffff",
  gold: "#a38f65",
  goldLight: "#c8b288",
  goldMuted: "#b59253",
  border: "#e5decb",
  text: "#333333",
  textMuted: "#555555",
  black: "#000000",
};

const fontSerif = 'Georgia, "Times New Roman", Times, serif';
const fontSans = 'Helvetica, Arial, "Segoe UI", Roboto, sans-serif';

const paragraph: CSSProperties = {
  margin: "0 0 20px",
  fontFamily: fontSans,
  fontSize: "16px",
  lineHeight: "1.6",
  color: colors.text,
};

function P({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ ...paragraph, ...style }}>{children}</p>;
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: "8px 0 28px",
        fontFamily: fontSerif,
        fontSize: "22px",
        lineHeight: "1.4",
        color: colors.dark,
      }}
    >
      {children}
    </p>
  );
}

function HorizontalRule() {
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td
            style={{
              borderTop: `1px solid ${colors.border}`,
              fontSize: 0,
              lineHeight: 0,
            }}
          >
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function GoldLine() {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      style={{ margin: "0 auto" }}
    >
      <tbody>
        <tr>
          <td
            width={48}
            height={2}
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: colors.gold,
              fontSize: 0,
              lineHeight: 0,
            }}
          >
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function ThankYouEmailTemplate() {
  return (
    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{ backgroundColor: colors.bg, margin: 0, padding: 0 }}
    >
      <tbody>
        <tr>
          <td align="center" style={{ padding: "40px 16px" }}>
            <table
              role="presentation"
              width="600"
              cellPadding={0}
              cellSpacing={0}
              style={{
                width: "100%",
                maxWidth: "600px",
                backgroundColor: colors.bg,
              }}
            >
              <tbody>
                {/* Header */}
                <tr>
                  <td
                    align="center"
                    style={{
                      backgroundColor: colors.dark,
                      padding: "40px 24px 48px",
                      textAlign: "center",
                    }}
                  >
                    <GoldLine />
                    <h1
                      style={{
                        fontFamily: fontSerif,
                        fontSize: "32px",
                        fontWeight: 400,
                        letterSpacing: "0.5px",
                        color: colors.white,
                        margin: "24px 0 0",
                      }}
                    >
                      Thank you.
                    </h1>
                    <p
                      style={{
                        fontFamily: fontSans,
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: colors.goldLight,
                        margin: "12px 0 0",
                      }}
                    >
                      The first Beyond Norms experience
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "32px 32px 40px" }}>
                    <p
                      style={{
                        margin: "0 0 20px",
                        fontFamily: fontSans,
                        fontSize: "18px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      Dear Beyond Norms Family,
                    </p>

                    <Highlight>
                      Some evenings come and go. Others mark the beginning of
                      something extraordinary.
                    </Highlight>

                    <P>
                      Yesterday, October 29th, we came together at Ferroviário
                      in Lisbon for the very first Beyond Norms experience.
                    </P>
                    <P>
                      And today, I simply want to say{" "}
                      <strong style={{ color: colors.black }}>THANK YOU</strong>.
                      ❤️
                    </P>
                    <P>
                      Thank you for your presence, your trust, your openness,
                      and most importantly, for bringing your unique energy to
                      this first chapter of our journey.
                    </P>
                    <P>
                      Beyond Norms was born from a simple belief: in a world
                      where we are more connected than ever, genuine human
                      connections have never been more precious.
                    </P>
                    <P>
                      Through Soul Speed Dating, shared conversations, dinner,
                      music, and live performances, we wanted to create more
                      than just an event. We wanted to create a space where
                      people could connect beyond appearances, expectations, and
                      social labels.
                    </P>
                    <P style={{ marginBottom: "8px" }}>
                      But what truly made this evening special wasn&apos;t the
                      concept, the venue, or the performances.
                    </P>

                    <Highlight>It was YOU.</Highlight>

                    <P>
                      Your smiles, your conversations, your curiosity, and your
                      willingness to embrace something different gave Beyond
                      Norms its true meaning.
                    </P>
                    <P>
                      You were not simply guests. You became part of the
                      beginning of a new community.
                    </P>
                    <P>
                      <strong style={{ color: colors.black }}>
                        And this is only the first chapter.
                      </strong>
                    </P>
                    <P>
                      Our ambition is to continue creating unique experiences
                      that bring people together, celebrate individuality, and
                      inspire authentic human connections.
                    </P>
                    <P style={{ marginBottom: "32px" }}>
                      We hope that you left with more than memories &mdash;
                      perhaps a new friendship, an unexpected connection, a
                      fresh perspective, or simply the feeling of having been
                      part of something meaningful.
                    </P>

                    {/* Feedback card */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ border: `1px solid ${colors.goldLight}` }}
                    >
                      <tbody>
                        <tr>
                          <td style={{ padding: "24px 24px 0" }}>
                            <h2
                              style={{
                                fontFamily: fontSerif,
                                fontSize: "22px",
                                fontWeight: 400,
                                color: colors.dark,
                                margin: 0,
                              }}
                            >
                              We would love to hear from you.
                            </h2>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "16px 24px 0" }}>
                            <HorizontalRule />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "16px 24px 0" }}>
                            {[
                              "What was your favourite moment?",
                              "How did the experience make you feel?",
                              "What would you love to discover at our next event?",
                            ].map((question) => (
                              <p
                                key={question}
                                style={{
                                  margin: "0 0 10px",
                                  fontFamily: fontSans,
                                  fontSize: "15px",
                                  lineHeight: "1.5",
                                  color: colors.dark,
                                }}
                              >
                                <span style={{ color: colors.goldMuted }}>
                                  &mdash;&nbsp;
                                </span>
                                {question}
                              </p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "6px 24px 0" }}>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: fontSans,
                                fontSize: "14px",
                                lineHeight: "1.6",
                                color: colors.textMuted,
                              }}
                            >
                              Your thoughts and feedback will help us shape the
                              future of Beyond Norms.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "20px 24px 24px" }}>
                            <a
                              href={`mailto:${contactEmail}?subject=${encodeURIComponent("My Beyond Norms experience")}`}
                              style={{
                                display: "inline-block",
                                backgroundColor: colors.dark,
                                color: colors.white,
                                fontFamily: fontSans,
                                fontSize: "13px",
                                fontWeight: 600,
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                padding: "14px 28px",
                              }}
                            >
                              Share your thoughts
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <P style={{ marginTop: "32px" }}>
                      And if this experience touched you, we would be truly
                      grateful if you shared your memories, photos, or stories
                      with your community and helped us spread the Beyond Norms
                      spirit.
                    </P>

                    <Highlight>
                      Because meaningful connections deserve to be shared.
                    </Highlight>

                    <P>
                      From the bottom of my heart, thank you for believing in
                      this vision and for being part of our very first
                      experience.
                    </P>
                    <P style={{ marginBottom: "32px" }}>
                      <strong style={{ color: colors.black }}>
                        This is not the end of an event. It&apos;s the
                        beginning of a movement.
                      </strong>
                    </P>

                    {/* Signature */}
                    <P style={{ marginBottom: "16px" }}>
                      With gratitude and excitement for what&apos;s next,
                    </P>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: fontSerif,
                        fontSize: "22px",
                        color: colors.dark,
                      }}
                    >
                      Nande Vahekeni
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontFamily: fontSans,
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: colors.goldMuted,
                      }}
                    >
                      Founder &amp; CEO &mdash; Beyond Norms
                    </p>
                  </td>
                </tr>

                {/* Tagline */}
                <tr>
                  <td
                    align="center"
                    style={{
                      backgroundColor: colors.dark,
                      padding: "32px 24px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 16px",
                        fontFamily: fontSerif,
                        fontSize: "18px",
                        lineHeight: "1.5",
                        fontStyle: "italic",
                        color: colors.white,
                      }}
                    >
                      We don&apos;t create events. We create moments that bring
                      people closer.
                    </p>
                    <GoldLine />
                    <p
                      style={{
                        margin: "16px 0 0",
                        fontFamily: fontSans,
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: colors.goldLight,
                      }}
                    >
                      Beyond Norms &mdash; Beyond Expectations. Beyond
                      Connections.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    align="center"
                    style={{ padding: "24px 24px 40px", textAlign: "center" }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontFamily: fontSans,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.dark,
                      }}
                    >
                      BeyondNorms
                    </p>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
                      Organized by {organizerName}
                    </p>
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
                      {eventAddress}
                    </p>
                    <p
                      style={{
                        margin: "0 0 16px",
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
                      <a
                        href={`tel:${contactPhoneHref}`}
                        style={{ color: colors.textMuted, textDecoration: "none" }}
                      >
                        {contactPhoneDisplay}
                      </a>
                      {" · "}
                      <a
                        href={`mailto:${contactEmail}`}
                        style={{ color: colors.textMuted, textDecoration: "none" }}
                      >
                        {contactEmail}
                      </a>
                      {" · "}
                      <a
                        href={instagramUrl}
                        style={{ color: colors.textMuted, textDecoration: "none" }}
                      >
                        @{instagramHandle}
                      </a>
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: fontSans,
                        fontSize: "11px",
                        color: colors.textMuted,
                      }}
                    >
                      &copy; {new Date().getFullYear()} BeyondNorms. All rights
                      reserved.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
