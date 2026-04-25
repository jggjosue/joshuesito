"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navigationItems, navItemIsActive } from "./Navbar";
import { cn } from "@/lib/utils";
import { Link, usePathname } from '@/navigation';
import { useEffect, useState } from "react";

export function MobileMenu() {
  const location = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex px-2 space-y-1 flex-col">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex items-center border-b-2 px-2 py-2.5 text-md font-semibold transition-[border-color,color]",
                navItemIsActive(location, item.href)
                  ? "border-primary"
                  : "border-transparent hover:border-border",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <SheetFooter className="mt-5">
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
