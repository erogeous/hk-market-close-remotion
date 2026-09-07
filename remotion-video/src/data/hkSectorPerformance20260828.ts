export type SectorItem = {name:string; changePct:number; stockCount:number; turnoverBillion:number; weight:number};

export const hkSectorPerformance20260828 = {
  tradeDate:"2026/09/07", weekday:"星期一",
  gainers:[
    {name:"电子",changePct:2.9,stockCount:41,turnoverBillion:0,weight:100},
    {name:"零售/贸易",changePct:1.1,stockCount:30,turnoverBillion:0,weight:38},
    {name:"基建",changePct:0.7,stockCount:8,turnoverBillion:0,weight:24},
    {name:"航空",changePct:0.4,stockCount:6,turnoverBillion:0,weight:14},
    {name:"物流运输",changePct:0.1,stockCount:21,turnoverBillion:0,weight:8},
  ] as SectorItem[],
  losers:[
    {name:"保健/生物科技",changePct:-1.3,stockCount:160,turnoverBillion:0,weight:100},
    {name:"金属/采矿",changePct:-1.3,stockCount:46,turnoverBillion:0,weight:100},
    {name:"综合企业",changePct:-1.2,stockCount:7,turnoverBillion:0,weight:92},
    {name:"地产",changePct:-1.2,stockCount:109,turnoverBillion:0,weight:92},
    {name:"金融证券",changePct:-1.1,stockCount:88,turnoverBillion:0,weight:85},
  ] as SectorItem[],
  disclosure:"行业涨跌及上涨/下跌股数来自收市行业统计；热力块面积仅用于版式表达",
} as const;
