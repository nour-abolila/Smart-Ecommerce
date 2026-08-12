// data/footer-data.ts

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", href: "/category/electronics" },
      { label: "Fashion", href: "/category/fashion" },
      { label: "Home & Living", href: "/category/home-living" },
      { label: "Beauty", href: "/category/beauty" },
      { label: "Sports & Outdoors", href: "/category/sports-outdoors" },
      { label: "Books", href: "/category/books" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Orders", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Track Shipment", href: "/account/track" },
      { label: "Returns & Refunds", href: "/account/returns" },
      { label: "Payment Methods", href: "/account/payment" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/help/shipping" },
      { label: "Seller Portal", href: "/seller" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const storeBadges = [
  { label: "App Store", href: "https://apps.apple.com" },
  { label: "Google Play", href: "https://play.google.com" },
];