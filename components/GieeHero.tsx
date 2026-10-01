import type { CSSProperties, ReactNode } from "react";
import { ScaledBoard } from "./GieeGlass";

/** Design px on the 1440 board → container-width units (scales with the board). */
export const cq = (px: number) => `${+(px / 14.4).toFixed(4)}cqw`;

interface GieeHeroProps {
  id: string;
  /** Title lines as set on the desktop board; on phones they wrap freely. */
  titleLines: string[];
  /** Used if the lines are missing (e.g. an untranslated catalog). */
  fallbackTitle: string;
  /** Desktop board geometry (from the v3 boards). */
  boardHeight: number;
  panelHeight: number;
  titleTop: number;
  titleSize: number;
  /** Extra desktop pieces, laid out in 1440-board pixels above the panel. */
  art?: ReactNode;
  /** Extra phone content, rendered under the phone panel. */
  phoneArt?: ReactNode;
}

/**
 * The navy hero panel shared by every GIEE page, with the page's single <h1>
 * in it. The header (GieeNavbar) is overlaid on top by GieeLayout.
 */
export default function GieeHero({
  id,
  titleLines,
  fallbackTitle,
  boardHeight,
  panelHeight,
  titleTop,
  titleSize,
  art,
  phoneArt,
}: GieeHeroProps) {
  const lines =
    Array.isArray(titleLines) && titleLines.length ? titleLines : [fallbackTitle];
  const titleVars = {
    "--x": cq(49),
    "--y": cq(titleTop),
    "--w": cq(1000),
    "--s": cq(titleSize),
  } as CSSProperties;

  return (
    <section
      id="top"
      aria-labelledby={id}
      className="relative mx-auto max-w-[1440px]"
      style={{ containerType: "inline-size" }}
    >
      <div className="hidden lg:block">
        <ScaledBoard width={1440} height={boardHeight}>
          {/* Static panel: the no-JS look, and the size GieeNavbar morphs from. */}
          <div
            aria-hidden="true"
            data-giee-panel="desktop"
            data-h={panelHeight}
            className="absolute left-[20px] top-[20px] w-[1100px] rounded-[36px_36px_300px_36px] bg-giee-navy"
            style={{ height: panelHeight }}
          />
          {art}
        </ScaledBoard>
      </div>

      <div
        data-giee-panel="phone"
        className="relative mx-[10px] mt-[10px] rounded-[24px_24px_130px_24px] bg-giee-navy px-4 pb-[21.3cqw] pt-[88px] lg:contents">
        <h1
          id={id}
          style={titleVars}
          className="relative m-0 max-w-[87.2cqw] text-[clamp(2.5rem,10.25cqw,4.75rem)] font-bold leading-[0.92] tracking-[-0.03em] text-giee-cream lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)] lg:max-w-none lg:text-[length:var(--s)] lg:leading-[0.9]"
        >
          {lines.map((line, i) => (
            <span key={i} className="lg:block">
              {line}
              {i < lines.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      </div>

      {phoneArt && <div className="lg:hidden">{phoneArt}</div>}
    </section>
  );
}
