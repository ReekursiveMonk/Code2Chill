import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Filter,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { LoadingState, ErrorState, EmptyState, SampleBadge } from '../components/DataState';
import { useApiData } from '../hooks/useApiData';
import { getEvents } from '../services/api';

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Tech Talk', 'Meetup', 'Competition'];
const STATUS_FILTERS = ['All', 'Upcoming', 'Past'];

// Parse 'YYYY-MM-DD' as a local date (new Date('YYYY-MM-DD') would use UTC).
function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// An event stays "upcoming" until the end of its last day.
function getEventStatus(event, now = new Date()) {
  const lastDay = parseLocalDate(event.endDate || event.startDate);
  lastDay.setHours(23, 59, 59, 999);
  return lastDay >= now ? 'upcoming' : 'past';
}

function EventCard({ event }) {
  const isUpcoming = event.status === 'upcoming';

  return (
    <div className="group h-full p-5 rounded-xl bg-bg-card border border-border hover:border-accent/50 transition-colors duration-200">
      {/* Top row: category + status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/20">
            {event.category}
          </span>
          {event.isSample && <SampleBadge />}
        </div>
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-medium ${
            isUpcoming
              ? 'bg-accent-2/10 text-accent-2'
              : 'bg-white/5 text-text-muted'
          }`}
        >
          {isUpcoming ? '● Upcoming' : 'Past'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {event.description}
      </p>

      {/* Meta */}
      <div className="space-y-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-accent/70" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-accent/70" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-accent/70" />
          <span>{event.location}</span>
        </div>
        {event.attendees != null && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-accent/70" />
            <span>{event.attendees} {isUpcoming ? 'expected' : 'attended'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const { data, loading, error, retry } = useApiData(getEvents);

  const eventsWithStatus = (data?.events || []).map((event) => ({
    ...event,
    status: getEventStatus(event),
  }));

  const filteredEvents = eventsWithStatus.filter((event) => {
    const categoryMatch =
      selectedCategory === 'All' || event.category === selectedCategory;
    const statusMatch =
      selectedStatus === 'All' ||
      event.status === selectedStatus.toLowerCase();
    return categoryMatch && statusMatch;
  });

  return (
    <div className="pt-24 pb-14">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Events"
            title="Events & Activities"
            description="From hackathons and workshops to casual meetups — stay updated with everything happening at Code2Chill."
          />

          {/* Filters */}
          <div className="animate-enter enter-delay-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
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

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    selectedStatus === status
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <LoadingState label="Loading events…" />
          ) : error ? (
            <ErrorState message={error.message} onRetry={retry} />
          ) : eventsWithStatus.length === 0 ? (
            <EmptyState icon={Calendar} message="No events have been announced yet." />
          ) : filteredEvents.length > 0 ? (
            <div className="animate-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="animate-enter">
              <EmptyState icon={Calendar} message="No events found for the selected filters." />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Events;
