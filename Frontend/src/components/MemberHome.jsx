import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut } from 'lucide-react';
import Button from './Button';
import ArrowLink from './ArrowLink';
import {
  ApiBlock,
  EventListings,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ProjectSpread,
  SectionLabel,
} from './HomeSections';
import { useAuth } from '../context/AuthContext';
import { useApiData } from '../hooks/useApiData';
import { getEvents, getProjects, getTeam } from '../services/api';
import { getUserInitials } from '../utils/initials';
import { Stagger } from './Reveal';

/**
 * Home page for signed-in users: a personal "member edition".
 *
 * Everything personal comes from the authenticated user returned by the API
 * (name, email, role, createdAt). Events, projects and team come from the
 * public API. No statistics or activity are invented.
 */

const QUICK_LINKS = [
  { to: '/events', title: 'Events', text: 'Workshops, talks, hackathons and meetups.' },
  { to: '/projects', title: 'Projects', text: 'What members are building, and where to contribute.' },
  { to: '/team', title: 'Team', text: 'The leads and core team who run the club.' },
  { to: '/profile', title: 'Your profile', text: 'Your account details and session.' },
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

function greetingFor(date) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ───────── Membership card (sidebar) ───────── */
function MembershipCard({ user, onLogout }) {
  const memberSince = formatDate(user.createdAt);
  const role = user.role === 'admin' ? 'Admin' : 'Member';

  return (
    <aside aria-labelledby="membership-heading" className="bg-sage text-ink">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-8">
          <h2 id="membership-heading" className="eyebrow !text-ink">
            Your membership
          </h2>
          <span
            aria-hidden="true"
            className="w-12 h-12 shrink-0 bg-ink text-paper flex items-center justify-center font-mono text-sm"
          >
            {getUserInitials(user)}
          </span>
        </div>

        <p className="font-display text-3xl tracking-[-0.03em] leading-tight break-words">{user.name}</p>
        <p className="text-sm text-ink/80 break-all mt-1">{user.email}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/25 pt-5">
          <div>
            <dt className="eyebrow !text-ink/75 mb-1">Role</dt>
            <dd className="text-sm font-semibold">{role}</dd>
          </div>
          {memberSince && (
            <div>
              <dt className="eyebrow !text-ink/75 mb-1">Joined</dt>
              <dd className="text-sm font-semibold">{memberSince}</dd>
            </div>
          )}
        </dl>

        <p className="mt-8 border-t border-ink/25 pt-5 text-sm leading-relaxed text-ink/85">
          <span className="eyebrow !text-ink/75 block mb-2">Club application</span>
          Join Us applications are reviewed by the club admins. Their status isn&apos;t shown in your
          account yet.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button to="/profile" variant="dark" size="sm">
            View profile
          </Button>
          <button
            type="button"
            onClick={onLogout}
            className="tap gap-2 text-sm font-medium link-quiet"
          >
            <LogOut size={14} aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ───────── Team list + announcements (sidebar on desktop) ───────── */
function SidebarExtras({ team }) {
  const teamCount = team.data?.count;
  return (
    <>
      <div className="border-t border-ink pt-4">
        <p className="eyebrow mb-3">The team</p>
        {team.loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : team.error ? (
          <p className="text-sm text-text-secondary">Team list unavailable right now.</p>
        ) : (
          <>
            <ul className="space-y-1.5">
              {[...(team.data?.leads || []), ...(team.data?.core || [])].map((member) => (
                <li key={member.id} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-text-primary">{member.name}</span>
                  <span className="text-text-muted text-xs">{member.role}</span>
                </li>
              ))}
            </ul>
            {teamCount != null && (
              <p className="mt-4 text-xs text-text-muted">
                {teamCount} {teamCount === 1 ? 'person' : 'people'} on the team
              </p>
            )}
          </>
        )}
      </div>

      <div className="border-t border-ink pt-4">
        <p className="eyebrow mb-2">Announcements</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tap font-display text-xl tracking-[-0.02em] link-quiet"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </>
  );
}

/* ───────── Member Home ───────── */
function MemberHome({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const events = useApiData(getEvents);
  const projects = useApiData(getProjects);
  const team = useApiData(getTeam);

  const now = new Date();
  const firstName = getFirstName(user);
  const today = now.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="pb-20 sm:pb-28">
      {/* Masthead (dark band under the navbar) */}
      <header className="theme-dark pt-24 sm:pt-28 pb-14 sm:pb-20">
        <div className="wrap">
        <div className="rule-draw pt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 animate-enter">
          <p className="eyebrow !text-text-primary">Member edition</p>
          <p className="eyebrow">{today}</p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <h1 className="lg:col-span-9 display-lg text-text-primary break-words animate-enter enter-delay-1">
            {greetingFor(now)}
            {firstName ? ',' : '.'}
            {firstName && (
              <>
                <br />
                <em className="text-accent">{firstName}.</em>
              </>
            )}
          </h1>
          <p className="lg:col-span-3 text-text-secondary leading-relaxed animate-enter enter-delay-2">
            Here&apos;s what&apos;s happening at Code2Chill — find an event, pick up a project or say hello
            to the team.
          </p>
        </div>
        </div>
      </header>

      {/* Body: main column + sidebar */}
      <div className="wrap mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
        <div className="lg:col-span-8 order-2 lg:order-1 space-y-20 sm:space-y-24">
          {/* Quick links */}
          <section aria-labelledby="quick-links">
            <SectionLabel number="01">
              <span id="quick-links">Where to next</span>
            </SectionLabel>
            <Stagger as="ul" className="mt-2">
              {QUICK_LINKS.map((link, index) => (
                <li key={link.to} className="border-b border-border">
                  <Link
                    to={link.to}
                    className="group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_14rem_1fr_auto] items-baseline gap-x-4 py-5"
                  >
                    <span className="eyebrow" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl tracking-[-0.03em] text-text-primary transition-colors group-hover:text-accent-ink">
                      {link.title}
                    </span>
                    <span className="hidden sm:block text-sm text-text-secondary">{link.text}</span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="text-text-muted transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent-ink"
                    />
                  </Link>
                </li>
              ))}
            </Stagger>
          </section>

          {/* Events */}
          <section aria-labelledby="member-events">
            <SectionLabel number="02">Events</SectionLabel>
            <div className="mt-8 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 id="member-events" className="display-md text-text-primary">
                Coming <em className="text-accent">up</em>
              </h2>
              <ArrowLink to="/events">All events</ArrowLink>
            </div>
            <ApiBlock query={events} loadingLabel="Loading events…">
              {(data) => <EventListings events={data?.events} limit={3} />}
            </ApiBlock>
          </section>

          {/* Projects */}
          <section aria-labelledby="member-projects">
            <SectionLabel number="03">Projects</SectionLabel>
            <div className="mt-8 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 id="member-projects" className="display-md text-text-primary">
                Projects to <em className="text-accent">explore</em>
              </h2>
              <ArrowLink to="/projects">All projects</ArrowLink>
            </div>
            <ApiBlock query={projects} loadingLabel="Loading projects…">
              {(data) => <ProjectSpread projects={data?.projects} limit={3} />}
            </ApiBlock>
          </section>

          {/* On small screens the team and announcements come last */}
          <div className="lg:hidden space-y-10">
            <SidebarExtras team={team} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-10 animate-enter enter-delay-2">
            <MembershipCard user={user} onLogout={handleLogout} />

            <div className="hidden lg:block space-y-10">
              <SidebarExtras team={team} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberHome;
