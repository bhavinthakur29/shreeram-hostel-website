import siteContent from './site-content.json';

type NavigationLink = { label: string; href: string };
type HeroStat = { value: string; label: string };
type Highlight = { title: string; description: string; icon: string };
type Facility = { title: string; description: string; icon: string };
type Room = {
  title: string;
  badge: string;
  price: string;
  image: string;
  alt: string;
  features: readonly string[];
  emphasized: boolean;
};
type Review = { name: string; rating: number; text: string; initial: string };
type GalleryItem = { title: string; image: string };
type ContactDetail = { label: string; value: string; href: string; icon: string };

const content = siteContent as {
  navigationLinks: NavigationLink[];
  heroStats: HeroStat[];
  trustHighlights: string[];
  highlights: Highlight[];
  facilities: Facility[];
  rooms: Room[];
  reviews: Review[];
  galleryItems: GalleryItem[];
  contactDetails: ContactDetail[];
};

export const navigationLinks = content.navigationLinks;
export const heroStats = content.heroStats;
export const trustHighlights = content.trustHighlights;
export const highlights = content.highlights;
export const facilities = content.facilities;
export const rooms = content.rooms;
export const reviews = content.reviews;
export const galleryItems = content.galleryItems;
export const contactDetails = content.contactDetails;
export const footerLinks = navigationLinks;