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
      <div className="mx-auto  max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: INFO + ACCORDION */}
        <section className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-3">
            Join Jagannath University IT Society (JnUITS)
          </h1>

          <p className="text-gray-700 mb-4">
            Are you an undergraduate student looking to enhance your IT skills,
            expand your professional network, and contribute to an exciting
            community? Join <strong>JnUITS</strong> and grow alongside peers who
            share your passion for innovation and learning!
          </p>

          <p className="font-semibold text-indigo-600 mb-6">
            Be a Member, Be a Leader! 🚀
          </p>

          <Accordion
            type="multiple"
            defaultValue={["steps"]}
            className="w-full"
          >
            {/* Steps */}
            <AccordionItem value="steps">
              <AccordionTrigger className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Simple Steps to Join</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Pay the BDT 100 registration fee</li>
                  <li>Fill out the form below</li>
                  <li>Upload payment proof</li>
                  <li>Check your email for confirmation</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Registration Details */}
            <AccordionItem value="dates">
              <AccordionTrigger className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Registration Details</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-1 text-gray-700">
                <p>
                  <strong>Starts:</strong> 20th December 2025
                </p>
                <p>
                  <strong>Ends:</strong> 12th January 2026
                </p>
                <p>
                  <strong>Offline:</strong> On-campus (2–3 days, TBA)
                </p>
                <p>
                  <strong>Fee:</strong> BDT 100/-
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Payment Instructions */}
            <AccordionItem value="payment">
              <AccordionTrigger className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Membership Fee Payment Instructions</span>
              </AccordionTrigger>

              <AccordionContent className="space-y-5 text-gray-700">
                {/* Bank */}
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <Building2 className="h-4 w-4 text-indigo-600" />
                    <span>Agrani Bank (On-campus / Branch)</span>
                  </div>

                  <p>
                    <strong>Branch:</strong> Jagannath University Branch <br />
                    <strong>Account Name:</strong> Jagannath University IT
                    Society <br />
                    <strong>Account Number:</strong> 0200013199689
                  </p>

                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Fill up a deposit form</li>
                    <li>
                      Deposit <strong>BDT 100/- only</strong>
                    </li>
                    <li>Collect the deposit slip</li>
                    <li>Take a clear photo of the slip</li>
                    <li>Upload the photo to the Google Form</li>
                  </ul>
                </div>

                {/* Mobile Wallet */}
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <Wallet className="h-4 w-4 text-indigo-600" />
                    <span>bKash / Nagad (Send Money)</span>
                  </div>

                  <p>
                    <strong>bKash Number:</strong> 01740960116 (Personal) <br />
                    <strong>Nagad Number:</strong> 01740960116 (Personal)
                  </p>

                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Open your mobile wallet app</li>
                    <li>
                      Select <strong>Send Money</strong>
                    </li>
                    <li>
                      Send <strong>BDT 100/- only</strong>
                    </li>
                    <li>
                      In the <strong>Reference</strong> field, write your
                      <strong> Student ID</strong>
                    </li>
                    <li>Take a screenshot of the payment confirmation</li>
                    <li>Upload the screenshot to the Google Form</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600">
                  Please ensure all payment details are correct before
                  submitting. Incorrect or unclear payment proof may delay
                  verification. 😊
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Eligibility */}
            <AccordionItem value="eligibility">
              <AccordionTrigger className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Eligibility Criteria</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>1st & 2nd year undergraduate students (19 & 20 batch)</li>
                  <li>Any department of Jagannath University</li>
                  <li>Interested in IT skill development & networking</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Selection */}
            <AccordionItem value="selection">
              <AccordionTrigger className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Selection Process</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-gray-700">
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Introductory Class</li>
                  <li>MCQ Test</li>
                  <li>Viva (Interview)</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* Contact */}
            <AccordionItem value="contact">
              <AccordionTrigger className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Contact & Important Notes</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Email:</strong> jnuitsbd@gmail.com <br />
                  <strong>Phone:</strong> 01721129467, 01567934536
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* Banner  */}

          <Image
            src="/banner.jpeg"
            alt="Decorative"
            width={1000}
            height={1000}
            className="mt-5"
          />
        </section>

        {/* RIGHT: FORM */}
        <section className="bg-white rounded-xl shadow">
          <MemberForm />
        </section>
      </div>
    </div>
  );
}
