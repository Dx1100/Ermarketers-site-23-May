import raw from "./site.json";

export type NavLink = { label: string; href: string };
export type IconKey = "barChart3" | "search" | "sparkles" | "target";

export type HomeService = {
  icon: IconKey;
  title: string;
  desc: string;
};

export type CaseStudy = {
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  image: string;
};

export type Stat = { value: string; label: string };

export type ServicesPageService = {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
  features: string[];
};

export type SiteContent = {
  brand: { logoLetter: string; namePlain: string; nameAccent: string };
  nav: { links: NavLink[]; ctaLabel: string; ctaHref: string };
  home: {
    seoTitle: string;
    heroBadge: string;
    heroHeadlineLines: [string, string];
    heroSubheadline: string;
    trustedByLabel: string;
    trustedByBrands: string[];
    stats: Stat[];
    services: HomeService[];
    caseStudies: CaseStudy[];
  };
  servicesPage: {
    seoTitle: string;
    seoDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    services: ServicesPageService[];
  };
  footer: {
    tagline: string;
    companyLinks: NavLink[];
    serviceLinks: NavLink[];
    newsletterTitle: string;
    newsletterBlurb: string;
    contactEmail: string;
    contactPhoneDisplay: string;
    contactPhoneTel: string;
    contactPhoneDisplay2?: string;
    contactPhoneTel2?: string;
    social: { twitter: string; linkedin: string; instagram: string };
    legal: { privacyLabel: string; privacyHref: string; termsLabel: string; termsHref: string };
    copyrightTail: string;
  };
};

export const siteContent = raw as unknown as SiteContent;

