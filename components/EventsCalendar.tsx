"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/site";

type View = "month" | "week" | "year";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ---------- date helpers (all local, no timezone drift) ---------- */

const pad = (value: number) => String(value).padStart(2, "0");

const toKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const sameDay = (a: Date, b: Date) => toKey(a) === toKey(b);

/** Start of the ISO week (Monday). */
const startOfWeek = (date: Date) => {
  const clone = new Date(date);
  const day = (clone.getDay() + 6) % 7;
  clone.setDate(clone.getDate() - day);
  clone.setHours(0, 0, 0, 0);
  return clone;
};

const addDays = (date: Date, amount: number) => {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + amount);
  return clone;
};

/** True when `date` falls within the event's date (or date range). */
const eventCovers = (event: EventItem, date: Date) => {
  const start = parseKey(event.date);
  const end = parseKey(event.endDate ?? event.date);
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return current >= start && current <= end;
};

const formatDate = (key: string) =>
  parseKey(key).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatRange = (event: EventItem) =>
  event.endDate && event.endDate !== event.date
    ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
    : formatDate(event.date);

const today = new Date();

export default function EventsCalendar({ events }: { events: EventItem[] }) {
  const [view, setView] = useState<View>("month");
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const eventYears = useMemo(
    () => Array.from(new Set(events.map((e) => parseKey(e.date).getFullYear()))).sort(),
    [events]
  );

  const years = eventYears.length ? eventYears : [today.getFullYear()];

  const goToToday = () => {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
    setView("month");
  };

  const shift = (direction: -1 | 1) => {
    if (view === "week") {
      setCursor((current) => addDays(current, direction * 7));
      return;
    }

    if (view === "year") {
      setCursor(
        (current) => new Date(current.getFullYear() + direction, current.getMonth(), 1)
      );
      return;
    }

    setCursor(
      (current) => new Date(current.getFullYear(), current.getMonth() + direction, 1)
    );
  };

  const upcoming = useMemo(
    () =>
      events
        .filter(
          (event) =>
            parseKey(event.endDate ?? event.date) >= startOfDay(today) &&
            !event.recurring
        )
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );

  const title =
    view === "year"
      ? String(cursor.getFullYear())
      : view === "month"
        ? `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`
        : (() => {
            const start = startOfWeek(cursor);
            const end = addDays(start, 6);
            return `${start.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })} – ${end.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}`;
          })();

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Calendar view"
          className="inline-flex rounded-full bg-slate-100 p-1"
        >
          {(["month", "week", "year"] as View[]).map((option) => (
            <button
              key={option}
              role="tab"
              aria-selected={view === option}
              type="button"
              onClick={() => setView(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                view === option
                  ? "bg-white text-brand-800 shadow-sm"
                  : "text-slate-600 hover:text-brand-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            ‹
          </button>

          <p className="min-w-24 text-center text-sm font-bold whitespace-nowrap text-brand-950 sm:min-w-48 sm:text-base">
            {title}
          </p>

          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            ›
          </button>

          <button
            type="button"
            onClick={goToToday}
            className="shrink-0 rounded-full border border-slate-200 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-600 transition hover:bg-slate-50 sm:ml-1 sm:px-3"
          >
            Today
          </button>
        </div>
      </div>

      {/* VIEWS */}
      <div className="mt-6">
        {/* Phones: a dated list reads far better than a cramped grid. */}
        <div className="sm:hidden">
          {view === "year" ? (
            <YearView
              year={cursor.getFullYear()}
              events={events}
              years={years}
              onPickMonth={(month) => {
                setCursor(new Date(cursor.getFullYear(), month, 1));
                setView("month");
              }}
            />
          ) : (
            <MonthListView
              cursor={cursor}
              events={events}
              weekMode={view === "week"}
            />
          )}
        </div>

        <div className="hidden sm:block">
          {view === "month" && <MonthView cursor={cursor} events={events} />}
          {view === "week" && <WeekView cursor={cursor} events={events} />}
          {view === "year" && (
            <YearView
              year={cursor.getFullYear()}
              events={events}
              years={years}
              onPickMonth={(month) => {
                setCursor(new Date(cursor.getFullYear(), month, 1));
                setView("month");
              }}
            />
          )}
        </div>
      </div>

      {/* UPCOMING LIST */}
      <section className="mt-12" aria-labelledby="upcoming-heading">
        <h2
          id="upcoming-heading"
          className="text-lg font-bold text-brand-950 sm:text-xl"
        >
          Coming up next
        </h2>

        {upcoming.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            No upcoming events are listed yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
            {upcoming.slice(0, 8).map((event) => (
              <li key={event.id}>
                <EventRow event={event} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function monthCount(events: EventItem[], year: number, month: number) {
  return events.filter((event) => {
    const date = parseKey(event.date);
    return date.getFullYear() === year && date.getMonth() === month;
  }).length;
}

/* =========================================================
   MONTH VIEW
========================================================= */

function MonthView({ cursor, events }: { cursor: Date; events: EventItem[] }) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const gridStart = startOfWeek(first);
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {DAYS_SHORT.map((day) => (
          <div
            key={day}
            className="px-1 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-[11px]"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const inMonth = day.getMonth() === month;
          const dayEvents = events.filter((event) => eventCovers(event, day));
          const isToday = sameDay(day, today);

          return (
            <div
              key={toKey(day)}
              className={`min-h-17 border-r border-b border-slate-100 p-1 last:border-r-0 sm:min-h-26 sm:p-1.5 ${
                inMonth ? "bg-white" : "bg-slate-50/60"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold sm:h-6 sm:w-6 sm:text-xs ${
                  isToday
                    ? "bg-brand-800 text-white"
                    : inMonth
                      ? "text-slate-700"
                      : "text-slate-400"
                }`}
              >
                {day.getDate()}
              </span>

              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 2).map((event) => (
                  <EventChip key={event.id} event={event} />
                ))}

                {dayEvents.length > 2 && (
                  <p className="px-1 text-[10px] font-semibold text-slate-500">
                    +{dayEvents.length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-500">
        {monthCount(events, year, month)} events this month. Switch to week view
        for daily detail, or year view to scan the whole season.
      </p>
    </div>
  );
}

function EventChip({ event }: { event: EventItem }) {
  return (
    <span
      title={`${event.title} — ${formatRange(event)}`}
      className="block truncate rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold leading-4 text-brand-800 sm:text-[11px]"
    >
      {event.title}
    </span>
  );
}

/* =========================================================
   WEEK VIEW
========================================================= */

function WeekView({ cursor, events }: { cursor: Date; events: EventItem[] }) {
  const start = startOfWeek(cursor);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-7 sm:divide-x sm:divide-y-0">
        {days.map((day) => {
          const dayEvents = events.filter((event) => eventCovers(event, day));
          const isToday = sameDay(day, today);

          return (
            <div key={toKey(day)} className="p-3 sm:min-h-55 sm:p-2.5">
              <div className="flex items-center justify-between sm:block sm:text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {day.toLocaleDateString("en-GB", { weekday: "short" })}
                </p>
                <p
                  className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold sm:mx-auto ${
                    isToday ? "bg-brand-800 text-white" : "text-brand-950"
                  }`}
                >
                  {day.getDate()}
                </p>
              </div>

              <div className="mt-2 space-y-1.5">
                {dayEvents.length === 0 ? (
                  <p className="text-xs text-slate-300">—</p>
                ) : (
                  dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg bg-brand-50 px-2 py-1.5"
                    >
                      <p className="text-[11px] font-bold leading-4 text-brand-800">
                        {event.title}
                      </p>
                      {event.time && (
                        <p className="text-[10px] text-slate-500">
                          {event.time}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   YEAR VIEW
========================================================= */

function YearView({
  year,
  events,
  years,
  onPickMonth,
}: {
  year: number;
  events: EventItem[];
  years: number[];
  onPickMonth: (month: number) => void;
}) {
  const yearEvents = events.filter(
    (event) => parseKey(event.date).getFullYear() === year
  );

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MONTHS.map((monthName, monthIndex) => {
          const monthEvents = yearEvents
            .filter((event) => parseKey(event.date).getMonth() === monthIndex)
            .sort((a, b) => a.date.localeCompare(b.date));

          return (
            <button
              key={monthName}
              type="button"
              onClick={() => onPickMonth(monthIndex)}
              className="card card-hover p-4 text-left"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold text-brand-950">
                  {monthName}
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {monthEvents.length}
                </span>
              </div>

              {monthEvents.length === 0 ? (
                <p className="mt-2 text-xs text-slate-400">No events</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {monthEvents.slice(0, 3).map((event) => (
                    <li
                      key={event.id}
                      className="flex gap-2 text-xs leading-5 text-slate-600"
                    >
                      <span className="font-bold text-brand-700">
                        {parseKey(event.date).getDate()}
                      </span>
                      <span className="truncate">{event.title}</span>
                    </li>
                  ))}

                  {monthEvents.length > 3 && (
                    <li className="text-[11px] font-semibold text-slate-400">
                      +{monthEvents.length - 3} more
                    </li>
                  )}
                </ul>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Showing {yearEvents.length} events in {year}
        {years.length > 1 ? ` · also available: ${years.join(", ")}` : ""}
      </p>
    </div>
  );
}

/* =========================================================
   MOBILE LIST VIEW
========================================================= */

function MonthListView({
  cursor,
  events,
  weekMode,
}: {
  cursor: Date;
  events: EventItem[];
  weekMode: boolean;
}) {
  const range = weekMode
    ? Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(cursor), index))
    : Array.from(
        {
          length:
            new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate(),
        },
        (_, index) =>
          new Date(cursor.getFullYear(), cursor.getMonth(), index + 1)
      );

  const days = range
    .map((day) => ({
      day,
      // On a list, show a multi-day event once, on its start date.
      items: events.filter(
        (event) =>
          eventCovers(event, day) &&
          (event.endDate ? sameDay(parseKey(event.date), day) : true)
      ),
    }))
    .filter((entry) => entry.items.length > 0);

  if (days.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        No events scheduled for this period.
      </p>
    );
  }

  return (
    <ol className="overflow-hidden rounded-xl border border-slate-200">
      {days.map(({ day, items }) => (
        <li
          key={toKey(day)}
          className="flex gap-3 border-b border-slate-100 px-4 py-3.5 last:border-b-0"
        >
          <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-cream-100 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
              {MONTHS_SHORT[day.getMonth()]}
            </span>
            <span
              className={`text-lg font-bold leading-tight ${
                sameDay(day, today) ? "text-brand-800" : "text-brand-950"
              }`}
            >
              {day.getDate()}
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            {items.map((event) => (
              <div key={event.id}>
                <p className="text-sm font-bold leading-5 text-brand-950">
                  {event.title}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {event.time ? `${event.time} · ` : ""}
                  {event.location}
                  {event.endDate ? ` · until ${formatDate(event.endDate)}` : ""}
                </p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* =========================================================
   EVENT ROW
========================================================= */

function EventRow({ event }: { event: EventItem }) {
  const date = parseKey(event.date);

  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-0">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
          {MONTHS_SHORT[date.getMonth()]} {date.getFullYear()}
        </p>
        <p className="text-xl font-bold text-brand-950 sm:text-2xl">
          {date.getDate()}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-brand-950">{event.title}</h3>
          <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
            {event.category}
          </span>
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {formatRange(event)}
          {event.time ? ` · ${event.time}` : ""} · {event.location}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {event.description}
        </p>
      </div>

      {event.link && (
        <Link
          href={event.link}
          className="shrink-0 text-sm font-bold text-brand-800 hover:underline"
        >
          Details →
        </Link>
      )}
    </div>
  );
}
