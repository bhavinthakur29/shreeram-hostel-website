import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  Wifi,
  X
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
  trustHighlights
} from '@/data/site';

const sectionIds = navigationLinks.map((item) => item.href);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const activeRoomFeatures = useMemo(() => rooms.map((room) => room.features.length), []);

  useEffect(() => {
    let animationFrameId = 0;

    const updateScrollState = () => {
      const headerOffset = 120;
      let nextActiveSection = 'hero';

      for (const sectionId of sectionIds) {
        const node = document.getElementById(sectionId);
        if (!node) {
          continue;
        }

        const top = node.getBoundingClientRect().top;
        if (top <= headerOffset) {
          nextActiveSection = sectionId;
        }
      }

      setActiveSection(nextActiveSection);
      setScrollTopVisible(window.scrollY > 560);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      name: contactForm.name.trim() ? '' : 'Name is required.',
      phone: /^\d{10}$/.test(contactForm.phone.trim()) ? '' : 'Enter a valid 10-digit phone number.',
      message: contactForm.message.trim() ? '' : 'Message is required.'
    };

    setFormErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-0 top-24 h-[30rem] w-[30rem] translate-x-1/3 rounded-full bg-amber-400/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_32%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_28%),linear-gradient(180deg,rgba(255,251,247,0.96),rgba(255,248,240,0.9),rgba(255,255,255,1))]" />
      </div>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl"
      >
        <div className="container flex h-20 items-center gap-4">
          <button className="flex items-center gap-3 text-left" onClick={() => scrollToSection('hero')} aria-label="Go to home">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-black text-primary-foreground shadow-glow">
              SR
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold tracking-tight">Shree Ram Hostel</div>
              <div className="text-xs text-muted-foreground">Boys PG · Sitapura, Jaipur</div>
            </div>
          </button>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`rounded-full px-4 py-2 text-sm transition ${activeSection === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className="border-primary/20 bg-primary/5">
              <a href="https://maps.app.goo.gl/czzWMeADDZwdYQEy5" target="_blank" rel="noreferrer">
                View Map
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild>
              <a href="tel:+919999999999">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.22 }}
              className="border-t border-border/60 bg-background/95 px-4 pb-5 lg:hidden"
            >
              <div className="container mt-4 grid gap-2">
                {navigationLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm transition ${activeSection === link.href ? 'bg-primary/10 text-primary' : 'bg-muted/40 text-foreground hover:bg-muted'}`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button asChild className="mt-2">
                  <a href="tel:+919999999999">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <main>
        <section id="hero" className="relative overflow-hidden pt-8">
          <div className="container grid min-h-[calc(100vh-5rem)] items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }} className="relative z-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant="soft" className="gap-2 px-4 py-1.5 text-sm">
                  <Star className="h-3.5 w-3.5 fill-current text-primary" />
                  4.4 Rating
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-1.5 text-sm">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  Open 24 Hours
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-1.5 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Sitapura, Jaipur
                </Badge>
              </div>

              <div className="max-w-3xl">
                <h1 className="font-display text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
                  Premium boys PG living in Sitapura, Jaipur
                </h1>
                <p className="mt-3 font-display text-2xl text-muted-foreground sm:text-3xl">Shree Ram Hostel · श्री राम हॉस्टल</p>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  A student-first hostel with clean rooms, hygienic meals, reliable WiFi, and secure access designed for focused study and comfortable daily living.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <a href="tel:+919999999999">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary/20 bg-white/70">
                    <a
                      href="#rooms"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('rooms');
                      }}
                    >
                      View Rooms
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <Card key={stat.label} className="border-border/60 bg-white/80 shadow-sm backdrop-blur">
                      <CardContent className="p-5">
                        <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {trustHighlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur">
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }} className="relative">
              <div className="rounded-[2.5rem] bg-white p-4 shadow-2xl shadow-primary/5 ring-1 ring-black/5 sm:p-6 lg:p-8">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  
                  {/* Image Column */}
                  <div className="relative flex min-h-[36rem] flex-col overflow-hidden rounded-[2rem] bg-cover bg-center p-4 sm:p-5" style={{ backgroundImage: `url(${rooms[1].image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
                    
                    <div className="relative z-10 self-start rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
                      4.4 rating · 51 reviews
                    </div>

                    <div className="relative z-10 mt-auto rounded-[2rem] border border-white/20 bg-white/20 p-6 text-white backdrop-blur-lg sm:p-8">
                      <p className="text-sm font-medium text-white/90">Double sharing room</p>
                      <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">Comfort that fits student life</h2>
                      <p className="mt-4 text-sm leading-relaxed text-white/90">
                        Clean rooms, practical amenities, and a quiet atmosphere designed for focused daily study.
                      </p>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-col justify-center gap-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">At a glance</div>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">Quick reasons to choose us</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        A quieter, cleaner panel with fewer competing elements and a stronger visual hierarchy.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {[
                        { icon: <Utensils className="h-5 w-5" />, title: 'Hygienic food', copy: 'Fresh daily meals' },
                        { icon: <Wifi className="h-5 w-5" />, title: 'Reliable WiFi', copy: 'Always connected' },
                        { icon: <Droplets className="h-5 w-5" />, title: 'Clean water', copy: 'Hot and cold supply' }
                      ].map((item) => (
                        <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{item.title}</div>
                            <p className="text-sm text-muted-foreground">{item.copy}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 rounded-[2rem] border border-primary/15 bg-primary/5 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Why students choose us</div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            A calm, practical stay with the right balance of comfort and affordability.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button asChild variant="outline" className="flex-1 rounded-xl border-primary/20 bg-white hover:bg-primary/5">
                          <a href="https://maps.app.goo.gl/czzWMeADDZwdYQEy5" target="_blank" rel="noreferrer">
                            <MapPin className="mr-2 h-4 w-4" />
                            Open Map
                          </a>
                        </Button>
                        <Button asChild className="flex-1 rounded-xl shadow-lg shadow-primary/20">
                          <a href="tel:+919999999999">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionHeading id="about" eyebrow="About us" title="Your home away from home" description="Comfort, routine, and affordability come together in one place for students who want a steady place to live and study." />

        <section className="pb-20">
          <div className="container">
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              {[
                { value: 'Clean', label: 'rooms maintained daily' },
                { value: 'Fresh', label: 'meals prepared regularly' },
                { value: 'Safe', label: 'secure living environment' },
                { value: 'Easy', label: 'access near Sitapura' }
              ].map((item) => (
                <Card key={item.label} className="border-border/60 bg-white/75 shadow-sm backdrop-blur">
                  <CardContent className="p-5">
                    <div className="text-2xl font-semibold text-primary">{item.value}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-border/60 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
              <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
                Shree Ram Hostel provides affordable and comfortable accommodation for students in Sitapura, Jaipur. The hostel offers clean rooms, hygienic food, WiFi facilities, hot and cold water, and a peaceful environment suitable for study and living.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {highlights.map((item, index) => (
                  <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
                    <Card className="h-full border-border/60 bg-white/90 transition hover:-translate-y-1 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-3xl">{item.icon}</div>
                        <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="facilities" className="py-20">
          <SectionHeading eyebrow="What we offer" title="Facilities built around real student life" description="Everything you need for a comfortable and productive stay, presented without the clutter." />
          <div className="container grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {facilities.map((facility, index) => (
              <motion.div key={facility.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: index * 0.03 }}>
                <Card className="h-full border-border/60 bg-white/85 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl">{facility.icon}</div>
                    <h3 className="mt-4 text-lg font-semibold">{facility.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="rooms" className="py-20">
          <SectionHeading eyebrow="Accommodation" title="Choose the room that fits your routine" description="Single, double, or triple sharing options designed around comfort and affordability." />
          <div className="container grid gap-6 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <motion.div key={room.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Card className={`group overflow-hidden border-border/70 bg-white/90 transition hover:-translate-y-1 hover:shadow-2xl ${room.emphasized ? 'border-primary/30 shadow-lg shadow-primary/10' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={room.image} alt={room.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <Badge variant={room.emphasized ? 'default' : 'soft'}>{room.badge}</Badge>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-2xl font-semibold text-white">{room.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{room.price}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="grid gap-3 text-sm text-muted-foreground">
                      {room.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={room.emphasized ? 'default' : 'outline'} className="mt-6 w-full">
                      <a href="tel:+919999999999">Enquire Now</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="container mt-6 grid gap-4 md:grid-cols-3">
            {activeRoomFeatures.map((count, index) => (
              <Card key={index} className="border-border/60 bg-white/80">
                <CardContent className="p-5 text-center">
                  <div className="text-2xl font-semibold text-primary">{count}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Features in {rooms[index].title.toLowerCase()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="reviews" className="py-20">
          <SectionHeading eyebrow="Testimonials" title="What students say" description="Real feedback from residents who value comfort, cleanliness, and consistency." />
          <div className="container">
            <Card className="border-border/60 bg-white/90 p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <div className="mt-3 text-4xl font-semibold">4.4</div>
                  <p className="mt-1 text-sm text-muted-foreground">Based on 51 reviews</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Consistent meals', 'Quiet study atmosphere', 'Helpful management'].map((item) => (
                    <div key={item} className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {reviews.map((review, index) => (
                <motion.div key={review.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
                  <Card className="h-full border-border/60 bg-white/90 transition hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="flex h-full flex-col p-6">
                      <Quote className="h-8 w-8 text-primary/20" />
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{review.text}</p>
                      <div className="mt-auto pt-6">
                        <Separator className="mb-4" />
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{review.initial}</div>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="text-xs text-muted-foreground">Resident</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array.from({ length: review.rating }).map((_, starIndex) => (
                              <Star key={starIndex} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <SectionHeading eyebrow="Gallery" title="Take a look inside" description="A quick visual tour of the hostel, rooms, and common spaces." />
          <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item, index) => (
                <button key={item.title} onClick={() => setSelectedGallery(index)} className={`group relative overflow-hidden rounded-3xl ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[20rem]' : 'min-h-[12rem]'}`}>
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                    <GalleryHorizontalEnd className="h-3.5 w-3.5" />
                    Gallery
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <SectionHeading eyebrow="Get in touch" title="Contact us" description="Call, visit, or send an inquiry if you want availability and pricing details." />
          <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border/60 bg-white/90 p-1">
              <CardContent className="space-y-5 p-6">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl">{detail.icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{detail.label}</div>
                      {detail.label === 'Address' ? (
                        <a className="mt-1 block font-medium transition hover:text-primary" href={detail.href} target="_blank" rel="noreferrer">
                          {detail.value}
                        </a>
                      ) : (
                        <a className="mt-1 block font-medium transition hover:text-primary" href={detail.href}>
                          {detail.value}
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                <Button asChild variant="outline" className="w-full border-primary/20 bg-primary/5">
                  <a href="https://maps.google.com/?q=Shree+Ram+Hostel+Sitapura+Jaipur" target="_blank" rel="noreferrer">
                    <MapPin className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-white/90 p-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Inquiry form</div>
                    <h3 className="mt-2 text-2xl font-semibold">Send a message</h3>
                  </div>
                  <Badge variant="soft" className="gap-2">
                    <BookOpen className="h-3.5 w-3.5" />
                    Quick response
                  </Badge>
                </div>

                <Separator className="my-6" />

                {!formSent ? (
                  <form onSubmit={submitContact} className="grid gap-4">
                    <div>
                      <Input
                        value={contactForm.name}
                        onChange={(event) => {
                          setContactForm((current) => ({ ...current, name: event.target.value }));
                          setFormErrors((current) => ({ ...current, name: '' }));
                        }}
                        placeholder="Your name"
                      />
                      {formErrors.name ? <p className="mt-2 text-sm text-destructive">{formErrors.name}</p> : null}
                    </div>
                    <div>
                      <Input
                        value={contactForm.phone}
                        onChange={(event) => {
                          setContactForm((current) => ({ ...current, phone: event.target.value }));
                          setFormErrors((current) => ({ ...current, phone: '' }));
                        }}
                        placeholder="Phone number (10 digits)"
                        inputMode="numeric"
                      />
                      {formErrors.phone ? <p className="mt-2 text-sm text-destructive">{formErrors.phone}</p> : null}
                    </div>
                    <div>
                      <Textarea
                        value={contactForm.message}
                        onChange={(event) => {
                          setContactForm((current) => ({ ...current, message: event.target.value }));
                          setFormErrors((current) => ({ ...current, message: '' }));
                        }}
                        placeholder="Tell us about your stay requirements"
                      />
                      {formErrors.message ? <p className="mt-2 text-sm text-destructive">{formErrors.message}</p> : null}
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="grid place-items-center rounded-3xl border border-primary/15 bg-primary/5 px-6 py-12 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">Thank you!</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">We'll get back to you shortly with the details you need.</p>
                    <Button variant="outline" className="mt-6" onClick={resetContactForm}>
                      Send Another
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-neutral-950 text-white/75">
        <div className="container py-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-black text-primary-foreground">SR</div>
                <div>
                  <div className="font-semibold text-white">Shree Ram Hostel</div>
                  <div className="text-sm text-white/50">श्री राम हॉस्टल</div>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                Affordable and comfortable boys hostel accommodation in Sitapura, Jaipur with study-friendly spaces, hygienic meals, and dependable facilities.
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/35">Quick links</div>
              <div className="mt-5 grid gap-3 text-sm">
                {footerLinks.map((link) => (
                  <button key={link.href} onClick={() => scrollToSection(link.href)} className="w-fit text-left text-white/60 transition hover:text-primary">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/35">Contact</div>
              <div className="mt-5 grid gap-3 text-sm text-white/60">
                <a href="tel:+919999999999" className="transition hover:text-primary">+91 99999 99999</a>
                <span>Sitapura Area, Jaipur, Rajasthan</span>
                <a href="mailto:info@shreeramhostel.com" className="transition hover:text-primary">info@shreeramhostel.com</a>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-white/10" />

          <div className="flex flex-col gap-4 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Shree Ram Hostel. All rights reserved.</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'WhatsApp'].map((item) => (
                <a key={item} href="#" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-primary hover:text-primary">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {scrollTopVisible ? (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
            aria-label="Back to top"
          >
            <ChevronLeft className="h-5 w-5 rotate-90" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <LightboxModal
        open={currentGallery !== null}
        title={currentGallery?.title ?? ''}
        image={currentGallery?.image ?? ''}
        onClose={() => setSelectedGallery(null)}
      />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description: string; id?: string }) {
  return (
    <div id={id} className="container pb-10 pt-20 text-center">
      <Badge variant="soft" className="mx-auto px-4 py-1.5 text-xs uppercase tracking-[0.25em]">
        {eyebrow}
      </Badge>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
}

function LightboxModal({ open, title, image, onClose }: { open: boolean; title: string; image: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Close gallery image">
              <X className="h-5 w-5" />
            </button>
            <img src={image} alt={title} className="max-h-[80vh] w-full bg-neutral-950 object-contain" />
            <div className="border-t border-white/10 px-5 py-4 text-center text-sm text-white/70">{title}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default App;