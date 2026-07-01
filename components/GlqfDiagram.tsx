import { FC, memo, ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";

interface Props {
  className?: string;
}

interface DiagramLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}

const DiagramLink: FC<DiagramLinkProps> = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="[&_text]:transition-colors [&_text]:duration-200 hover:[&_text]:fill-glqf-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-glqf-accent"
  >
    {children}
  </a>
);

// Geometry for the eight domain labels around the sphere. Text content is pulled
// from translations (each entry may wrap onto multiple <tspan> lines); positions
// stay fixed here so the layout is identical across locales.
const DOMAIN_LABELS: { slug: string; x: number; y: number }[] = [
  { slug: "specialized-knowledge", x: 180, y: 120 },
  { slug: "applied-knowledge", x: 420, y: 120 },
  { slug: "integrated-knowledge", x: 540, y: 240 },
  { slug: "communication", x: 545, y: 375 },
  { slug: "information-literacy", x: 400, y: 520 },
  { slug: "ethical-responsibility", x: 200, y: 520 },
  { slug: "sociocultural-and-civic-engagement", x: 55, y: 360 },
  { slug: "learning-engagement", x: 60, y: 240 },
];

export const GlqfDiagram: FC<Props> = memo(function GlqfDiagram(props) {
  const { t } = useTranslation("glqf");

  return (
    <svg
      viewBox="-60 0 720 600"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-labelledby="glqf-diagram-title glqf-diagram-desc"
      className={props.className}
    >
      <title id="glqf-diagram-title">{t("diagram.title")}</title>
      <desc id="glqf-diagram-desc">{t("diagram.desc")}</desc>

      <defs>
        <radialGradient id="glqf-sphere" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FAF7F2" />
          <stop offset="100%" stopColor="#F0EBE0" />
        </radialGradient>
      </defs>

      <circle
        cx="300"
        cy="300"
        r="240"
        fill="url(#glqf-sphere)"
        stroke="#0F2A44"
        strokeOpacity="0.18"
        strokeWidth="1"
      />

      <g
        fill="none"
        stroke="#0F2A44"
        strokeOpacity="0.32"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <ellipse cx="300" cy="300" rx="240" ry="80" />
        <ellipse
          cx="300"
          cy="300"
          rx="240"
          ry="80"
          transform="rotate(60 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="240"
          ry="80"
          transform="rotate(120 300 300)"
        />
      </g>

      <polygon
        points="300,170 410,360 190,360"
        fill="#FAF7F2"
        fillOpacity="0.6"
        stroke="#A8501C"
        strokeWidth="1.5"
        aria-hidden="true"
      />

      <g
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        fill="#0F2A44"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        <DiagramLink href="/glqf/integration" label={t("items.integration")}>
          <text transform="translate(258 273) rotate(-60)">
            {t("items.integration").toUpperCase()}
          </text>
        </DiagramLink>
        <DiagramLink href="/glqf/knowledge" label={t("items.knowledge")}>
          <text transform="translate(342 273) rotate(60)">
            {t("items.knowledge").toUpperCase()}
          </text>
        </DiagramLink>
        <DiagramLink href="/glqf/engagement" label={t("items.engagement")}>
          <text x="300" y="358">
            {t("items.engagement").toUpperCase()}
          </text>
        </DiagramLink>
      </g>

      <g
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight="600"
        fontSize="15"
        fill="#3A4F66"
        textAnchor="middle"
      >
        {DOMAIN_LABELS.map(({ slug, x, y }) => {
          const lines = t(`diagram.domainLines.${slug}`, {
            returnObjects: true,
          }) as string[];
          return (
            <DiagramLink
              key={slug}
              href={`/glqf/${slug}`}
              label={t(`items.${slug}`)}
            >
              <text x={x} y={y}>
                {lines.map((line, i) => (
                  <tspan key={i} x={x} {...(i > 0 ? { dy: 18 } : {})}>
                    {line}
                  </tspan>
                ))}
              </text>
            </DiagramLink>
          );
        })}
      </g>
    </svg>
  );
});
