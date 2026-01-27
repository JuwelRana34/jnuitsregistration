import z from "zod";

/* ------------------
   CONSTANTS
------------------- */
export const TECH_SKILLS = [
  "Computer Basics",
  "Graphics Design",
  "Video Editing",
  "Photography",
  "Web Development",
  "Programming",
  "Microsoft Office",
  "Google Workspace",
  "Google Meet",
  "Zoom Meeting",
  "Canva",
  "Adobe Photoshop",
  "Adobe Premiere Pro",
  "Adobe Illustrator",
  "Website Maintenance",
];
export const SOFT_SKILLS = [
  "Written communication (grammar, clarity, conciseness)",
  "Verbal communication (articulation, presentation skills)",
  "Team leadership (taking initiative, motivating others)",
  "Collaboration (cooperating effectively with others)",
  "Analytical thinking (identifying problems and their root causes)",
  "Creative thinking (generating innovative solutions)",
  "Time Management (prioritize tasks, work efficiently, meet deadlines.)",
  "Decision-making (making sound judgments under pressure)",
];
export const DEPARTMENTS = [
  "Accounting & Information System",
  "Anthropology",
  "Bangla",
  "Biochemistry & Molecular Biology",
  "Botany",
  "Chemistry",
  "Computer Science & Engineering",
  "Economics",
  "English",
  "Film & Television",
  "Finance",
  "Fine Arts",
  "Genetic Engineering & Biotechnology",
  "Geography & Environment",
  "History",
  "Institute of Education & Research",
  "Institute of Modern Languages",
  "Islamic History & Culture",
  "Islamic Studies",
  "Law and Land Administration",
  "Law",
  "Management Studies",
  "Marketing",
  "Mass Communication & Journalism",
  "Mathematics",
  "Microbiology",
  "Music",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Administration",
  "Social Work",
  "Sociology",
  "Statistics",
  "Theatre",
  "Zoology",
];

/* ------------------
   ZOD SCHEMA
------------------- */
export const MemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Phone is required"),
  whatsapp_number: z.string().optional().or(z.literal("")),

  gender: z
    .string()
    .min(1, "Please select a gender")
    .refine((val) => ["male", "female"].includes(val), {
      message: "Invalid gender option",
    }),
  studentId: z.string().min(1, "Student ID is required"),
  transaction_id: z.string().min(1, "Transaction ID is required"),
  why_join_us: z.string().min(5, "This field is required"),
  batch: z.string().min(1, "Batch is required"),
  department: z.string().min(1, "Department is required"),

  photoUrl: z.string().optional().or(z.literal("")),
  paymentPhotoUrl: z.string().optional().or(z.literal("")),

  tech_skills: z.array(z.string()).min(1, "Select at least one tech skill"),
  soft_skills: z.array(z.string()).min(1, "Select at least one soft skill"),
  facebook_link: z.string().url().optional().or(z.literal("")),
  linkedin_link: z.string().url().optional().or(z.literal("")),
  join_facebook: z.boolean(),
  join_whatsapp: z.boolean(),
  join_whatsapp_community: z.boolean(),
  agreeEmail: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive emails",
  }),
  suggestions_expectations: z.string().min(3, "This field is required"),
});

export const BccFormSchema = z.object({
  // Category & Payment
  category: z.enum(["jnu_student", "jnuits_member", "others"]),
  couponCode: z.string().optional(),

  // Personal Info
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  gender: z.enum(["Male", "Female", "Other"]),
  phoneNumber: z.string().min(11, "Valid phone number required."),
  whatsappNumber: z.string().min(11, "Valid WhatsApp number required."),
  facebookLink: z.string().url("Please enter a valid Facebook profile URL."),

  // Academic Info (Conditional logic applied in UI, but schema allows optional for 'others')
  studentId: z.string().optional(),
  batch: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),

  // Transaction Info
  transactionId: z.string().min(4, "Transaction ID is required."),

  // Skills (Matrix)
  skill_computerBasics: z.enum([
    "Proficient",
    "Intermediate",
    "No Experience",
    "Basic",
  ]),
  skill_msOffice: z.enum([
    "Proficient",
    "Intermediate",
    "No Experience",
    "Basic",
  ]),
  skill_googleWorkspace: z.enum([
    "Proficient",
    "Intermediate",
    "No Experience",
    "Basic",
  ]),
  skill_meetingTools: z.enum([
    "Proficient",
    "Intermediate",
    "No Experience",
    "Basic",
  ]),

  emailReadConfirmation: z
    .boolean()
    .refine((val) => val === true, "Please confirm you will check your email."),

  // File Upload
  paymentScreenshot: z.string().optional().or(z.literal("")),
  paymentScreenshotFileId: z.string().optional().or(z.literal("")),
  paidAmount: z.number().optional(),
});


export const RegistrationDeadline = "2026-02-15T23:59:59Z";

export const BccMail = (email: string, fullName: string) => {
    return {
        from: `"JNU IT Society" <jnuitsbd@gmail.com>`,
        to: email,
        subject: "Registration Confirmed - BCC Season 8 (JnUITS)",
        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 20px 0;">
        <tr>
          <td align="center">
            
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <tr>
                <td style="background-color: #ffffff; padding: 25px 20px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                  <img src="https://res.cloudinary.com/dbwbwwteo/image/upload/v1742463559/MainLogo.8e23e303_uzxovz.png" alt="JnU IT Society Logo" width="120" style="display: block; margin: 0 auto; max-width: 120px; height: auto;">
                </td>
              </tr>

              <tr>
                <td style="background-color: #10b981; padding: 30px 20px; text-align: center;"> <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px;">Registration Confirmed!</h1>
                  <p style="color: #ecfdf5; margin: 8px 0 0; font-size: 16px;">Payment Verified • Welcome Aboard</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 30px 25px;">
                  <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    Dear <strong>${fullName}</strong>,
                  </p>
                  <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Congratulations! Your payment has been <strong>successfully verified</strong>. We are excited to officially welcome you to the <strong>Basic Computer Course (Season 8)</strong>.
                  </p>

                  <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                    <h3 style="margin: 0 0 15px 0; color: #15803d; font-size: 18px;">🚀 Must Do: Join Our Channels</h3>
                    <p style="margin: 0 0 15px 0; font-size: 14px; color: #334155;">
                      To get class schedules, resources, and important notices, please join the following groups immediately:
                    </p>
                    
                    <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 15px; line-height: 1.8;">
                      <li style="margin-bottom: 10px;">
                        <strong>WhatsApp Group:</strong><br>
                        <a href="https://chat.whatsapp.com/J55AOwAdlEB6RkCBMgrD2K" style="color: #059669; text-decoration: none; font-weight: 600;">Click to Join BCC-4IR (Season 8)</a>
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Messenger Group:</strong><br>
                        <a href="https://m.me/j/AbbRDMz-ZTeTMbGn/" style="color: #059669; text-decoration: none; font-weight: 600;">Click to Join Messenger Chat</a>
                      </li>
                      <li>
                        <strong>Google Classroom:</strong><br>
                        <a href="https://classroom.google.com/c/Njc4ODU2NzY3MjIx?cjc=vajwfzii" style="color: #059669; text-decoration: none; font-weight: 600;">Click to Join Classroom</a>
                        <br>
                        <span style="font-size: 13px; background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #475569;">Class Code: <strong>vajwfzii</strong></span>
                      </li>
                    </ul>
                  </div>
                  
                  <p style="color: #64748b; font-size: 13px; margin-top: 25px; text-align: center;">
                    See you in the first class! Keep an eye on the groups for the schedule.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #1e293b; padding: 25px; text-align: center;">
                  <p style="color: #cbd5e1; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Jagannath University IT Society</p>
                  <p style="color: #64748b; font-size: 11px; margin: 5px 0 0;">Automated email, please do not reply directly.</p>
                </td>
              </tr>

            </table>
            
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
      };
}
