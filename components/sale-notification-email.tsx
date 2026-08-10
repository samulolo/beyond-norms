import { organizerName } from "@/utils/constant/const";

interface SaleNotificationEmailProps {
  customerName?: string;
  customerEmail: string;
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

export default function SaleNotificationEmail({
  customerName = "A guest",
  customerEmail,
  customerPhone,
  eventDate = "Oct 15",
  eventYear = "2026",
  orderId = "12345",
  amountTotal,
  dietaryRestrictions = [],
  dietaryOther,
  hasAllergies = false,
  allergyDetails,
}: SaleNotificationEmailProps) {
  const dietaryList = [...dietaryRestrictions, ...(dietaryOther ? [dietaryOther] : [])];

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
                      New booking received.
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
                      Hi team,
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
                      We just received a new purchase from{" "}
                      <strong style={{ color: colors.black }}>
                        {customerName}
                      </strong>
                      . Here are the details.
                    </p>

                    {/* Booking card */}
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
                          <td style={{ padding: "12px 24px 24px" }}>
                            <table
                              role="presentation"
                              width="100%"
                              cellPadding={0}
                              cellSpacing={0}
                            >
                              <tbody>
                                <DetailRow label="Customer" value={customerName} />
                                <DetailRow label="Email" value={customerEmail} />
                                {customerPhone && (
                                  <DetailRow label="Phone" value={customerPhone} />
                                )}
                                <DetailRow
                                  label="Event date"
                                  value={`${eventDate}, ${eventYear}`}
                                />
                                {amountTotal && (
                                  <DetailRow label="Amount paid" value={amountTotal} />
                                )}
                                <DetailRow
                                  label="Dietary restrictions"
                                  value={dietaryList.length ? dietaryList.join(", ") : "None"}
                                />
                                <DetailRow
                                  label="Allergies"
                                  value={
                                    hasAllergies
                                      ? allergyDetails || "Yes (no details given)"
                                      : "None reported"
                                  }
                                />
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: "32px 24px 0" }}>
                    <HorizontalRule />
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
                        margin: 0,
                        fontFamily: fontSans,
                        fontSize: "12px",
                        color: colors.textMuted,
                      }}
                    >
                      Internal notification &middot; Organized by {organizerName}
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
