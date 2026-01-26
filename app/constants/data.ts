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
