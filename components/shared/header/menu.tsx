import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import ModeToggle from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart" className="flex items-center">
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href="/cart" className="flex items-center">
            <UserIcon className="w-5 h-5" /> Sign In
          </Link>
        </Button>
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start gap-2 "> 

            <SheetTitle className="m-4">Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant={"ghost"}>
              <Link href="/cart">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href="/cart" className="flex items-center">
                <UserIcon /> Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
