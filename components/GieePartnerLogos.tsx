import Image from "next/image";
import { useTranslation } from "next-i18next/pages";

// Partner logos are exported on a shared 160×90 artboard from the GIEE brand
// kit, so every logo uses the same intrinsic dimensions. Add a partner by
// dropping its SVG in public/partners/ and appending an entry to the right list.
const PARTNER_LOGO_WIDTH = 160;
const PARTNER_LOGO_HEIGHT = 90;

// `sizeClass` overrides the row default for logos that read small at a uniform
// height — e.g. square icon+wordmark lockups that fill the artboard vertically
// but only ~half its width, so their text is smaller than a wide wordmark's.
type Partner = { name: string; logo: string; sizeClass?: string };

// Featured ecosystem brands — shown larger on the top row.
const featured: Partner[] = [
  { name: "SPEC", logo: "/partners/spec.svg" },
  { name: "GOER", logo: "/partners/goer.svg" },
  { name: "GLQF", logo: "/partners/glqf.svg" },
];

// Partner & case-study organizations — shown below the featured row.
const partners: Partner[] = [
  { name: "Win The Toss", logo: "/partners/win-the-toss.svg" },
  { name: "Check it Learning", logo: "/partners/check-it-learning.svg" },
  { name: "Symbol", logo: "/partners/symbol.svg" },
  { name: "Motum", logo: "/partners/motum.svg" },
  { name: "The Common Ground Collaborative", logo: "/partners/common-group-collab.svg" },
  { name: "FLOWWWY", logo: "/partners/flowwwy.svg" },
  { name: "Mount Saint Mary's University", logo: "/partners/msm.svg" },
  {
    name: "Insight Recognition",
    logo: "/partners/insight-recognition.svg",
    sizeClass: "h-20 md:h-28",
  },
];

function Logo({
  name,
  logo,
  sizeClass,
}: {
  name: string;
  logo: string;
  sizeClass: string;
}) {
  const { t } = useTranslation("giee");
  // Organization NAMES stay in English (proper nouns); only the generic
  // "... logo" wrapper is translated.
  return (
    <Image
      src={logo}
      alt={t("partnerLogos.logoAlt", { name })}
      width={PARTNER_LOGO_WIDTH}
      height={PARTNER_LOGO_HEIGHT}
      className={`w-auto object-contain ${sizeClass}`}
    />
  );
}

export default function GieePartnerLogos({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-y-10 md:gap-y-14 ${className}`}>
      <ul className="flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-8 p-0 md:gap-x-20">
        {featured.map((p) => (
          <li key={p.name}>
            <Logo name={p.name} logo={p.logo} sizeClass="h-20 md:h-28" />
          </li>
        ))}
      </ul>

      <ul className="flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-8 p-0 md:gap-x-14">
        {partners.map((p) => (
          <li key={p.name}>
            <Logo
              name={p.name}
              logo={p.logo}
              sizeClass={p.sizeClass ?? "h-16 md:h-24"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
