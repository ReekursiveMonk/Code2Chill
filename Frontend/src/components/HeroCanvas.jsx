/**
 * Hero illustration: a static developer workspace drawn as one inline SVG.
 *
 * Layout (top to bottom):
 *  - a three-step workflow: learn → build → ship
 *  - a small code snippet card and a git branch graph
 *  - a row of technology tags
 *
 * One SVG with a fixed viewBox scales evenly with its container, so nothing
 * can overflow or misalign at any screen size. No animation, no JS.
 * Colours come from the theme via Tailwind fill-/stroke- classes.
 */

const W = 480;
const H = 372;

const FLOW = [
  { x: 24, step: '01', label: 'learn' },
  { x: 180, step: '02', label: 'build', active: true },
  { x: 336, step: '03', label: 'ship' },
];

// SVG collapses ordinary spaces, so code indentation uses non-breaking spaces.
const nbsp = (text) => text.replace(/ /g, '\u00A0');

const CODE_LINES = [
  [{ t: 'const ', c: 'fill-accent' }, { t: 'club', c: 'fill-text-primary' }, { t: ' = {', c: 'fill-text-muted' }],
  [{ t: '  name: ', c: 'fill-text-secondary' }, { t: '"Code2Chill"', c: 'fill-accent-2' }, { t: ',', c: 'fill-text-muted' }],
  [{ t: '  learn: ', c: 'fill-text-secondary' }, { t: '"together"', c: 'fill-accent-2' }, { t: ',', c: 'fill-text-muted' }],
  [{ t: '  build: ', c: 'fill-text-secondary' }, { t: '"real projects"', c: 'fill-accent-2' }, { t: ',', c: 'fill-text-muted' }],
  [{ t: '};', c: 'fill-text-muted' }],
];

const TAGS = ['C++', 'Python', 'JS', 'React', 'AI/ML', 'Git'];
const TAG_GAP = 8;
const TAG_W = (W - 48 - TAG_GAP * (TAGS.length - 1)) / TAGS.length;

function HeroCanvas({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Illustration of a developer workspace: a learn, build and ship workflow, a code snippet, a git branch graph and technology tags."
      className={`block w-full h-auto ${className}`}
    >
      <defs>
        <pattern id="c2c-canvas-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" className="stroke-text-primary" strokeOpacity="0.05" />
        </pattern>
        <marker id="c2c-canvas-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M0 0L8 4L0 8Z" className="fill-accent" />
        </marker>
      </defs>

      {/* Canvas */}
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="14" className="fill-bg-card stroke-border" />
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="14" fill="url(#c2c-canvas-grid)" />

      <text x="24" y="38" className="fill-text-muted font-mono" fontSize="11" letterSpacing="1">
        WORKSPACE / CODE2CHILL
      </text>

      {/* Workflow */}
      {FLOW.map((node) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="56"
            width="120"
            height="40"
            rx="8"
            className={node.active ? 'fill-accent stroke-accent' : 'fill-bg-primary stroke-border-light'}
          />
          <text x={node.x + 60} y="81" textAnchor="middle" className="font-mono" fontSize="13">
            <tspan className={node.active ? 'fill-bg-primary' : 'fill-text-muted'} fontSize="11">
              {`${node.step}\u00A0`}
            </tspan>
            <tspan className={node.active ? 'fill-bg-primary' : 'fill-text-primary'} fontWeight="700">
              {node.label}
            </tspan>
          </text>
        </g>
      ))}
      <line x1="146" y1="76" x2="176" y2="76" strokeWidth="2" className="stroke-accent" markerEnd="url(#c2c-canvas-arrow)" />
      <line x1="302" y1="76" x2="332" y2="76" strokeWidth="2" className="stroke-accent" markerEnd="url(#c2c-canvas-arrow)" />
      {/* build → code */}
      <line x1="240" y1="96" x2="240" y2="120" strokeWidth="1.5" strokeDasharray="3 4" className="stroke-accent" />

      {/* Code snippet */}
      <rect x="24" y="120" width="272" height="176" rx="10" className="fill-bg-primary stroke-border" />
      <text x="40" y="143" className="fill-text-muted font-mono" fontSize="11">club.js</text>
      <line x1="24" y1="154" x2="296" y2="154" className="stroke-border" />
      {CODE_LINES.map((parts, index) => (
        <text key={index} x="40" y={180 + index * 22} className="font-mono" fontSize="12">
          <tspan className="fill-text-muted" opacity="0.6">{index + 1}</tspan>
          <tspan x="62">
            {parts.map((part, partIndex) => (
              <tspan key={partIndex} className={part.c}>
                {nbsp(part.t)}
              </tspan>
            ))}
          </tspan>
        </text>
      ))}

      {/* Git branch graph */}
      <rect x="312" y="120" width="144" height="176" rx="10" className="fill-bg-primary stroke-border" />
      <text x="328" y="143" className="fill-text-muted font-mono" fontSize="11">branches</text>
      <line x1="312" y1="154" x2="456" y2="154" className="stroke-border" />
      <line x1="344" y1="172" x2="344" y2="280" strokeWidth="2" className="stroke-border-light" />
      <path
        d="M344 190 C344 204 392 200 392 214 L392 242 C392 256 344 252 344 266"
        fill="none"
        strokeWidth="2"
        className="stroke-accent-2"
      />
      <circle cx="344" cy="180" r="5" className="fill-accent" />
      <circle cx="344" cy="228" r="5" className="fill-accent" />
      <circle cx="344" cy="276" r="5" className="fill-accent" />
      <circle cx="392" cy="228" r="5" className="fill-accent-2" />
      <text x="356" y="184" className="fill-text-muted font-mono" fontSize="10">main</text>
      <text x="402" y="232" className="fill-text-muted font-mono" fontSize="10">feature</text>

      {/* Technology tags */}
      {TAGS.map((tag, index) => {
        const x = 24 + index * (TAG_W + TAG_GAP);
        return (
          <g key={tag}>
            <rect x={x} y="316" width={TAG_W} height="30" rx="6" className="fill-bg-primary stroke-border" />
            <text x={x + TAG_W / 2} y="335" textAnchor="middle" className="fill-text-secondary font-mono" fontSize="11">
              {tag}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default HeroCanvas;
