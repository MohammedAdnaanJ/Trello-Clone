"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { ArrowRightIcon, Trello } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashBoard from "./DashBoard";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const isDashBoardPage = pathname === "/dashboard";
  const isBoardPage = pathname.startsWith("/boards/");

  if (isDashBoardPage) {
    return <DashBoard UserButton={UserButton} />;
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trello className="size-6 sm:size-8 text-blue-600" />
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            Trello Clone
          </span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 ">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Welcome, {user.firstName ?? user.emailAddresses[0].emailAddress}
              </span>
              <Link href="/dashboard">
                <Button className="text-xs sm:text-sm cursor-pointer" size="sm">
                  Go to Dashboard <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" className="text-xs sm:text-sm cursor">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
