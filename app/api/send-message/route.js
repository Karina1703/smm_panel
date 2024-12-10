import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

async function sendSupportEmail(params) {
  const {
    subject,
    message,
    email,
    "first-name": firstName,
    "last-name": lastName,
  } = params;
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    to: process.env.SUPPORT_EMAIL,
    from: process.env.EMAIL_FROM,
    subject: `RE: ${subject}`,
    text: text({ firstName, lastName, email, message }),
    html: html({ firstName, lastName, email, message }),
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params) {
  const { firstName, lastName, email, message } = params;

  const brandColor = "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        New ticket from <strong>${firstName} ${lastName} (${email})</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        ${message}
      </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 10px; border-radius: 12px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #5e341d; background: #f7c348;">
        Do not click on links or open attachments if you are not sure of their security.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text(params) {
  const { firstName, lastName, email, message } = params;

  return `A new request via the contact us page from ${firstName} ${lastName} (${email}): ${message}`;
}

export async function POST(request) {
  const req = await request.json();
  await sendSupportEmail(req);

  return NextResponse.json(req, { status: 200 });
}
