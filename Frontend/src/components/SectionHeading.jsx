function SectionHeading({ badge, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-green-primary bg-green-primary/10 border border-green-primary/20 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
