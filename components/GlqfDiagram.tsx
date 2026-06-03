import { FC, memo, ReactNode } from "react";

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

export const GlqfDiagram: FC<Props> = memo(function GlqfDiagram(props) {
  return (
    <svg
      viewBox="-60 0 720 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="glqf-diagram-title glqf-diagram-desc"
      className={props.className}
    >
      <title id="glqf-diagram-title">
        Global Learning Qualifications Framework
      </title>
      <desc id="glqf-diagram-desc">
        Interactive diagram of the GLQF. Three core constructs — Integration,
        Knowledge, and Engagement — sit at the center of a sphere, surrounded
        by eight learning domains: Specialized Knowledge, Applied Knowledge,
        Integrated Knowledge, Communication, Information Literacy, Ethical
        Responsibility, Sociocultural and Civic Engagement, and Learning
        Engagement. Each label links to its detail page.
      </desc>

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
        <DiagramLink href="/glqf/integration" label="Integration">
          <text transform="translate(258 273) rotate(-60)">INTEGRATION</text>
        </DiagramLink>
        <DiagramLink href="/glqf/knowledge" label="Knowledge">
          <text transform="translate(342 273) rotate(60)">KNOWLEDGE</text>
        </DiagramLink>
        <DiagramLink href="/glqf/engagement" label="Engagement">
          <text x="300" y="358">ENGAGEMENT</text>
        </DiagramLink>
      </g>

      <g
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight="600"
        fontSize="15"
        fill="#3A4F66"
        textAnchor="middle"
      >
        <DiagramLink
          href="/glqf/specialized-knowledge"
          label="Specialized Knowledge"
        >
          <text x="180" y="120">
            <tspan x="180">Specialized</tspan>
            <tspan x="180" dy="18">Knowledge</tspan>
          </text>
        </DiagramLink>
        <DiagramLink href="/glqf/applied-knowledge" label="Applied Knowledge">
          <text x="420" y="120">
            <tspan x="420">Applied</tspan>
            <tspan x="420" dy="18">Knowledge</tspan>
          </text>
        </DiagramLink>
        <DiagramLink
          href="/glqf/integrated-knowledge"
          label="Integrated Knowledge"
        >
          <text x="540" y="240">
            <tspan x="540">Integrated</tspan>
            <tspan x="540" dy="18">Knowledge</tspan>
          </text>
        </DiagramLink>
        <DiagramLink href="/glqf/communication" label="Communication">
          <text x="545" y="375">Communication</text>
        </DiagramLink>
        <DiagramLink
          href="/glqf/information-literacy"
          label="Information Literacy"
        >
          <text x="400" y="520">
            <tspan x="400">Information</tspan>
            <tspan x="400" dy="18">Literacy</tspan>
          </text>
        </DiagramLink>
        <DiagramLink
          href="/glqf/ethical-responsibility"
          label="Ethical Responsibility"
        >
          <text x="200" y="520">
            <tspan x="200">Ethical</tspan>
            <tspan x="200" dy="18">Responsibility</tspan>
          </text>
        </DiagramLink>
        <DiagramLink
          href="/glqf/sociocultural-and-civic-engagement"
          label="Sociocultural and Civic Engagement"
        >
          <text x="55" y="360">
            <tspan x="55">Sociocultural</tspan>
            <tspan x="55" dy="18">and Civic</tspan>
            <tspan x="55" dy="18">Engagement</tspan>
          </text>
        </DiagramLink>
        <DiagramLink
          href="/glqf/learning-engagement"
          label="Learning Engagement"
        >
          <text x="60" y="240">
            <tspan x="60">Learning</tspan>
            <tspan x="60" dy="18">Engagement</tspan>
          </text>
        </DiagramLink>
      </g>
    </svg>
  );
});
