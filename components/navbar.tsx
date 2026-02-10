"use client";

import { useSession, signOut } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Home,
  Map,
  Plus,
  List,
  Menu,
  X,
  Newspaper,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface NavbarProps {
  isAdmin?: boolean;
}

export function Navbar({ isAdmin }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();
  const session = data?.session;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const baseLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/map", label: "Map", icon: Map },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  const userLinks = [
    { href: "/add-food", label: "Share Food", icon: Plus },
    { href: "/my-listings", label: "My Listings", icon: List },
  ];

  const adminLinks = [{ href: "/admin", label: "My Users", icon: Shield }];

  const navLinks = [
    ...baseLinks,
    ...(session ? (isAdmin ? adminLinks : userLinks) : []),
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Image
              src="/logo.svg" // your logo in /public/logo.svg
              alt="FoodShare Logo"
              width={32} // adjust width
              height={32} // adjust height
              className="object-contain"
            />
            <span>FoodShare</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant={pathname === href ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2 hover:bg-muted"
                >
                  {/* <Icon className="h-4 w-4" /> */}
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <Button
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="block">
                <Button
                  variant={pathname === href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}

            <div className="pt-2 border-t border-border space-y-2">
              {session ? (
                <Button
                  onClick={() => {
                    signOut();
                    router.push("/login");
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button size="sm" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
