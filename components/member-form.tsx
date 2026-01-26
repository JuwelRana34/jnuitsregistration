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
  Facebook,
  Hash,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  TextInitial,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addMemberToSheet } from "@/action/registration";
import {
  DEPARTMENTS,
  MemberSchema,
  SOFT_SKILLS,
  TECH_SKILLS,
} from "@/app/constants/data";
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
import { uploadToImageKit } from "@/lib/handelUpload";
import z from "zod";
import { MultiCheckbox } from "./Checkbox";
import { FileUploadField } from "./HandelUpload";
import { Textarea } from "./ui/textarea";

export type MemberType = z.infer<typeof MemberSchema>;

export default function MemberForm() {
  const [loading, setLoading] = useState(false);

  const [isOtherBatch, setIsOtherBatch] = useState(false);
  // ফাইলগুলো আলাদা state এ
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);

  const form = useForm<MemberType>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp_number: "",
      gender: "",
      studentId: "",
      transaction_id: "",
      why_join_us: "",
      batch: "",
      department: "",
      photoUrl: "",
      paymentPhotoUrl: "",
      tech_skills: [],
      soft_skills: [],
      join_facebook: false,
      join_whatsapp: false,
      join_whatsapp_community: false,
      facebook_link: "",
      linkedin_link: "",
      agreeEmail: false,
      suggestions_expectations: " ",
    },
  });

  const onSubmit = async (data: MemberType) => {
    // 1. Validation for manual file states
    if (!photoFile) {
      toast.error("Please select a formal photo", {
        description: "A professional headshot is required.",
      });
      return;
    }
    if (!paymentFile) {
      toast.error("Please select a payment screenshot", {
        description: "We need proof of payment to verify registration.",
      });
      return;
    }

    setLoading(true);
    try {
      // 2. Parallel Uploads of Images
      const uploadPromises = [
        uploadToImageKit(photoFile),
        uploadToImageKit(paymentFile),
      ];

      const [photoRes, paymentRes] = await Promise.all(uploadPromises);

      // 3. Check for upload failures
      if (!photoRes?.url || !paymentRes?.url) {
        throw new Error("Image upload failed. Please try again.");
      }

      // 4. Construct Final Data
      const finalData = {
        ...data,
        photoUrl: photoRes.url,
        photoFileId: photoRes.fileId,
        paymentPhotoUrl: paymentRes.url,
        paymentPhotoFileId: paymentRes.fileId,
      };

      console.log("Submitting Payload:", finalData);

      // 5. call Server Action
      await addMemberToSheet(finalData);

      // 6. Success State
      form.reset();
      setPhotoFile(null);
      setPaymentFile(null);
      setPhotoPreview(null);
      setPaymentPreview(null);
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

  // --- HANDLER FUNCTIONS ---
  const handlePhotoSelect = (file: File | null) => {
    setPhotoFile(file);
    // Create preview URL here

    if (!file) {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      return;
    }

    if (photoPreview) URL.revokeObjectURL(photoPreview);

    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handlePhotoClear = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handlePaymentSelect = (file: File | null) => {
    setPaymentFile(file);

    if (!file) {
      if (paymentPreview) URL.revokeObjectURL(paymentPreview);
      setPaymentPreview(null);
      return;
    }

    if (paymentPreview) URL.revokeObjectURL(paymentPreview);

    const url = URL.createObjectURL(file);
    setPaymentPreview(url);
  };

  const handlePaymentClear = () => {
    if (paymentPreview) URL.revokeObjectURL(paymentPreview);
    setPaymentFile(null);
    setPaymentPreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-1 bg-white rounded-xl  border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-600">
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
                        placeholder="e.g. John Doe"
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
                        placeholder="john@example.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="label-required">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
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

              <FormField
                name="whatsapp_number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp(Recommended)</FormLabel>
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
                          field.onChange(""); // Reset value when going back
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
                          field.onChange(""); // Clear value so user can type
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

          {/* --- UPLOADS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="photoUrl"
              control={form.control}
              render={() => (
                <FormItem>
                  <FileUploadField
                    label="Formal Photo"
                    previewUrl={photoPreview}
                    onFileSelect={handlePhotoSelect}
                    onClear={handlePhotoClear}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="paymentPhotoUrl"
              control={form.control}
              render={() => (
                <FormItem>
                  <FileUploadField
                    label="Payment Screenshot"
                    previewUrl={paymentPreview}
                    onFileSelect={handlePaymentSelect}
                    onClear={handlePaymentClear}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* --- SKILLS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <FormField
              name="tech_skills"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Tech Skills</FormLabel>
                  <MultiCheckbox {...field} options={TECH_SKILLS} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="soft_skills"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="label-required">Soft Skills</FormLabel>
                  <MultiCheckbox {...field} options={SOFT_SKILLS} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-px bg-gray-100 my-4" />

          {/* --- PAYMENT & SOCIALS --- */}
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

          {/* opinion form students  */}
          <FormField
            name="why_join_us"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required">
                  Why are you interested in joining the Jagannath University IT
                  Society?
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <TextInitial className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      className="pl-9"
                      placeholder="e.g. text..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* FIXME: */}
          <FormField
            name="suggestions_expectations"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label-required capitalize">
                  suggestions/expectations from JnUITS?
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <TextInitial className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      className="pl-9"
                      placeholder="e.g. text..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="facebook_link"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Link</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="https://facebook.com/..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="linkedin_link"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Link</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="https://linkedin.com/in/..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* JOIN CHECKBOXES */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-sm mb-3">
              have you join Community & Updates?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(
                [
                  "join_facebook",
                  "join_whatsapp",
                  "join_whatsapp_community",
                ] as const
              ).map((name) => (
                <FormField
                  key={name}
                  name={name}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 bg-white p-2 rounded border hover:border-blue-400 transition-colors cursor-pointer">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel className="font-normal cursor-pointer w-full text-xs sm:text-sm">
                        {name.replace("join_", "").replaceAll("_", " ")}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

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

                <FormLabel className="font-normal cursor-pointer w-full text-xs sm:text-sm label-required">
                  An email will be sent to your Gmail account within 1 minute.
                  Will you read it?
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full relative overflow-hidden bg-blue-500 hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {/* ১. শিমার কন্টেইনার যা বাম থেকে ডানে মুভ করবে */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer  pointer-events-none">
              {/* ২. আসল সরু এবং বাঁকানো শাইন লাইন */}
              <div className="h-full w-48 bg-linear-to-r from-transparent via-blue-300/30 to-transparent -skew-x-45 blur-[2px]" />
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Apply now"
              )}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}