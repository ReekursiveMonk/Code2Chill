import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { LoadingState, ErrorState } from '../components/DataState';
import { useApiData, WAKING_LABEL } from '../hooks/useApiData';
import { getTeam } from '../services/api';
import { GithubIcon, LinkedinIcon, XIcon } from '../components/BrandIcons';

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Only the links the API actually provides. */
function getSocialLinks(member) {
  return [
    { icon: GithubIcon, href: member.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: member.linkedin, label: 'LinkedIn' },
    { icon: XIcon, href: member.twitter, label: 'X' },
  ].filter((s) => s.href && s.href !== '#');
}

/** Square portrait: the real avatar if there is one, otherwise initials. */
function Portrait({ member, size = 'lg' }) {
  const box = size === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl' : 'w-14 h-14 text-xl';
  if (member.avatar) {
    return <img src={member.avatar} alt="" className={`${box} object-cover shrink-0`} />;
  }
  return (
    <span
      aria-hidden="true"
      className={`${box} shrink-0 bg-sand flex items-center justify-center font-display tracking-[-0.03em] text-ink`}
    >
      {getInitials(member.name)}
    </span>
  );
}

function SocialLinks({ member }) {
  const links = getSocialLinks(member);
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tap gap-2 text-sm font-medium link-quiet"
          >
            <social.icon size={14} />
            {social.label}
            <span className="sr-only">profile of {member.name}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ───────── Leadership: full-width typographic rows ───────── */

function LeadRow({ member, number }) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 sm:py-12 border-b border-border">
      <div className="md:col-span-2 flex md:block items-center gap-5">
        <Portrait member={member} />
        <p className="eyebrow md:mt-4" aria-hidden="true">
          {number}
        </p>
      </div>
      <div className="md:col-span-6">
        <h3 className="display-lg text-text-primary">{member.name}</h3>
      </div>
      <div className="md:col-span-4 md:pt-4 flex flex-col gap-4">
        <p className="eyebrow !text-accent-ink !text-xs">{member.role}</p>
        {member.bio && <p className="text-text-secondary leading-relaxed">{member.bio}</p>}
        <SocialLinks member={member} />
      </div>
    </li>
  );
}

/* ───────── Core team: two-column index ───────── */

function CoreEntry({ member }) {
  return (
    <li className="border-t border-ink pt-5 pb-8 flex gap-5">
      <Portrait member={member} size="sm" />
      <div className="min-w-0 flex flex-col gap-3">
        <h3 className="display-md text-text-primary break-words">{member.name}</h3>
        <p className="eyebrow !text-accent-ink">{member.role}</p>
        {member.bio && <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>}
        <SocialLinks member={member} />
      </div>
    </li>
  );
}

function GroupHeading({ children, count }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
      <h2 className="font-display text-2xl sm:text-3xl tracking-[-0.03em] text-text-primary">{children}</h2>
      <p className="eyebrow">
        {count} {count === 1 ? 'person' : 'people'}
      </p>
    </div>
  );
}

function Team() {
  const { data, loading, waking, error, retry } = useApiData(getTeam);
  const leads = data?.leads || [];
  const core = data?.core || [];

  return (
    <div className="pb-20 sm:pb-28">
      <PageHeader
        eyebrow="Team"
        index="04"
        title={
          <>
            The people behind <em className="text-accent">Code2Chill</em>
          </>
        }
        intro="The core team that organises events, leads workshops, maintains projects and keeps the community running."
      />

      <div className="wrap">
        {loading ? (
          <LoadingState label={waking ? WAKING_LABEL : 'Loading team…'} />
        ) : error ? (
          <ErrorState message={error.message} onRetry={retry} />
        ) : !data?.count ? (
          <p className="py-12 display-sm text-text-primary">Team members will be listed here soon.</p>
        ) : (
          <>
            {leads.length > 0 && (
              <section aria-label="Leadership" className="animate-enter enter-delay-2">
                <GroupHeading count={leads.length}>Leadership</GroupHeading>
                <ol>
                  {leads.map((member, index) => (
                    <LeadRow key={member.id} member={member} number={String(index + 1).padStart(2, '0')} />
                  ))}
                </ol>
              </section>
            )}

            {core.length > 0 && (
              <section aria-label="Core team" className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <h2 className="display-md text-text-primary">
                    Core <em className="text-accent">team</em>
                  </h2>
                  <p className="eyebrow mt-4">
                    {core.length} {core.length === 1 ? 'person' : 'people'}
                  </p>
                </div>
                <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 animate-stagger">
                  {core.map((member) => (
                    <CoreEntry key={member.id} member={member} />
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>

      {/* Join the team */}
      <section className="wrap mt-24 sm:mt-32">
        <div className="border-t border-ink pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="display-md text-text-primary">
              Want to join the <em className="text-accent">core team?</em>
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl leading-relaxed">
              Active members can apply for core team roles. Lead a domain, run events or contribute to the
              club&apos;s growth.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button to="/join">Apply to Join</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
