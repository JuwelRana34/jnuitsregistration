import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Info,
  MapPin,
  MonitorPlay, 
  Smartphone, 
  Landmark, 
} from "lucide-react";


export default function BccDescription() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-1">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700">
          Season 8
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Basic Computer Course (BCC)
        </h1>
        <p className="text-lg font-medium text-blue-600">
          Thrive in the 4th Industrial Revolution with AI 🤖
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Join <strong>Jagannath University IT Society (JnUITS)</strong> to
          equip yourself with essential digital skills. Whether you are a
          student, alumni, or professional, this course is designed to
          future-proof your career.
        </p>
      </div>

      {/* Accordion Section */}
      <Accordion type="single" collapsible className="w-full bg-white rounded-lg border shadow-sm">
        
        {/* 1. Course Details */}
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-2 text-left">
              <MonitorPlay className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-800">
                Course Module & Schedule
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-600 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <MonitorPlay className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Classes</p>
                  <p className="text-sm">Mostly Online via Google Meet</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <Clock className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Duration</p>
                  <p className="text-sm">2 Hours/Class & 2 Classes/Weekly</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <MapPin className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Exams</p>
                  <p className="text-sm">Offline at Computer Lab</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <Info className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Module</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Registration Fees & Payment Info */}
<AccordionItem value="item-2">
  <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
    <div className="flex items-center gap-2 text-left">
      <CreditCard className="h-5 w-5 text-green-600" />
      <span className="font-semibold text-gray-800">
        Registration Fees & Payment
      </span>
    </div>
  </AccordionTrigger>
  <AccordionContent className="px-4 pb-4">
    <div className="space-y-6 mt-2">
      
      {/* Fee Structure */}
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-700">General (Students-JnU)</span>
          <span className="font-bold text-gray-900">500 BDT</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-700">General (Others)</span>
          <span className="font-bold text-gray-900">1000 BDT</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2 bg-yellow-50 p-2 rounded">
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium">JnUITS General Members</span>
            <span className="text-xs text-yellow-700">*Collect Coupon From Messenger</span>
          </div>
          <span className="font-bold text-green-700">200 BDT</span>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 pt-2 border-t">Payment Methods</h3>

      {/* Option A: Mobile Wallet */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="h-5 w-5 text-pink-600" />
          <h4 className="font-bold text-gray-800">Mobile Wallet (bKash / Nagad)</h4>
        </div>
        
        {/* Number Display */}
        <div className="bg-white p-3 rounded border border-pink-200 text-center mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Send Money (Personal)</p>
          <div className="flex justify-center items-center gap-2 mt-1">
            <p className="text-xl font-mono font-bold text-pink-600 select-all">01740960116</p>
          </div>
          <p className="text-xs text-gray-400 mt-1">Treasurer JnUITS</p>
        </div>

        {/* Steps */}
        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
          <li>Select the <strong>Send Money</strong> option.</li>
          <li>
            Amount: <span className="font-bold text-pink-700">510 BDT</span> (JnU) / <span className="font-bold text-pink-700">1020 BDT</span> (Others).
          </li>
          <li>Reference: Type your <strong>Student ID</strong>.</li>
          <li>Take a <strong>Screenshot</strong> of the confirmation.</li>
        </ul>
      </div>

      {/* Option B: Bank Deposit */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="h-5 w-5 text-gray-700" />
          <h4 className="font-bold text-gray-800">Bank Deposit (Agrani Bank)</h4>
        </div>

        <div className="text-sm text-gray-600 mb-4 space-y-1 bg-white p-3 rounded border">
          <p><span className="font-semibold">Branch:</span> Jagannath University Branch</p>
          <p><span className="font-semibold">Acc Name:</span> Jagannath University IT Society</p>
          <p><span className="font-semibold">Acc Number:</span> <span className="font-mono font-bold text-gray-900 select-all">0200013199689</span></p>
        </div>

        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
          <li>Fill up a deposit form.</li>
          <li>
            Deposit <span className="font-bold">500 BDT</span> (JnU) / <span className="font-bold">1000 BDT</span> (Others).
          </li>
          <li>Collect the slip after deposit.</li>
          <li>Take a clear <strong>Photo</strong> of the payment slip.</li>
        </ul>
      </div>

      <div className="text-xs text-center text-gray-500 italic bg-blue-50 p-2 rounded">
        😊 Please ensure all details are correct before making the payment.
      </div>

    </div>
  </AccordionContent>
</AccordionItem>

        {/* 3. How to Register */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-2 text-left">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-800">
                Simple Steps to Register
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ol className="relative border-l border-gray-200 ml-3 mt-2">
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  💸
                </span>
                <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900">
                  Pay the Registration Fee
                </h3>
                <p className="mb-2 text-xs text-gray-500">
                  Send the amount via Bkash/Nagad and copy the Transaction ID.
                </p>
              </li>
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  📝
                </span>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  Fill Out the Form
                </h3>
                <p className="text-xs text-gray-500">
                  Complete the form below with your details and payment proof.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  📧
                </span>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  Confirmation
                </h3>
                <p className="text-xs text-gray-500">
                  Check your email inbox for the confirmation message.
                </p>
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer / Deadline Section */}
      <Alert className="bg-blue-200 text-white border-none">
        <CalendarDays className="h-4 w-4 text-blue-800 " />
        <AlertTitle className="text-blue-800">Registration Deadline</AlertTitle>
        <AlertDescription className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span>5 February, 2026</span>
          <div className="flex gap-4 text-sm underline text-gray-600">
             <a href="https://jnuits.org.bd/bcc" target="_blank" rel="noreferrer" className="hover:text-white transition">
                Facebook Event
             </a>
             <a href="mailto:itsociety@association.jnu.ac.bd" className="hover:text-white transition">
                Email Support
             </a>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}