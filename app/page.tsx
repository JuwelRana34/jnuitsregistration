import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Cpu, Trophy } from "lucide-react";
import Link from "next/link";
import { RegistrationDeadline } from "./constants/data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* --- Hero Section --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-blue-200/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Registration Open until{" "}
            {new Date(RegistrationDeadline).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master the Digital World <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              with AI & Technology
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join the <strong>Basic Computer Course (Season 8)</strong> by JnU IT
            Society. Equip yourself with essential skills for the 4th Industrial
            Revolution. Open for Students, Alumni, and Professionals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* 🔥 MAIN CTA BUTTON LINKING TO FORM 🔥 */}
            <Link href="/bcc">
              <Button
                size="lg"
                className="h-12 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-105"
              >
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="https://join.jnuits.org.bd/bcc" target="_blank">
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-8 text-lg rounded-full"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Join This Course?
            </h2>
            <p className="text-slate-500 mt-2">
              Comprehensive learning designed for your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="h-8 w-8 text-indigo-500" />}
              title="AI Integration"
              desc="Learn how to use modern AI tools to boost your productivity 10x faster."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-blue-500" />}
              title="Practical Skills"
              desc="Hands-on training on MS Office, Google Workspace, and essential computer basics."
            />
            <FeatureCard
              icon={<Trophy className="h-8 w-8 text-yellow-500" />}
              title="Certification"
              desc="Receive a prestigious certificate from JnUITS upon successful completion."
            />
          </div>
        </div>
      </section>

      {/* --- Details Strip --- */}
      {/* <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem icon={<Users />} value="500+" label="Students Trained" />
          <StatItem icon={<Calendar />} value="2 Days" label="Weekly Classes" />
          <StatItem icon={<Cpu />} value="Online" label="Class Platform" />
          <StatItem icon={<Trophy />} value="S-08" label="Current Season" />
        </div>
      </section> */}

      {/* --- Footer --- */}
      <footer className="py-8 bg-slate-950 text-slate-400 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Jagannath University IT Society. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

// --- Helper Components ---

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-none shadow-md bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="opacity-50 mb-1">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-slate-400 text-sm uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
