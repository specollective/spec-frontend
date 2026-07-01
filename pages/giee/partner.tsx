import Link from "next/link";
import GieeLayout from "../../components/GieeLayout";
import GieePartnerForm from "../../components/GieePartnerForm";
import GieeCommunityBand from "../../components/GieeCommunityBand";

export default function GieePartnerPage() {
  return (
    <GieeLayout>
      <section className="bg-giee-paper px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/giee"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            ← Back to GIEE
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — content */}
            <div className="lg:pr-4">
              <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm">
                Partner with GIEE
              </p>
              <h1 className="mt-6 font-giee-serif text-4xl leading-[1.08] text-giee-ink md:text-5xl">
                Join the Sandbox
              </h1>
              <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
                GIEE partners with forward-thinking institutions, community
                advocates, and industry leaders to build bankable,
                human-centered public assets. Please fill out the form to
                connect with our Executive Leadership Team.
              </p>

              <dl className="mt-12 flex flex-col gap-8 border-t border-giee-line pt-10">
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    A quality-assured regulatory sandbox
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    We bridge high-level international policy with real-world,
                    grassroots execution—anchored in the GLQF and GOER
                    principles.
                  </dd>
                </div>
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    Built for collaboration
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    Whether you arrive with a case study, a new proposal, or a
                    research question, our team will route your inquiry to the
                    right Case Study Lead.
                  </dd>
                </div>
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    Explore the portfolio first
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    See our active case studies and ecosystem partners on the{" "}
                    <Link
                      href="/giee/research"
                      className="font-semibold text-giee-green underline-offset-2 hover:underline"
                    >
                      Research Portfolio
                    </Link>
                    .
                  </dd>
                </div>
              </dl>
            </div>

            {/* RIGHT — form */}
            <div className="border border-giee-line bg-giee-white p-6 md:p-10">
              <GieePartnerForm />
            </div>
          </div>
        </div>
      </section>

      <GieeCommunityBand />
    </GieeLayout>
  );
}
