import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  footerSections,
  legalLinks,
  storeBadges,
} from "@/components/layouts/website/data/footerdata";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-[1280px] m-auto  bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-0 py-12">
        <Separator className="my-10" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h2 className="text-2xl font-extrabold tracking-tight">
              RIVO<span className="text-orange-500">'</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-[300px]">
              Your trusted online marketplace. Millions of products, delivered
              fast.
            </p>
            <div className="flex gap-2 pt-1">
              {storeBadges.map((badge) => (
                <Button
                  key={badge.label}
                  variant="outline"
                  size="sm"
                  className="rounded-lg p-3"
                >
                  <Link href={badge.href} target="_blank">
                    {badge.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Link sections, looped from data */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} RIVO. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
