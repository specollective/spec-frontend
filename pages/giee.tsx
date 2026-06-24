import Link from "next/link";
import GieeLayout from "../components/GieeLayout";

const pillars = [
  {
    name: "Technology Must Amplify Human Capability",
    description:
      "Systems must serve the individual, not the inverse. We advocate for and audit algorithmic models to ensure they are engineered to elevate human curiosity, critical thinking, and baseline capability—never to diminish, gatekeep, or displace the human architecture of learning.",
  },
  {
    name: "Equity Demands Intentional Design",
    description:
      "Societies do not stumble into ethical AI platforms. Responsible deployment requires a deliberate vetting infrastructure that forces technology architects, policymakers, and institutions to audit how a digital tool impacts learner privacy, access, and psychological safety before it scales globally.",
  },
  {
    name: "Trust is our Ultimate Institutional Currency",
    description:
      "If educators, students, and community stakeholders do not trust the operational systems they rely on, the innovation inherently fails. By anchoring emerging technology in transparent, rigorous governance models, we effectively turn institutional skepticism into collaborative progress.",
  },
];

const initiatives = [
  {
    name: "The GOER AI Integrity Badge",
    description:
      "Administered by the GOER Board, the AI Integrity Badge represents a critical evolution in educational quality assurance. Far more than a technical validation process, this badge establishes the global baseline for ethical, transparent, and accountable AI integration. By auditing and recognizing technical innovators who meet these stringent criteria, we provide educational systems with verified, safe, and equitable digital tools.",
  },
  {
    name: "The UN-Geneva Forum Alliance",
    description:
      "Through our continuous collaboration with the Geneva Forum, GIEE scales localized benchmarks into global policy frameworks. This alliance bridges the gap between grassroots educational technology and high-level international diplomacy, ensuring that global frameworks for digital sovereignty are rooted in data-driven, real-world impact.",
  },
];

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm ${className}`}
    >
      {children}
    </h2>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function GieePage() {
  return (
    <GieeLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-giee-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-giee-line"
        />
        <div className="relative mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-24 text-center md:pt-32">
          <h1 className="font-giee-serif text-4xl leading-[1.05] text-giee-ink md:text-6xl lg:text-7xl">
            Global AI Governance &amp;
            <br />
            Inclusive Education Ecosystem
          </h1>
          <p className="mt-8 max-w-2xl font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            The rapid ascension of generative artificial intelligence demands a
            proactive, cross-sector approach to technology governance—one that
            prioritizes human capability, institutional accountability, and
            equity.
          </p>
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#overview"
              className="inline-flex w-full items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90 sm:w-auto sm:min-w-[14rem]"
            >
              Explore the ecosystem
            </a>
            <a
              href="#pillars"
              className="inline-flex w-full items-center justify-center border-2 border-giee-ink bg-transparent px-8 py-4 font-giee-sans text-base font-semibold text-giee-ink transition-colors hover:bg-giee-ink hover:text-giee-paper sm:w-auto sm:min-w-[14rem]"
            >
              Our core pillars
            </a>
          </div>
        </div>

        <a
          href="#overview"
          aria-label="Scroll to overview"
          className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-giee-slate transition-colors hover:text-giee-ink md:flex"
        >
          <span className="font-giee-sans text-[11px] uppercase tracking-[0.25em]">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* OVERVIEW */}
      <section
        id="overview"
        className="scroll-mt-24 bg-giee-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Overview</Eyebrow>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            The Global Inclusive Education Ecosystem (GIEE) serves as a
            foundational bridge linking emerging technology with robust
            human-centered frameworks. In direct collaboration with the Global
            Online Education Regulator (GOER) and the United Nations-Geneva
            Forum, we are moving beyond a posture of merely reacting to digital
            shifts.
          </p>
          <p className="mt-6 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            Together, we are designing the global benchmarks, policies, and
            guardrails that ensure AI serves as an instrument for collective
            empowerment, ethical growth, and educational trust.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section
        id="pillars"
        className="scroll-mt-24 bg-giee-paper px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Our Core Pillars of Systemic Governance</Eyebrow>
            <p className="mt-6 font-giee-sans text-lg leading-relaxed text-giee-ink-soft">
              When we discuss &ldquo;human-centered design&rdquo; in artificial
              intelligence architecture, it cannot simply be a rhetorical
              catchphrase. True technological equity requires an intentional,
              evidence-based framework. Our ecosystem is anchored in three
              structural truths:
            </p>
          </div>

          <ul className="mt-16 grid list-none gap-6 p-0 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.name}>
                <div className="group flex h-full flex-col border border-giee-line bg-giee-white p-8 transition-all hover:-translate-y-1 hover:border-giee-ink hover:shadow-md">
                  <span className="font-giee-sans text-xs font-semibold tracking-[0.22em] text-giee-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-giee-serif text-2xl leading-snug text-giee-ink md:text-[1.65rem]">
                    {p.name}
                  </h3>
                  <p className="mt-4 flex-1 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {p.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INITIATIVES */}
      <section
        id="initiatives"
        className="scroll-mt-24 bg-giee-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Strategic Global Initiatives &amp; Intersections</Eyebrow>
          </div>

          <ul className="mt-16 grid list-none gap-6 p-0 md:grid-cols-2">
            {initiatives.map((item) => (
              <li key={item.name}>
                <div className="flex h-full flex-col border border-giee-line bg-giee-paper p-8 md:p-10">
                  <h3 className="font-giee-serif text-2xl leading-snug text-giee-ink md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-5 flex-1 font-giee-sans text-base leading-relaxed text-giee-ink-soft md:text-lg">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        id="engage"
        className="scroll-mt-24 bg-giee-ink px-6 py-24 text-giee-paper md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-giee-serif text-3xl leading-snug text-giee-paper md:text-4xl">
            Shape the Future of Trust with Us
          </h2>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-paper/85 md:text-xl">
            The intersection of AI governance and inclusive education is the
            defining policy challenge of our era. Whether you are a scholar,
            practitioner, tech architect, or public servant, your insights are
            vital to constructing these global guardrails.
          </p>
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-giee-green bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-transparent hover:text-giee-white sm:w-auto"
            >
              Explore Our Research Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center border-2 border-giee-paper bg-transparent px-8 py-4 font-giee-sans text-base font-semibold text-giee-paper transition-colors hover:bg-giee-paper hover:text-giee-ink sm:w-auto"
            >
              Partner with GIEE
            </Link>
          </div>
        </div>
      </section>
    </GieeLayout>
  );
}
