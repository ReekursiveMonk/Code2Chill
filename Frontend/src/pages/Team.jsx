import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { LoadingState, ErrorState } from '../components/DataState';
import { useApiData, WAKING_LABEL } from '../hooks/useApiData';
import { getTeam } from '../services/api';

/**
 * Team page. Every card shows only: name (with a role tag), roll number,
 * department and email. Values come from GET /api/team; anything the API
 * doesn't have for a person is shown as "Not listed".
 */

const DETAILS = [
  { key: 'rollNumber', label: 'Roll number', className: 'font-mono tracking-tight' },
  { key: 'department', label: 'Department', className: '' },
  { key: 'email', label: 'Email', className: '[overflow-wrap:anywhere]' },
];

/** Lets a long email wrap before the "@" instead of mid-word. */
function EmailText({ value }) {
  const at = value.lastIndexOf('@');
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

/** Leadership roles get a terracotta tag; everyone else a sage "Member" tag. */
function RoleTag({ role, lead }) {
  return (
    <span
      className={`shrink-0 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] leading-none ${
        lead ? 'border border-accent-ink text-accent-ink' : 'bg-sage text-ink'
      }`}
    >
      {role || 'Member'}
    </span>
  );
}

function MemberCard({ member, lead = false, large = false }) {
  return (
    <article className="h-full flex flex-col border border-border bg-bg-card p-5 sm:p-6 transition-colors duration-200 hover:border-ink">
      <header className="flex items-start justify-between gap-3 pb-4 border-b border-border">
        <h3
          className={`min-w-0 break-words font-display tracking-[-0.02em] text-text-primary leading-tight ${
            large ? 'text-3xl sm:text-4xl' : 'text-2xl'
          }`}
        >
          {member.name}
        </h3>
        <RoleTag role={member.role} lead={lead} />
      </header>

      <dl className="mt-4 space-y-3 text-sm">
        {DETAILS.map((detail) => (
          <div key={detail.key} className="grid grid-cols-[6.5rem_1fr] gap-3 items-baseline">
            <dt className="eyebrow">{detail.label}</dt>
            <dd className={`min-w-0 text-text-primary ${member[detail.key] ? detail.className : ''}`}>
              {member[detail.key] ? (
                detail.key === 'email' ? <EmailText value={member[detail.key]} /> : member[detail.key]
              ) : (
                <span className="text-text-muted">Not listed</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function GroupHeading({ children, count }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3 mb-6 sm:mb-8">
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
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {leads.map((member) => (
                    <li key={member.id}>
                      <MemberCard member={member} lead large />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {core.length > 0 && (
              <section aria-label="Team members" className={leads.length > 0 ? 'mt-16 sm:mt-20' : ''}>
                <GroupHeading count={core.length}>Core team &amp; members</GroupHeading>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {core.map((member) => (
                    <li key={member.id}>
                      <MemberCard member={member} lead={member.role !== 'Member'} />
                    </li>
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
