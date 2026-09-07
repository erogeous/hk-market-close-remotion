export const hkMarketSnapshot20260828 = {
  tradeDate: "2026/09/07",
  weekday: "星期一",
  hsi: {
    close: 25413.12,
    change: -237.75,
    changePct: -0.93,
    open: 25652.97,
    high: 25664.98,
    low: 25362.98,
    intraday: [25653,25665,25631,25598,25572,25539,25511,25492,25458,25423,25394,25363,25388,25416,25442,25427,25401,25384,25409,25431,25418,25398,25426,25407,25420,25413.12],
  },
  indices: [
    {name: "恒生科技指数", english: "HANG SENG TECH", value: 4527.71, changePct: -0.92, spark: [58,55,52,49,46,42,39,36,40,38,35,34]},
    {name: "恒生中国企业指数", english: "HSCEI", value: 8429.73, changePct: -1.46, spark: [61,58,53,49,44,40,36,33,35,32,29,27]},
    {name: "恒生红筹股指数", english: "RED-CHIP INDEX", value: 4176.45, changePct: -0.88, spark: [58,55,52,48,45,41,38,35,37,34,31,29]},
  ],
  turnoverBillion: 209.673,
  turnoverBars: [42, 58, 54, 71, 68, 82, 100],
  fiveDay: [25329.73, 25311.21, 25213.31, 25650.87, 25413.12],
  unavailable: {
    shortSelling: "待 HKEX 日报接入",
    breadth: "待全市场逐股行情接入",
    topTurnover: "待全市场成交排行接入",
  },
  sources: ["HKEJ Stock360 / HK close, OHLC and turnover", "ET Net / market context"],
} as const;
