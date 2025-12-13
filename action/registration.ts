"use server";

import { google } from "googleapis";

export type MemberData = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  TNXid: string;
  address?: string;
};

export async function addMemberToSheet(data: MemberData) {
     if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
    throw new Error("Google Sheets env variables are missing");
  }

  try {
    const auth = new google.auth.GoogleAuth({
        credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // নিউলাইন ফিক্স
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }
    );

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.name,
            data.email,
            data.phone,
            data.gender,
            data.address ?? "",
            new Date().toLocaleString(),
            "pending",
            data.TNXid,
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



// app/actions.js
// ... আগের ইমপোর্টগুলো থাকবে ...

export async function getUsers() {
  try {
    // ১. অথেনটিকেশন (আগের মতোই)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // ২. ডাটা রিড করা (values.get)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2:I', // A2 দিয়ে শুরু করেছি যাতে হেডার (Name, Email...) বাদ যায়
    });

    // ৩. ডাটা রিটার্ন করা
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }

    // অ্যারে থেকে অবজেক্টে কনভার্ট করা (ফ্রন্টএন্ডে ব্যবহারের সুবিধার জন্য)
    const users = rows.map((row) => ({
      name: row[0] || '',
      email: row[1] || '',
      phone: row[2] || '',
      TNXid: row[7] || '',
      batch: row[8] || '',
      createdAt: row[5] || '',
      status: row[6] || '',
    }));

    return users;

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}