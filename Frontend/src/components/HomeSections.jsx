import { ArrowUpRight } from 'lucide-react';
import ArrowLink from './ArrowLink';
import { SampleBadge } from './DataState';
import { GithubIcon } from './BrandIcons';
import { dateParts, splitEvents, isUpcoming } from '../utils/events';
import { WAKING_LABEL } from '../hooks/useApiData';

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
  return (
    <div
      className={`pt-3 flex items-baseline justify-between ${
        tone === 'paper' ? 'border-t border-paper/40' : 'rule-ink'
      }`}
    >
      <p className={`eyebrow ${tone === 'paper' ? '!text-paper' : '!text-text-primary'}`}>{children}</p>
      {number && (
        <p className={`eyebrow ${tone === 'paper' ? '!text-paper/70' : ''}`} aria-hidden="true">
          {number}
        </p>
      )}
    </div>
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
        <ul className="@container border-t border-border">
          {upcoming.slice(0, limit).map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </ul>
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
          <ul className="@container border-t border-border">
            {past.slice(0, limit).map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </ul>
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
          className="tap gap-1.5 text-sm font-medium link-quiet"
        >
          Live site
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/** One large lead project plus a short column of others (asymmetric 7/5). */
export function ProjectSpread({ projects = [], limit = 3 }) {
  if (projects.length === 0) {
    return <p className="py-8 text-text-secondary">No projects have been published yet.</p>;
  }

  const [lead, ...rest] = projects.slice(0, limit);

  return (
    <div className="@container">
    <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-10 @3xl:gap-12">
      <article className="@3xl:col-span-7">
        <div className="aspect-[2/1] @3xl:aspect-[16/10] bg-sage flex items-end p-6 sm:p-8 mb-6">
          <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-[-0.04em] text-ink">
            {lead.title}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="eyebrow !text-accent-ink">{lead.category}</span>
          {lead.isSample && <SampleBadge />}
        </div>
        <h3 className="sr-only">{lead.title}</h3>
        <p className="text-text-secondary leading-relaxed max-w-xl mb-4">{lead.description}</p>
        <TechList tech={lead.tech} />
        <ProjectLinks project={lead} />
      </article>

      {rest.length > 0 && (
        <ul className="@3xl:col-span-5 @3xl:pt-2">
          {rest.map((project) => (
            <li key={project.id} className="py-6 border-t border-border first:border-ink">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="eyebrow !text-accent-ink">{project.category}</span>
                {project.isSample && <SampleBadge />}
              </div>
              <h3 className="display-sm text-text-primary mb-2">{project.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{project.description}</p>
              <TechList tech={project.tech} />
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

/* ───────── Team: a typographic roster ───────── */

export function TeamRoster({ leads = [], core = [] }) {
  const members = [...leads, ...core];
  if (members.length === 0) {
    return <p className="py-8 text-text-secondary">The team list hasn't been published yet.</p>;
  }

  return (
    <ul className="border-t border-ink">
      {members.map((member) => (
        <li
          key={member.id}
          className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-5 border-b border-border"
        >
          <p className="display-md text-text-primary transition-colors duration-200 group-hover:text-accent-ink">
            {member.name}
          </p>
          <p className="eyebrow sm:text-right">{member.role}</p>
        </li>
      ))}
    </ul>
  );
}

export function SeeAll({ to, children }) {
  return <ArrowLink to={to}>{children}</ArrowLink>;
}
