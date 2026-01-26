"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Loader from "./userLoader";


export default function Navbar() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const Navlink = [
    {
      name: "Home",
      href: "/",
    },
  ];

  const showLoading = !isAuthenticated && isLoading;
  const showAdmin = isAuthenticated && !isLoading;

  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/MainLogo.svg"
            alt="JnU IT Society Logo"
            width={90}
            height={90}
            className="h-16 w-16 "
          />
          <Link
            href="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-600"
          >
            JnU IT Society          
          </Link>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          {Navlink.map((link) => (
            <Link key={link.name} href={link.href}>
              <Button
                variant="ghost"
                className={`${
                  isActive(link.href)
                    ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                    : ""
                }`}
              >
                {link.name}
              </Button>
            </Link>
          ))}

          {showLoading ? (
            <Loader />
          ) : (
            <>
              {showAdmin && (
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className={`${
                      isActive("/admin")
                        ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                        : ""
                    }`}
                  >
                    Admin
                  </Button>
                </Link>
              )}

              {showAdmin ? (
                <LogoutLink postLogoutRedirectURL="/">
                  <Button variant="destructive">Logout</Button>
                </LogoutLink>
              ) : (
                <LoginLink>
                  <Button variant="ghost">Admin Login</Button>
                </LoginLink>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-65">
            <div className="mt-10 flex flex-col gap-4">
              {Navlink.map((link) => (
                <Link key={link.name} href={link.href}>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className={`w-full ${
                        isActive(link.href)
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                          : ""
                      }`}
                    >
                      {link.name}
                    </Button>
                  </SheetClose>
                </Link>
              ))}

              {showLoading ? (
                <Loader />
              ) : (
                <>
                  {showAdmin && (
                    <Link href="/admin">
                       <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className={` w-full ${
                          isActive("/admin")
                            ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                            : ""
                        }`}
                      >
                        Admin
                      </Button>
                      </SheetClose>
                    </Link>
                  )}

                  {showAdmin ? (
                    <LogoutLink postLogoutRedirectURL="/">
                      <Button className="w-full rounded-none bg-red-100 text-red-700" variant="destructive">Logout</Button>
                    </LogoutLink>
                  ) : (
                    <LoginLink>
                      <Button variant="ghost">Admin Login</Button>
                    </LoginLink>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
   
    </header>
  );
}
