import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Rocket,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';

/**
 * Home page for signed-in users. Everything personal comes from the
 * authenticated user returned by /api/auth/me (name, role, createdAt).
 * No statistics are invented.
 */

const container = 'max-w-6xl mx-auto';

const ACTIONS = [
  {
    to: '/events',
    icon: Calendar,
    title: 'Explore Events',
    text: 'See upcoming hackathons, workshops and meetups.',
  },
  {
    to: '/projects',
    icon: Rocket,
    title: 'Explore Projects',
    text: 'Browse what members are building and find one to join.',
  },
  {
    to: '/team',
    icon: Users,
    title: 'Meet the Team',
    text: 'Get to know the people who run Code2Chill.',
  },
  {
    to: '/profile',
    icon: User,
    title: 'My Profile',
    text: 'View your account details and manage your session.',
  },
];

const JOURNEY = [
  {
    step: '01',
    title: 'Pick an event',
    text: 'Start with a workshop or meetup that matches what you want to learn.',
    to: '/events',
    cta: 'Browse events',
  },
  {
    step: '02',
    title: 'Find a project',
    text: 'Look through club projects and pick one to read, try or contribute to.',
    to: '/projects',
    cta: 'Browse projects',
  },
  {
    step: '03',
    title: 'Connect with the team',
    text: 'Reach out to the leads and core team for guidance on where to begin.',
    to: '/team',
    cta: 'Meet the team',
  },
];

export function getFirstName(user) {
  const name = user?.name?.trim();
  return name ? name.split(/\s+/)[0] : '';
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function MemberHome({ user }) {
  const firstName = getFirstName(user);
  const memberSince = formatDate(user.createdAt);
  const role = user.role === 'admin' ? 'Admin' : 'Member';

  return (
    <div className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 lg:pt-32">
      <div className={container}>
        {/* Greeting */}
        <header className="animate-enter mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md border border-accent/50 text-accent text-[11px] font-mono font-bold uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 bg-accent-2" aria-hidden="true" />
            Your Dashboard
          </span>
          <h1 className="font-bold tracking-[-0.03em] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-text-primary break-words">
            Welcome back{firstName ? ', ' : ''}
            {firstName && <span className="text-accent">{firstName}</span>}!
          </h1>
          <p className="mt-4 max-w-2xl text-text-secondary text-base sm:text-lg leading-relaxed">
            Code2Chill is a community of students who learn by building together.
            Find an event, pick up a project or say hello to the team — there&apos;s
            always something to get involved in.
          </p>
        </header>

        {/* Quick actions */}
        <section aria-labelledby="member-actions" className="mb-12">
          <h2 id="member-actions" className="sr-only">
            Quick links
          </h2>
          <ul className="animate-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACTIONS.map((action) => (
              <li key={action.to} className="h-full">
                <Link
                  to={action.to}
                  className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-bg-card p-5 transition-colors duration-200 hover:border-accent/60 focus-visible:border-accent"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <action.icon size={20} className="text-accent" aria-hidden="true" />
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="text-text-muted transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-1">{action.title}</h3>
                    <p className="text-sm text-text-secondary leading-snug">{action.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Developer journey */}
        <section aria-labelledby="member-journey" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 animate-enter enter-delay-2 rounded-xl border border-border bg-bg-card p-5 sm:p-6">
            <h2 id="member-journey" className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
              Your Developer Journey
            </h2>
            <p className="text-sm text-text-secondary mb-5">
              Not sure where to start? Here&apos;s a simple path through the club.
            </p>
            <ol className="space-y-3">
              {JOURNEY.map((item) => (
                <li
                  key={item.step}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-lg border border-border bg-bg-primary p-4"
                >
                  <span className="font-mono text-sm font-bold text-accent shrink-0" aria-hidden="true">
                    {item.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-snug">{item.text}</p>
                  </div>
                  <Link
                    to={item.to}
                    className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                  >
                    {item.cta}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Account summary: real fields only */}
          <aside
            aria-label="Your account"
            className="animate-enter enter-delay-3 rounded-xl border border-border bg-bg-card p-5 sm:p-6"
          >
            <h2 className="text-sm font-mono font-bold uppercase tracking-[0.18em] text-text-muted mb-4">
              Your account
            </h2>
            <dl className="space-y-4">
              <div className="flex items-start gap-3">
                <User size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs font-mono text-text-muted">Name</dt>
                  <dd className="text-sm text-text-primary break-words">{user.name}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-mono text-text-muted">Role</dt>
                  <dd className="text-sm text-text-primary">{role}</dd>
                </div>
              </div>
              {memberSince && (
                <div className="flex items-start gap-3">
                  <CalendarDays size={16} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-mono text-text-muted">Member since</dt>
                    <dd className="text-sm text-text-primary">{memberSince}</dd>
                  </div>
                </div>
              )}
            </dl>
            <Link
              to="/profile"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              View full profile
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </section>
      </div>
    </div>
  );
}

export default MemberHome;
