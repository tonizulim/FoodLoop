"use client";

import { useSession, signOut } from "../lib/auth-client";
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
} from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data, isPending } = useSession();
  const session = data?.session;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const baseLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/map", label: "Map", icon: Map },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  const userLinks = [
    { href: "/add-food", label: "Share Food", icon: Plus },
    { href: "/my-listings", label: "My Listings", icon: List },
  ];

  // ako nema sesije, userLinks se neće prikazivati
  const navLinks = [...baseLinks, ...(session ? userLinks : [])];
  console.log("Session in Navbar: ", session);

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-lg"
            >
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-foreground">FoodShare</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant={pathname === href ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <Button onClick={() => signOut()} variant="outline" size="sm">
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
        </div>

        {/* Mobile menu */}
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
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
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
