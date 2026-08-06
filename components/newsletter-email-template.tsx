import {
  contactEmail,
  instagramHandle,
  instagramUrl,
  organizerName,
} from "@/utils/constant/const";

interface NewsletterEmailTemplateProps {
  emailTo: string;
}

const colors = {
  bg: "#f7f5f0",
  dark: "#212c23",
  white: "#ffffff",
  gold: "#a38f65",
  border: "#e5decb",
  text: "#333333",
  textMuted: "#555555",
};

const fontSerif = 'Georgia, "Times New Roman", Times, serif';
const fontSans = 'Helvetica, Arial, "Segoe UI", Roboto, sans-serif';

export function NewsletterEmailTemplate({
  emailTo,
}: NewsletterEmailTemplateProps) {
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
                <tr>
                  <td
                    align="center"
                    style={{
                      backgroundColor: colors.dark,
                      padding: "40px 24px 48px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "48px",
                        height: "2px",
                        backgroundColor: colors.gold,
                      }}
                    />
                    <h1
                      style={{
                        fontFamily: fontSerif,
                        fontSize: "32px",
                        fontWeight: 400,
                        color: colors.white,
                        margin: "24px 0 0",
                      }}
                    >
                      Welcome to Beyond Norms.
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: "32px 32px 40px" }}>
                    <p
                      style={{
                        margin: "0 0 20px",
                        fontFamily: fontSans,
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: colors.text,
                      }}
                    >
                      You&apos;re now part of our community at{" "}
                      <strong>{emailTo}</strong>.
                    </p>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontFamily: fontSans,
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: colors.text,
                      }}
                    >
                      We&apos;ll keep you updated about new experiences,
                      intimate dinners, curated encounters, artist moments, and
                      invitations worth opening.
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ borderTop: `1px solid ${colors.border}` }}
                    >
                      <tbody>
                        <tr>
                          <td style={{ paddingTop: "24px" }}>
                            <p
                              style={{
                                margin: 0,
                                fontFamily: fontSerif,
                                fontSize: "22px",
                                lineHeight: "1.4",
                                color: colors.dark,
                              }}
                            >
                              No noise. Just upcoming dates, meaningful
                              moments, and the beginning of something more
                              human.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

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
                        margin: "0 0 12px",
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
                      Organized by {organizerName}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
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
