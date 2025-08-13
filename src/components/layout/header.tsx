"use client"

import Link from "next/link"
import { Car, User, PlusCircle, History } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block text-lg">
              Areco Rides
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/create-trip">
                <PlusCircle className="mr-2 h-4 w-4"/>
                Post a Trip
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/profile#my-trips">
                <History className="mr-2 h-4 w-4" />
                My Trips
              </Link>
            </Button>
          </nav>
          <Button variant="outline" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
