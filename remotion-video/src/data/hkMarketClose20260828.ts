export type GlobalMarketItem = {
  id: string;
  name: string;
  english: string;
  region: string;
  close: number;
  changePct: number;
  marketDate: string;
  spark: number[];
};

export type CompactMarketItem = {
  id: string;
  name: string;
  english: string;
  value: number;
  decimals: number;
  changePct: number;
  unit?: string;
  glyph: string;
};

export const hkMarketClose20260828 = {
  tradeDate: "2026/09/07",
  weekday: "星期一",
  generatedLabel: "港股/亚洲 09-07 · 欧美 09-04 收盘",
  indices: [
    {
      id: "sp500",
      name: "标普500",
      english: "S&P 500",
      region: "US",
      close: 7718.60,
      changePct: -0.38,
      marketDate: "2026-09-04",
      spark: [34, 32, 37, 35, 40, 38, 44, 41, 47, 45, 51, 48, 54, 57],
    },
    {
      id: "nasdaq",
      name: "纳斯达克",
      english: "NASDAQ",
      region: "US",
      close: 26506.99,
      changePct: -0.29,
      marketDate: "2026-09-04",
      spark: [27, 33, 29, 35, 31, 40, 36, 43, 39, 46, 42, 48, 44, 52],
    },
    {
      id: "dow",
      name: "道琼斯",
      english: "DOW JONES",
      region: "US",
      close: 53414.25,
      changePct: -0.51,
      marketDate: "2026-09-04",
      spark: [42, 44, 43, 45, 42, 44, 43, 46, 43, 45, 44, 46, 45, 47],
    },
    {
      id: "nikkei",
      name: "日经225",
      english: "NIKKEI 225",
      region: "JP",
      close: 66399.84,
      changePct: 2.12,
      marketDate: "2026-09-07",
      spark: [54, 52, 49, 51, 47, 44, 46, 42, 39, 41, 37, 35, 33, 31],
    },
    {
      id: "hsi",
      name: "恒生指数",
      english: "HANG SENG",
      region: "HK",
      close: 25413.12,
      changePct: -0.93,
      marketDate: "2026-09-07",
      spark: [47, 40, 35, 31, 34, 38, 42, 46, 49, 52, 55, 57, 56, 58],
    },
    {
      id: "hstech",
      name: "恒生科技",
      english: "HANG SENG TECH",
      region: "HK",
      close: 4527.71,
      changePct: -0.92,
      marketDate: "2026-09-07",
      spark: [34, 30, 27, 31, 35, 39, 42, 45, 43, 48, 51, 49, 54, 57],
    },
  ] satisfies GlobalMarketItem[],
  fx: [
    {
      id: "usdhkd",
      name: "美元 / 港元",
      english: "USD / HKD",
      value: 7.8402,
      decimals: 4,
      changePct: 0.02,
      glyph: "HK$",
    },
    {
      id: "usdcnh",
      name: "美元 / 离岸人民币",
      english: "USD / CNH",
      value: 6.7285,
      decimals: 4,
      changePct: 0.14,
      glyph: "CNH",
    },
  ] satisfies CompactMarketItem[],
  alternatives: [
    {
      id: "gold",
      name: "COMEX 黄金",
      english: "GOLD",
      value: 4476.6,
      decimals: 2,
      changePct: -0.34,
      unit: "USD",
      glyph: "AU",
    },
    {
      id: "wti",
      name: "WTI 原油",
      english: "WTI CRUDE",
      value: 91.20,
      decimals: 2,
      changePct: -0.11,
      unit: "USD",
      glyph: "OIL",
    },
    {
      id: "bitcoin",
      name: "比特币",
      english: "BITCOIN",
      value: 79720.48,
      decimals: 2,
      changePct: -1.91,
      unit: "USD",
      glyph: "BTC",
    },
  ] satisfies CompactMarketItem[],
  sources: [
    "PrimerIQ / US and alternatives close",
    "Nikkei / market close",
    "HKEJ Stock360 / HK and Asia close",
    "Investing + FT + public historical pages / FX and alternatives",
  ],
} as const;
