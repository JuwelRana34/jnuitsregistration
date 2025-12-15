"use server";
import { MemberSchema } from "@/app/constants/data";
import { google } from "googleapis";
import z from "zod";

export type MemberType = z.infer<typeof MemberSchema>;
export async function addMemberToSheet(data: MemberType) {
  if (
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    throw new Error("Google Sheets env variables are missing");
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
            new Date().toLocaleString(), // created_at
            data.why_join_us,
            data.agreeEmail ? "Yes" : "No",

          ],
        ],
      },
    });

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
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // ২. ডাটা রিড করা (values.get)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Sheet1!A2:V',
    });

    // ৩. ডাটা রিটার্ন করা
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }

    // অ্যারে থেকে অবজেক্টে কনভার্ট করা 
    const users = rows.map((row) => ({
      name: row[0] || '',
      email: row[1] || '',
      phone: row[2] || '',
      TNXid: row[7] || '',
      batch: row[8] || '',
      createdAt: row[19] || '',
      status: row[6] || '',
    }));

    return users;

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}