import { GetBccRegistrationCount } from "@/app/admin/_components/UserData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuroraText } from "./ui/aurora-text";
import { BorderBeam } from "./ui/border-beam";
import { ShimmerButton } from "./ui/shimmer-button";
import { Skeleton } from "./ui/skeleton";

export interface Course {
  id: number;
  title: string;
  season: string;
  description: string;
  image: string | null;
  location: string;
  link: string;
  badge: "Live" | "Comming Soon" | "Closed" | string;
  deadline: string;
}

interface EventCardProps {
  course: Course;
}

export function EventCard({ course }: EventCardProps) {
  const formattedDate = new Date(course.deadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(course.deadline).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="relative w-full max-w-87.5 overflow-hidden transition-all hover:shadow-xl border-none shadow-md mb-5 ">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold leading-tight">
            {course.title} <AuroraText>{course.season}</AuroraText>
          </CardTitle>
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase border animate-pulse ${
              course.badge === "Live"
                ? "bg-green-100 text-green-600 border-green-200"
                : "bg-blue-100 text-blue-600 border-blue-200"
            }`}
          >
            {course.badge}
          </span>
        </div>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Banner Image with Fallback */}
          <div className="relative h-44 w-full overflow-hidden rounded-lg bg-linear-to-br from-slate-100 to-slate-200">
            {course.image ? (
              <Image
                src={course.image}
                fill
                alt={course.title}
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-indigo-50">
                <Users className="h-12 w-12 text-indigo-200" />
              </div>
            )}

            <div className="absolute bottom-2 left-2 rounded-md bg-black/50 p-2 text-white backdrop-blur-md border border-white/10">
              <div className="text-[10px] font-bold flex items-center gap-1.5">
                <Users className="size-3 text-cyan-400" />
                <Suspense
                  fallback={<Skeleton className="h-3 w-8 bg-white/20" />}
                >
                  {course.id === 2 ? <p> 0 </p> : <GetBccRegistrationCount />}
                </Suspense>
                <span className="opacity-80">attending</span>
              </div>
            </div>
          </div>

          {/* Dynamic Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <Calendar className="size-3.5 text-primary" />
              {course.id === 1 ? (
                <span>
                  {formattedDate} • {formattedTime}
                </span>
              ) : (
                <p>To be announced soon</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <MapPin className="size-3.5 text-primary" />
              <span>{course.location}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {course.id === 1 ? (
          <Link href={course.link} className="w-full">
            <ShimmerButton className="w-full shadow-lg">
              <span className="flex items-center justify-center gap-2 text-sm font-bold text-white">
                <Users className="size-4" /> Join Now
              </span>
            </ShimmerButton>
          </Link>
        ) : (
          <ShimmerButton className="w-full shadow-lg">
            <span className="flex items-center justify-center gap-2 text-sm font-bold text-white">
              <Users className="size-4" /> Coming Soon
            </span>
          </ShimmerButton>
        )}
      </CardFooter>

      <BorderBeam
        duration={8}
        size={300}
        className="from-transparent via-indigo-500 to-transparent"
      />
      <BorderBeam
        duration={8}
        delay={4}
        size={300}
        borderWidth={2}
        className={`from-transparent ${ course.id === 1 ? "via-green-500" : "via-fuchsia-500"} to-transparent`}
      />
    </Card>
  );
}
