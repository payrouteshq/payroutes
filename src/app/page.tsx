import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { PayroutesLogo } from "@/components/icons";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    name: "paykit-sdk",
    description:
      "A unified TypeScript SDK with a consistent API across Stripe, PayPal, Polar, Redsys, Paystack and more. Switch providers in 2 lines of code.",
    href: "https://usepaykit.dev",
    github: "https://github.com/payrouteshq/paykit-sdk",
  },
  {
    name: "StellarTools",
    description:
      "Stripe-level payment primitives for the Stellar network. Checkout sessions, subscriptions, webhooks, invoices, usage-based billing and a marketplace all onchain.",
    href: "https://stellartools.dev",
    github: "https://github.com/payrouteshq/stellartools",
  },
];

const team = [
  {
    name: "Emmanuel Odii",
    role: "Founder & CEO",
    avatar: "/founder.jpeg",
    socials: {
      twitter: "https://x.com/devodii_",
      github: "https://github.com/devodii",
      linkedin: "https://www.linkedin.com/in/emmanuelodii/",
    },
  },
  {
    name: "Prince Ajuzie",
    role: "Software Engineer",
    avatar: "/prince.jpg",
    socials: {
      twitter: "https://x.com/princeajuzie7",
      github: "https://github.com/princeajuzie7",
      linkedin: "https://www.linkedin.com/in/princeajuzie/",
    },
  },
  {
    name: "Lucas Svoboda",
    role: "Head of Product",
    avatar: "/lucas.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/lucas-s-723a73212/",
    },
  },
  {
    name: "Mauricio Iriarte Hermida",
    role: "Designer",
    avatar: "/mau.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/mauiriarte/",
    },
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <PayroutesLogo className="h-7 w-7 text-foreground" />
          <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
            PayRoutes
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="flex flex-col items-start gap-8 py-24 sm:py-32">
          <PayroutesLogo className="h-14 w-14 text-foreground opacity-90" />
          <div className="max-w-2xl space-y-5">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The missing infrastructure between developers and payment
              providers.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              PayRoutes is a lab building open-source payment tooling — from
              unified provider SDKs to blockchain-native primitives.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        <section className="py-20">
          <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What we&apos;ve built
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex flex-col justify-between gap-8 rounded-xl border border-border bg-card p-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} on GitHub`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        <section className="py-20">
          <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {"initials" in member ? (member.initials as string) : ""}
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {"twitter" in member.socials && member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="X / Twitter"
                      >
                        <TwitterIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {"github" in member.socials && member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <PayroutesLogo className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Payroutes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
