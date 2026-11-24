import { LoaderCircle, CircleAlert, RefreshCw } from 'lucide-react';

/**
 * Shared loading / error / empty messages for data loaded from the API.
 * Styled to match the existing empty states on the Events and Projects pages.
 */

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-12 text-center">
      <LoaderCircle size={28} className="text-accent-ink animate-spin" aria-hidden="true" />
      <p className="text-text-secondary text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
      <CircleAlert size={32} className="text-danger" aria-hidden="true" />
      <p className="text-text-secondary text-sm max-w-md">
        {message || 'Something went wrong while loading this content.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-outline btn-sm"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="text-center py-12">
      {Icon && <Icon size={40} className="text-text-muted mx-auto mb-4" aria-hidden="true" />}
      <p className="text-text-secondary text-sm">{message}</p>
    </div>
  );
}

/** Small label for placeholder content stored with isSample: true. */
export function SampleBadge() {
  return (
    <span className="eyebrow px-2 py-0.5 border border-border !text-[10px]">
      Sample
    </span>
  );
}

/** Form-level error message (e.g. wrong password, server unreachable). */
export function FormAlert({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="animate-message flex items-start gap-2 p-3 bg-danger/10 border border-danger/40 text-danger text-sm"
    >
      <CircleAlert size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

/** Full-page loading state used while a stored login is being checked. */
export function PageLoading({ label }) {
  return (
    <div className="pt-32 pb-14 px-4">
      <LoadingState label={label} />
    </div>
  );
}
