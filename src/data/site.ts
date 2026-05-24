export const navigationLinks = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Facilities', href: 'facilities' },
  { label: 'Rooms', href: 'rooms' },
  { label: 'Reviews', href: 'reviews' },
  { label: 'Gallery', href: 'gallery' },
  { label: 'Contact', href: 'contact' }
] as const;

export const heroStats = [
  { value: '4.4/5', label: 'Student rating' },
  { value: '51+', label: 'Verified reviews' },
  { value: '24/7', label: 'Open access' },
  { value: 'Sitapura', label: 'Prime location' }
] as const;

export const trustHighlights = [
  'Peaceful study-first atmosphere',
  'Fresh meals prepared daily',
  'Fast WiFi and reliable water supply',
  'Easy access from Sitapura landmarks'
] as const;

export const highlights = [
  { title: 'Good Food', description: 'Hygienic meals daily', icon: '🍽️' },
  { title: 'Clean Water', description: 'RO purified water', icon: '💧' },
  { title: 'WiFi Facility', description: 'High-speed internet', icon: '📶' },
  { title: 'Student-Friendly', description: 'Peaceful environment', icon: '📚' },
  { title: 'Affordable', description: 'Budget-friendly pricing', icon: '💰' },
  { title: '24/7 Available', description: 'Round-the-clock access', icon: '🕐' }
] as const;

export const facilities = [
  { title: 'WiFi', description: 'High-speed internet access throughout the hostel premises.', icon: '📶' },
  { title: 'Hot & Cold Water', description: '24/7 hot and cold water supply for comfortable living.', icon: '🚿' },
  { title: 'Hygienic Food', description: 'Nutritious vegetarian meals prepared in a clean kitchen.', icon: '🍽️' },
  { title: 'Clean Rooms', description: 'Daily housekeeping to maintain tidy rooms.', icon: '🛏️' },
  { title: 'Study Environment', description: 'Quiet and peaceful atmosphere ideal for study.', icon: '📖' },
  { title: '24/7 Availability', description: 'Round-the-clock access with no curfew restrictions.', icon: '🕐' },
  { title: 'Security', description: 'CCTV surveillance and secure entry for your safety.', icon: '🔒' },
  { title: 'Comfortable Stay', description: 'Well-furnished rooms with quality beds and mattresses.', icon: '😴' }
] as const;

export const rooms = [
  {
    title: 'Single Sharing',
    badge: 'Private focus',
    price: 'Contact for price',
    image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/bec06800a_generated_e49b9689.png',
    alt: 'Single Room',
    features: ['1 Bed', 'Fan', 'Personal Storage', 'Study Table', 'WiFi Access'],
    emphasized: false
  },
  {
    title: 'Double Sharing',
    badge: 'Most popular',
    price: 'Contact for price',
    image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/e64a07422_generated_4ec593cd.png',
    alt: 'Double Room',
    features: ['2 Beds', 'Fan', 'Shared Storage', 'Study Table', 'WiFi Access'],
    emphasized: true
  },
  {
    title: 'Triple Sharing',
    badge: 'Value pick',
    price: 'Contact for price',
    image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/7452100d8_generated_94e20a7f.png',
    alt: 'Triple Room',
    features: ['3 Beds', 'Fan', 'Common Storage', 'Study Area', 'WiFi Access'],
    emphasized: false
  }
] as const;

export const reviews = [
  { name: 'Rohit S.', rating: 5, text: 'Best PG in the area, nice room, good food and the best environment.', initial: 'R' },
  { name: 'Vikram K.', rating: 4, text: 'It is a good place for living with all facilities for students.', initial: 'V' },
  { name: 'Amit P.', rating: 5, text: 'Food and water are very clean. I recommend this hostel to every student.', initial: 'A' },
  { name: 'Rahul M.', rating: 4, text: 'Shree Ram PG provides amazing facilities at affordable prices.', initial: 'R' }
] as const;

export const galleryItems = [
  { title: 'Hostel Exterior', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/12ce50d87_generated_c862fde9.png' },
  { title: 'Single Room', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/bec06800a_generated_e49b9689.png' },
  { title: 'Dining & Food', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/f07caded0_generated_1934bb6c.png' },
  { title: 'Double Room', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/e64a07422_generated_4ec593cd.png' },
  { title: 'Common Area', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/c8dde061c_generated_8008cb6d.png' },
  { title: 'Triple Room', image: 'https://media.base44.com/images/public/6a132259b3615e4ca3c43b35/7452100d8_generated_94e20a7f.png' }
] as const;

export const contactDetails = [
  { label: 'Phone', value: '+91 99999 99999', href: 'tel:+919999999999', icon: '📞' },
  { label: 'Address', value: 'Sitapura Area, Jaipur, Rajasthan 302022', href: 'https://maps.google.com/?q=Shree+Ram+Hostel+Sitapura+Jaipur', icon: '📍' },
  { label: 'Hours', value: 'Open 24 Hours', href: 'https://maps.google.com/?q=Shree+Ram+Hostel+Sitapura+Jaipur', icon: '🕐' }
] as const;

export const footerLinks = navigationLinks;