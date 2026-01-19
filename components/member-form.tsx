"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Briefcase,
  CreditCard,
  ExternalLink,
  Hash,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addMemberToSheet } from "@/action/registration";
import { DEPARTMENTS } from "@/app/constants/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";

// Create simplified schema without photo/payment/skills/why_join
const SimplifiedMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  gender: z.string().min(1, "Please select gender"),
  studentId: z.string().min(1, "Student ID is required"),
  transaction_id: z.string().min(1, "Transaction ID is required"),
  batch: z.string().min(1, "Batch is required"),
  department: z.string().min(1, "Department is required"),
  agreeEmail: z.boolean().default(false),
  suggestions_expectations: z.string().optional(),
});

export type MemberType = z.infer<typeof SimplifiedMemberSchema>;

export default function MemberForm() {
  const [loading, setLoading] = useState(false);
  const [isOtherBatch, setIsOtherBatch] = useState(false);

  const form = useForm<MemberType>({
    resolver: zodResolver(SimplifiedMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      studentId: "",
      transaction_id: "",
      batch: "",
      department: "",
      agreeEmail: false,
      suggestions_expectations: "",
    },
  });

  const onSubmit = async (data: MemberType) => {
    setLoading(true);
    try {
      // Construct Final Data with default values for removed fields
      const finalData = {
        ...data,
        // Set default values for removed fields
        photoUrl: "N/A",
        paymentPhotoUrl: "N/A",
        tech_skills: ["N/A"],
        soft_skills: ["N/A"],
        why_join_us: "N/A",
        whatsapp_number: "N/A",
        facebook_link: "N/A",
        linkedin_link: "N/A",
        join_facebook: false,
        join_whatsapp: false,
        join_whatsapp_community: false,
      };

      console.log("Submitting Payload:", finalData);

      // Call Server Action
      await addMemberToSheet(finalData);

      // Success State
      form.reset();
      toast.success("Application submitted successfully!", {
        description: "Check your email for confirmation.",
      });
    } catch (e) {
      console.error("Submission Error:", e);
      toast.error("Submission failed", {
        description:
          e instanceof Error
            ? e.message
            : "Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // External link handlers
  const openFacebookPage = () => {
    window.open("https://facebook.com/jnuits", "_blank", "noopener,noreferrer");
  };

  const openLinkedinPage = () => {
    window.open("https://linkedin.com/company/jnuits", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
        New Member Registration
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* --- BASIC FIELDS --- */}
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="e.g. Md. Rakibul Islam"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="b220303020@phy.jnu.ac.bd"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">
                    Phone Number (WhatsApp Recommended)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="017xxxxxxxx"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-px bg-gray-100 my-4" />

          {/* --- ACADEMIC --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="studentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Student ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="e.g. B21030..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Gender</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="department"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Department</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select Dept." />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- MODIFIED BATCH FIELD --- */}
            <FormField
              name="batch"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Batch</FormLabel>
                  {isOtherBatch ? (
                    // --- INPUT MODE ---
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <div className="relative w-full">
                          <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            placeholder="Enter your batch"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setIsOtherBatch(false);
                          field.onChange("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    // --- SELECT MODE ---
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        if (value === "others") {
                          setIsOtherBatch(true);
                          field.onChange("");
                        } else {
                          field.onChange(value);
                        }
                      }}
                    >
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                          <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Select Batch" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="19th">19th Batch</SelectItem>
                        <SelectItem value="20th">20th Batch</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-px bg-gray-100 my-4" />

          {/* --- PAYMENT --- */}
          <FormField
            name="transaction_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">
                  Transaction ID (BKash/Nagad/Bank)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="e.g. 9GHD73..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- OFFICIAL PAGES LINKS --- */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-sm mb-3">
              Follow our official pages:
            </p>
            
            <div className="space-y-3">
              {/* Facebook Page Button */}
              <div className="flex items-center justify-between p-3 bg-white rounded border hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">FB</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Facebook Page</p>
                    <p className="text-xs text-gray-500">facebook.com/jnuits</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={openFacebookPage}
                >
                  Visit
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>

              {/* LinkedIn Page Button */}
              <div className="flex items-center justify-between p-3 bg-white rounded border hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">IN</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">LinkedIn Page</p>
                    <p className="text-xs text-gray-500">linkedin.com/company/jnuits</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={openLinkedinPage}
                >
                  Visit
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Please follow our pages to stay updated with JnUITS activities and announcements.
            </p>
          </div>

          {/* --- SUGGESTIONS (OPTIONAL) --- */}
          <FormField
            name="suggestions_expectations"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any suggestions for JnUITS? (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your suggestions or feedback for JnUITS..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- EMAIL CONFIRMATION --- */}
          <FormField
            control={form.control}
            name="agreeEmail"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0 bg-white p-2 rounded border hover:border-blue-400 transition-colors cursor-pointer">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer w-full text-sm label-required">
                  I will check my email for confirmation within 1 minute
                </FormLabel>
              </FormItem>
            )}
          />

          {/* --- SUBMIT BUTTON --- */}
          <Button
            type="submit"
            className="w-full relative overflow-hidden bg-blue-500 hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer pointer-events-none">
              <div className="h-full w-48 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent -skew-x-45 blur-[2px]" />
            </div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Apply Now"
              )}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
