// Shared exact price tables for all vehicle classes
export type VehicleClass =
  | 'coupe-2'
  | 'cabrio-2'
  | 'pickup-single'
  | 'kleinwagen'
  | 'coupe-4'
  | 'cabrio-4'
  | 'limousine'
  | 'kombi'
  | 'compact-suv'
  | 'pickup-double'
  | 'suv'
  | 'minivan'
  | 'bus';

type PriceRow = Record<VehicleClass, number>;

// ── INTERIOR ─────────────────────────────────────────────────────────────────
export const interiorDetailPrices: PriceRow = {
  'coupe-2':      75,  'cabrio-2':     75,  'pickup-single': 85,
  'kleinwagen':   95,  'coupe-4':     110,  'cabrio-4':      110,
  'limousine':   120,  'kombi':       130,  'compact-suv':   140,
  'pickup-double':150, 'suv':         165,  'minivan':       185,
  'bus':         215,
};

export const lederReinigungPrices: PriceRow = {
  'coupe-2':      20,  'cabrio-2':     20,  'pickup-single': 30,
  'kleinwagen':   40,  'coupe-4':      40,  'cabrio-4':      40,
  'limousine':    50,  'kombi':        50,  'compact-suv':   50,
  'pickup-double': 50, 'suv':          70,  'minivan':       70,
  'bus':          90,
};

export const shampooStoffPrices: PriceRow = {
  'coupe-2':      40,  'cabrio-2':     40,  'pickup-single': 60,
  'kleinwagen':   80,  'coupe-4':      80,  'cabrio-4':      80,
  'limousine':   100,  'kombi':       100,  'compact-suv':  100,
  'pickup-double':100, 'suv':         140,  'minivan':      140,
  'bus':         180,
};

export const alcantaraPrices: PriceRow = {
  'coupe-2':      46,  'cabrio-2':     46,  'pickup-single': 69,
  'kleinwagen':   92,  'coupe-4':      92,  'cabrio-4':      92,
  'limousine':   115,  'kombi':       115,  'compact-suv':  115,
  'pickup-double':115, 'suv':         161,  'minivan':      161,
  'bus':         207,
};

export const fleckenGeruchPrices: PriceRow = {
  'coupe-2':      69,  'cabrio-2':     69,  'pickup-single': 89,
  'kleinwagen':   89,  'coupe-4':      89,  'cabrio-4':      89,
  'limousine':    89,  'kombi':       109,  'compact-suv':  109,
  'pickup-double':109, 'suv':         129,  'minivan':      129,
  'bus':         129,
};

export const kunststoffUVPrices: PriceRow = {
  'coupe-2':      39,  'cabrio-2':     39,  'pickup-single': 49,
  'kleinwagen':   49,  'coupe-4':      49,  'cabrio-4':      49,
  'limousine':    49,  'kombi':        59,  'compact-suv':   59,
  'pickup-double': 59, 'suv':          69,  'minivan':       69,
  'bus':          69,
};

export const impraegnierungPrices: PriceRow = {
  'coupe-2':      59,  'cabrio-2':     59,  'pickup-single': 79,
  'kleinwagen':   79,  'coupe-4':      79,  'cabrio-4':      79,
  'limousine':    79,  'kombi':        99,  'compact-suv':   99,
  'pickup-double': 99, 'suv':         119,  'minivan':      119,
  'bus':         119,
};

// Kindersitz flat 15 CHF for all
export const kindersitzPrice = 15;

export const tierhaarPrices: PriceRow = {
  'coupe-2':      89,  'cabrio-2':     89,  'pickup-single': 99,
  'kleinwagen':  109,  'coupe-4':     119,  'cabrio-4':     119,
  'limousine':   129,  'kombi':       139,  'compact-suv':  149,
  'pickup-double':149, 'suv':         179,  'minivan':      199,
  'bus':         219,
};

// Leder-Versiegelung — not in new table, keep flat logic (same as lederReinigung * 3)
// Using same prices as lederReinigung for now; can be updated separately
export const lederVersiegelungPrices: PriceRow = {
  'coupe-2':      60,  'cabrio-2':     60,  'pickup-single': 90,
  'kleinwagen':  120,  'coupe-4':     120,  'cabrio-4':     120,
  'limousine':   150,  'kombi':       150,  'compact-suv':  150,
  'pickup-double':150, 'suv':         210,  'minivan':      210,
  'bus':         270,
};

// ── EXTERIOR ──────────────────────────────────────────────────────────────────
export const exteriorDetailPrices: PriceRow = {
  'coupe-2':      90,  'cabrio-2':     90,  'pickup-single': 110,
  'kleinwagen':  100,  'coupe-4':     100,  'cabrio-4':     110,
  'limousine':   120,  'kombi':       130,  'compact-suv':  140,
  'pickup-double':140, 'suv':         150,  'minivan':      170,
  'bus':         190,
};

export const flugrostPrices: PriceRow = {
  'coupe-2':      60,  'cabrio-2':     60,  'pickup-single': 80,
  'kleinwagen':   70,  'coupe-4':      70,  'cabrio-4':      70,
  'limousine':    80,  'kombi':        80,  'compact-suv':   80,
  'pickup-double': 90, 'suv':          90,  'minivan':      100,
  'bus':         110,
};

// Reifen & Radhaus flat 30 CHF for all
export const reifenRadhausPrice = 30;

export const politur1Prices: PriceRow = {
  'coupe-2':     340,  'cabrio-2':    360,  'pickup-single': 510,
  'kleinwagen':  380,  'coupe-4':    410,  'cabrio-4':     430,
  'limousine':   460,  'kombi':      500,  'compact-suv':  530,
  'pickup-double':560, 'suv':        600,  'minivan':      650,
  'bus':         720,
};

export const politur2Prices: PriceRow = {
  'coupe-2':     470,  'cabrio-2':    490,  'pickup-single': 620,
  'kleinwagen':  520,  'coupe-4':    550,  'cabrio-4':     570,
  'limousine':   600,  'kombi':      650,  'compact-suv':  680,
  'pickup-double':700, 'suv':        750,  'minivan':      810,
  'bus':         910,
};

export const politur3Prices: PriceRow = {
  'coupe-2':     590,  'cabrio-2':    610,  'pickup-single': 780,
  'kleinwagen':  650,  'coupe-4':    680,  'cabrio-4':     720,
  'limousine':   750,  'kombi':      810,  'compact-suv':  850,
  'pickup-double':880, 'suv':        940,  'minivan':     1010,
  'bus':        1140,
};

export const frontscheibePrices: PriceRow = {
  'coupe-2':      80,  'cabrio-2':     80,  'pickup-single': 90,
  'kleinwagen':   80,  'coupe-4':      80,  'cabrio-4':      80,
  'limousine':    90,  'kombi':        90,  'compact-suv':   90,
  'pickup-double': 90, 'suv':          90,  'minivan':      100,
  'bus':         100,
};

export const kunststoffAussenPrices: PriceRow = {
  'coupe-2':      50,  'cabrio-2':     50,  'pickup-single': 60,
  'kleinwagen':   50,  'coupe-4':      50,  'cabrio-4':      50,
  'limousine':    60,  'kombi':        60,  'compact-suv':   60,
  'pickup-double': 60, 'suv':          70,  'minivan':       70,
  'bus':          80,
};

export const endrohPrices: PriceRow = {
  'coupe-2':      40,  'cabrio-2':     40,  'pickup-single': 40,
  'kleinwagen':   40,  'coupe-4':      40,  'cabrio-4':      40,
  'limousine':    40,  'kombi':        40,  'compact-suv':   40,
  'pickup-double': 40, 'suv':          50,  'minivan':       50,
  'bus':          50,
};

export const keramikPrices: PriceRow = {
  'coupe-2':     400,  'cabrio-2':    420,  'pickup-single': 540,
  'kleinwagen':  450,  'coupe-4':    470,  'cabrio-4':     500,
  'limousine':   520,  'kombi':      560,  'compact-suv':  590,
  'pickup-double':610, 'suv':        650,  'minivan':      700,
  'bus':         790,
};

export const keramikSprayPrices: PriceRow = {
  'coupe-2':      80,  'cabrio-2':     80,  'pickup-single': 100,
  'kleinwagen':   90,  'coupe-4':      90,  'cabrio-4':     100,
  'limousine':   100,  'kombi':       110,  'compact-suv':  110,
  'pickup-double':110, 'suv':         120,  'minivan':      130,
  'bus':         150,
};

export const carnaubaPrices: PriceRow = {
  'coupe-2':     160,  'cabrio-2':    160,  'pickup-single': 200,
  'kleinwagen':  170,  'coupe-4':    180,  'cabrio-4':     180,
  'limousine':   190,  'kombi':      210,  'compact-suv':  210,
  'pickup-double':220, 'suv':        240,  'minivan':      250,
  'bus':         280,
};

export const scheibenPrices: PriceRow = {
  'coupe-2':      50,  'cabrio-2':     50,  'pickup-single': 50,
  'kleinwagen':   50,  'coupe-4':      50,  'cabrio-4':      50,
  'limousine':    50,  'kombi':        60,  'compact-suv':   60,
  'pickup-double': 60, 'suv':          60,  'minivan':       60,
  'bus':          60,
};

export const motorPrices: PriceRow = {
  'coupe-2':      90,  'cabrio-2':     90,  'pickup-single': 110,
  'kleinwagen':   90,  'coupe-4':     100,  'cabrio-4':     100,
  'limousine':   100,  'kombi':       110,  'compact-suv':  110,
  'pickup-double':110, 'suv':         120,  'minivan':      120,
  'bus':         130,
};

export const unterbodenPrices: PriceRow = {
  'coupe-2':     100,  'cabrio-2':    100,  'pickup-single': 120,
  'kleinwagen':  100,  'coupe-4':    110,  'cabrio-4':     110,
  'limousine':   110,  'kombi':      120,  'compact-suv':  130,
  'pickup-double':130, 'suv':        140,  'minivan':      150,
  'bus':         160,
};

// Cabrio-specific
export const cabrioPrices: PriceRow = {
  'coupe-2':     120,  'cabrio-2':    120,  'pickup-single': 120,
  'kleinwagen':  120,  'coupe-4':    120,  'cabrio-4':     120,
  'limousine':   120,  'kombi':      120,  'compact-suv':  120,
  'pickup-double':120, 'suv':        120,  'minivan':      120,
  'bus':         120,
};

export const getExactPrice = (table: PriceRow | number, vehicle: VehicleClass): number => {
  if (typeof table === 'number') return table;
  return table[vehicle] ?? 0;
};
