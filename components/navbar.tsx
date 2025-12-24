"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated } = useKindeBrowserClient();
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const Navlink = [
    {
      name: "Home",
      href: "/",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-600">
          JnU IT Socity
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
            {Navlink.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                    variant="ghost"
                    className={`${isActive(link.href) ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}


          {isAuthenticated && (
            <Link href="/admin">
              <Button variant="ghost" className={`${isActive("/admin") ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`}>
                Admin
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <LogoutLink postLogoutRedirectURL="/">
              <Button variant="destructive">Logout</Button>
            </LogoutLink>
          ) : (
            <LoginLink>
              <Button variant="ghost" className={`${isActive("/admin") ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`}>Admin Login</Button>
            </LoginLink>
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
            <div className="mt-6 flex flex-col gap-4">
               {Navlink.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                    variant="ghost"
                    className={`${isActive(link.href) ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}

              {isAuthenticated && (
                <Link href="/admin">
                  <Button variant="ghost"  className={` w-full ${isActive("/admin") ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`}>
                    Admin
                  </Button>
                </Link>
              )}

              {isAuthenticated ? (
                <LogoutLink postLogoutRedirectURL="/">
                  <Button variant="destructive" className="w-full">
                    Logout
                  </Button>
                </LogoutLink>
              ) : (
                <LoginLink>
                  <Button variant="ghost" className={` w-full ${isActive("/admin") ? "bg-blue-500 text-white hover:bg-blue-600 hover:text-white" : ""}`} >Admin Login</Button>
                </LoginLink>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
