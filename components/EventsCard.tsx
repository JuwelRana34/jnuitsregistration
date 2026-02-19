import { Calendar, MapPin, Users } from "lucide-react";

import { GetBccRegistrationCount } from "@/app/admin/_components/UserData";
import { RegistrationDeadline } from "@/app/constants/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuroraText } from "./ui/aurora-text";
import { BorderBeam } from "./ui/border-beam";
import { ShimmerButton } from "./ui/shimmer-button";
import { Skeleton } from "./ui/skeleton";

export function EventCard() {
  return (
    <div className="p-4 flex justify-center items-center">
      <Card className="relative w-full max-w-87.5 overflow-hidden transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Basic Computer Course <AuroraText>Season-8</AuroraText>{" "}
            </CardTitle>
            <span className="bg-green-100 text-green-500 rounded-full px-2 py-1 text-xs animate-pulse border border-blue-300 font-medium">
              Live
            </span>
          </div>
          <CardDescription>
            Master MS Office, Windows, and Essential Digital Skills.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Event Image/Banner */}
            <div className="relative h-44 w-full overflow-hidden rounded bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <Users className="h-24 w-24 text-white" />
                <Image
                  src="/BCC.png"
                  height={500}
                  width={500}
                  alt="BCC"
                  className="h-auto w-auto"
                />
              </div>
              <div className="absolute bottom-2 left-2 rounded-md bg-black/50 p-2 text-white backdrop-blur-md">
                <p className="text-xs font-semibold">
                  <Suspense
                    fallback={<Skeleton className="h-3 w-8 bg-white/20" />}
                  >
                    <GetBccRegistrationCount /> attending
                  </Suspense>
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4 text-primary" />
                <span>
                  {new Date(RegistrationDeadline).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  •{" "}
                  {new Date(RegistrationDeadline).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span>Jnu It Society, Dhaka</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Link href="/bcc">
            <ShimmerButton className="shadow-2xl">
              <span className="text-center text-sm leading-none  tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10 flex">
                <Users className="size-4" /> Join Now
              </span>
            </ShimmerButton>
          </Link>
        </CardFooter>

        {/* Decorative Border Beams */}
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
          className="from-transparent via-fuchsia-500 to-transparent"
        />
      </Card>
    </div>
  );
}
