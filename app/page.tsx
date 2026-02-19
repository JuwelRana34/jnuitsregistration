import { EventCard } from "@/components/EventsCard";
import { AuroraText } from "@/components/ui/aurora-text";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Monitor, Trophy } from "lucide-react";
import { RegistrationDeadline } from "./constants/data";

export default function HomePage() {
  const COURSES = [
    {
      id: 1,
      title: "Basic Computer Course",
      season: "Season-8",
      description: "Master MS Office, Windows, and Essential Digital Skills.",
      image: "/BCC.png",
      location: "JnU IT Society, Dhaka",
      link: "/bcc",
      badge: "Live",
      deadline: RegistrationDeadline,
    },
    {
      id: 2,
      title: "Touch Typing",
      season: "course 1.0",
      description:
        "Master the Keyboard. The ultimate guide to speed typing without looking at the keys.",
      image: null,
      location: "JnU IT Society, Dhaka",
      link: "/touch-typing",
      badge: "Comming Soon",
      deadline: RegistrationDeadline,
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* --- Hero Section --- */}
      <h1 className="text-4xl  font-bold text-center text-slate-700 py-8">
        <AuroraText> JnU IT Society •</AuroraText> Our Courses
      </h1>
      {/* EventCard */}

      <div className=" md:flex justify-center items-center gap-4 p-3 pb-5 md:p-0 md:pb-0">
        {COURSES.map((course) => (
          <EventCard key={course.id} course={course} />
        ))}
      </div>

      {/* --- Features Grid --- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Join This Course?
            </h2>
            <p className="text-slate-500 mt-2">
              Beginner-friendly training designed to build your digital
              confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Monitor className="h-8 w-8 text-indigo-500" />}
              title="Computer Fundamentals"
              desc="Understand how computers work, learn basic operations, file management, and essential system skills."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-blue-500" />}
              title="Essential Software Skills"
              desc="Hands-on training in MS Word, Excel, PowerPoint, internet browsing, email, and online tools."
            />
            <FeatureCard
              icon={<Trophy className="h-8 w-8 text-yellow-500" />}
              title="Certificate of Completion"
              desc="Receive an official certificate from JnU IT Society after successfully finishing the course."
            />
          </div>
        </div>
      </section>

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
