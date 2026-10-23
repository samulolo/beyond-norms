import { organizerName } from "@/utils/constant/const";

interface FeedbackNotificationEmailProps {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td
        style={{
          padding: "8px 0",
          fontFamily: fontSans,
          fontSize: "14px",
          color: colors.textMuted,
          verticalAlign: "top",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "8px 0",
          fontFamily: fontSans,
          fontSize: "14px",
          fontWeight: 600,
          color: colors.dark,
          textAlign: "right",
          verticalAlign: "top",
        }}
      >
        {value}
      </td>
    </tr>
  );
}

export default function FeedbackNotificationEmail({
  name,
  email,
  message,
  submittedAt,
}: FeedbackNotificationEmailProps) {
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
                      New feedback received.
                    </h1>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "32px 32px 40px" }}>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontFamily: fontSans,
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: colors.text,
                      }}
                    >
                      <strong style={{ color: colors.black }}>{name}</strong>{" "}
                      just shared their thoughts on the feedback page.
                    </p>

                    {/* Message */}
                    <table
                      role="presentation"
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ border: `1px solid ${colors.goldLight}` }}
                    >
                      <tbody>
                        <tr>
                          <td style={{ padding: "24px" }}>
                            <p
                              style={{
                                fontFamily: fontSans,
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                color: colors.goldMuted,
                                margin: "0 0 12px",
                              }}
                            >
                              Message
                            </p>
                            <p
                              style={{
                                fontFamily: fontSerif,
                                fontSize: "18px",
                                lineHeight: "1.6",
                                color: colors.dark,
                                margin: 0,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {message}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      role="presentation"
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ marginTop: "20px" }}
                    >
                      <tbody>
                        <DetailRow label="Name" value={name} />
                        <DetailRow label="Email" value={email} />
                        <DetailRow label="Received" value={submittedAt} />
                      </tbody>
                    </table>

                    <p
                      style={{
                        margin: "24px 0 0",
                        fontFamily: fontSans,
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: colors.textMuted,
                      }}
                    >
                      Reply to this email to answer {name} directly.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    align="center"
                    style={{ padding: "0 24px 40px", textAlign: "center" }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: fontSans,
                        fontSize: "11px",
                        color: colors.textMuted,
                      }}
                    >
                      Internal notification &middot; {organizerName}
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
