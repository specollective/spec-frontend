// "Join Our GIEE Community" — a reusable call-to-action band rather than a
// popup/rollover. It surfaces the decentralized working-group invitation at the
// foot of GIEE subpages so visitors can step into the ecosystem inline.

// TODO: replace with the real GIEE LinkedIn community group URL once it exists.
const GIEE_LINKEDIN_GROUP_URL = "https://www.linkedin.com/groups/";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function GieeCommunityBand() {
  return (
    <section
      id="community"
      className="scroll-mt-24 bg-giee-ink px-6 py-20 text-giee-paper md:py-24"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-cyan">
            Join Our GIEE Community
          </h2>
          <p className="mt-5 font-giee-serif text-2xl leading-snug text-giee-paper md:text-3xl">
            Connect with the Ecosystem Architecture
          </p>
          <p className="mt-5 font-giee-sans text-base leading-relaxed text-giee-paper/85 md:text-lg">
            The heartbeat of GIEE relies on our active, decentralized
            peer-to-peer network. Don&rsquo;t wait for our next formal
            presentation to step into the ecosystem. Join our official working
            group right now to interact with our Case Study Leads and
            participate in public evidence reviews.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href={GIEE_LINKEDIN_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border-2 border-giee-paper bg-transparent px-8 py-4 font-giee-sans text-base font-semibold text-giee-paper transition-colors hover:bg-giee-paper hover:text-giee-ink sm:w-auto"
          >
            Join the GIEE LinkedIn Community Group
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
