"use server";
import { google } from "googleapis";
export async function couponVerify(couponCode: string) {
  const validCoupons: Record<string, number> = {
    "arefin.saida10384@gmail.com": 200,
    "khadijarimi00@gmail.com": 200,
    "piyushsaha140@gmail.com": 200,
    "jabedhossenchowdhury@gmail.com": 200,
    "mail.mohammedmahin@gmail.com": 200,
    "sagoruddin.s91@gmail.com": 200,
    "khadijaalom6428@gmail.com": 200,
    "mahadibac@gmail.com": 200,
    "oneaccraiyans@gmail.com": 200,
    "asif.rskh@gmail.com": 200,
    "samiranowrinmeem@gmail.com": 200,
    "mstmahfuzaker581@gmail.com": 200,
    "mahmudkayes327@gmail.com": 200,
    "abirrahaman091@gmail.com": 200,
    "b230401004@eco.jnu.ac.bd": 200,
    "showmitro.info@gmail.com": 200,
    "mdsamiulhossain04@gmail.com": 200,
    "safinarafat66@gmail.com": 200,
    "labibajahin3328@gmail.com": 200,
    "Paul.priya560@gmail.com": 200,
    "aroshi.ruhi@gmail.com": 200,
    "khalidvai229@gmail.com": 200,
    "siamkhanshahik@gmail.com": 200,
    "nusheramehzabin17@gmail.com": 200,
    "rished.mkt.jnu24@gmail.com": 200,
    "farjanajui206@gmail.com": 200,
    "aanikaa.rh@gmail.com": 200,
    "srabon009800098@gmail.com": 200,
    "mstmoumitajahanami@gmail.com": 200,
    "fahima.st.roots@gmail.com": 200,
    "b230401047@eco.jnu.ac.bd": 200,
    "mariakabir202@gmail.com": 200,
    "njfaharin333@gmail.com": 200,
    "nishitaafrose1@gmail.com": 200,
    "fahim.habib015@gmail.com": 200,
    "mazharulislammusa276@gmail.com": 200,
    "2limaakter04@gmail.com": 200,
    "shrabonmolla007@gmail.com": 200,
    "jahansanjida522@gmail.com": 200,
    "barmanujjalchandra@gmail.com": 200,
    "nusratsarowerjahan22@gmail.com": 200,
    "srizon180@gmail.com": 200,
    "abunasirminhaz@gmail.com": 200,
    "mahfuznahid41@gmail.com": 200,
    "moumita134890@gmail.com": 200,
    "Imranhossenrubel045@gmail.com": 200,
    "shamima78563@gmail.com": 200,
    "mueed5005@gmail.com": 200,
    "mahadi.mktjnu24@gmail.com": 200,
    "sharifuddinsiyem2004@gmail.com": 200
}

if (
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEET_ID 
  ) {
    throw new Error("env variables are missing");
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
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // ১. শিটের সব ডেটা নিয়ে আসি
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "bccRegistration!A:Z",
    });

    const rows = existingData.data.values || [];
// ১. আগে চেক করি কুপনটি ইতিমধ্যে ব্যবহার হয়েছে কিনা (Used Check)
    // আমরা find ব্যবহার করছি যাতে লুপের মতো কাজ করে এবং ম্যাচ পেলে থামে
    const isAlreadyUsed = rows.find((row) => row[16] === couponCode);

    if (isAlreadyUsed) {
      return {
        isValid: false,
        discount: `The "${couponCode}" coupon is already used!`,
      };
    }

    // ২. যদি ব্যবহার না হয়ে থাকে, তাহলে চেক করি এটি ভ্যালিড কুপন কিনা (Validity Check)
    // এটি লুপের বাইরে হতে হবে
    if (validCoupons[couponCode] !== undefined) {
      return { 
        isValid: true, 
        discount: validCoupons[couponCode] 
      };
    }

    // ৩. যদি ভ্যালিড লিস্টেও না থাকে
    return { 
        isValid: false, 
        discount: "Invalid Coupon Code" 
    };

  } catch (error) {
    console.error("Error verifying coupon:", error);
    return { isValid: false };
  }
  
}