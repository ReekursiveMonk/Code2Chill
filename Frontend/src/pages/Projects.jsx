import { useState } from 'react';
import {
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Filter,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { GithubIcon } from '../components/BrandIcons';
import { PROJECTS_DATA } from '../data/projects';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'CLI Tool'];

function ProjectCard({ project }) {
  return (
    <div className="group flex h-full flex-col p-5 rounded-xl bg-bg-card border border-border hover:border-accent/50 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium text-accent bg-accent/10 border border-accent/20 mb-2">
            {project.category}
          </span>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 rounded-md text-xs font-mono text-text-muted bg-bg-primary border border-border"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Star size={12} /> {project.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={12} /> {project.forks}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
              aria-label="View on GitHub"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
              aria-label="View live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="pt-24 pb-14">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Projects"
            title="Student Projects"
            description="Real projects built by Code2Chill members. From web apps and mobile tools to AI experiments and CLI utilities."
          />

          {/* Category Filter */}
          <div className="animate-enter enter-delay-1 flex items-center gap-2 justify-center flex-wrap">
            <Filter size={14} className="text-text-muted" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="animate-enter text-center py-12">
              <Code2 size={40} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary text-sm">
                No projects found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="animate-enter enter-delay-3 p-5 sm:p-6 rounded-xl bg-bg-card border border-border text-center">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Have a project idea?
            </h3>
            <p className="text-text-secondary text-sm mb-5">
              We're always looking for new projects to build together.
              Pitch your idea and find collaborators within the club.
            </p>
            <a
              href="https://github.com/CodeWithPrinceX/Code2Chill/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg-primary font-semibold text-sm
                         hover:bg-accent-2 transition-all duration-200"
            >
              <GithubIcon size={16} />
              Propose on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
