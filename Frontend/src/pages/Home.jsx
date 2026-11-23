import { Link } from 'react-router-dom';
import {
  Code2,
  Users,
  Calendar,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Globe,
  Zap,
  BookOpen,
  Trophy,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import HeroCanvas from '../components/HeroCanvas';
import { OTHER_STATS } from '../data/stats';
import { useApiData } from '../hooks/useApiData';
import { getTeam } from '../services/api';

/* Shared styles */
const container = 'max-w-6xl mx-auto';
const section = 'py-12 sm:py-16 px-4 sm:px-6 lg:px-8';
const card = 'h-full rounded-xl border border-border bg-bg-card p-5';

const primaryButton =
  'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-display font-bold text-base ' +
  'shadow-[4px_4px_0_0_var(--color-text-primary)] transition-[transform,box-shadow] duration-150 ' +
  'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-text-primary)] ' +
  'active:translate-x-0 active:translate-y-0 active:shadow-none';

const secondaryButton =
  'group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-text-primary font-display font-bold text-base ' +
  'transition-colors duration-200 hover:border-accent hover:text-accent';

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-10 lg:pt-32 lg:pb-12">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center`}>
        {/* Left: heading, description, buttons */}
        <div className="lg:col-span-7">
          <div className="animate-fade-in-up flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-text-primary/70 text-text-primary font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
              Chitkara University
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-2" aria-hidden="true" />
              University Coding Club
            </span>
          </div>

          <h1 className="animate-fade-in-up animate-delay-100 font-bold leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6rem)] mb-6">
            <span className="block text-text-primary">Build.</span>{' '}
            <span className="block text-accent">Connect.</span>{' '}
            <span className="block text-outline">Innovate.</span>
          </h1>

          <p className="animate-fade-in-up animate-delay-200 max-w-xl text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
            A student-led technical community bringing together programmers,
            developers and AI enthusiasts. Explore, build and grow — beyond the
            classroom.
          </p>

          <div className="animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/join" className={primaryButton}>
              Join the Club
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/projects" className={secondaryButton}>
              View Projects
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right: developer workspace illustration */}
        <div className="lg:col-span-5 animate-fade-in-up animate-delay-400">
          <HeroCanvas className="max-w-[480px] mx-auto lg:mr-0" />
        </div>
      </div>
    </section>
  );
}

/* ───────── Statistics ───────── */
const STAT_DETAILS = {
  Projects: { icon: Rocket, to: '/projects' },
  Events: { icon: Calendar, to: '/events' },
  Workshops: { icon: BookOpen },
};

function StatCard({ value, label, icon: Icon, highlight = false, sample = false }) {
  return (
    <div
      className={`flex h-full flex-col justify-between gap-6 rounded-xl border p-5 transition-colors duration-200 ${
        highlight
          ? 'border-accent bg-accent text-bg-primary'
          : 'border-border bg-bg-card text-text-primary group-hover:border-accent/60'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] ${
            highlight ? '' : 'text-text-muted'
          }`}
        >
          {label}
        </span>
        <Icon size={18} aria-hidden="true" className={highlight ? '' : 'text-accent'} />
      </div>
      <div>
        <p className="font-display font-bold text-4xl sm:text-5xl leading-none tracking-[-0.04em]">
          {value}
        </p>
        {sample && <p className="mt-2 text-[11px] font-mono text-text-muted">Sample figure</p>}
      </div>
    </div>
  );
}

function Stats() {
  // Members comes from the backend (real team size); the rest are from stats.js.
  const team = useApiData(getTeam);
  const memberCount = team.data?.count;
  const members = {
    value: team.loading ? '…' : memberCount != null ? String(memberCount) : '—',
    label: memberCount === 1 ? 'Member' : 'Members',
  };

  const items = [
    { ...members, icon: Users, to: '/team', highlight: true },
    ...OTHER_STATS.map((stat) => ({ ...stat, ...(STAT_DETAILS[stat.label] || { icon: Zap }) })),
  ];

  return (
    <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className={container}>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Reveal as="li" key={item.label} delay={index * 60} className="h-full">
              {item.to ? (
                <Link to={item.to} className="group block h-full rounded-xl" aria-label={`${item.value} ${item.label}${item.sample ? ' (sample figure)' : ''}`}>
                  <StatCard {...item} />
                </Link>
              ) : (
                <StatCard {...item} />
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  const pillars = [
    {
      icon: Terminal,
      title: 'Our Mission',
      text: 'To create a welcoming space where students can learn, experiment with technology and develop their skills through hands-on projects, workshops and peer collaboration.',
    },
    {
      icon: Rocket,
      title: 'Our Vision',
      text: 'To build the most active student developer community on campus — a place where every member ships real code, shares knowledge and grows their technical identity.',
    },
  ];

  return (
    <section className={section}>
      <div className={container}>
        <SectionHeading
          align="left"
          badge="About Us"
          title="What is Code2Chill?"
          description="Code2Chill is a university developer community where students collaborate, explore new technologies and build real projects together."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80} className="h-full">
              <article className={`${card} transition-colors duration-200 hover:border-accent/50`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <pillar.icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{pillar.title}</h3>
                </div>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── What We Do ───────── */
function WhatWeDo() {
  const activities = [
    {
      icon: Code2,
      title: 'Coding Sessions',
      description: 'Solve problems and build projects together.',
    },
    {
      icon: Calendar,
      title: 'Tech Events',
      description: 'Explore hackathons, tech talks and community events.',
    },
    {
      icon: BookOpen,
      title: 'Workshops',
      description: 'Learn practical skills through hands-on sessions.',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Get guidance on projects and technical growth.',
    },
    {
      icon: Globe,
      title: 'Open Source',
      description: 'Contribute to projects that solve real problems.',
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate in coding contests and hackathons.',
    },
  ];

  return (
    <section className={section}>
      <div className={container}>
        <SectionHeading
          align="left"
          badge="What We Do"
          title="Explore, Build and Grow"
          description="From weekly coding sessions to inter-college hackathons — there's always something happening at Code2Chill."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <Reveal key={activity.title} delay={(index % 3) * 60} className="h-full">
              <article className="flex h-full items-start gap-3 rounded-xl border border-border bg-bg-card p-4 transition-colors duration-200 hover:border-accent/50">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                  <activity.icon size={18} className="text-accent" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-text-primary leading-tight mb-1">{activity.title}</h3>
                  <p className="text-text-secondary text-sm leading-snug">{activity.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Call to action ───────── */
function CallToAction() {
  return (
    <section className={section}>
      <Reveal className={container}>
        <div className="rounded-2xl bg-accent text-bg-primary p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to start building?</h2>
            <p className="text-base sm:text-lg text-bg-primary/80 font-medium">
              Join Code2Chill and become part of a community that codes, creates
              and collaborates. No experience required — just curiosity.
            </p>
          </div>
          <Link
            to="/join"
            className="group shrink-0 self-start lg:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bg-primary text-accent font-display font-bold text-base transition-colors duration-150 hover:bg-bg-secondary"
          >
            Join Us Today
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────── Home Page ───────── */
function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <WhatWeDo />
      <CallToAction />
    </>
  );
}

export default Home;
