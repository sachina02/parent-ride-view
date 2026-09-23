import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MySchoolBus — Parent Dashboard" },
      {
        name: "description",
        content:
          "Track your child's school bus: live status, ETA, pickup stop and trip history.",
      },
      { property: "og:title", content: "MySchoolBus — Parent Dashboard" },
      {
        property: "og:description",
        content:
          "Track your child's school bus: live status, ETA, pickup stop and trip history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// ---- Mock data ---------------------------------------------------------
const student = {
  name: "Aarav Sharma",
  grade: "Grade 4 — Section B",
  id: "STU-2048",
  pickupStop: "Maple Street / 7th Ave",
  avatarInitials: "AS",
};

const bus = {
  number: "Bus 24",
  driver: "Mr. David Okello",
  route: "Route R-7 · Greenfield → Lincoln Elementary",
  status: "On Route",
  eta: "8 min",
  boarded: "Boarded",
  capacity: "42 / 48 students",
};

const stops = [
  { name: "Maple Street / 7th Ave", time: "7:42 AM", state: "Passed" },
  { name: "Oakwood Plaza", time: "7:51 AM", state: "Passed" },
  { name: "Lincoln Elementary", time: "8:05 AM", state: "Next" },
];

const notifications = [
  {
    icon: "check",
    title: "Aarav has boarded the bus",
    body: "Boarded at Maple Street / 7th Ave at 7:42 AM.",
    time: "7:42 AM",
  },
  {
    icon: "bus",
    title: "Bus 24 is on its way",
    body: "Route R-7 started. ETA to school 8:05 AM.",
    time: "7:30 AM",
  },
  {
    icon: "bell",
    title: "Pickup reminder",
    body: "Bus 24 arriving at your stop in 5 minutes.",
    time: "7:35 AM",
  },
];

const recentTrips = [
  {
    date: "Tue, Sep 22",
    route: "Route R-7 · Morning",
    status: "Completed",
    pickup: "7:41 AM",
    drop: "8:04 AM",
  },
  {
    date: "Mon, Sep 21",
    route: "Route R-7 · Morning",
    status: "Completed",
    pickup: "7:43 AM",
    drop: "8:06 AM",
  },
  {
    date: "Fri, Sep 18",
    route: "Route R-7 · Morning",
    status: "Missed",
    pickup: "—",
    drop: "—",
  },
];

// ---- Component ---------------------------------------------------------
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Student profile card */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bus text-lg font-semibold text-bus-foreground">
                {student.avatarInitials}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.grade}</p>
                <p className="text-xs text-muted-foreground">
                  Student ID: {student.id}
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-bus-soft px-4 py-2 text-sm">
              <span className="text-muted-foreground">Pickup stop: </span>
              <span className="font-medium text-bus-foreground">
                {student.pickupStop}
              </span>
            </div>
          </div>
        </section>

        {/* Status + map row */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <StatusCard
              label="Bus Status"
              value={bus.status}
              tone="success"
              sub={`${bus.number} · ${bus.route}`}
            />
            <StatusCard
              label="ETA to School"
              value={bus.eta}
              tone="info"
              sub="Arriving at Lincoln Elementary"
            />
            <StatusCard
              label="Student Status"
              value={bus.boarded}
              tone="info"
              sub={`Boarded at ${student.pickupStop}`}
            />
          </div>

          {/* Mock live-tracking map */}
          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Live Tracking</h3>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                Updating
              </span>
            </div>
            <LiveMap />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>🚌 {bus.number}</span>
              <span>{bus.capacity}</span>
              <span>Driver: {bus.driver}</span>
            </div>
          </section>
        </div>

        {/* Pickup stop list */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold">Route Stops</h3>
          <ol className="relative ml-2 space-y-4 border-l-2 border-bus-soft pl-4">
            {stops.map((s) => (
              <li key={s.name} className="relative">
                <span
                  className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full ring-4 ring-card ${
                    s.state === "Next"
                      ? "bg-bus"
                      : s.state === "Passed"
                        ? "bg-success"
                        : "bg-muted-foreground"
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      s.state === "Next"
                        ? "bg-bus-soft text-bus-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.state}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Notifications + recent trips */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Notifications</h3>
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.title}
                  className="flex gap-3 rounded-xl bg-background/60 p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bus-soft text-bus-foreground">
                    <Icon name={n.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{n.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Recent Trips</h3>
            <ul className="space-y-3">
              {recentTrips.map((t) => (
                <li
                  key={t.date}
                  className="rounded-xl bg-background/60 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{t.date}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.status === "Completed"
                          ? "bg-success/15 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.route}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pickup {t.pickup} · Drop {t.drop}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="mt-8 pb-6 text-center text-xs text-muted-foreground">
          MySchoolBus · Demo data only · No live GPS or backend connected
        </footer>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bus text-lg">
            🚌
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight">MySchoolBus</p>
            <p className="text-[11px] text-muted-foreground">Parent Dashboard</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-accent"
        >
          🔔
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}

function StatusCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "success" | "info";
}) {
  const toneClasses =
    tone === "success"
      ? "bg-success/15 text-success"
      : "bg-info/15 text-info";
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${toneClasses}`}>
          {value}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{sub}</p>
    </section>
  );
}

// ---- Mock live-tracking map (SVG with an animated bus) ----------------
function LiveMap() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bus-soft">
      <svg
        viewBox="0 0 400 260"
        className="h-56 w-full sm:h-64"
        role="img"
        aria-label="Mock map showing bus route and stops"
      >
        {/* decorative grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-bus-foreground/15"
            />
          </pattern>
        </defs>
        <rect width="400" height="260" fill="url(#grid)" />

        {/* route path */}
        <path
          id="routePath"
          d="M 40 220 L 140 220 L 140 130 L 240 130 L 240 60 L 360 60"
          fill="none"
          stroke="var(--color-bus)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* stops */}
        <Stop cx={40} cy={220} label="Home" tone="success" />
        <Stop cx={190} cy={130} label="Oakwood" tone="success" />
        <Stop cx={300} cy={60} label="School" tone="bus" />

        {/* moving bus */}
        <g>
          <circle r="13" fill="var(--color-bus)" stroke="white" strokeWidth="2" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--color-bus-foreground)"
          >
            🚌
          </text>
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            rotate="0"
          >
            <mpath href="#routePath" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

function Stop({
  cx,
  cy,
  label,
  tone,
}: {
  cx: number;
  cy: number;
  label: string;
  tone: "success" | "bus";
}) {
  const fill =
    tone === "success" ? "var(--color-success)" : "var(--color-bus)";
  return (
    <g>
      <circle cx={cx} cy={cy} r="8" fill={fill} stroke="white" strokeWidth="2.5" />
      <text
        x={cx}
        y={cy - 14}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="var(--color-foreground)"
      >
        {label}
      </text>
    </g>
  );
}
