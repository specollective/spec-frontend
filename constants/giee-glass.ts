// GIEE v3 glass compositions, transcribed from the "GIEE Page Design" canvas
// (v3 boards). Coordinates are design pixels on the board each frame names;
// <GieeGlassLayers> renders them inside a frame that is scaled to the viewport.
// Generated once from the design source; edit by hand if the design changes.
export type GlassLayer =
  | {
      kind: "glass";
      x: number;
      y: number;
      w: number;
      h: number;
      /** Backdrop blur, px. */
      blur: number;
      /** CSS background (translucent gradient). */
      bg: string;
      /** Outline in the piece's own coordinates (CSS path()). */
      d?: string;
      /** Used instead of `d` for the small rounded pieces. */
      radius?: string;
    }
  | {
      /** Soft blue glow cast on what lies below. */
      kind: "glow";
      transform: string;
      d: string;
      blur: number;
      opacity: number;
      fillOpacity?: number;
    }
  | {
      /**
       * A blurred, grainy navy pebble that darkens what lies below (the v3
       * stand-in for shadows). Placed freely, not traced from the pieces.
       */
      kind: "blob";
      x: number;
      y: number;
      w: number;
      h: number;
      /** Corner radii [tl, tr, br, bl], px; defaults to a pill. */
      r?: [number, number, number, number];
      /** Degrees, around the blob's centre. */
      rotate?: number;
      /** Gaussian blur, px. */
      blur: number;
      opacity: number;
    };

/** Home hero, 1440 × 1262 board (also reused, scaled, on phones). */
export const HERO_LAYERS: GlassLayer[] = [
  { kind: "blob", x: 960, y: 290, w: 440, h: 220, rotate: -8, blur: 46, opacity: 0.22 },
  {
    kind: "glow",
    transform: "translate(504 278)",
    d: "M0 319.25C0 305.99 0 299.36 0.34 293.77C6.01 199.86 80.89 124.98 174.79 119.31C180.39 118.97 187.02 118.97 200.28 118.97L292.25 118.97C302.62 118.97 311.03 110.56 311.03 100.19C311.03 44.85 355.89 0 411.22 0L456.87 0C611.03 0 736 124.97 736 279.13C736 361.35 669.35 428 587.13 428L108.75 428C101.55 428 97.95 428 94.92 427.82C43.93 424.74 3.26 384.07 0.18 333.08C0 330.05 0 326.45 0 319.25Z",
    blur: 40.0,
    opacity: 1.0,
    fillOpacity: 0.4
  },
  {
    kind: "glass",
    x: 504.0,
    y: 262.0,
    w: 736.0,
    h: 428.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(16, 97, 228, 0.8) 35.0%, rgba(0, 67, 191, 0.8) 84.5%)",
    d: "M0 319.25C0 305.99 0 299.36 0.34 293.77C6.01 199.86 80.89 124.98 174.79 119.31C180.39 118.97 187.02 118.97 200.28 118.97L292.25 118.97C302.62 118.97 311.03 110.56 311.03 100.19C311.03 44.85 355.89 0 411.22 0L456.87 0C611.03 0 736 124.97 736 279.13C736 361.35 669.35 428 587.13 428L108.75 428C101.55 428 97.95 428 94.92 427.82C43.93 424.74 3.26 384.07 0.18 333.08C0 330.05 0 326.45 0 319.25Z"
  },
  { kind: "blob", x: 470, y: 420, w: 230, h: 190, r: [95, 95, 40, 95], blur: 32, opacity: 0.32 },
  { kind: "blob", x: 860, y: 380, w: 200, h: 260, rotate: 10, blur: 32, opacity: 0.3 },
  {
    kind: "glass",
    x: 52.0,
    y: 379.0,
    w: 534.0,
    h: 403.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(236, 51, 138, 0.8) 39.2%, rgba(204, 32, 113, 0.8) 100.0%)",
    d: "M0.82 137.17C1.74 61.14 63.64 0 139.67 0L313.74 0C435.16 0 533.39 98.83 532.64 220.26C532.01 321.37 449.87 403 348.76 403L223.9 403C170.25 403 126.76 359.51 126.76 305.86L126.76 230.09C126.76 215.65 115.05 203.94 100.6 203.94L66.77 203.94C30.03 203.94 0.37 173.91 0.82 137.17Z"
  },
  {
    kind: "glass",
    x: 885.0,
    y: 343.0,
    w: 529.0,
    h: 505.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(214, 62, 67, 0.8) -3.2%, rgba(247, 92, 97, 0.8) 70.2%)",
    d: "M0 348.03C0 256.81 0 211.2 11.76 174.22C36.35 96.92 96.92 36.35 174.22 11.76C211.2 0 256.81 0 348.03 0L455.35 0C496.03 0 529 32.97 529 73.65L529 120.28C529 238.45 433.21 334.24 315.04 334.24C273.04 334.24 238.99 368.29 238.99 410.29L238.99 419.62C238.99 466.77 200.77 505 153.61 505L76.52 505C34.26 505 0 470.74 0 428.48L0 348.03Z"
  },
  { kind: "blob", x: 900, y: 700, w: 260, h: 140, rotate: -6, blur: 30, opacity: 0.32 },
  {
    kind: "glass",
    x: 757.0,
    y: 726.0,
    w: 596.0,
    h: 260.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.8) 0.0%, rgba(0, 165, 190, 0.8) 100.0%)",
    d: "M0 76.74C0 59.31 0 50.6 1.86 43.44C7.14 23.06 23.06 7.14 43.44 1.86C50.6 0 59.31 0 76.74 0L466 0C537.8 0 596 58.2 596 130L596 130C596 201.8 537.8 260 466 260L183.26 260C141.64 260 120.83 260 103.72 255.56C55.06 242.94 17.06 204.94 4.44 156.28C0 139.17 0 118.36 0 76.74L0 76.74Z"
  },
  { kind: "blob", x: 720, y: 640, w: 230, h: 330, r: [115, 115, 115, 40], blur: 32, opacity: 0.32 },
  {
    kind: "glass",
    x: 463.0,
    y: 608.0,
    w: 476.0,
    h: 519.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(0, 144, 84, 0.7) 9.0%, rgba(0, 131, 15, 0.7) 89.6%)",
    d: "M0 133C0 59.55 59.55 0 133 0L360 0C424.07 0 476 51.93 476 116L476 375.25C476 454.64 411.64 519 332.25 519C252.86 519 188.5 454.64 188.5 375.25L188.5 342.07C188.5 300.06 154.44 266 112.43 266C50.33 266 0 215.67 0 153.57L0 133Z"
  },
  { kind: "blob", x: 300, y: 660, w: 260, h: 210, rotate: 12, blur: 30, opacity: 0.32 },
  { kind: "blob", x: 380, y: 980, w: 160, h: 200, blur: 28, opacity: 0.26 },
  {
    kind: "glass",
    x: 246.0,
    y: 619.0,
    w: 302.0,
    h: 639.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(242, 188, 38, 0.8) 0.0%, rgba(229, 128, 19, 0.8) 100.0%)",
    d: "M0 151C0 67.6 67.6 0 151 0C234.4 0 302 67.61 302 151L302 438.54C302 549.25 212.25 639 101.54 639C45.46 639 0 593.54 0 537.46L0 151Z"
  },
  { kind: "blob", x: 1310, y: 1050, w: 100, h: 64, blur: 14, opacity: 0.34 },
  {
    kind: "glass",
    x: 1321.0,
    y: 1022.0,
    w: 80.0,
    h: 78.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.8) 0.0%, rgba(0, 165, 190, 0.8) 100.0%)",
    radius: "31px 100px 100px 100px / 31px 100px 100px 100px"
  }
];

/** CTA + footer, 1440 × 1346 board: pieces behind the text and footer. */
export const CTA_DESKTOP_BACK: GlassLayer[] = [
  {
    kind: "glass",
    x: 720.0,
    y: 1117.8,
    w: 596.0,
    h: 260.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.8) 0%, rgba(0, 165, 190, 0.8) 100%)",
    d: "M0 76.74C0 59.31 0 50.6 1.86 43.44C7.14 23.06 23.06 7.14 43.44 1.86C50.6 0 59.31 0 76.74 0L466 0C537.8 0 596 58.2 596 130L596 130C596 201.8 537.8 260 466 260L183.26 260C141.64 260 120.83 260 103.72 255.56C55.06 242.94 17.06 204.94 4.44 156.28C0 139.17 0 118.36 0 76.74L0 76.74Z"
  },
  { kind: "blob", x: 1100, y: 1060, w: 240, h: 200, blur: 30, opacity: 0.3 },
  {
    kind: "glass",
    x: 1150.0,
    y: 740.0,
    w: 302.0,
    h: 639.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(242, 188, 38, 0.8) 0%, rgba(229, 128, 19, 0.8) 100%)",
    d: "M0 151C0 67.6 67.6 0 151 0C234.4 0 302 67.61 302 151L302 438.54C302 549.25 212.25 639 101.54 639C45.46 639 0 593.54 0 537.46L0 151Z"
  },
  {
    kind: "glass",
    x: 20.0,
    y: 470.0,
    w: 476.0,
    h: 519.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(0, 144, 84, 0.72) 0%, rgba(0, 131, 15, 0.72) 100%)",
    d: "M0 133C0 59.55 59.55 0 133 0L360 0C424.07 0 476 51.93 476 116L476 375.25C476 454.64 411.64 519 332.25 519C252.86 519 188.5 454.64 188.5 375.25L188.5 342.07C188.5 300.06 154.44 266 112.43 266C50.33 266 0 215.67 0 153.57L0 133Z"
  },
  { kind: "blob", x: 1120, y: 700, w: 240, h: 380, r: [120, 120, 120, 50], blur: 32, opacity: 0.3 },
  {
    kind: "glass",
    x: 880.0,
    y: 560.0,
    w: 534.0,
    h: 403.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(236, 51, 138, 0.8) 0%, rgba(204, 32, 113, 0.8) 100%)",
    d: "M0.82 137.17C1.74 61.14 63.64 0 139.67 0L313.74 0C435.16 0 533.39 98.83 532.64 220.26C532.01 321.37 449.87 403 348.76 403L223.9 403C170.25 403 126.76 359.51 126.76 305.86L126.76 230.09C126.76 215.65 115.05 203.94 100.6 203.94L66.77 203.94C30.03 203.94 0.37 173.91 0.82 137.17Z"
  },
  { kind: "blob", x: 100, y: 690, w: 340, h: 200, rotate: -5, blur: 36, opacity: 0.32 },
  { kind: "blob", x: 860, y: 600, w: 180, h: 240, blur: 32, opacity: 0.3 },
  {
    kind: "glass",
    x: 64.0,
    y: 80.0,
    w: 900.0,
    h: 720.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(211, 68, 60, 0.93) 0%, rgba(188, 48, 46, 0.93) 100%)",
    d: "M40 0H480A420 340 0 0 1 900 340V680A40 40 0 0 1 860 720H40A40 40 0 0 1 0 680V40A40 40 0 0 1 40 0Z"
  },
  { kind: "blob", x: 760, y: 120, w: 230, h: 240, blur: 34, opacity: 0.3 },
  {
    kind: "glass",
    x: 780.0,
    y: 80.0,
    w: 596.0,
    h: 330.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(244, 180, 70, 0.8) 0%, rgba(236, 150, 40, 0.8) 100%)",
    d: "M30 0H566A30 30 0 0 1 596 30V300A30 30 0 0 1 566 330H240A240 180 0 0 1 0 150V30A30 30 0 0 1 30 0Z"
  },
  {
    kind: "glow",
    transform: "translate(0 18)",
    d: "M1130 380H1346A30 30 0 0 1 1376 410V770A30 30 0 0 1 1346 800H930A30 30 0 0 1 900 770V550A230 170 0 0 1 1130 380Z",
    blur: 40.0,
    opacity: 1.0,
    fillOpacity: 0.35
  },
  { kind: "blob", x: 870, y: 400, w: 260, h: 220, rotate: -10, blur: 32, opacity: 0.32 },
  {
    kind: "glass",
    x: 900.0,
    y: 380.0,
    w: 476.0,
    h: 420.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(52, 80, 246, 0.9) 0%, rgba(30, 55, 212, 0.9) 100%)",
    d: "M230 0H446A30 30 0 0 1 476 30V390A30 30 0 0 1 446 420H30A30 30 0 0 1 0 390V170A230 170 0 0 1 230 0Z"
  },
  { kind: "blob", x: 180, y: 740, w: 820, h: 200, blur: 46, opacity: 0.34 },
  { kind: "blob", x: 1000, y: 860, w: 220, h: 260, blur: 34, opacity: 0.3 },
  { kind: "blob", x: 1196, y: 1160, w: 170, h: 50, blur: 18, opacity: 0.32 }
];

/** CTA + footer, 1440 × 1346 board: pieces in front of the footer. */
export const CTA_DESKTOP_FRONT: GlassLayer[] = [
  { kind: "blob", x: 1116, y: 838, w: 72, h: 54, blur: 12, opacity: 0.36 },
  {
    kind: "glass",
    x: 1112.0,
    y: 818.0,
    w: 80.0,
    h: 78.0,
    blur: 22.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.82) 0%, rgba(0, 165, 190, 0.82) 100%)",
    d: "M31 0H40A40 39 0 0 1 80 39V39A40 39 0 0 1 40 78H40A40 39 0 0 1 0 39V31A31 31 0 0 1 31 0Z"
  }
];

/** CTA + footer, 390 × 1385 phone board: pieces behind. */
export const CTA_PHONE_BACK: GlassLayer[] = [
  {
    kind: "glass",
    x: -44.0,
    y: 1190.6,
    w: 219.0,
    h: 238.7,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(0, 144, 84, 0.72) 0%, rgba(0, 131, 15, 0.72) 100%)",
    d: "M0 61.2C0 27.4 27.4 0 61.2 0L165.6 0C195.1 0 219 23.9 219 53.4L219 172.6C219 209.1 189.4 238.7 152.8 238.7C116.3 238.7 86.7 209.1 86.7 172.6L86.7 157.4C86.7 138 71 122.4 51.7 122.4C23.2 122.4 0 99.2 0 70.6L0 61.2Z"
  },
  { kind: "blob", x: 40, y: 1220, w: 120, h: 80, blur: 16, opacity: 0.3 },
  {
    kind: "glass",
    x: 60.0,
    y: 1216.6,
    w: 274.2,
    h: 119.6,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.8) 0%, rgba(0, 165, 190, 0.8) 100%)",
    d: "M0 35.3C0 27.3 0 23.3 0.9 20C3.3 10.6 10.6 3.3 20 0.9C23.3 0 27.3 0 35.3 0L214.4 0C247.4 0 274.2 26.8 274.2 59.8L274.2 59.8C274.2 92.8 247.4 119.6 214.4 119.6L84.3 119.6C65.2 119.6 55.6 119.6 47.7 117.6C25.3 111.8 7.8 94.3 2 71.9C0 64 0 54.4 0 35.3L0 35.3Z"
  },
  {
    kind: "glass",
    x: 300.0,
    y: 860.0,
    w: 138.9,
    h: 293.9,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(242, 188, 38, 0.8) 0%, rgba(229, 128, 19, 0.8) 100%)",
    d: "M0 69.5C0 31.1 31.1 0 69.5 0C107.8 0 138.9 31.1 138.9 69.5L138.9 201.7C138.9 252.7 97.6 293.9 46.7 293.9C20.9 293.9 0 273 0 247.2L0 69.5Z"
  },
  { kind: "blob", x: 230, y: 720, w: 120, h: 110, blur: 18, opacity: 0.3 },
  {
    kind: "glass",
    x: 214.0,
    y: 690.0,
    w: 245.6,
    h: 185.4,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(236, 51, 138, 0.8) 0%, rgba(204, 32, 113, 0.8) 100%)",
    d: "M0.4 63.1C0.8 28.1 29.3 0 64.2 0L144.3 0C200.2 0 245.4 45.5 245 101.3C244.7 147.8 206.9 185.4 160.4 185.4L103 185.4C78.3 185.4 58.3 165.4 58.3 140.7L58.3 105.8C58.3 99.2 52.9 93.8 46.3 93.8L30.7 93.8C13.8 93.8 0.2 80 0.4 63.1Z"
  },
  {
    kind: "glass",
    x: 16.0,
    y: 40.0,
    w: 358.0,
    h: 540.0,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(211, 68, 60, 0.93) 0%, rgba(188, 48, 46, 0.93) 100%)",
    d: "M26 0H188A170 130 0 0 1 358 130V514A26 26 0 0 1 332 540H26A26 26 0 0 1 0 514V26A26 26 0 0 1 26 0Z"
  },
  { kind: "blob", x: 30, y: 500, w: 170, h: 110, rotate: -6, blur: 20, opacity: 0.32 },
  {
    kind: "glass",
    x: 16.0,
    y: 532.0,
    w: 214.0,
    h: 214.0,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(244, 180, 70, 0.82) 0%, rgba(236, 150, 40, 0.82) 100%)",
    d: "M18 0H196A18 18 0 0 1 214 18V196A18 18 0 0 1 196 214H110A110 90 0 0 1 0 124V18A18 18 0 0 1 18 0Z"
  },
  {
    kind: "glow",
    transform: "translate(0 12)",
    d: "M274 556H356A18 18 0 0 1 374 574V788A18 18 0 0 1 356 806H182A18 18 0 0 1 164 788V646A110 90 0 0 1 274 556Z",
    blur: 24.0,
    opacity: 1.0,
    fillOpacity: 0.3
  },
  { kind: "blob", x: 170, y: 560, w: 140, h: 150, blur: 20, opacity: 0.32 },
  {
    kind: "glass",
    x: 164.0,
    y: 556.0,
    w: 210.0,
    h: 250.0,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(52, 80, 246, 0.9) 0%, rgba(30, 55, 212, 0.9) 100%)",
    d: "M110 0H192A18 18 0 0 1 210 18V232A18 18 0 0 1 192 250H18A18 18 0 0 1 0 232V90A110 90 0 0 1 110 0Z"
  },
  { kind: "blob", x: 40, y: 760, w: 280, h: 120, blur: 26, opacity: 0.34 },
  { kind: "blob", x: 60, y: 1200, w: 240, h: 90, blur: 20, opacity: 0.3 },
  { kind: "blob", x: 214, y: 1316, w: 150, h: 36, blur: 12, opacity: 0.3 }
];

/** CTA + footer, 390 × 1385 phone board: pieces in front. */
export const CTA_PHONE_FRONT: GlassLayer[] = [
  { kind: "blob", x: 324, y: 852, w: 42, h: 34, blur: 8, opacity: 0.36 },
  {
    kind: "glass",
    x: 322.0,
    y: 842.0,
    w: 46.0,
    h: 45.0,
    blur: 16.0,
    bg: "linear-gradient(180deg, rgba(53, 220, 239, 0.82) 0%, rgba(0, 165, 190, 0.82) 100%)",
    d: "M18 0H23A23 22 0 0 1 46 22V23A23 22 0 0 1 23 45H23A23 22 0 0 1 0 23V18A18 18 0 0 1 18 0Z"
  }
];

/** Clip outlines for the hero "Partner with us" tab and the back-to-top pieces. */
export const TAB_PATH = "M0 24C0 10.75 10.75 0 24 0L252.82 0C264.52 0 274 9.48 274 21.18C274 53.66 247.66 80 215.18 80L24 80C10.75 80 0 69.25 0 56L0 24Z";
export const BACK_TO_TOP_PATH = "M24 0H174A22 22 0 0 1 196 22V24A58 56 0 0 1 138 80H24A24 24 0 0 1 0 56V24A24 24 0 0 1 24 0Z";
export const BACK_TO_TOP_PATH_PHONE = "M18 0H152A16 16 0 0 1 168 16V18A40 38 0 0 1 128 56H18A18 18 0 0 1 0 38V18A18 18 0 0 1 18 0Z";
