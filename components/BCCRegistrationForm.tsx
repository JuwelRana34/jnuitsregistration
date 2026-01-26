"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { BccFormSchema, DEPARTMENTS } from "@/app/constants/data";
import { FileUploadField } from "./HandelUpload";

import { deleteImage } from "@/action/imageDelete";
import { BccRegistration } from "@/action/registration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToImageKit } from "@/lib/handelUpload";
import { toast } from "sonner";

export default function BCCRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [couponVerified, setCouponVerified] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);

  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  // --- Form Initialization ---
  const form = useForm<z.infer<typeof BccFormSchema>>({
    resolver: zodResolver(BccFormSchema),
    defaultValues: {
      category: "jnu_student",
      emailReadConfirmation: false,
      skill_computerBasics: "Basic",
      skill_msOffice: "Basic",
      skill_googleWorkspace: "Basic",
      skill_meetingTools: "Basic",
      fullName: "",
      phoneNumber: "",
      whatsappNumber: "",
      facebookLink: "",
      email: "",
      transactionId: "",
    },
  });

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

  // ✅ Fix: useWatch instead of form.watch
  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });

  // ✅ Fix: Derived State for Fee (No useEffect)
  const SECRET_COUPON = "JNUITS2026";
  let fee = 500;
  if (selectedCategory === "jnuits_member") {
    fee = couponVerified ? 200 : 500;
  } else if (selectedCategory === "others") {
    fee = 1000;
  }

  // --- Handlers ---
  const handleCouponVerify = () => {
    if (couponInput === SECRET_COUPON) {
      setCouponVerified(true);
      toast.success("Coupon Applied! Fee is now 200 BDT.");
    } else {
      setCouponVerified(false);
      toast.error("Invalid Coupon, Please enter a valid coupon code.");
    }
  };

  async function onSubmit(values: z.infer<typeof BccFormSchema>) {
    if (!paymentFile) {
      toast.error("Please upload payment screenshot.");
      return;
    }

    setLoading(true);

    try {
      // ২. ইমেজ আপলোড (ImageKit)
      const paymentRes = await uploadToImageKit(paymentFile);

      if (!paymentRes?.url) {
        throw new Error("Image upload failed. Please try again.");
      }

      // ৩. ডাটা মার্জ করা
      const { paymentScreenshot, ...restValues } = values;

      const finalData = {
        ...restValues,
        paymentScreenshot: paymentRes.url,
        paymentScreenshotFileId: paymentRes.fileId,
        paidAmount: fee,
      };

      console.log("Submitting Payload:", finalData, paymentRes.url);

      // ৪. সার্ভার অ্যাকশন কল
      const res = await BccRegistration(finalData);
      console.log("duplicare", res);
      if (res.success === false) {
        if (paymentRes.fileId) {
          await deleteImage(paymentRes.fileId);
        }
        toast.error("Submission failed", {
          description: res.error,
        });
        return;
      }
      // ৫. সাকসেস স্টেট
      form.reset();
      setPaymentFile(null);
      setPaymentPreview(null);
      setCouponVerified(false);
      setCouponInput("");

      toast.success("Registration Submitted Successfully!", {
        description: "Check your email for confirmation.",
      });
    } catch (e) {
      console.error("Submission Error:", e);
      toast.error("Submission failed", {
        description: e instanceof Error ? e.message : "Check connection.",
      });
    } finally {
      setLoading(false);
    }
  }

  // --- Lists ---
  const batches = [
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
  ];
  const skillOptions = ["No Experience", "Basic", "Intermediate", "Proficient"];

  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <Card className="w-full max-w-4xl shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            BCC Registration Form
          </CardTitle>
          <CardDescription className="text-lg">
            Thrive in the 4th Industrial Revolution with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* --- Section 1: Category & Coupon --- */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-semibold">
                        Select Participant Category
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Reset coupon logic here
                            setCouponVerified(false);
                            setCouponInput("");
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="jnu_student" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              JnU Student (500 BDT)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="jnuits_member" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              JnUITS Member (200 BDT)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="others" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Others (1000 BDT)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedCategory === "jnuits_member" && (
                  <div className="mt-4 flex gap-2 items-end max-w-sm animate-in fade-in slide-in-from-top-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label className="text-sm font-medium">
                        Have a coupon?
                      </label>
                      <Input
                        placeholder="Enter Coupon Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        disabled={couponVerified}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleCouponVerify}
                      disabled={couponVerified}
                      variant={couponVerified ? "secondary" : "default"}
                    >
                      {couponVerified ? (
                        <Check className="w-4 h-4 mr-1" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <h3 className="text-xl font-bold text-gray-800">
                    Total Payable:{" "}
                    <span className="text-blue-600">{fee} BDT</span>
                  </h3>
                </div>
              </div>

              {/* --- Section 2: Personal Information --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Juwel Rana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="017xxxxxxxx"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">
                        WhatsApp Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="017xxxxxxxx"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="facebookLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="label-required">
                      Facebook Profile Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- Section 3: Academic Info (Conditional) --- */}
              {selectedCategory !== "others" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg border">
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">
                          Student ID
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="B210xxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">
                          Department
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Dept" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DEPARTMENTS.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-required">Batch</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Batch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {batches.map((batch) => (
                              <SelectItem key={batch} value={batch}>
                                {batch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* --- Section 4: Skills Assessment (Fixed Types) --- */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Tell us about your Skills{" "}
                  <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "skill_computerBasics", label: "Computer Basics" },
                    { id: "skill_msOffice", label: "Microsoft Office" },
                    { id: "skill_googleWorkspace", label: "Google Workspace" },
                    { id: "skill_meetingTools", label: "Meet/Zoom/Discord" },
                  ].map((skill) => (
                    <FormField
                      key={skill.id}
                      control={form.control}
                      // ✅ Fix: Type casting
                      name={skill.id as keyof z.infer<typeof BccFormSchema>}
                      render={({ field }) => (
                        <FormItem className="bg-white p-3 border rounded shadow-sm">
                          <FormLabel className="font-medium">
                            {skill.label}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            // ✅ Fix: Controlled value instead of defaultValue
                            value={field.value as string}
                          >
                            <FormControl>
                              <SelectTrigger className="mt-1 h-8">
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {skillOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* --- Section 6: Payment Upload (Manual State) --- */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">Email </FormLabel>
                      <FormControl>
                        <Input placeholder="juwel@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label-required">
                        Transaction ID
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="EX: DHDSKDRWEJ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-lg label-required">
                    Payment Screenshot
                  </FormLabel>
                  <FormDescription>
                    Please pay {fee} BDT and upload the screenshot.
                  </FormDescription>
                  <FormControl>
                    <FileUploadField
                      label=""
                      previewUrl={paymentPreview}
                      onFileSelect={handlePaymentSelect}
                      onClear={handlePaymentClear}
                    />
                  </FormControl>
                  {/* ম্যানুয়াল এরর হ্যান্ডলিং চাইলে এখানে কাস্টম মেসেজ দেখাতে পারেন */}
                </FormItem>
              </div>

              {/* --- Section 7: Confirmation --- */}
              <FormField
                control={form.control}
                name="emailReadConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-green-50 text-green-500">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        An email will be sent to your Gmail account within 1
                        minute. Will you read it?
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* --- Submit Button --- */}
              <Button
                type="submit"
                className="w-full relative overflow-hidden bg-blue-500 hover:bg-blue-600 transition-all"
                disabled={loading}
              >
                {/* ✅ Fix: Valid Tailwind Gradient */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer pointer-events-none">
                  <div className="h-full w-48 bg-linear-to-r from-transparent via-blue-300/30 to-transparent -skew-x-45 blur-[2px]" />
                </div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Registration now"
                  )}
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
