import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FilterGroup from '../components/FilterGroup';
import { EventRow, INSTAGRAM_URL } from '../components/HomeSections';
import { LoadingState, ErrorState } from '../components/DataState';
import { useApiData, WAKING_LABEL } from '../hooks/useApiData';
import { getEvents } from '../services/api';
import { isUpcoming, splitEvents } from '../utils/events';

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Tech Talk', 'Meetup', 'Competition'];
const STATUS_FILTERS = ['All', 'Upcoming', 'Past'];

function EventGroup({ title, events, note }) {
  return (
    <section aria-label={title} className="mb-16 last:mb-0">
      <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
        <h2 className="font-display text-2xl sm:text-3xl tracking-[-0.03em] text-text-primary">{title}</h2>
        <p className="eyebrow">
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </p>
      </div>
      {note}
      {events.length > 0 && (
        <ul className="@container animate-stagger">
          {events.map((event) => (
            <EventRow key={event.id} event={event} detailed />
          ))}
        </ul>
      )}
    </section>
  );
}

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const { data, loading, waking, error, retry } = useApiData(getEvents);
  const allEvents = data?.events || [];

  const filteredEvents = allEvents.filter((event) => {
    const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
    const upcoming = isUpcoming(event);
    const statusMatch =
      selectedStatus === 'All' ||
      (selectedStatus === 'Upcoming' && upcoming) ||
      (selectedStatus === 'Past' && !upcoming);
    return categoryMatch && statusMatch;
  });
  const { upcoming, past } = splitEvents(filteredEvents);
  const filtersActive = selectedCategory !== 'All' || selectedStatus !== 'All';

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="pb-20 sm:pb-28">
      <PageHeader
        eyebrow="Events"
        index="02"
        title={
          <>
            Events &amp; <em className="text-accent">activities</em>
          </>
        }
        intro="From hackathons and workshops to casual meetups — stay updated with everything happening at Code2Chill."
      />

      <div className="wrap">
        {/* Filters */}
        <div className="animate-enter enter-delay-2 border-y border-border py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4">
            <FilterGroup
              label="Category"
              options={CATEGORIES}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <FilterGroup label="When" options={STATUS_FILTERS} value={selectedStatus} onChange={setSelectedStatus} />
          </div>
          {!loading && !error && (
            <p className="eyebrow lg:text-right" aria-live="polite">
              Showing {filteredEvents.length} of {allEvents.length}
            </p>
          )}
        </div>

        {/* Listings */}
        <div className="mt-14 sm:mt-16">
          {loading ? (
            <LoadingState label={waking ? WAKING_LABEL : 'Loading events…'} />
          ) : error ? (
            <ErrorState message={error.message} onRetry={retry} />
          ) : allEvents.length === 0 ? (
            <div className="py-12 max-w-xl">
              <p className="display-sm text-text-primary mb-3">No events have been announced yet.</p>
              <p className="text-text-secondary">
                New dates are posted on{' '}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-quiet text-text-primary">
                  Instagram
                </a>
                .
              </p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-12 max-w-xl animate-enter">
              <p className="display-sm text-text-primary mb-3">No events match these filters.</p>
              <p className="text-text-secondary mb-6">
                {selectedStatus === 'Upcoming'
                  ? 'Nothing is scheduled for this selection yet.'
                  : 'Try a different category or time.'}
              </p>
              {filtersActive && (
                <button type="button" onClick={clearFilters} className="btn btn-outline btn-sm">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {selectedStatus !== 'Past' && (
                <EventGroup
                  title="Upcoming"
                  events={upcoming}
                  note={
                    upcoming.length === 0 && (
                      <p className="py-6 text-text-secondary">
                        No upcoming events are scheduled right now. New dates are announced on{' '}
                        <a
                          href={INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-quiet text-text-primary"
                        >
                          Instagram
                        </a>
                        .
                      </p>
                    )
                  }
                />
              )}
              {selectedStatus !== 'Upcoming' && past.length > 0 && <EventGroup title="Past events" events={past} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
