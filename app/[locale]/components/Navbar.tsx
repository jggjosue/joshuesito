"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";

export const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  /*{
    name: "Startups",
    href: "/startups",
  },*/
  {
    name: "Apps",
    href: "/apps",
  },
  {
    name: "Books",
    href: "/books",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Jobs",
    href: "/job",
  },
  /*{
    name: "Guestbook",
    href: "/guestbook",
    },
   */
];

export function navItemIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('Language');
  const language = t('language');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70 dark:border-border/40 dark:supports-[backdrop-filter]:bg-background/75">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5 grid grid-cols-12">
      <div className="col-span-6 flex md:col-span-3">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Joshu<span className="text-blue-500">esito</span>
          </h1>
        </Link>
      </div>

      <div className="hidden sm:flex justify-center items-center col-span-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={navItemIsActive(pathname, item.href)}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium",
                      "border-b-2 border-transparent pb-[6px] transition-[color,border-color]",
                      "data-[active]:border-primary data-[active]:bg-transparent",
                      "hover:text-foreground/90 data-[active]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center justify-end md:col-span-3 col-span-6">
        <Button className="hidden sm:flex" asChild>
          <ModeToggle />
          {
            /*
            * <a href="mailto:josue.23.glez@gmail.com">Contact Me</a>
            * */
          }
        </Button>

        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </div>
      </nav>
    </header>
  );
}
