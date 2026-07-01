import Link from "next/link";
import GieeLayout from "../../components/GieeLayout";
import GieeCommunityBand from "../../components/GieeCommunityBand";
import GieePartnerLogos from "../../components/GieePartnerLogos";

interface Initiative {
  name: string;
  description: string;
  partners: string[];
}

const initiatives: Initiative[] = [
  {
    name: "Women in AI Framework",
    description:
      "This initiative explores the structural inclusion of women's perspectives across the entire AI development lifecycle.",
    partners: [
      "Mount Saint Mary's University (Los Angeles, CA)",
      "University of Barcelona — Social Work Department",
    ],
  },
  {
    name: "Insight Recognition",
    description:
      "An AI-driven assessment and personalized learning environment that maps knowledge through individualized, bottom-up concept mapping.",
    partners: [
      "Prior Learning Assessment Advisory Group",
      "United States Workforce Development Partners",
      "International Educational Systems",
    ],
  },
  {
    name: "Scaling & Expanding Youth-Led Critical AI Education",
    description:
      "A critical science and technology program addressing professional development for K-12 educators regarding sociotechnical harms.",
    partners: [
      "UCLA",
      "Race, Abolition, and Artificial Intelligence (RAAI) Program",
      "Brown University",
      "NYC WorkEd",
    ],
  },
  {
    name: "murmur: AI Design in Mental Health",
    description:
      "A structured clinical instrument built on Schema Therapy models to provide clinician-supervised reflective support for learners.",
    partners: [
      "APA Professional Networks",
      "Central Asian University Counseling Centers",
      "Kyrgyzstan Local Clinicians",
    ],
  },
  {
    name: "Street Racket: Schools and Hybrid Learning Environments",
    description:
      "Investigating how movement-based learning can be enhanced through AI-supported reflection and goal-setting.",
    partners: [
      "Street Racket International",
      "Tarek's Tennis Academy (Belgium)",
      "Global Educational Technology Partners",
    ],
  },
  {
    name: "CheckIT Learning: AI Supporting SEN Students",
    description:
      "Exploring how neuroscience-informed digital pathways enhance engagement for students with Special Educational Needs (SEN).",
    partners: [
      "CheckIT Learning (CLEO LMS Platform)",
      "St. George's British International School (Bilbao, Spain)",
    ],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm">
      {children}
    </p>
  );
}

export default function GieeResearchPage() {
  return (
    <GieeLayout>
      {/* INTRO */}
      <section className="bg-giee-paper px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/giee"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            ← Back to GIEE
          </Link>
          <h1 className="mt-6 font-giee-serif text-4xl leading-[1.08] text-giee-ink md:text-5xl lg:text-6xl">
            Explore Our Research Portfolio
          </h1>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            Welcome to the Global Inclusive Education Ecosystem (GIEE) Research
            Portfolio. GIEE functions as a quality-assured regulatory sandbox,
            bridging high-level international policy with real-world, grassroots
            execution. By centering our initiatives around the GLQF and GOER
            principles, we actively shift global education from standard content
            delivery to outcome-based competency and human-AI synergy.
          </p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="bg-giee-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Active Case Studies &amp; Ecosystem Partners</Eyebrow>

          <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((item) => (
              <li key={item.name} className="h-full">
                <article className="flex h-full flex-col border border-giee-line bg-giee-paper p-8 transition-all hover:-translate-y-1 hover:border-giee-ink hover:shadow-md">
                  <h2 className="font-giee-serif text-2xl leading-snug text-giee-ink">
                    {item.name}
                  </h2>
                  <p className="mt-4 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-giee-line pt-5">
                    <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.18em] text-giee-accent">
                      Ecosystem Partners
                    </p>
                    <ul className="mt-3 flex list-none flex-col gap-2 p-0">
                      {item.partners.map((partner) => (
                        <li
                          key={partner}
                          className="font-giee-sans text-sm leading-relaxed text-giee-slate"
                        >
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-16 text-center">
            <Link
              href="/giee/partner"
              className="inline-flex items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90"
            >
              Partner with GIEE
            </Link>
          </div>

          <GieePartnerLogos className="mt-12" />
        </div>
      </section>

      <GieeCommunityBand />
    </GieeLayout>
  );
}
