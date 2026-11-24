import { ArrowUpRight } from 'lucide-react';
import ArrowLink from './ArrowLink';
import { SampleBadge } from './DataState';
import { GithubIcon } from './BrandIcons';
import { dateParts, splitEvents, isUpcoming } from '../utils/events';
import { WAKING_LABEL } from '../hooks/useApiData';
import { Reveal, Stagger } from './Reveal';

/**
 * Editorial building blocks shared by the guest and member home pages.
 * Every item comes from the API (events, projects, team). Nothing is
 * invented here: when there's no data, the blocks say so.
 */

export const INSTAGRAM_URL = 'https://www.instagram.com/code2chill.osl/';
export const INSTAGRAM_HANDLE = '@code2chill.osl';

/* ───────── Small states (compact, inline) ───────── */

export function InlineLoading({ label = 'Loading…' }) {
  return (
    <p role="status" className="py-8 text-sm text-text-muted font-mono">
      {label}
    </p>
  );
}

export function InlineError({ message, onRetry }) {
  return (
    <div role="alert" className="py-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <p className="text-sm text-text-secondary">
        {message || 'Something went wrong while loading this content.'}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="text-sm font-semibold link-quiet">
          Try again
        </button>
      )}
    </div>
  );
}

/** Renders loading / error / children for a useApiData() result. */
export function ApiBlock({ query, loadingLabel, children }) {
  if (query.loading) return <InlineLoading label={query.waking ? WAKING_LABEL : loadingLabel} />;
  if (query.error) return <InlineError message={query.error.message} onRetry={query.retry} />;
  return children(query.data);
}

/* ───────── Section label: number + name on an ink rule ───────── */

export function SectionLabel({ number, children, tone = 'ink' }) {
  // The rule draws from left to right when the label scrolls into view.
  return (
    <Reveal variant="fade" className="relative pt-3 flex items-baseline justify-between">
      <span
        aria-hidden="true"
        className={`reveal-line absolute inset-x-0 top-0 h-px ${tone === 'paper' ? 'bg-paper/40' : 'bg-ink'}`}
      />
      <p className={`eyebrow ${tone === 'paper' ? '!text-paper' : '!text-text-primary'}`}>{children}</p>
      {number && (
        <p className={`eyebrow ${tone === 'paper' ? '!text-paper/70' : ''}`} aria-hidden="true">
          {number}
        </p>
      )}
    </Reveal>
  );
}

/* ───────── Events: a dated list, like a magazine listings page ───────── */

export function EventRow({ event, detailed = false }) {
  const parts = dateParts(event.startDate);
  const upcoming = isUpcoming(event);

  return (
    <li className="grid grid-cols-[4.5rem_1fr] @md:grid-cols-[6rem_1fr] @2xl:grid-cols-[6rem_1fr_auto] gap-x-5 @md:gap-x-8 gap-y-2 py-6 border-b border-border">
      <div className="row-span-2 @2xl:row-span-1">
        {parts ? (
          <p className="leading-none">
            <span className="block font-display text-4xl sm:text-5xl tracking-[-0.04em] text-text-primary">
              {parts.day}
            </span>
            <span className="eyebrow mt-2 block">
              {parts.month} {parts.year}
            </span>
          </p>
        ) : (
          <p className="eyebrow">{event.date}</p>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="eyebrow !text-accent-ink">{event.category}</span>
          {detailed && (
            <span className={`eyebrow ${upcoming ? '!text-sage-deep' : ''}`}>
              {upcoming ? '● Upcoming' : 'Past'}
            </span>
          )}
          {event.isSample && <SampleBadge />}
        </div>
        <h3 className="display-sm text-text-primary">{event.title}</h3>
        {event.description && (
          <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-xl">{event.description}</p>
        )}
      </div>

      <div className="@2xl:text-right text-sm text-text-muted @2xl:pt-7 col-start-2 @2xl:col-start-auto space-y-1">
        <p>{[event.time, event.location].filter(Boolean).join(' · ')}</p>
        {detailed && event.endDate && event.date && <p>{event.date}</p>}
        {detailed && event.attendees != null && (
          <p>
            {event.attendees} {upcoming ? 'expected' : 'attended'}
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * Upcoming events first. If none are scheduled, says so honestly and shows
 * the most recent past events under "From the archive".
 */
export function EventListings({ events = [], limit = 3 }) {
  const { upcoming, past } = splitEvents(events);

  if (events.length === 0) {
    return (
      <p className="py-8 text-text-secondary">
        No events have been published yet. Follow{' '}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-quiet text-text-primary">
          {INSTAGRAM_HANDLE}
        </a>{' '}
        for announcements.
      </p>
    );
  }

  return (
    <div>
      {upcoming.length > 0 ? (
        <Stagger as="ul" className="@container border-t border-border">
          {upcoming.slice(0, limit).map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </Stagger>
      ) : (
        <>
          <p className="py-6 border-t border-border text-text-secondary">
            No upcoming events are scheduled right now. New dates are announced on{' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-quiet text-text-primary">
              Instagram
            </a>
            .
          </p>
          <p className="eyebrow mt-4 mb-1">From the archive</p>
          <Stagger as="ul" className="@container border-t border-border">
            {past.slice(0, limit).map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </Stagger>
        </>
      )}
    </div>
  );
}

/* ───────── Projects ───────── */

function TechList({ tech = [] }) {
  if (!tech.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-muted" aria-label="Technologies">
      {tech.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }) {
  if (!project.github && !project.live) return null;
  return (
    <div className="flex flex-wrap gap-6 mt-5">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="tap gap-2 text-sm font-medium link-quiet"
        >
          <GithubIcon size={15} />
          Source
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link tap gap-1.5 text-sm font-medium link-quiet"
        >
          Live site
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-[var(--dur-hover)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      )}
    </div>
  );
}

/**
 * One large lead project plus a short column of others (asymmetric 7/5).
 * `showLeadVisual={false}` drops the sage title block (used where the page
 * already shows a preview image above the list).
 */
export function ProjectSpread({ projects = [], limit = 3, showLeadVisual = true }) {
  if (projects.length === 0) {
    return <p className="py-8 text-text-secondary">No projects have been published yet.</p>;
  }

  const [lead, ...rest] = projects.slice(0, limit);

  return (
    <div className="@container">
    <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-10 @3xl:gap-12">
      <Reveal as="article" className={`@3xl:col-span-7 ${showLeadVisual ? '' : 'border-t border-ink pt-6'}`}>
        {showLeadVisual && (
          <div className="aspect-[2/1] @3xl:aspect-[16/10] bg-sage flex items-end p-6 sm:p-8 mb-6">
            <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-[-0.04em] text-ink">
              {lead.title}
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="eyebrow !text-accent-ink">{lead.category}</span>
          {lead.isSample && <SampleBadge />}
        </div>
        <h3 className={showLeadVisual ? 'sr-only' : 'display-md text-text-primary mb-4'}>{lead.title}</h3>
        <p className="text-text-secondary leading-relaxed max-w-xl mb-4">{lead.description}</p>
        <TechList tech={lead.tech} />
        <ProjectLinks project={lead} />
      </Reveal>

      {rest.length > 0 && (
        <Stagger as="ul" delay={120} className={`@3xl:col-span-5 ${showLeadVisual ? '@3xl:pt-2' : ''}`}>
          {rest.map((project) => (
            <li key={project.id} className="group py-6 border-t border-border first:border-ink">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="eyebrow !text-accent-ink">{project.category}</span>
                {project.isSample && <SampleBadge />}
              </div>
              <h3 className="display-sm text-text-primary mb-2">{project.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{project.description}</p>
              <TechList tech={project.tech} />
            </li>
          ))}
        </Stagger>
      )}
    </div>
    </div>
  );
}

/* ───────── Team: leadership cards (homepage) ───────── */

// The homepage shows only these roles, in this order. Everyone else is on /team.
const HOME_LEADERSHIP_ROLES = ['President', 'Vice President', 'Tech Head'];

export function LeadershipCards({ leads = [], core = [] }) {
  const everyone = [...leads, ...core];
  const leaders = HOME_LEADERSHIP_ROLES.map((role) => everyone.find((member) => member.role === role)).filter(
    Boolean
  );

  if (leaders.length === 0) {
    return <p className="py-8 text-text-secondary">The team list hasn't been published yet.</p>;
  }

  return (
    <Stagger as="ul" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
      {leaders.map((member, index) => (
        <li key={member.id}>
          <article className="group h-full min-h-[13rem] flex flex-col justify-between gap-10 border border-border bg-bg-card p-6 transition-[transform,border-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-ink">
            <p className="eyebrow" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div>
              <h3 className="font-display text-3xl sm:text-4xl tracking-[-0.03em] leading-none text-text-primary break-words">
                {member.name}
              </h3>
              <p className="mt-4 pt-4 border-t border-border">
                <span className="inline-block border border-accent-ink px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] leading-none text-accent-ink">
                  {member.role}
                </span>
              </p>
            </div>
          </article>
        </li>
      ))}
    </Stagger>
  );
}

export function SeeAll({ to, children }) {
  return <ArrowLink to={to}>{children}</ArrowLink>;
}
