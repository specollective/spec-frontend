import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next/pages";

// Partner logos are exported on a shared 160×90 artboard from the GIEE brand
// kit, each with different padding. `crop` is the visible logo inside that
// artboard ([x, y, width, height], measured from the SVGs), so every logo can
// be sized by its actual ink, as on the v3 design; `desktop` / `phone` are the
// rendered [width, height] in px (others capped at 88 px wide so ten fit in a
// row). To add a partner, drop its SVG in
// public/partners/, measure its crop and append an entry.
type Partner = {
  name: string;
  src: string;
  crop: [number, number, number, number];
  desktop: [number, number];
  phone: [number, number];
};

// SPEC, GOER and GLQF lead the ecosystem; everyone else sits beneath them.
const PRIMARY: Partner[] = [
  { name: "SPEC", src: "/partners/spec.svg", crop: [25.7, 27.7, 117.2, 34.6], desktop: [200, 59.04], phone: [74, 21.85] },
  { name: "GOER", src: "/partners/goer.svg", crop: [0.4, 27.2, 159.2, 35.6], desktop: [220, 49.2], phone: [86, 19.23] },
  { name: "GLQF", src: "/partners/glqf.svg", crop: [17.3, 8.5, 125.4, 73], desktop: [164.91, 96], phone: [66.99, 39] },
];

const PARTNERS: Partner[] = [
  { name: "Mount Saint Mary’s University", src: "/partners/msm.svg", crop: [12.4, 0, 135.2, 90], desktop: [88, 58.58], phone: [67.6, 45] },
  { name: "Check it Learning", src: "/partners/check-it-learning.svg", crop: [7.9, 12, 144.1, 66], desktop: [88, 40.31], phone: [74, 33.89] },
  { name: "Insight Recognition", src: "/partners/insight-recognition.svg", crop: [34.6, 0, 90.9, 90], desktop: [60.6, 60], phone: [48.48, 48] },
  { name: "The Common Ground Collaborative", src: "/partners/common-group-collab.svg", crop: [3.6, 23.5, 152.8, 43], desktop: [88, 24.77], phone: [93, 26.17] },
  { name: "Win The Toss", src: "/partners/win-the-toss.svg", crop: [23.9, 0, 112.2, 90], desktop: [74.8, 60], phone: [48.62, 39] },
  { name: "Symbol", src: "/partners/symbol.svg", crop: [35, 0, 90.1, 90], desktop: [60.07, 60], phone: [43, 42.95] },
  { name: "Motum", src: "/partners/motum.svg", crop: [10.9, 30.4, 138.2, 29.2], desktop: [88, 18.59], phone: [74, 15.64] },
  { name: "FLOWWWY", src: "/partners/flowwwy.svg", crop: [9.9, 30.3, 140.2, 29.4], desktop: [88, 18.46], phone: [80, 16.78] },
  { name: "Glitch", src: "/partners/Glitch.svg", crop: [10.1, 26.8, 139.8, 36.4], desktop: [88, 22.91], phone: [80, 20.83] },
  { name: "Exceptional Learners Collaborative", src: "/partners/elc.svg", crop: [37.9, 3.2, 84.2, 83.6], desktop: [60.43, 60], phone: [45.32, 45] },
];

const pct = (n: number) => `${+(n * 100).toFixed(3)}%`;

function Logo({ partner }: { partner: Partner }) {
  const { t } = useTranslation("giee");
  const [x, y, w, h] = partner.crop;
  const size = {
    "--w": `${partner.desktop[0]}px`,
    "--h": `${partner.desktop[1]}px`,
    "--pw": `${partner.phone[0]}px`,
    "--ph": `${partner.phone[1]}px`,
  } as CSSProperties;
  return (
    <span
      style={size}
      className="relative block h-[var(--ph)] w-[var(--pw)] lg:h-[var(--h)] lg:w-[var(--w)]"
    >
      <Image
        src={partner.src}
        // Organization names stay in English (proper nouns).
        alt={t("partnerLogos.logoAlt", { name: partner.name })}
        width={160}
        height={90}
        loading="lazy"
        className="absolute max-w-none mix-blend-multiply"
        style={{
          width: pct(160 / w),
          height: pct(90 / h),
          left: pct(-x / w),
          top: pct(-y / h),
        }}
      />
    </span>
  );
}

/** The v3 partner strip: three primary partners above a row of all others. */
export default function GieePartnerLogos({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useTranslation("giee");
  return (
    <div className={className}>
      <ul
        aria-label={t("partnerLogos.primary")}
        className="m-0 grid list-none grid-cols-3 gap-px border-b border-t-[1.5px] border-b-giee-rule border-t-giee-navy bg-giee-rule p-0"
      >
        {PRIMARY.map((p) => (
          <li
            key={p.name}
            className="flex h-[104px] items-center justify-center bg-giee-ground lg:h-[168px]"
          >
            <Logo partner={p} />
          </li>
        ))}
      </ul>
      <ul
        aria-label={t("partnerLogos.others")}
        className="m-0 grid list-none grid-cols-2 gap-px border-b border-giee-rule bg-giee-rule p-0 sm:grid-cols-5 lg:grid-cols-10"
      >
        {PARTNERS.map((p) => (
          <li
            key={p.name}
            className="flex h-[84px] items-center justify-center bg-giee-ground lg:h-[120px]"
          >
            <Logo partner={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
