import * as React from "react";

import { cn } from "../../cn";
import { Check, ChevronDown, ChevronUp, ClockPlay, CloseX } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

type LinkComponentType = React.ComponentType<{
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}>;

const DefaultLink: LinkComponentType = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export type TimelineStatus = "success" | "pending" | "error" | "complete";

export interface TimelineEntry {
  title: React.ReactNode;
  date?: React.ReactNode;
  source?: React.ReactNode;
  description?: React.ReactNode;
  status?: TimelineStatus;
  data?: Record<string, unknown> | null;
  contentOverride?: React.ReactNode;
  key?: string | number;
  titleClassName?: string;
}

export interface TimelineProps<T> extends MixinProps<"container", React.ComponentProps<"div">> {
  items: T[];
  renderItem: (item: T, index: number) => TimelineEntry;
  emptyMessage?: string;
  isLoading?: boolean;
  limit?: number;
  skeletonRowCount?: number;
  routeMap?: Record<string, (id: string) => string>;
  linkComponent?: LinkComponentType;
}

const statusStyles: Record<TimelineStatus, { icon: typeof Check; className: string }> = {
  success: {
    icon: Check,
    className: "bg-muted text-muted-foreground",
  },
  pending: {
    icon: ClockPlay,
    className: "bg-accent text-primary",
  },
  error: {
    icon: CloseX,
    className: "bg-ring-error text-error",
  },
  complete: {
    icon: Check,
    className: "bg-primary text-primary-foreground",
  },
};

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^[a-z]/, (m) => m.toUpperCase());
}

function TimelineStatusIcon({ status }: { status: TimelineStatus }) {
  const { icon: Icon, className } = statusStyles[status];

  return (
    <span
      data-slot="timeline-status"
      data-status={status}
      className={cn("relative z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-full", className)}
    >
      <Icon className="size-3.5" />
    </span>
  );
}

function TimelineSummary({
  data,
  manualContent,
  routeMap,
  LinkComponent,
}: {
  data?: Record<string, unknown> | null;
  manualContent?: React.ReactNode;
  routeMap?: Record<string, (id: string) => string>;
  LinkComponent: LinkComponentType;
}) {
  const summaryItems = React.useMemo(() => {
    if (!data) return [];

    return Object.entries(data)
      .filter(([key, val]) => key !== "$changes" && val !== null && typeof val !== "object")
      .map(([key, val]) => {
        const href = routeMap?.[key]?.(String(val));

        return (
          <span key={key} className="inline-flex items-center">
            <span className="text-muted-foreground mr-1 font-medium">{formatLabel(key)}:</span>
            {href ? (
              <LinkComponent
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                href={href}
                className="text-primary font-mono text-[13px] underline"
              >
                {String(val)}
              </LinkComponent>
            ) : (
              <span className="text-foreground/80">{String(val)}</span>
            )}
          </span>
        );
      });
  }, [data, routeMap, LinkComponent]);

  if (manualContent) return <div className="text-foreground text-sm">{manualContent}</div>;
  if (!data || summaryItems.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-relaxed">
      {summaryItems.reduce<React.ReactNode[]>(
        (prev, curr, i) =>
          i === 0
            ? [curr]
            : [
                ...prev,
                <span key={`sep-${i}`} className="text-muted-foreground/30">
                  •
                </span>,
                curr,
              ],
        []
      )}
    </div>
  );
}

function getDiffRows(changes: Record<string, unknown>) {
  const previousAttributes = changes.previous_attributes;

  if (previousAttributes && typeof previousAttributes === "object") {
    const previous = previousAttributes as Record<string, unknown>;
    const current = (changes.data as Record<string, unknown> | undefined) ?? {};
    return Object.keys(previous).map((key) => ({
      key,
      from: previous[key],
      to: current[key],
    }));
  }

  return Object.entries(changes)
    .filter(([, val]) => val && typeof val === "object" && ("from" in val || "to" in val))
    .map(([key, val]) => {
      const entry = val as { from?: unknown; to?: unknown };
      return { key, from: entry.from, to: entry.to };
    });
}

function TimelineDiff({ changes }: { changes?: unknown }) {
  if (!changes || typeof changes !== "object") return null;

  const rows = getDiffRows(changes as Record<string, unknown>);
  if (rows.length === 0) return null;

  return (
    <div className="border-muted mt-2 space-y-1.5 border-l-2 py-0.5 pl-3">
      {rows.map((row) => (
        <div key={row.key} className="text-xs leading-tight">
          <span className="text-foreground font-medium">{formatLabel(row.key)}: </span>
          <span className="text-muted-foreground/60 decoration-muted-foreground/40 italic line-through">
            {row.from === null || row.from === "" || row.from === undefined ? "none" : String(row.from)}
          </span>
          <span className="text-muted-foreground/40 mx-1.5">→</span>
          <span className="text-primary font-medium">
            {row.to === null || row.to === "" || row.to === undefined ? "none" : String(row.to)}
          </span>
        </div>
      ))}
    </div>
  );
}

function TimelineItem({
  entry,
  isLast,
  routeMap,
  LinkComponent,
}: {
  entry: TimelineEntry;
  isLast: boolean;
  routeMap?: Record<string, (id: string) => string>;
  LinkComponent: LinkComponentType;
}) {
  const status = entry.status ?? "success";
  const isDetailed = Boolean(entry.description);

  return (
    <li data-slot="timeline-item" className="relative flex gap-3 pb-6 last:pb-0">
      <div className="relative flex w-7 shrink-0 justify-center">
        {!isLast ? <span className="bg-border absolute top-7 bottom-[-24px] w-px" aria-hidden="true" /> : null}
        <TimelineStatusIcon status={status} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h4 className={cn("text-foreground text-sm font-semibold", entry.titleClassName)}>{entry.title}</h4>
          {isDetailed ? (
            <span className="text-muted-foreground text-sm">
              {entry.date}
              {entry.date && entry.source ? " - " : null}
              {entry.source}
            </span>
          ) : entry.source ? (
            <span className="text-muted-foreground text-sm">{entry.source}</span>
          ) : null}
        </div>

        {!isDetailed && entry.date ? <time className="text-muted-foreground text-xs">{entry.date}</time> : null}

        {entry.description ? <p className="text-muted-foreground text-sm">{entry.description}</p> : null}

        <TimelineSummary
          data={entry.data}
          manualContent={entry.contentOverride}
          routeMap={routeMap}
          LinkComponent={LinkComponent}
        />
        <TimelineDiff changes={entry.data?.$changes} />
      </div>
    </li>
  );
}

function Timeline<T>({
  items,
  renderItem,
  isLoading,
  limit = 0,
  emptyMessage = "No story found",
  skeletonRowCount = 3,
  routeMap,
  linkComponent: LinkComponent = DefaultLink,
  ...mixProps
}: TimelineProps<T>) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { container } = splitProps(mixProps, "container");

  if (isLoading) {
    return (
      <div data-slot="timeline" {...container} className={cn("relative flex flex-col", container.className)}>
        <ul className="relative m-0 list-none p-0">
          {Array.from({ length: skeletonRowCount }).map((_, i) => (
            <li key={i} className="relative flex gap-3 pb-6 last:pb-0">
              <div className="relative flex w-7 shrink-0 justify-center">
                {i < skeletonRowCount - 1 ? (
                  <span className="bg-border absolute top-7 bottom-[-24px] w-px" aria-hidden="true" />
                ) : null}
                <Skeleton className="size-7 rounded-full" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 pt-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div
        data-slot="timeline"
        {...container}
        className={cn("text-muted-foreground py-10 text-center text-sm italic", container.className)}
      >
        {emptyMessage}
      </div>
    );
  }

  const displayItems = limit > 0 && items.length > limit && !isExpanded ? items.slice(0, limit) : items;

  return (
    <div data-slot="timeline" {...container} className={cn("relative flex flex-col", container.className)}>
      <ul className="relative m-0 list-none p-0">
        {displayItems.map((item, index) => {
          const entry = renderItem(item, index);
          return (
            <TimelineItem
              key={entry.key ?? index}
              entry={entry}
              isLast={index === displayItems.length - 1 && !(limit > 0 && items.length > limit && !isExpanded)}
              routeMap={routeMap}
              LinkComponent={LinkComponent}
            />
          );
        })}

        {limit > 0 && items.length > limit && !isExpanded ? (
          <div className="from-background via-background/90 pointer-events-none absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-linear-to-t to-transparent pb-1">
            <Button
              variant="secondary"
              size="sm"
              className="pointer-events-auto h-8 rounded-full border shadow-sm"
              onClick={() => setIsExpanded(true)}
            >
              <ChevronDown className="mr-2 size-3" /> Show {items.length - limit} more
            </Button>
          </div>
        ) : null}
      </ul>

      {isExpanded ? (
        <Button
          variant="secondary"
          size="sm"
          className="pointer-events-auto mx-auto mt-2 h-8 w-fit rounded-full border shadow-sm"
          onClick={() => setIsExpanded(false)}
        >
          <ChevronUp className="mr-2 size-3" /> Show less
        </Button>
      ) : null}
    </div>
  );
}

export { Timeline, TimelineStatusIcon };
export type { LinkComponentType };
