interface EmailTemplateProps {
  emailTo: string;
  customerName?: string;
  orderId?: string;
  eventDate?: string;
  eventYear?: string;
  ticketPrice?: string | number;
}

const colors = {
  bg: "#f7f5f0",
  dark: "#18231c",
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

export default function EmailTemplate({
  emailTo,
  customerName = "there",
  orderId = "12345",
  eventDate = "Oct 15",
  eventYear = "2026",
  ticketPrice = "85.00",
}: EmailTemplateProps) {
  return (
    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        backgroundColor: colors.bg,
        margin: 0,
        padding: 0,
      }}
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
                      Welcome to the community.
                    </h1>
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
                      Hi {customerName},
                    </p>

                    <p
                      style={{
                        margin: "0 0 20px",
                        fontFamily: fontSans,
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: colors.text,
                      }}
                    >
                      We&apos;ve saved your spot,{" "}
                      <strong style={{ color: colors.black }}>{emailTo}</strong>.
                      You&apos;re officially part of BeyondNorms &mdash; get
                      ready for real people, real emotions, and real
                      connections.
                    </p>

                    <p
                      style={{
                        margin: "0 0 32px",
                        fontFamily: fontSans,
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: colors.text,
                      }}
                    >
                      Keep an eye on your inbox &mdash; we&apos;ll be in touch
                      with everything you need before the night.
                    </p>

                    {/* Ticket card */}
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
                              Full Evening Access
                            </h2>
                            <p
                              style={{
                                fontFamily: fontSans,
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                color: colors.goldMuted,
                                margin: "4px 0 0",
                              }}
                            >
                              Confirmation #{orderId}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "16px 24px 0" }}>
                            <HorizontalRule />
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "12px 24px 0" }}>
                            <table
                              role="presentation"
                              width="100%"
                              cellPadding={0}
                              cellSpacing={0}
                            >
                              <tbody>
                                <DetailRow
                                  label="Location"
                                  value="Rooftop Ferroviário, Lisbon"
                                />
                                <DetailRow
                                  label="Date"
                                  value={`${eventDate}, ${eventYear}`}
                                />
                                <DetailRow
                                  label="Soul Speed Dating"
                                  value="07:00 PM – 08:30 PM"
                                />
                                <DetailRow
                                  label="Dinner Show & Surprise Artists"
                                  value="08:30 PM – 10:30 PM"
                                />
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "20px 24px 0" }}>
                            <HorizontalRule />
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "20px 24px 24px" }}>
                            <table
                              role="presentation"
                              width="100%"
                              cellPadding={0}
                              cellSpacing={0}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily: fontSans,
                                      fontSize: "14px",
                                      color: colors.textMuted,
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Individual ticket
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: fontSerif,
                                      fontSize: "24px",
                                      color: colors.dark,
                                      textAlign: "right",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    &euro;{ticketPrice}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
