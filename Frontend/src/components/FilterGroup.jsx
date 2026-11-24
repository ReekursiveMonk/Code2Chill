/**
 * A labelled row of filter buttons: plain text with a terracotta underline
 * on the active option. Each button reports its state with aria-pressed.
 *
 *   <FilterGroup label="Category" options={CATEGORIES} value={cat} onChange={setCat} />
 */
function FilterGroup({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-x-4 gap-y-0">
      <span className="eyebrow w-full sm:w-auto sm:min-w-[5.5rem]" aria-hidden="true">
        {label}
      </span>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`relative min-h-[2.75rem] min-w-[2.75rem] py-2 text-left text-sm transition-colors duration-200 ${
              active ? 'text-text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span className="relative">
              {option}
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 -bottom-1.5 h-0.5 bg-accent origin-left transition-transform duration-200 ${
                  active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterGroup;
