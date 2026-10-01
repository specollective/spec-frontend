// Shared pieces for the GIEE case studies (home list and Research page).

export interface CaseStudyLocation {
  name: string;
  /** "na" North America, "eu" Europe, "as" Asia, "online". */
  region: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** One line, for the home page list. */
  summary: string;
  /** A short paragraph, for the Research page. */
  description: string;
  locations: CaseStudyLocation[];
  partners: string[];
}

// Region chip colours, as on the v3 boards (white text clears 4.5:1 on each).
const REGION_CHIP: Record<string, string> = {
  na: "#C64185",
  eu: "#CF433B",
  as: "#3B8434",
  online: "#3F4152",
};

// Per-study tint (row hover / card ground) and accent (partner bullets),
// cycling through the six continent colours in board order.
export const CASE_TINTS = ["#F9DCEA", "#DDE2FE", "#F8DCD9", "#FCE9C6", "#DCEEDA", "#DCEDFC"];
export const CASE_ACCENTS = ["#DA4792", "#2F4AF4", "#D3443C", "#F1A73E", "#459B3D", "#4FA7EE"];

export const caseTint = (i: number) => CASE_TINTS[i % CASE_TINTS.length];
export const caseAccent = (i: number) => CASE_ACCENTS[i % CASE_ACCENTS.length];

/** Location tags. Never plain rectangles: one corner is rounded further. */
export function LocationChips({
  locations,
  size = "md",
  className = "",
}: {
  locations: CaseStudyLocation[];
  size?: "sm" | "md";
  className?: string;
}) {
  if (!locations?.length) return null;
  const sm = size === "sm";
  return (
    <ul className={`m-0 flex list-none flex-wrap gap-2 p-0 ${sm ? "gap-[6px]" : ""} ${className}`}>
      {locations.map((loc) => (
        <li
          key={loc.name}
          className={`inline-flex items-center gap-[7px] whitespace-nowrap rounded-[6px_6px_15px_6px] pl-[10px] pr-3 font-medium text-white ${
            sm ? "h-[26px] text-[12px]" : "h-[30px] text-[14px]"
          }`}
          style={{ background: REGION_CHIP[loc.region] ?? REGION_CHIP.online }}
        >
          <span
            aria-hidden="true"
            className={`flex-none bg-white ${
              sm ? "h-[6px] w-[6px] rounded-[2px_2px_5px_2px]" : "h-[7px] w-[7px] rounded-[2px_2px_6px_2px]"
            }`}
          />
          {loc.name}
        </li>
      ))}
    </ul>
  );
}
