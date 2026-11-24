import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import ArrowLink from '../components/ArrowLink';
import MemberHome from '../components/MemberHome';
import SitePreview from '../components/SitePreview';
import { PageLoading } from '../components/DataState';
import {
  ApiBlock,
  EventListings,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ProjectSpread,
  SectionLabel,
  LeadershipCards,
} from '../components/HomeSections';
import { InstagramIcon } from '../components/BrandIcons';
import { useAuth } from '../context/AuthContext';
import { useApiData } from '../hooks/useApiData';
import { getEvents, getProjects, getTeam } from '../services/api';

/*
 * Public home page (logged out): a "cover story" layout.
 * Oversized headline, asymmetric grids, numbered sections, real data only.
 */

const CONTENTS = [
  { number: '01', label: 'About', href: '#about' },
  { number: '02', label: 'Events', href: '#events' },
  { number: '03', label: 'Projects', href: '#projects' },
  { number: '04', label: 'Team', href: '#team' },
];

const ACTIVITIES = [
  { title: 'Coding Sessions', text: 'Solve problems and build projects together.' },
  { title: 'Tech Events', text: 'Explore hackathons, tech talks and community events.' },
  { title: 'Workshops', text: 'Learn practical skills through hands-on sessions.' },
  { title: 'Mentorship', text: 'Get guidance on projects and technical growth.' },
  { title: 'Open Source', text: 'Contribute to projects that solve real problems.' },
  { title: 'Competitions', text: 'Participate in coding contests and hackathons.' },
];

/* ───────── Cover ───────── */
function Cover() {
  return (
    <section className="pt-24 sm:pt-28">
      <div className="wrap">
        <div className="rule-ink pt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 animate-enter">
          <p className="eyebrow !text-text-primary">Chitkara University · Coding Club</p>
          <p className="eyebrow hidden sm:block">Programmers · Developers · AI enthusiasts</p>
        </div>

        <h1 className="display-xl text-text-primary mt-10 sm:mt-16 lg:mt-20">
          <span className="block animate-enter enter-delay-1">Build.</span>
          <span className="block sm:pl-[12%] animate-enter enter-delay-2">Connect.</span>
          <span className="block sm:pl-[28%] italic text-accent animate-enter enter-delay-3">Innovate.</span>
        </h1>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <p className="lg:col-span-5 lg:col-start-1 lede animate-enter enter-delay-3">
            A student-led technical community bringing together programmers, developers and AI
            enthusiasts. Explore, build and grow — beyond the classroom.
          </p>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end animate-enter enter-delay-3">
            <Button to="/join">
              Join the Club
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <ArrowLink to="/projects">View Projects</ArrowLink>
          </div>
        </div>

        {/* Table of contents */}
        <nav aria-label="On this page" className="mt-12 sm:mt-16">
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CONTENTS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex h-full min-h-[6.5rem] sm:min-h-[8rem] flex-col justify-between gap-6 border border-border bg-bg-card p-4 sm:p-5 transition-colors duration-200 hover:border-ink hover:bg-sage/35 focus-visible:border-ink"
                >
                  <span className="flex items-center justify-between">
                    <span className="eyebrow transition-colors group-hover:!text-accent-ink">{item.number}</span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="rotate-90 text-text-muted transition-[transform,color] duration-200 group-hover:translate-y-0.5 group-hover:text-accent-ink"
                    />
                  </span>
                  <span className="font-display text-2xl sm:text-3xl tracking-[-0.03em] text-text-primary">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  return (
    <section id="about" className="scroll-mt-20 pt-12 sm:pt-14 pb-20 sm:pb-28">
      <div className="wrap">
        <SectionLabel number="01">About</SectionLabel>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-3 eyebrow !text-text-primary !text-xs pt-2">What is Code2Chill?</h2>
          <p className="lg:col-span-9 display-md text-text-primary">
            A university developer community where students collaborate, explore new technologies and{' '}
            <em className="text-accent-ink">build real projects together.</em>
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-start-4 lg:col-span-4 bg-sage p-6 sm:p-7">
            <h3 className="eyebrow !text-ink mb-3">Our mission</h3>
            <p className="text-ink/85 leading-relaxed">
              To create a welcoming space where students can learn, experiment with technology and develop
              their skills through hands-on projects, workshops and peer collaboration.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 bg-sand p-6 sm:p-7">
            <h3 className="eyebrow !text-ink mb-3">Our vision</h3>
            <p className="text-ink/85 leading-relaxed">
              To build the most active student developer community on campus — a place where every member
              ships real code, shares knowledge and grows their technical identity.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <h3 className="display-sm text-text-primary">What we do</h3>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              From weekly coding sessions to inter-college hackathons.
            </p>
          </div>
          <ol className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {ACTIVITIES.map((activity, index) => (
              <li key={activity.title} className="border-t border-border py-5">
                <p className="eyebrow mb-3" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h4 className="font-display text-xl tracking-[-0.02em] text-text-primary mb-1">{activity.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{activity.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────── Events ───────── */
function EventsSection() {
  const events = useApiData(getEvents);

  return (
    <section id="events" className="theme-dark scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <SectionLabel number="02">Events</SectionLabel>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="display-lg text-text-primary">
              On the <em className="text-accent">calendar</em>
            </h2>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-sm">
              Hackathons, workshops, tech talks and meetups run by the club.
            </p>
            <div className="mt-8">
              <ArrowLink to="/events">All events</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ApiBlock query={events} loadingLabel="Loading events…">
              {(data) => <EventListings events={data?.events} limit={3} />}
            </ApiBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Projects ───────── */
function ProjectsSection() {
  const projects = useApiData(getProjects);

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <SectionLabel number="03">Projects</SectionLabel>
        <div className="mt-10 sm:mt-14 mx-auto max-w-3xl text-center">
          <h2 className="display-lg text-text-primary">
            Projects made by the <em className="text-accent">team</em>
          </h2>
          <p className="lede mx-auto mt-5">
            Projects built by Code2Chill members. From web apps and mobile tools to AI experiments and CLI
            utilities.
          </p>
          <div className="mt-6 flex justify-center">
            <ArrowLink to="/projects">All projects</ArrowLink>
          </div>
        </div>

        <SitePreview className="mt-12 sm:mt-16" />

        <div className="mt-16 sm:mt-20">
          <ApiBlock query={projects} loadingLabel="Loading projects…">
            {(data) => <ProjectSpread projects={data?.projects} limit={3} showLeadVisual={false} />}
          </ApiBlock>
        </div>
      </div>
    </section>
  );
}

/* ───────── Team ───────── */
function TeamSection() {
  const team = useApiData(getTeam);

  return (
    <section id="team" className="theme-sand scroll-mt-20 py-20 sm:py-28">
      <div className="wrap">
        <SectionLabel number="04">Team</SectionLabel>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="display-lg text-text-primary">
              The <em className="text-accent-ink">people</em>
            </h2>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-sm">
              The students who run Code2Chill.
            </p>
            <div className="mt-8">
              <ArrowLink to="/team">Meet the team</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ApiBlock query={team} loadingLabel="Loading team…">
              {(data) => <LeadershipCards leads={data?.leads} core={data?.core} />}
            </ApiBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Join (ink band) ───────── */
function JoinBand() {
  return (
    <section className="bg-ink text-paper py-20 sm:py-28 border-b border-paper/10">
      <div className="wrap">
        <SectionLabel tone="paper">Join</SectionLabel>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <h2 className="lg:col-span-8 display-lg text-paper">
            Ready to start <em className="text-accent">building?</em>
          </h2>
          <div className="lg:col-span-4">
            <p className="text-paper/80 leading-relaxed mb-8">
              Join Code2Chill and become part of a community that codes, creates and collaborates. No
              experience required — just curiosity.
            </p>
            <Button to="/join">
              Join Us Today
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-6 border-t border-paper/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-paper/70">Event announcements and community news</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tap gap-3 font-display text-2xl tracking-[-0.02em] text-paper hover:text-accent transition-colors"
          >
            <InstagramIcon size={20} />
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <p className="mt-10 text-sm text-paper/70">
          Already a member?{' '}
          <Link to="/login" className="link-quiet text-paper">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ───────── Home Page ───────── */
function Home() {
  const { user, isLoading } = useAuth();

  // While a stored token is being checked, show neither version, so a
  // signed-in visitor never sees the guest page flash on refresh.
  if (isLoading) {
    return <PageLoading label="Loading…" />;
  }

  if (user) {
    return <MemberHome user={user} />;
  }

  return (
    <>
      <Cover />
      <About />
      <EventsSection />
      <ProjectsSection />
      <TeamSection />
      <JoinBand />
    </>
  );
}

export default Home;
