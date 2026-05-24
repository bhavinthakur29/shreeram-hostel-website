import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  GalleryHorizontalEnd,
  MapPin,
  Menu,
  Phone,
  Quote,
  Shield,
  Star,
  Sun,
  Utensils,
  Wifi,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  contactDetails,
  facilities,
  footerLinks,
  galleryItems,
  highlights,
  heroStats,
  navigationLinks,
  reviews,
  rooms,
  trustHighlights,
} from './data/site';

// ─── Motion variants ────────────────────────────────────────────────────────

const SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const stagger = (delay = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

const slideRight = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.48, ease: EASE_OUT } },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sectionIds = navigationLinks.map((l) => l.href);

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const activeRoomFeatures = useMemo(() => rooms.map((r) => r.features.length), []);

  // ── Active section tracker ──────────────────────────────────────────────
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const offset = 130;
      let next = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) next = id;
      }
      setActiveSection(next);
      setScrollTopVisible(window.scrollY > 480);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // ── Body lock while mobile menu open ───────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // ── Keyboard: close mobile menu on Escape ──────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = {
      name: contactForm.name.trim() ? '' : 'Name is required.',
      phone: /^\d{10}$/.test(contactForm.phone.trim()) ? '' : 'Enter a valid 10-digit phone number.',
      message: contactForm.message.trim() ? '' : 'Message is required.',
    };
    setFormErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setFormSent(true);
    setContactForm({ name: '', phone: '', message: '' });
  };

  const resetContactForm = () => {
    setFormSent(false);
    setFormErrors({ name: '', phone: '', message: '' });
    setContactForm({ name: '', phone: '', message: '' });
  };

  const currentGallery = selectedGallery === null ? null : galleryItems[selectedGallery];

  return (
    <div className="min-h-screen bg-[#FFFAF5] text-[#1a1208] antialiased">

      {/* ── Read progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 z-[100]"
      />

      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[60rem] w-[60rem] rounded-full bg-orange-100/25" />
        <div className="absolute top-40 -right-32 h-[44rem] w-[44rem] rounded-full bg-amber-100/20" />
        <div className="absolute bottom-0 left-1/2 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-orange-50/20" />
      </div>

      {/* ══════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="sticky top-[3px] z-50 bg-[#FFFAF5]/95 border-b border-orange-100/80 shadow-[0_4px_18px_rgba(249,115,22,0.04)]"
      >
        <div className="mx-auto max-w-7xl px-5 flex h-[68px] items-center gap-4">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="flex items-center gap-3 text-left"
            onClick={() => scrollToSection('hero')}
            aria-label="Go to home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-[11px] font-black text-white shadow-lg shadow-orange-300/40">
              SR
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/25 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-tight">Shree Ram Hostel</div>
              <div className="text-[11px] font-semibold text-orange-500/80 -mt-0.5">Boys PG · Sitapura, Jaipur</div>
            </div>
          </motion.button>

          {/* Desktop nav */}
          <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navigationLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{ color: activeSection === link.href ? '#ea580c' : '#6b5a45' }}
              >
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-orange-50 border border-orange-200/80"
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex ml-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
              <Button asChild variant="outline" size="sm" className="rounded-full border-orange-200 bg-white/90 text-[#1a1208] hover:bg-orange-50 hover:border-orange-300 shadow-sm gap-1.5">
                <a href="https://maps.app.goo.gl/czzWMeADDZwdYQEy5" target="_blank" rel="noreferrer">
                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                  View Map
                  <ArrowUpRight className="h-3 w-3 opacity-40" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SPRING}>
              <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-300/40 hover:from-orange-600 hover:to-amber-600 gap-1.5">
                <a href="tel:+919999999999">
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Hamburger */}
          <motion.div whileTap={{ scale: 0.9 }} transition={SPRING} className="ml-auto lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-orange-200"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -80, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 80, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="border-t border-orange-100/70 bg-[#FFFAF5]/98 px-5 pb-5 lg:hidden overflow-hidden"
            >
              <motion.div
                variants={stagger(0.05)}
                initial="hidden"
                animate="show"
                className="mt-4 grid gap-1.5"
              >
                {navigationLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    variants={slideRight}
                    onClick={() => scrollToSection(link.href)}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeSection === link.href
                        ? 'bg-orange-50 text-orange-600 border border-orange-200/70'
                        : 'text-[#4a3728] hover:bg-orange-50/60'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div variants={fadeUp} className="mt-1">
                  <Button asChild className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 border-0 shadow-lg shadow-orange-200/50">
                    <a href="tel:+919999999999"><Phone className="h-4 w-4 mr-2" /> Call Now</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <HeroSection scrollToSection={scrollToSection} heroStats={heroStats} trustHighlights={trustHighlights} rooms={rooms} />

        {/* ══════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════ */}
        <SectionHeading id="about" eyebrow="About Us" title="Your home away from home" description="Comfort, routine, and affordability come together for students who want a steady place to live and study." />

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-5">
            {/* Value cards */}
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { value: 'Clean', label: 'Rooms daily maintained', icon: <Sun className="h-5 w-5" />, from: 'from-sky-400', to: 'to-blue-400' },
                { value: 'Fresh', label: 'Meals prepared regularly', icon: <Utensils className="h-5 w-5" />, from: 'from-green-400', to: 'to-emerald-500' },
                { value: 'Safe', label: 'Secure environment', icon: <Shield className="h-5 w-5" />, from: 'from-violet-400', to: 'to-purple-500' },
                { value: 'Easy', label: 'Near Sitapura area', icon: <MapPin className="h-5 w-5" />, from: 'from-orange-400', to: 'to-amber-500' },
              ].map((item) => (
                <motion.div
                  key={item.value}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: SPRING }}
                  className="relative overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-lg shadow-orange-100/40 cursor-default"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.from} ${item.to} text-white shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="text-3xl font-black text-[#1a1208]">{item.value}</div>
                  <p className="mt-1 text-sm text-[#9b836a]">{item.label}</p>
                  <div className={`absolute -right-5 -bottom-5 h-20 w-20 rounded-full bg-gradient-to-br ${item.from} ${item.to} opacity-[0.10] blur-xl`} />
                </motion.div>
              ))}
            </motion.div>

            {/* About prose */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-3xl border border-orange-100/60 bg-white/92 p-8 shadow-lg shadow-orange-100/30 md:p-10"
            >
              <div className="mb-8 flex items-start gap-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
                  className="mt-3 h-1 w-14 origin-left rounded-full bg-gradient-to-r from-orange-500 to-amber-400 flex-shrink-0"
                />
                <p className="text-lg leading-8 text-[#4a3728]">
                  Shree Ram Hostel provides affordable and comfortable accommodation for students in Sitapura, Jaipur. The hostel offers clean rooms, hygienic food, WiFi facilities, hot and cold water, and a peaceful environment suitable for study and daily living.
                </p>
              </div>

              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(249,115,22,0.12)', transition: SPRING }}
                    className="group rounded-2xl border border-orange-100/60 bg-gradient-to-br from-orange-50/50 to-white p-5 cursor-default"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: -4 }}
                      transition={SPRING}
                      className="text-3xl mb-3 inline-block"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-bold text-[#1a1208]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#9b836a]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FACILITIES
        ══════════════════════════════════════════════ */}
        <section id="facilities" className="py-24 bg-gradient-to-b from-transparent to-orange-50/30">
          <SectionHeading eyebrow="What We Offer" title="Facilities built around real student life" description="Everything you need for a comfortable and productive stay." />
          <div className="mx-auto max-w-7xl px-5">
            <motion.div
              variants={stagger(0.055)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            >
              {facilities.map((facility) => (
                <motion.div
                  key={facility.title}
                  variants={fadeUp}
                  whileHover={{ y: -7, transition: SPRING }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-orange-100/70 bg-white p-6 shadow-md shadow-orange-100/30 cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={SPRING}
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 text-2xl shadow-inner"
                  >
                    {facility.icon}
                  </motion.div>
                  <h3 className="font-bold text-[#1a1208]">{facility.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#9b836a]">{facility.description}</p>
                  {/* Animated bottom border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-orange-400 to-amber-400"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ROOMS
        ══════════════════════════════════════════════ */}
        <section id="rooms" className="py-24">
          <SectionHeading eyebrow="Accommodation" title="Choose the room that fits your routine" description="Single, double, or triple sharing — designed around comfort and affordability." />
          <div className="mx-auto max-w-7xl px-5">
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {rooms.map((room, i) => (
                <motion.div
                  key={room.title}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: SPRING }}
                  className={`group relative overflow-hidden rounded-3xl border bg-white shadow-lg transition-shadow hover:shadow-2xl ${
                    room.emphasized
                      ? 'border-orange-300 shadow-orange-200/50 hover:shadow-orange-200/70'
                      : 'border-orange-100/60 shadow-orange-100/30'
                  }`}
                >
                  {room.emphasized && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
                      className="absolute top-0 inset-x-0 h-1 origin-left bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 z-10"
                    />
                  )}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={room.image}
                      alt={room.alt}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-lg ${
                        room.emphasized
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                          : 'bg-white/90 text-[#1a1208]'
                      }`}>
                        {room.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white">{room.title}</h3>
                      <p className="mt-1 text-sm font-medium text-white/80">{room.price}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="grid gap-2.5">
                      {room.features.map((feature, fi) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: fi * 0.06 + 0.1 }}
                          className="flex items-center gap-3 text-sm text-[#6b5a45]"
                        >
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                            <Check className="h-3 w-3" />
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={SPRING} className="mt-6">
                      <Button
                        asChild
                        className={`w-full rounded-full ${
                          room.emphasized
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-200/50 hover:from-orange-600 hover:to-amber-600'
                            : 'border-orange-200 bg-white text-[#1a1208] hover:bg-orange-50 hover:border-orange-300'
                        }`}
                        variant={room.emphasized ? 'default' : 'outline'}
                      >
                        <a href="tel:+919999999999">Enquire Now</a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature count row */}
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-6 grid gap-4 md:grid-cols-3"
            >
              {activeRoomFeatures.map((count, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white px-6 py-4 shadow-sm"
                >
                  <AnimatedNumber value={count} className="text-3xl font-black text-orange-500" />
                  <p className="text-sm text-[#9b836a]">Amenities in {rooms[i].title.toLowerCase()}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            REVIEWS
        ══════════════════════════════════════════════ */}
        <section id="reviews" className="py-24 bg-gradient-to-b from-orange-50/30 to-transparent">
          <SectionHeading eyebrow="Testimonials" title="What students say" description="Real feedback from residents who value comfort, cleanliness, and consistency." />
          <div className="mx-auto max-w-7xl px-5">
            {/* Summary */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mb-8 overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-lg shadow-amber-100/30 md:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <AnimatedNumber value={4.4} decimals={1} className="text-6xl font-black text-[#1a1208]" />
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -30 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ ...SPRING, delay: i * 0.07 }}
                        >
                          <Star className={`h-4 w-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'}`} />
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-[#9b836a]">51 verified reviews</p>
                  </div>
                  <div className="h-16 w-px bg-amber-200/70" />
                  <p className="text-sm text-[#6b5a45] max-w-xs">Students consistently praise the clean environment, consistent meals, and helpful management team.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Consistent meals', 'Quiet study atmosphere', 'Helpful management'].map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ ...SPRING, delay: i * 0.1 }}
                      className="rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-[#4a3728] shadow-sm"
                    >
                      ✓ {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Review cards */}
            <motion.div
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.name}
                  variants={fadeUp}
                  whileHover={{ y: -7, transition: SPRING }}
                  className="group h-full overflow-hidden rounded-3xl border border-orange-100/60 bg-white p-6 shadow-lg shadow-orange-100/30 cursor-default"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING, delay: i * 0.05 }}
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                  <Quote className="h-7 w-7 text-orange-200 mb-3" />
                  <p className="text-sm leading-7 text-[#6b5a45]">{review.text}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-orange-100/60 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-400 text-sm font-bold text-white">
                      {review.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#1a1208]">{review.name}</div>
                      <div className="text-xs text-[#9b836a]">Resident</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            GALLERY
        ══════════════════════════════════════════════ */}
        <section id="gallery" className="py-24">
          <SectionHeading eyebrow="Gallery" title="Take a look inside" description="A quick visual tour of the hostel, rooms, and common spaces." />
          <div className="mx-auto max-w-7xl px-5">
            <motion.div
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 auto-rows-[220px]"
            >
              {galleryItems.map((item, index) => (
                <motion.button
                  key={item.title}
                  variants={scaleIn}
                  onClick={() => setSelectedGallery(index)}
                  whileHover={{ scale: 1.02, transition: SPRING }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/40 shadow-lg ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-orange-600/15"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
                      <GalleryHorizontalEnd className="h-3 w-3" /> Gallery
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={SPRING}
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/30 text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════ */}
        <section id="contact" className="py-24 bg-gradient-to-b from-transparent to-orange-50/40">
          <SectionHeading eyebrow="Get in Touch" title="Contact us" description="Call, visit, or send an inquiry to get availability and pricing details." />
          <div className="mx-auto max-w-7xl px-5 grid gap-8 lg:grid-cols-[1fr_1.1fr]">

            {/* Contact details */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl border border-orange-100/60 bg-white p-7 shadow-lg shadow-orange-100/30"
            >
              <h3 className="text-xl font-black text-[#1a1208] mb-6">Reach out directly</h3>
              <motion.div
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-3.5"
              >
                {contactDetails.map((detail) => (
                  <motion.div
                    key={detail.label}
                    variants={slideRight}
                    whileHover={{ x: 4, transition: SPRING }}
                    className="flex items-start gap-4 rounded-2xl border border-orange-100/60 bg-orange-50/30 p-4 transition-colors hover:bg-orange-50 hover:border-orange-200"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 text-xl shadow-inner">
                      {detail.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500/80 mb-1">{detail.label}</div>
                      {detail.label === 'Address' ? (
                        <a className="text-sm font-medium text-[#1a1208] transition hover:text-orange-500" href={detail.href} target="_blank" rel="noreferrer">{detail.value}</a>
                      ) : (
                        <a className="text-sm font-medium text-[#1a1208] transition hover:text-orange-500" href={detail.href}>{detail.value}</a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={SPRING} className="mt-6">
                <Button asChild variant="outline" className="w-full rounded-full border-orange-200 bg-orange-50 text-[#1a1208] hover:bg-orange-100 hover:border-orange-300 shadow-sm gap-2">
                  <a href="https://maps.google.com/?q=Shree+Ram+Hostel+Sitapura+Jaipur" target="_blank" rel="noreferrer">
                    <MapPin className="h-4 w-4 text-orange-500" /> Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-orange-100/60 bg-white p-7 shadow-lg shadow-orange-100/30"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#1a1208]">Send a message</h3>
                  <p className="mt-1 text-sm text-[#9b836a]">We'll get back to you quickly</p>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Quick response
                </motion.span>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="mb-6 h-px origin-left bg-gradient-to-r from-orange-300 via-amber-200 to-transparent"
              />

              <AnimatePresence mode="wait">
                {!formSent ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={submitContact}
                    className="grid gap-4"
                  >
                    {[
                      { field: 'name' as const, placeholder: 'Your name', inputMode: undefined },
                      { field: 'phone' as const, placeholder: 'Phone number (10 digits)', inputMode: 'numeric' as const },
                    ].map(({ field, placeholder, inputMode }) => (
                      <motion.div key={field} whileFocus={{ scale: 1.01 }} className="relative">
                        <Input
                          value={contactForm[field]}
                          onChange={(e) => {
                            setContactForm((c) => ({ ...c, [field]: e.target.value }));
                            setFormErrors((c) => ({ ...c, [field]: '' }));
                          }}
                          placeholder={placeholder}
                          inputMode={inputMode}
                          className="rounded-2xl border-orange-200 bg-orange-50/30 focus:border-orange-400 focus-visible:ring-orange-200 placeholder:text-[#c4b09a] h-12 transition-all"
                        />
                        {formErrors[field] && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 text-xs text-red-500"
                          >
                            {formErrors[field]}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                    <div>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => {
                          setContactForm((c) => ({ ...c, message: e.target.value }));
                          setFormErrors((c) => ({ ...c, message: '' }));
                        }}
                        placeholder="Tell us about your stay requirements"
                        className="rounded-2xl border-orange-200 bg-orange-50/30 focus:border-orange-400 focus-visible:ring-orange-200 placeholder:text-[#c4b09a] resize-none min-h-[120px] transition-all"
                      />
                      {formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs text-red-500"
                        >
                          {formErrors.message}
                        </motion.p>
                      )}
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
                      <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-200/50 hover:from-orange-600 hover:to-amber-600 h-12 font-semibold">
                        Send Message
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="flex flex-col items-center rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/60 px-6 py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ ...SPRING, delay: 0.15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-400 text-white shadow-xl shadow-orange-200/50 mb-4"
                    >
                      <Check className="h-7 w-7" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-[#1a1208]">Thank you!</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#9b836a]">We'll get back to you shortly with the details you need.</p>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SPRING} className="mt-6">
                      <Button variant="outline" className="rounded-full border-orange-200 bg-white text-[#1a1208] hover:bg-orange-50" onClick={resetContactForm}>
                        Send Another
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="border-t border-white/10 bg-[#140e07] text-white/60">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr]"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-[11px] font-black text-white shadow-lg shadow-orange-900/40">
                  SR
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                <div>
                  <div className="font-bold text-white/90">Shree Ram Hostel</div>
                  <div className="text-xs text-orange-400/70">श्री राम हॉस्टल</div>
                </div>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
                Affordable and comfortable boys hostel in Sitapura, Jaipur — with study-friendly spaces, hygienic meals, and dependable facilities.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-900 text-amber-900'}`} />
                ))}
                <span className="ml-1 text-xs text-white/35">4.4 · 51 reviews</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-5">Quick Links</div>
              <div className="grid gap-3">
                {footerLinks.map((link) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 4, color: '#f97316' }}
                    transition={SPRING}
                    className="w-fit text-left text-sm text-white/50"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-5">Contact</div>
              <div className="grid gap-3 text-sm text-white/50">
                {[
                  { href: 'tel:+919999999999', icon: <Phone className="h-3.5 w-3.5" />, text: '+91 99999 99999' },
                  { href: null, icon: <MapPin className="h-3.5 w-3.5" />, text: 'Sitapura Area, Jaipur, Rajasthan' },
                  { href: 'mailto:info@shreeramhostel.com', icon: <BookOpen className="h-3.5 w-3.5" />, text: 'info@shreeramhostel.com' },
                ].map((item) =>
                  item.href ? (
                    <motion.a key={item.text} href={item.href} whileHover={{ x: 3, color: '#f97316' }} transition={SPRING} className="flex items-center gap-2">
                      {item.icon} {item.text}
                    </motion.a>
                  ) : (
                    <span key={item.text} className="flex items-center gap-2">{item.icon} {item.text}</span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-12 h-px bg-white/8" />

          <div className="mt-8 flex flex-col gap-4 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Shree Ram Hostel. All rights reserved.</p>
            <div className="flex gap-2">
              {['Facebook', 'Instagram', 'WhatsApp'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.06, borderColor: 'rgba(249,115,22,0.5)', color: '#f97316' }}
                  transition={SPRING}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <AnimatePresence>
        {scrollTopVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={SPRING}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-300/40"
            aria-label="Back to top"
          >
            <ChevronLeft className="h-5 w-5 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <LightboxModal
        open={currentGallery !== null}
        title={currentGallery?.title ?? ''}
        image={currentGallery?.image ?? ''}
        onPrev={() => setSelectedGallery((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length))}
        onNext={() => setSelectedGallery((i) => (i === null ? null : (i + 1) % galleryItems.length))}
        onClose={() => setSelectedGallery(null)}
      />
    </div>
  );
}

// ─── Hero Section (extracted for cleanliness) ────────────────────────────────

function HeroSection({ scrollToSection, heroStats, trustHighlights, rooms }: {
  scrollToSection: (id: string) => void;
  heroStats: readonly { value: string; label: string }[];
  trustHighlights: readonly string[];
  rooms: readonly {
    title: string;
    badge: string;
    price: string;
    image: string;
    alt: string;
    features: readonly string[];
    emphasized: boolean;
  }[];
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 grid min-h-[calc(100vh-68px)] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">

        {/* Left copy */}
        <motion.div className="relative z-10">
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badges */}
            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2.5">
              {[
                { icon: <Star className="h-3 w-3 fill-amber-500 text-amber-500" />, text: '4.4 Rating · 51 Reviews', color: 'border-amber-200 bg-amber-50 text-amber-700' },
                { icon: <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />, text: 'Open 24 Hours', color: 'border-green-200 bg-green-50 text-green-700' },
                { icon: <MapPin className="h-3 w-3" />, text: 'Sitapura, Jaipur', color: 'border-orange-200 bg-orange-50 text-orange-700' },
              ].map((b) => (
                <motion.span
                  key={b.text}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={SPRING}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${b.color}`}
                >
                  {b.icon} {b.text}
                </motion.span>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[1.04] tracking-tight text-[#1a1208] sm:text-6xl lg:text-[4.5rem]"
            >
              Premium boys{' '}
              <motion.span
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto' }}
              >
                PG living
              </motion.span>
              <br className="hidden sm:block" />
              in Sitapura
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-3 text-xl font-semibold text-orange-400/90">
              Shree Ram Hostel · श्री राम हॉस्टल
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-base leading-7 text-[#6b5a45]">
              A student-first hostel with clean rooms, hygienic meals, reliable WiFi, and secure access designed for focused study and comfortable daily living.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} transition={SPRING}>
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-white border-0 shadow-xl shadow-orange-300/40 hover:from-orange-600 hover:to-amber-600">
                  <a href="tel:+919999999999"><Phone className="h-4 w-4 mr-2" /> Call Now</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
                <Button
                  asChild size="lg" variant="outline"
                  className="rounded-full border-orange-200 bg-white/80 px-8 text-[#1a1208] hover:bg-orange-50 hover:border-orange-300 shadow-sm"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollToSection('rooms'); }}
                >
                  <a href="#rooms">View Rooms <ChevronRight className="h-4 w-4 ml-1" /></a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-8">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.45, ease: EASE_OUT }}
                  className="flex flex-col"
                >
                  <span className="text-2xl font-black text-[#1a1208]">{stat.value}</span>
                  <span className="text-xs font-medium text-[#9b836a] mt-0.5">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust chips */}
            <motion.div variants={stagger(0.05)} className="mt-7 flex flex-wrap gap-2">
              {trustHighlights.map((item) => (
                <motion.span
                  key={item}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={SPRING}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-medium text-[#4a3728] shadow-sm"
                >
                  <Check className="h-3.5 w-3.5 text-orange-500" /> {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: hero card */}
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE_OUT }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-orange-200/35 to-amber-200/25 blur-2xl" />
          <div className="relative rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-orange-100/60 ring-1 ring-orange-100">
            <div className="grid gap-5 lg:grid-cols-[260px_1fr]">

              {/* Image panel */}
              <div
                className="relative flex min-h-[38rem] flex-col overflow-hidden rounded-[2rem] bg-cover bg-center"
                style={{ backgroundImage: `url(${rooms[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="relative z-10 m-4 self-start rounded-full bg-black/50 px-4 py-2 text-xs text-white/90 font-medium">
                  ⭐ 4.4 · 51 reviews
                </div>
                <div className="relative z-10 m-4 mt-auto rounded-[1.5rem] border border-white/15 bg-white/12 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Double Sharing</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight text-white">
                    Comfort that fits student life
                  </h2>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    Clean, practical, and peaceful — designed for focused daily study.
                  </p>
                </div>
              </div>

              {/* Right panel */}
              <div className="flex flex-col justify-between gap-4 py-2 pr-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500">At a glance</p>
                  <h3 className="mt-1.5 text-2xl font-black tracking-tight text-[#1a1208]">Why students choose us</h3>
                </div>

                <div className="grid gap-2.5">
                  {[
                    { icon: <Utensils className="h-4 w-4" />, title: 'Hygienic Food', copy: 'Fresh meals every day' },
                    { icon: <Wifi className="h-4 w-4" />, title: 'Reliable WiFi', copy: 'Always connected' },
                    { icon: <Droplets className="h-4 w-4" />, title: 'Clean Water', copy: 'Hot & cold supply' },
                    { icon: <Shield className="h-4 w-4" />, title: 'Secure Access', copy: '24hr safety measures' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.09, duration: 0.4, ease: EASE_OUT }}
                      whileHover={{ x: 3, transition: SPRING }}
                      className="flex items-center gap-3 rounded-2xl border border-orange-100/70 bg-orange-50/40 p-3 transition-colors hover:bg-orange-50 hover:border-orange-200"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 text-white shadow-md shadow-orange-200/40">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1a1208]">{item.title}</div>
                        <p className="text-xs text-[#9b836a]">{item.copy}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl border border-orange-200/50 bg-gradient-to-br from-orange-50 to-amber-50/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">Quick Actions</p>
                  <div className="flex flex-col gap-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
                      <Button asChild className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-200/40 hover:from-orange-600 hover:to-amber-600 text-sm">
                        <a href="tel:+919999999999"><Phone className="h-3.5 w-3.5 mr-2" /> Call Now</a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
                      <Button asChild variant="outline" className="w-full rounded-full border-orange-200 bg-white text-[#1a1208] hover:bg-orange-50 text-sm">
                        <a href="https://maps.app.goo.gl/czzWMeADDZwdYQEy5" target="_blank" rel="noreferrer">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-orange-500" /> Open Map
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-orange-300/60 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-orange-400/60" />
        </motion.div>
        <span className="text-[10px] font-medium text-orange-400/50 uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, description, id }: {
  eyebrow: string; title: string; description: string; id?: string;
}) {
  return (
    <motion.div
      id={id}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto max-w-7xl px-5 pb-10 pt-8 text-center"
    >
      <motion.span
        variants={scaleIn}
        className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange-600"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#1a1208] sm:text-5xl text-balance"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#9b836a] sm:text-lg">
        {description}
      </motion.p>
    </motion.div>
  );
}

// ─── Animated Number ─────────────────────────────────────────────────────────

function AnimatedNumber({ value, decimals = 0, className }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.onChange((v: number) => setDisplay(v.toFixed(decimals)));
  }, [spring, decimals]);

  return <span ref={ref} className={className}>{display}</span>;
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function LightboxModal({ open, title, image, onClose, onPrev, onNext }: {
  open: boolean; title: string; image: string;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/95 p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.9, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 32, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0a05] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            {[
              { pos: 'right-4 top-4', onClick: onClose, icon: <X className="h-4 w-4" />, label: 'Close' },
            ].map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING}
                onClick={btn.onClick}
                className={`absolute ${btn.pos} z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/12 text-white`}
                aria-label={btn.label}
              >
                {btn.icon}
              </motion.button>
            ))}

            {/* Prev/Next */}
            {[
              { side: 'left-4', fn: onPrev, icon: <ChevronLeft className="h-5 w-5" />, label: 'Previous' },
              { side: 'right-16', fn: onNext, icon: <ChevronRight className="h-5 w-5" />, label: 'Next' },
            ].map((nav) => (
              <motion.button
                key={nav.label}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING}
                onClick={(e) => { e.stopPropagation(); nav.fn(); }}
                className={`absolute ${nav.side} top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/12 text-white`}
                aria-label={nav.label}
              >
                {nav.icon}
              </motion.button>
            ))}

            <AnimatePresence mode="wait">
              <motion.img
                key={image}
                src={image}
                alt={title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] w-full object-contain bg-[#0f0a05]"
              />
            </AnimatePresence>

            <div className="border-t border-white/8 px-6 py-4 text-center text-sm text-white/50">{title}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}