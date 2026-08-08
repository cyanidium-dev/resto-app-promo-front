export const siteConfig = {
  name: 'MySaniTrace',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mysanitrace.com',
  email: 'contact@mysanitrace.com',
  phone: '+373 22 000 000',
  /** E.164, for tel: and messenger deep links. */
  phoneRaw: '+37322000000',
  whatsapp: '37322000000',
  telegram: 'mysanitrace',

  address: {
    street: 'str. Alexandru cel Bun 1',
    city: 'Chișinău',
    postal: 'MD-2012',
    country: 'Moldova',
  },

  /* PLACEHOLDER — not a real registration. Moldova issues an IDNO, Romania a
     CUI; which one applies depends on the operating entity, and the client has
     not supplied either (docs/TZ.md §9, question 10). Must be replaced before
     launch: publishing an invented company number is a legal problem, not a
     cosmetic one. */
  regNumberPlaceholder: '1000000000000',

  /* The site launch year. The footer renders "2026–<current>" from it, so the
     range keeps itself up to date without an edit every January. */
  launchYear: 2026,
} as const;

/** Built by. Same treatment as the nbyg footer. */
export const credits = {
  webBond: { url: 'https://webbond.dk/', logo: '/images/footer/WebBondLogo.webp' },
  codeSite: { url: 'https://www.code-site.art/', logo: '/images/footer/CodeSiteLogo.svg' },
} as const;

/**
 * Every product visual on the site is a swappable image slot.
 * Paths live here so that replacing the placeholder set with real product
 * screenshots later — via CMS or by dropping files in — touches one file.
 *
 * Screens are dark-only by design: a dark product frame reads correctly on
 * both the light and the dark theme, so one set covers both.
 * See docs/IMAGE-BRIEF.md.
 */
export const screens = {
  // Final assets.
  heroDashboard: '/images/screens/hero-dashboard.png',
  temperatures: '/images/screens/temperatures.png',
  checklists: '/images/screens/checklists.png',
  mobileChecklist: '/images/screens/mobile-checklist.png',
  mobileTemperature: '/images/screens/mobile-temperature.png',

  /* Still awaiting their own file (docs/IMAGE-BRIEF.md). Each points at the
     closest existing screenshot so no slot renders empty — an obvious
     placeholder box looks worse in a client demo than a stand-in that fits.
     When the real file arrives, change the path here and nothing else.
     Stand-ins are spread across the three available screenshots so that no
     two adjacent sections show the same picture. */
  cleaning: '/images/screens/hero-dashboard.png', // → cleaning.png
  tasks: '/images/screens/checklists.png', // → tasks.png
  photoEvidence: '/images/screens/temperatures.png', // → photo-evidence.png
  alerts: '/images/screens/hero-dashboard.png', // → alerts.png
  correctiveActions: '/images/screens/checklists.png', // → corrective-actions.png
  reports: '/images/screens/hero-dashboard.png', // → reports.png
  multiLocation: '/images/screens/temperatures.png', // → multi-location.png
} as const;

export const photos = {
  /* Hero art direction — the kitchen dissolving into the platform UI, cut
     three ways because a left-to-right split has nowhere to go on a 390px
     screen. Each falls back to the desktop file until its own is produced. */
  heroSplit: '/images/photos/hero-split.jpg',
  heroSplitTablet: '/images/photos/hero-split-tablet.jpg',
  heroSplitMobile: '/images/photos/hero-split-mobile.jpg',
  kitchen: '/images/photos/photo-kitchen.jpg',
  coldRoom: '/images/photos/photo-coldroom.jpg',
  hotel: '/images/photos/photo-hotel.jpg',
  bakery: '/images/photos/photo-bakery.jpg',
  catering: '/images/photos/photo-catering.jpg',
  production: '/images/photos/photo-coldroom.jpg', // → photo-production.jpg
} as const;

export type ScreenKey = keyof typeof screens;
export type PhotoKey = keyof typeof photos;
