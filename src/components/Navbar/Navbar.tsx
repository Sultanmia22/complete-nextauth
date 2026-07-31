import Link from "next/link";

import { Sparkles } from "lucide-react";
import AuthButtons from "../Buttons/AuthButtons";

export default function Navbar() {

    const NavLink = [
        {
            itemName: "Home",
            itemPath: '/'
        },

        {
            itemName: "Private",
            itemPath: "/private",
        },

        {
            itemName: "Public",
            itemPath: "/public"
        },

        {
            itemName: "Dashboard",
            itemPath: "/dashboard"
        }
    ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Auth.js
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
            {
                NavLink.map((link, index) => {                   
                    return (
                        <Link key={index} href={link.itemPath}>
                            {link.itemName}
                        </Link>
                    )
                })
            }
        </div>

        {/* Right Side: Auth Buttons */}
        <AuthButtons />

      </div>
    </header>
  );
}