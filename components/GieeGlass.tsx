// Building blocks for the GIEE v3 "glass pebble" compositions: translucent,
// grainy pieces that overlap and cast noisy shadows on one another.
//
// The compositions are drawn on fixed design boards (1440 px desktop, 390 px
// phone). <ScaledBoard> keeps that geometry intact and scales the whole board
// to the width it is given, using only CSS (no resize listeners, no layout
// shift on hydration): `tan(atan2(100cqw, <board width>))` is the unitless
// ratio between the container's width and the board's.

import type { CSSProperties, ReactNode } from "react";
import {
  CTA_DESKTOP_BACK,
  CTA_DESKTOP_FRONT,
  CTA_PHONE_BACK,
  CTA_PHONE_FRONT,
  HERO_LAYERS,
  type GlassLayer,
} from "../constants/giee-glass";

const ALL_LAYERS = [
  ...HERO_LAYERS,
  ...CTA_DESKTOP_BACK,
  ...CTA_DESKTOP_FRONT,
  ...CTA_PHONE_BACK,
  ...CTA_PHONE_FRONT,
];
const SHADOW_BLURS = Array.from(
  new Set(ALL_LAYERS.filter((l) => l.kind === "shadow").map((l) => l.blur)),
);
const GLOW_BLURS = Array.from(
  new Set(ALL_LAYERS.filter((l) => l.kind === "glow").map((l) => l.blur)),
);

/**
 * Shared SVG filters, rendered once per page by GieeLayout. Kept in the layout
 * (zero-size, not display:none, which breaks filter references in Safari).
 */
export function GieeFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {/* Noisy shadow: a soft blur whose edge dissolves into dots. */}
        {SHADOW_BLURS.map((blur) => (
          <filter
            key={blur}
            id={`giee-shadow-${blur}`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="b" />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={1}
              seed={35}
              result="t"
            />
            <feColorMatrix
              in="t"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.3 0 0 0 -1.15"
              result="tn"
            />
            <feComposite
              in="b"
              in2="tn"
              operator="arithmetic"
              k1={0}
              k2={1.15}
              k3={-1}
              k4={0}
              result="diff"
            />
            <feComponentTransfer in="diff" result="sp">
              <feFuncA type="discrete" tableValues="0 0.42 0.55 0.62" />
            </feComponentTransfer>
            <feFlood floodColor="#000000" result="k" />
            <feComposite in="k" in2="sp" operator="in" result="dots" />
            <feFlood floodColor="#000000" floodOpacity={0.22} result="k2" />
            <feComposite in="k2" in2="b" operator="in" result="soft" />
            <feMerge>
              <feMergeNode in="soft" />
              <feMergeNode in="dots" />
            </feMerge>
          </filter>
        ))}

        {GLOW_BLURS.map((blur) => (
          <filter
            key={blur}
            id={`giee-glow-${blur}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

/** Grain overlay for a glass piece (fills its positioned parent). */
export function Grain({ navy = false }: { navy?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block ${
        navy ? "giee-grain-navy" : "giee-grain"
      }`}
    />
  );
}

/** Renders a list of layers, in order (first = furthest back). */
export function GlassLayers({
  layers,
  width,
  height,
}: {
  layers: GlassLayer[];
  width: number;
  height: number;
}) {
  return (
    <>
      {layers.map((layer, i) => {
        if (layer.kind === "glass") {
          const style: CSSProperties = {
            left: layer.x,
            top: layer.y,
            width: layer.w,
            height: layer.h,
            background: layer.bg,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            ...(layer.d
              ? { clipPath: `path('${layer.d}')` }
              : { borderRadius: layer.radius, overflow: "hidden" }),
          };
          return (
            <div
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={style}
            >
              {layer.d && <Grain />}
            </div>
          );
        }
        const isGlow = layer.kind === "glow";
        return (
          <svg
            key={i}
            aria-hidden="true"
            focusable="false"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={`pointer-events-none absolute left-0 top-0 overflow-visible ${
              isGlow ? "" : "mix-blend-multiply"
            }`}
            style={isGlow ? undefined : { opacity: layer.opacity }}
          >
            <path
              transform={layer.transform}
              d={layer.d}
              fill={isGlow ? "#1640C0" : "#FFFFFF"}
              fillOpacity={isGlow ? layer.fillOpacity : undefined}
              filter={`url(#giee-${layer.kind}-${layer.blur})`}
            />
          </svg>
        );
      })}
    </>
  );
}

/**
 * A fixed-size design board scaled to the width of its container. Children are
 * laid out in board pixels. The wrapper reserves the scaled height up front via
 * aspect-ratio, so nothing shifts when the page hydrates. Pass `lg` to switch
 * to a second board size from the `lg` breakpoint up (children then carry
 * `lg:` coordinates of their own).
 */
export function ScaledBoard({
  width,
  height,
  lg,
  className = "",
  children,
}: {
  width: number;
  height: number;
  lg?: { width: number; height: number };
  className?: string;
  children: ReactNode;
}) {
  const big = lg ?? { width, height };
  const vars = {
    "--bw": `${width}px`,
    "--bh": `${height}px`,
    "--ar": `${width} / ${height}`,
    "--lbw": `${big.width}px`,
    "--lbh": `${big.height}px`,
    "--lar": `${big.width} / ${big.height}`,
    containerType: "inline-size",
  } as CSSProperties;
  return (
    <div
      className={`relative w-full overflow-hidden lg:overflow-visible [aspect-ratio:var(--ar)] lg:[aspect-ratio:var(--lar)] ${className}`}
      style={vars}
    >
      <div
        // Unitless container-width / board-width ratio, in pure CSS.
        className="absolute left-0 top-0 h-[var(--bh)] w-[var(--bw)] origin-top-left [scale:tan(atan2(100cqw,var(--bw)))] lg:h-[var(--lbh)] lg:w-[var(--lbw)] lg:[scale:tan(atan2(100cqw,var(--lbw)))]"
      >
        {children}
      </div>
    </div>
  );
}

// The six-pebble GIEE mark (2026 logo update): one pebble per continent.
const MARK_PATHS = [
  "M0 63.2258C0 50.0014 0 43.3892 1.26831 37.9236C5.4941 19.7133 19.7133 5.4941 37.9236 1.26831C43.3892 0 50.0014 0 63.2258 0H103.927C114.461 0 123 8.5392 123 19.0728V28.6491C123 79.1008 82.1008 120 31.6491 120C14.1698 120 0 105.83 0 88.3509V63.2258Z",
  "M123 85.7143C123 38.3756 161.376 0 208.714 0H220.34C233.96 0 245 11.0405 245 24.6596V80.2472C245 90.2509 245 95.2527 243.779 99.3264C240.979 108.669 233.669 115.979 224.326 118.779C220.253 120 215.251 120 205.247 120H157.286C138.35 120 123 104.65 123 85.7143Z",
  "M252 62.8512C252 46.2954 252 38.0175 254.152 31.3112C258.589 17.4849 269.424 6.64915 283.251 2.21249C289.957 0.0605469 298.235 0.0605469 314.791 0.0605469H339.632C357.508 0.0605469 372 14.5524 372 32.429C372 80.8266 332.766 120.061 284.368 120.061H277.532C263.431 120.061 252 108.63 252 94.5286V62.8512Z",
  "M118 160.294C118 140.802 102.198 125 82.7059 125H60.9032C48.9104 125 42.914 125 37.9409 126.066C19.4617 130.026 5.02635 144.462 1.06584 162.941C0 167.914 0 173.91 0 185.903V223.545C0 235.394 9.60553 245 21.4545 245H33.2941C80.0759 245 118 207.076 118 160.294Z",
  "M125 160.061C125 140.731 140.67 125.061 160 125.061H211C227.028 125.061 235.042 125.061 240.021 130.04C245 135.019 245 143.033 245 159.061V204.748C245 227.012 226.951 245.061 204.688 245.061C160.677 245.061 125 209.383 125 165.373V160.061Z",
  "M252 159.346C252 157.224 252 156.163 252.05 155.266C252.964 139.005 265.945 126.024 282.206 125.111C283.102 125.061 284.163 125.061 286.286 125.061C291.592 125.061 294.245 125.061 296.486 125.186C337.138 127.469 369.591 159.922 371.874 200.575C372 202.816 372 205.469 372 210.775C372 212.897 372 213.958 371.95 214.855C371.036 231.116 358.055 244.097 341.794 245.01C340.898 245.061 339.837 245.061 337.714 245.061H334.353C322.878 245.061 317.141 245.061 312.329 244.389C281.347 240.067 256.993 215.714 252.671 184.731C252 179.919 252 174.182 252 162.708V159.346Z",
];

const MARK_GRADIENTS: [string, string, number, number][] = [
  ["#F73D95", "#DA0067", 0, 120],
  ["#1061E4", "#0043BF", 41.92, 101.4],
  ["#ED5055", "#D63E43", -3.76, 113],
  ["#F2BC26", "#E58013", 125, 245],
  ["#009054", "#00830F", 135.92, 232.58],
  ["#0EC8E9", "#0098CB", 125.06, 245.06],
];

/**
 * The GIEE mark. `tone="cream"` is the one-colour version used on navy;
 * `tone="color"` is the full six-colour mark. Pass `label` to expose it as an
 * image; otherwise it is decorative.
 */
export function GieeMark({
  tone,
  className = "",
  label,
  idPrefix = "giee-mark",
}: {
  tone: "cream" | "color";
  className?: string;
  label?: string;
  idPrefix?: string;
}) {
  return (
    <svg
      viewBox="0 0 372 245.1"
      className={`block ${className}`}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true, focusable: "false" })}
    >
      {tone === "color" && (
        <defs>
          {MARK_GRADIENTS.map(([from, to, y1, y2], i) => (
            <linearGradient
              key={i}
              id={`${idPrefix}-${i}`}
              x1="0"
              y1={y1}
              x2="0"
              y2={y2}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
          ))}
        </defs>
      )}
      {MARK_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={tone === "color" ? `url(#${idPrefix}-${i})` : "#F1ECDB"}
        />
      ))}
    </svg>
  );
}

/** The arrow used on rows and buttons. */
export function GieeArrow({
  className = "",
  long = false,
}: {
  className?: string;
  long?: boolean;
}) {
  return long ? (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 40 16"
      fill="none"
      className={className}
    >
      <path
        d="M1 8H37.5M33 3.5 37.5 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}
