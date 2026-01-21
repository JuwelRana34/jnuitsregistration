import MemberForm from "@/components/member-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  HelpCircle,
  Phone,
  UserCheck,
  Wallet,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: INFO + ACCORDION */}
        <section className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-3">
            Join Jagannath University IT Society{" "}
            <a 
              href="https://facebook.com/jnuits" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              (JnUITS)
            </a>
          </h1>

          <p className="text-gray-700 mb-4">
            Are you an undergraduate student looking to enhance your IT skills,
            expand your professional network, and contribute to an exciting
            community? Join <strong className="text-indigo-700">JnUITS</strong> and grow alongside peers who
            share your passion for innovation and learning!
          </p>

          <p className="font-semibold text-indigo-600 mb-6 flex items-center gap-2">
            <span className="text-xl">🚀</span> Be a Member, Be a Leader!
          </p>

          <Accordion
            type="multiple"
            defaultValue={["steps"]}
            className="w-full"
          >
            {/* Steps */}
            <AccordionItem value="steps">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <ClipboardList className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Simple Steps to Join</span>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Pay the BDT 100 registration fee</li>
                  <li>Fill out the form below</li>
                  <li>Upload payment proof</li>
                  <li>Check your email for confirmation</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Registration Details */}
            <AccordionItem value="dates">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <CalendarDays className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Registration Details</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-700 pt-2">
                <p>
                  <strong className="text-slate-800">Starts:</strong> 20 December 2025
                </p>
                <p>
                  <strong className="text-slate-800">Ends:</strong> <s className="text-red-500">15</s> 22 January, 2026
                </p>
                <p>
                  <strong className="text-slate-800">Offline:</strong> On-campus (Shanto Chattar) 18,19,20
                  January, 2026
                </p>
                <p>
                  <strong className="text-slate-800">Fee:</strong> BDT 100/-
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Payment Instructions */}
            <AccordionItem value="payment">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <Wallet className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Membership Fee Payment Instructions</span>
              </AccordionTrigger>

              <AccordionContent className="space-y-6 text-gray-700 pt-4">
                {/* Bank */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Building2 className="h-4 w-4 text-indigo-600" />
                    <span>Agrani Bank (On-campus / Branch)</span>
                  </div>

                  <p className="mb-3">
                    <strong className="text-slate-800">Branch:</strong> Jagannath University Branch <br />
                    <strong className="text-slate-800">Account Name:</strong> Jagannath University IT
                    Society <br />
                    <strong className="text-slate-800">Account Number:</strong> 0200013199689
                  </p>

                  <ul className="list-disc pl-5 mt-2 space-y-1.5">
                    <li>Fill up a deposit form</li>
                    <li>
                      Deposit <strong className="text-slate-800">BDT 100/- only</strong>
                    </li>
                    <li>Collect the deposit slip</li>
                    <li>Take a clear photo of the slip</li>
                    <li>Upload the photo to the Google Form</li>
                  </ul>
                </div>

                {/* Mobile Wallet */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Wallet className="h-4 w-4 text-indigo-600" />
                    <span>bKash / Nagad (Send Money)</span>
                  </div>

                  <p className="mb-3">
                    <strong className="text-slate-800">bKash Number:</strong> 01740960116 (Personal){" "}
                    <br />
                    <strong className="text-slate-800">Nagad Number:</strong> 01740960116 (Personal)
                  </p>

                  <ul className="list-disc pl-5 mt-2 space-y-1.5">
                    <li>Open your mobile wallet app</li>
                    <li>
                      Select <strong className="text-slate-800">Send Money</strong>
                    </li>
                    <li>
                      Send <strong className="text-slate-800">BDT 100/- only</strong>
                    </li>
                    <li>
                      In the <strong className="text-slate-800">Reference</strong> field, write your{" "}
                      <strong className="text-slate-800">Student ID</strong>
                    </li>
                    <li>Take a screenshot of the payment confirmation</li>
                    <li>Upload the screenshot to the Google Form</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-700">Important:</strong> Please ensure all payment details are correct before
                    submitting. Incorrect or unclear payment proof may delay
                    verification. 😊
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Eligibility */}
            <AccordionItem value="eligibility">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Eligibility Criteria</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-gray-700 pt-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    1st & 2nd year undergraduate students (19th and 20th batch)
                  </li>
                  <li>Any department of Jagannath University</li>
                  <li>Interested in IT skill development & networking</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Selection */}
            <AccordionItem value="selection">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <UserCheck className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Selection Process</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-700 pt-2">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Introductory Class</li>
                  <li>MCQ Test</li>
                  <li>Viva (Interview)</li>
                </ol>
                <p className="text-sm text-gray-600 mt-3">
                  Successful candidates will be notified via email.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Contact */}
            <AccordionItem value="contact">
              <AccordionTrigger className="flex items-center gap-3 hover:no-underline">
                <Phone className="h-5 w-5 text-indigo-600 shrink-0" />
                <span className="text-left font-semibold">Contact & Important Notes</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-gray-700 pt-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong className="text-slate-800">Email:</strong> jnuitsbd@gmail.com
                  </p>
                  <p className="mb-2">
                    <strong className="text-slate-800">Phone:</strong> 01721129467, 01567934536
                  </p>
                  <p className="mb-2">
                    <strong className="text-slate-800">Facebook:</strong>{" "}
                    <a 
                      href="https://facebook.com/jnuits" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      facebook.com/jnuits
                    </a>
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-yellow-700">Note:</strong> Please keep your payment proof safe until your membership is confirmed. 
                    For any query, feel free to contact us.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Banner */}
          <div className="mt-6 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src="/banner.jpeg"
              alt="JnUITS Membership Banner"
              width={1000}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </section>

        {/* RIGHT: FORM */}
        <section className="bg-white rounded-xl shadow p-6">
          <MemberForm />
        </section>
      </div>
    </div>
  );
}
