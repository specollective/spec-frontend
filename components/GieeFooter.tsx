import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import {
  BACK_TO_TOP_PATH,
  BACK_TO_TOP_PATH_PHONE,
  CTA_DESKTOP_BACK,
  CTA_DESKTOP_FRONT,
  CTA_PHONE_BACK,
  CTA_PHONE_FRONT,
} from "../constants/giee-glass";
import { GieeArrow, GieeMark, GlassLayers, Grain, ScaledBoard } from "./GieeGlass";

// v3 CTA + footer: one composition of glass pieces in the hero's language. The
// footer is itself a (narrower) navy glass piece overlapping the CTA pieces.
//
// It is drawn on two boards, 390 px (phone) and 1440 px (from `lg` up). The
// text and links exist once in the DOM; each element carries both sets of
// board coordinates (base = phone, `lg:` = desktop). Only the decorative glass
// layers are duplicated, and those are aria-hidden.

export const GIEE_LINKEDIN_GROUP_URL = "https://www.linkedin.com/groups/20130046/";

type Variant = "home" | "research" | "partner";

function useVariant(): Variant {
  const { pathname } = useRouter();
  if (pathname.startsWith("/giee/research")) return "research";
  if (pathname.startsWith("/giee/partner")) return "partner";
  return "home";
}

const underline =
  "bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] transition-[background-size] duration-300 ease-giee hover:bg-[length:100%_1.5px]";
const groupUnderline =
  "bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] transition-[background-size] duration-300 ease-giee group-hover:bg-[length:100%_1.5px]";
const btn =
  "transition-[transform,border-radius] duration-300 ease-giee hover:-translate-y-[2px] hover:!rounded-[26px_10px_26px_26px] motion-reduce:hover:translate-y-0";
const navyGlass =
  "bg-[linear-gradient(180deg,rgba(17,24,64,0.86)_0%,rgba(10,15,46,0.9)_100%)] backdrop-blur-[16px] backdrop-saturate-150 lg:backdrop-blur-[22px]";

function NewTab() {
  const { t } = useTranslation("giee");
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> {t("footer.newTab")}</span>
    </>
  );
}

interface FooterLink {
  href: string;
  label: ReactNode;
  external?: boolean;
  className?: string;
}

function FooterNav({
  label,
  links,
  className = "",
}: {
  label: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <nav aria-label={label} className={`flex-col gap-[10px] lg:gap-3 ${className}`}>
      <span aria-hidden="true" className="text-[13px] font-medium text-giee-navy-muted lg:text-[14px]">
        {label}
      </span>
      {links.map((l) =>
        l.external ? (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`self-start font-medium ${underline} ${l.className ?? ""}`}
          >
            {l.label}
            <NewTab />
          </a>
        ) : (
          <Link
            key={l.href}
            href={l.href}
            className={`self-start font-medium ${underline} ${l.className ?? ""}`}
          >
            {l.label}
          </Link>
        ),
      )}
    </nav>
  );
}

export default function GieeFooter() {
  const { t } = useTranslation("giee");
  const variant = useVariant();

  const primary =
    variant === "partner"
      ? { href: "#p-form", label: t("cta.fillInquiry") }
      : { href: "/giee/partner", label: t("cta.partner") };
  const blue =
    variant === "research"
      ? {
          href: "/giee",
          title: t("cta.newHere.title"),
          body: t("cta.newHere.body"),
          link: t("cta.newHere.link"),
        }
      : {
          href: "/giee/research",
          title: t("cta.curious.title"),
          body: t("cta.curious.body"),
          link: t("cta.curious.link"),
        };

  const backToTopClip = {
    "--clip": `path('${BACK_TO_TOP_PATH_PHONE}')`,
    "--lclip": `path('${BACK_TO_TOP_PATH}')`,
  } as CSSProperties;

  return (
    <div
      id="partner"
      className={`giee-on-navy relative text-giee-navy ${
        variant === "home" ? "mt-[88px]" : "mt-24 lg:mt-[168px]"
      }`}
    >
      <div className="mx-auto max-w-[600px] lg:max-w-[1440px]">
        <ScaledBoard width={390} height={1385} lg={{ width: 1440, height: 1346 }}>
          <div className="lg:hidden">
            <GlassLayers layers={CTA_PHONE_BACK} width={390} height={1385} />
          </div>
          <div className="hidden lg:block">
            <GlassLayers layers={CTA_DESKTOP_BACK} width={1440} height={1346} />
          </div>

          <section aria-labelledby="giee-cta-title">
            {/* Anchored by its bottom edge, so longer translations grow up
                into the red piece instead of under the footer. */}
            <div className="absolute bottom-[883px] left-[40px] flex w-[306px] flex-col gap-[18px] text-white lg:bottom-[690px] lg:left-[124px] lg:w-[720px] lg:gap-[28px]">
              <h2
                id="giee-cta-title"
                className="m-0 text-[40px] font-bold leading-[0.98] tracking-[-0.035em] lg:max-w-[660px] lg:text-[84px] lg:leading-[0.96]"
              >
                {t("cta.title")}
              </h2>
              <p className="m-0 text-[16px] leading-[1.5] lg:max-w-[580px] lg:text-[20px]">
                {t("cta.body")}
              </p>
              <div className="mt-[6px] flex gap-3 lg:mt-2">
                <Link
                  href={primary.href}
                  className={`flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px_10px_26px_10px] bg-white text-[16px] font-[650] text-giee-navy lg:h-[58px] lg:flex-none lg:gap-[10px] lg:rounded-[10px_10px_29px_10px] lg:px-[26px] lg:text-[17px] ${btn}`}
                >
                  {primary.label}
                  <GieeArrow className="h-4 w-4" />
                </Link>
                <Link
                  href="/giee/research"
                  className={`hidden h-[58px] items-center rounded-[10px_10px_29px_10px] px-[26px] text-[17px] font-[650] text-white shadow-[inset_0_0_0_1.5px_#fff] lg:inline-flex ${btn}`}
                >
                  {t("cta.research")}
                </Link>
              </div>
            </div>

            <a
              href={GIEE_LINKEDIN_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute left-[16px] top-[532px] flex h-[214px] w-[150px] flex-col justify-between pb-[18px] pl-5 pt-[58px] text-giee-navy lg:left-[916px] lg:top-[118px] lg:h-[256px] lg:w-[420px] lg:p-0"
            >
              <span className="flex flex-col gap-3">
                <span className="text-[20px] font-bold leading-[1.05] tracking-[-0.015em] lg:text-[32px] lg:leading-[1.02] lg:tracking-[-0.025em]">
                  {t("cta.community.title")}
                </span>
                <span className="hidden max-w-[360px] text-[17px] leading-[1.45] text-giee-warm lg:block">
                  {t("cta.community.body")}
                </span>
              </span>
              <span className="self-start text-[14px] font-medium lg:self-end lg:text-[17px]">
                <span className={groupUnderline}>
                  <span className="lg:hidden">{t("cta.community.short")}</span>
                  <span className="hidden lg:inline">{t("cta.community.link")}</span>
                </span>
                <NewTab />
              </span>
            </a>

            <Link
              href={blue.href}
              className="group absolute left-[164px] top-[556px] flex h-[250px] w-[210px] flex-col justify-end gap-2 pb-[54px] pl-9 pr-[18px] text-white lg:left-[980px] lg:top-[548px] lg:h-auto lg:w-[350px] lg:justify-start lg:gap-3 lg:p-0"
            >
              <span className="text-[20px] font-bold leading-[1.05] tracking-[-0.015em] lg:text-[32px] lg:leading-[1.02] lg:tracking-[-0.025em]">
                {blue.title}
              </span>
              <span className="hidden text-[17px] leading-[1.45] text-[#E4E8FF] lg:block">
                {blue.body}
              </span>
              <span className="text-[14px] font-medium lg:mt-[6px] lg:text-[17px]">
                <span className={groupUnderline}>{blue.link}</span>{" "}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </section>

          <footer
            className={`absolute left-[16px] top-[772px] w-[334px] overflow-hidden rounded-[24px_110px_24px_24px/24px_90px_24px_24px] px-5 pb-[22px] pt-9 text-white lg:left-[64px] lg:top-[700px] lg:w-[1100px] lg:rounded-[40px_240px_40px_40px/40px_200px_40px_40px] lg:px-[60px] lg:pb-[32px] lg:pt-[56px] ${navyGlass}`}
          >
            <Grain navy />
            <div className="relative">
              <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
                <div className="lg:col-span-5">
                  <GieeMark
                    tone="color"
                    label={t("footer.logo")}
                    idPrefix="giee-mark-footer"
                    className="h-[63px] w-[96px] lg:h-[99px] lg:w-[150px]"
                  />
                </div>
                <p className="mb-0 mt-7 text-[22px] font-medium leading-[1.16] tracking-[-0.02em] lg:col-span-6 lg:col-start-6 lg:mt-0 lg:text-[30px] lg:leading-[1.14] lg:tracking-[-0.025em]">
                  {t("footer.tagline")}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 text-[15px] lg:mt-[72px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:text-[16px]">
                <FooterNav
                  className="flex lg:col-span-2 lg:col-start-6"
                  label={t("footer.explore")}
                  links={[
                    { href: "/giee#about", label: t("footer.about") },
                    { href: "/giee#beliefs", label: t("footer.beliefs"), className: "hidden lg:block" },
                    { href: "/giee/research", label: t("footer.research") },
                  ]}
                />
                <FooterNav
                  className="flex lg:col-span-3 lg:col-start-8"
                  label={t("footer.getInvolved")}
                  links={[
                    { href: "/giee/partner", label: t("footer.partner") },
                    {
                      href: GIEE_LINKEDIN_GROUP_URL,
                      external: true,
                      label: (
                        <>
                          <span className="lg:hidden">{t("cta.community.short")}</span>
                          <span className="hidden lg:inline">{t("footer.linkedin")}</span>
                        </>
                      ),
                    },
                    { href: "/giee/partner#p-form", label: t("footer.contact"), className: "hidden lg:block" },
                    { href: "/", label: t("footer.spec"), className: "lg:hidden" },
                  ]}
                />
                <FooterNav
                  className="hidden lg:col-span-2 lg:col-start-11 lg:flex"
                  label={t("footer.spec")}
                  links={[
                    { href: "/", label: t("footer.specSite") },
                    { href: "/privacy", label: t("footer.privacy") },
                  ]}
                />
              </div>

              <div className="mt-10 flex justify-between gap-4 border-t border-white/15 pt-4 text-[12px] font-medium text-giee-navy-dim lg:mt-16 lg:pt-5 lg:text-[14px]">
                <p className="m-0">{t("footer.copyright")}</p>
                <Link href="/privacy" className="lg:hidden">
                  {t("footer.privacyShort")}
                </Link>
                <p className="m-0 hidden lg:block">{t("footer.initiativeOf")}</p>
              </div>
            </div>
          </footer>

          <a
            href="#top"
            style={backToTopClip}
            className={`absolute left-[206px] top-[1300.6px] flex h-[56px] w-[168px] items-center justify-center whitespace-nowrap text-[13px] font-extrabold uppercase leading-[0.9] tracking-[0.05em] text-giee-cream transition-transform duration-300 ease-giee [clip-path:var(--clip)] hover:-translate-y-[2px] lg:left-[1180px] lg:top-[1141.8px] lg:h-[80px] lg:w-[196px] lg:text-[16px] lg:[clip-path:var(--lclip)] ${navyGlass}`}
          >
            {t("footer.backToTop")}
            <span aria-hidden="true">&nbsp;↑</span>
          </a>

          <div className="lg:hidden">
            <GlassLayers layers={CTA_PHONE_FRONT} width={390} height={1385} />
          </div>
          <div className="hidden lg:block">
            <GlassLayers layers={CTA_DESKTOP_FRONT} width={1440} height={1346} />
          </div>
        </ScaledBoard>
      </div>
    </div>
  );
}
