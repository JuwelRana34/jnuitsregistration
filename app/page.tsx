import MemberForm from "@/components/member-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ClipboardList,
  CalendarDays,
  HelpCircle,
  UserCheck,
  Sparkles,
  Phone,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                  <li>Pay the BDT 100 registration fee via bKash/Nagad</li>
                  <li>Fill out the form below</li>
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
                <p><strong>Starts:</strong> 20th December 2025</p>
                <p><strong>Ends:</strong> 12th January 2026</p>
                <p><strong>Offline:</strong> On-campus (2–3 days, TBA)</p>
                <p><strong>Fee:</strong> BDT 100/-</p>
              </AccordionContent>
            </AccordionItem>

            {/* Eligibility */}
            <AccordionItem value="eligibility">
              <AccordionTrigger className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Eligibility Criteria</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-gray-700">
                <div>
                  <p className="font-medium">Who can apply?</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>1st & 2nd year undergraduate students (19 & 20 batch)</li>
                    <li>Any department of Jagannath University</li>
                    <li>Interested in IT skill development & networking</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium">Who gets priority?</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Public speakers & content creators</li>
                    <li>Photographers, designers, video editors</li>
                    <li>Developers and creative thinkers</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Selection Process */}
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
                <p>
                  🏆 Top <strong>150–180</strong> candidates will be selected as
                  General Members.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Why Join */}
            <AccordionItem value="why">
              <AccordionTrigger className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Why Join JnUITS?</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Workshops, seminars & competitions</li>
                  <li>Collaborate on National IT Fest events</li>
                  <li>Exclusive member-only workshops</li>
                  <li>Leadership & real-world skill development</li>
                </ul>
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
                  Please ensure all information provided is accurate and complete.
                  Incomplete or incorrect data may delay processing.
                </p>
                <p>
                  <strong>Email:</strong> jnuitsbd@gmail.com <br />
                  <strong>Phone:</strong> 01721129467, 01567934536
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* RIGHT: FORM */}
        <section className="bg-white rounded-xl shadow ">
          <MemberForm />
        </section>

      </div>
    </div>
  );
}
