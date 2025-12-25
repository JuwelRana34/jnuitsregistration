"use server";
import { MemberSchema } from "@/app/constants/data";
import { google } from "googleapis";
import z from "zod";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";

export type MemberType = z.infer<typeof MemberSchema>;

export async function addMemberToSheet(data: MemberType) {
  if (
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEET_ID ||
    !process.env.SMTP_EMAIL ||
    !process.env.SMTP_PASSWORD
  ) {
    throw new Error(" env variables are missing");
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:Z",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.name,
            data.email,
            data.phone,
            data.whatsapp_number ?? "",
            data.gender,
            data.studentId,
            "pending", // status
            data.department,
            data.batch,

            data.tech_skills.join(", "),
            data.soft_skills.join(", "),

            data.photoUrl ?? "",
            data.paymentPhotoUrl ?? "",

            data.transaction_id,

            data.join_facebook ? "Yes" : "No",
            data.join_whatsapp ? "Yes" : "No",
            data.join_whatsapp_community ? "Yes" : "No",
            data.facebook_link ?? "",
            data.linkedin_link ?? "",
            new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
            data.why_join_us,
            data.agreeEmail ? "Yes" : "No",
          ],
        ],
      },
    });

    // send confirmation email
    if (data.agreeEmail) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"JNU IT Society" <jnuitsbd@gmail.com>`,
        to: data.email,
        subject: "Application Received - Jagannath University IT Society",
        html: `
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    

    <div style="text-align: center; padding: 20px 15px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">

      <img src="https://res.cloudinary.com/dbwbwwteo/image/upload/v1742463559/MainLogo.8e23e303_uzxovz.png" alt="JNU IT Society Logo" style="max-width: 120px; height:auto; display: block; margin: 0 auto;">
    </div>

    <div style="padding: 20px 25px;">
      <h1 style="color: #1e293b; margin-top: 0; margin-bottom: 24px; font-size: 22px; font-weight: 700; text-align: left;">Application Received</h1>
      
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear <strong>${
        data.name
      }</strong>,</p>

      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Thank you for your interest in joining the <strong>Jagannath University IT Society</strong>. We are pleased to confirm that we have successfully received your application and payment details.
      </p>


      <div style="background-color: #f8fafc; border-left: 4px solid #2563EB; padding: 10px; margin: 20px 0; border-radius: 0 3px 3px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 3px 0; color: #64748b; font-size: 14px; width: 140px; font-weight: 500;">Student ID:</td>
            <td style="padding: 3px 0; color: #0f172a; font-weight: 600; font-size: 14px;">${
              data.studentId
            }</td>
          </tr>
          <tr>
            <td style="padding: 3px 0; color: #64748b; font-size: 14px; font-weight: 500;">Transaction ID:</td>
            <td style="padding: 3px 0; color: #0f172a; font-weight: 600; font-size: 14px;">${
              data.transaction_id
            }</td>
          </tr>
          <tr>
            <td style="padding: 3px 0; color: #64748b; font-size: 14px; font-weight: 500;">Department:</td>
            <td style="padding: 3px 0; color: #0f172a; font-weight: 600; font-size: 14px;">${
              data.department
            }</td>
          </tr>
        </table>
      </div>

      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
        Your application is currently under review by our executive committee. If your profile is shortlisted, you will receive a follow-up email outlining the <strong>next steps</strong> of the selection process.
      </p>

      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
        We appreciate your patience during this time.
      </p>

      <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
        <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0;">
          Best regards,<br>
          <span style="color: #0f172a; font-weight: 600;">The JNU IT Society Team</span>
        </p>
      </div>
    </div>


    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.5;">
        &copy; ${new Date().getFullYear()} Jagannath University IT Society. All rights reserved.
      </p>
      <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0; line-height: 1.5;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  </div>
`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to:", data.email);
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error };
  }
}

export async function getUsers() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // ২. ডাটা রিড করা (values.get)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A2:V",
    });

    // ৩. ডাটা রিটার্ন করা
    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // অ্যারে থেকে অবজেক্টে কনভার্ট করা
    const users = rows.map((row) => ({
      name: row[0] || "",
      photo: row[11] || "",
      email: row[1] || "",
      phone: row[2] || "",
      TNXid: row[13] || "",
      batch: row[8] || "",
      createdAt: row[19] || "",
      status: row[6] || "",
    }));

    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}



export async function revalidateUserList() {
  "use server";
  // change "/admin/dashboard" to the actual URL path of your admin page
  revalidatePath("/admin"); 
}