import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import FilterGroup from '../components/FilterGroup';
import Button from '../components/Button';
import { GithubIcon } from '../components/BrandIcons';
import { LoadingState, ErrorState, SampleBadge } from '../components/DataState';
import { useApiData, WAKING_LABEL } from '../hooks/useApiData';
import { getProjects } from '../services/api';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'CLI Tool'];
const PROPOSE_URL = 'https://github.com/CodeWithPrinceX/Code2Chill/issues';

const hasLink = (url) => Boolean(url) && url !== '#';

/* ───────── Shared bits ───────── */

function ProjectMeta({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="eyebrow !text-accent-ink">{project.category}</span>
      {project.isSample && <SampleBadge />}
    </div>
  );
}

function TechTags({ tech = [] }) {
  if (!tech.length) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="px-2.5 py-1 border border-border font-mono text-xs text-text-secondary">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** GitHub stats, shown only when the API actually has a value. */
function ProjectStats({ project }) {
  const stats = [
    ['Stars', project.stars],
    ['Forks', project.forks],
    ['Contributors', project.contributors],
  ].filter(([, value]) => value != null);
  if (stats.length === 0) return null;

  return (
    <dl className="flex gap-8">
      {stats.map(([label, value]) => (
        <div key={label}>
          <dt className="eyebrow mb-1">{label}</dt>
          <dd className="font-display text-2xl tracking-[-0.02em] text-text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectLinks({ project }) {
  const github = hasLink(project.github);
  const live = hasLink(project.live);
  if (!github && !live) return null;

  return (
    <div className="flex flex-wrap gap-6">
      {github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="tap gap-2 text-sm font-medium link-quiet"
        >
          <GithubIcon size={15} />
          Source code
          <span className="sr-only">for {project.title} on GitHub</span>
        </a>
      )}
      {live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="tap gap-1.5 text-sm font-medium link-quiet"
        >
          Live site
          <span className="sr-only">for {project.title}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/* ───────── Featured project: asymmetric 7/5 spread ───────── */

function FeaturedProject({ project }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-enter">
      <div className="lg:col-span-7 bg-sage aspect-[2/1] lg:aspect-auto lg:min-h-[26rem] flex flex-col justify-between p-6 sm:p-10">
        <p className="eyebrow !text-ink">Featured project</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.045em] text-ink">
          {project.title}
        </h2>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6 lg:py-2">
        <ProjectMeta project={project} />
        <p className="text-lg leading-relaxed text-text-secondary">{project.description}</p>
        <TechTags tech={project.tech} />
        <ProjectStats project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

/* ───────── Index entry ───────── */

function ProjectEntry({ project, number }) {
  return (
    <article className="h-full border-t border-ink pt-5 flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <ProjectMeta project={project} />
        <span className="eyebrow" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 className="display-sm text-text-primary">{project.title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>
      <TechTags tech={project.tech} />
      <ProjectStats project={project} />
      <ProjectLinks project={project} />
    </article>
  );
}

/* ───────── Page ───────── */

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data, loading, waking, error, retry } = useApiData(getProjects);
  const projects = data?.projects || [];

  const filteredProjects = projects.filter((p) => selectedCategory === 'All' || p.category === selectedCategory);
  // The API lists real projects before samples, so the first one is featured.
  const [featured, ...others] = filteredProjects;

  return (
    <div className="pb-20 sm:pb-28">
      <PageHeader
        eyebrow="Projects"
        index="03"
        title={
          <>
            Built by <em className="text-accent">members</em>
          </>
        }
        intro="Projects built by Code2Chill members. From web apps and mobile tools to AI experiments and CLI utilities."
      />

      <div className="wrap">
        <div className="animate-enter enter-delay-2 border-y border-border py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterGroup label="Category" options={CATEGORIES} value={selectedCategory} onChange={setSelectedCategory} />
          {!loading && !error && (
            <p className="eyebrow lg:text-right" aria-live="polite">
              Showing {filteredProjects.length} of {projects.length}
            </p>
          )}
        </div>

        <div className="mt-14 sm:mt-16">
          {loading ? (
            <LoadingState label={waking ? WAKING_LABEL : 'Loading projects…'} />
          ) : error ? (
            <ErrorState message={error.message} onRetry={retry} />
          ) : projects.length === 0 ? (
            <p className="py-12 display-sm text-text-primary">No projects have been added yet.</p>
          ) : !featured ? (
            <div className="py-12 max-w-xl animate-enter">
              <p className="display-sm text-text-primary mb-6">No projects in this category yet.</p>
              <button type="button" onClick={() => setSelectedCategory('All')} className="btn btn-outline btn-sm">
                Show all projects
              </button>
            </div>
          ) : (
            <>
              <FeaturedProject project={featured} />

              {others.length > 0 && (
                <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-14">
                  {others.map((project, index) => (
                    <div
                      key={project.id}
                      // Asymmetric rhythm: alternate wide/narrow columns, and drop every
                      // second entry a little lower on large screens.
                      className={`${index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-16'}`}
                    >
                      <ProjectEntry project={project} number={String(index + 2).padStart(2, '0')} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Contribute */}
      <section className="wrap mt-24 sm:mt-32">
        <div className="bg-ink text-paper p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow !text-paper/70 mb-4">Contribute</p>
            <h2 className="display-md text-paper">
              Have a project <em className="text-accent">idea?</em>
            </h2>
            <p className="mt-4 text-paper/80 max-w-xl leading-relaxed">
              We&apos;re always looking for new projects to build together. Pitch your idea and find collaborators
              within the club.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href={PROPOSE_URL} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} />
              Propose on GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
