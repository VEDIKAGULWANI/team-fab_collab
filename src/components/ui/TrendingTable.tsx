import React, { useState } from "react";
import { GainersLosersGrid } from "../ui/GainersLosersGrid";
import { Card } from "../ui/Card";

// --- TYPES ---
export type GainerLoser = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
};

export type TrendingToken = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  volChange: number;
  sentiment: number;
  sparkline: number[];
};

// --- MOCK DATA --- gemini
const MOCK_GAINERS: GainerLoser[] = [
  { id: "g1", symbol: "PEPE", name: "Pepe", price: 0.0000084, change: 24.5 },
  { id: "g2", symbol: "WIF", name: "dogwifhat", price: 2.84, change: 18.2 },
  { id: "g3", symbol: "RNDR", name: "Render", price: 10.45, change: 14.8 },
  { id: "g4", symbol: "FET", name: "Fetch.ai", price: 2.14, change: 12.1 },
  { id: "g5", symbol: "ONDO", name: "Ondo", price: 0.84, change: 10.5 },
];

const MOCK_LOSERS: GainerLoser[] = [
  { id: "l1", symbol: "TIA", name: "Celestia", price: 11.24, change: -8.4 },
  { id: "l2", symbol: "STRK", name: "Starknet", price: 1.45, change: -6.2 },
  { id: "l3", symbol: "DYM", name: "Dymension", price: 3.84, change: -5.1 },
  { id: "l4", symbol: "JUP", name: "Jupiter", price: 1.12, change: -4.8 },
  { id: "l5", symbol: "SEI", name: "Sei", price: 0.64, change: -4.2 },
];

const generateSparkline = (trend: "up" | "down" | "flat"): number[] => {
  let current = 100;
  return Array.from({ length: 20 }).map(() => {
    const change = (Math.random() - 0.5) * 10;
    const direction = trend === "up" ? 2 : trend === "down" ? -2 : 0;
    current = current + change + direction;
    return Math.max(0, current);
  });
};

const MOCK_TRENDING_TOKENS: TrendingToken[] = [
  { id: "t1", symbol: "SOL", name: "Solana", price: 145.2, volChange: 45.2, sentiment: 88, sparkline: generateSparkline("up") },
  { id: "t2", symbol: "DOGE", name: "Dogecoin", price: 0.154, volChange: 124.5, sentiment: 92, sparkline: generateSparkline("up") },
  { id: "t3", symbol: "LINK", name: "Chainlink", price: 18.4, volChange: 12.4, sentiment: 65, sparkline: generateSparkline("flat") },
  { id: "t4", symbol: "ARB", name: "Arbitrum", price: 1.15, volChange: -15.4, sentiment: 45, sparkline: generateSparkline("down") },
  { id: "t5", symbol: "AVAX", name: "Avalanche", price: 38.5, volChange: 5.2, sentiment: 58, sparkline: generateSparkline("up") },
  { id: "t6", symbol: "TON", name: "Toncoin", price: 6.8, volChange: 84.1, sentiment: 75, sparkline: generateSparkline("up") },
];

export const TrendingView = () => {
  const [sortField, setSortField] = useState<"volChange" | "sentiment">("volChange");

  const sortedTokens = [...MOCK_TRENDING_TOKENS].sort(
    (a, b) => b[sortField] - a[sortField]
  );

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GainersLosersGrid
          gainers={MOCK_GAINERS}
          losers={MOCK_LOSERS}
        />
      </div>
      <Card>
        <div className="p-6 text-white bg-[#151619] rounded-xl border border-[#2A2B2E]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold tracking-tight">Trending Assets</h3>
            <div className="text-sm text-zinc-400 bg-[#1A1B1E] px-3 py-1.5 rounded-lg border border-[#2A2B2E]">
              Sorted by: <span className="text-white capitalize font-medium">{sortField === 'volChange' ? 'Volume' : 'Sentiment'}</span>
            </div>
          </div>
          
          <div className="w-full">
            <div className="grid grid-cols-4 text-xs font-semibold text-zinc-500 pb-3 border-b border-zinc-800 uppercase tracking-wider">
               <div>Asset</div>
               <div>Price</div>
               <div 
                 className="cursor-pointer hover:text-emerald-500 transition-colors" 
                 onClick={() => setSortField('volChange')}
               >
                 Vol Change (24h)
               </div>
               <div 
                 className="cursor-pointer hover:text-emerald-500 transition-colors" 
                 onClick={() => setSortField('sentiment')}
               >
                 Sentiment
               </div>
            </div>
            <div className="mt-2 flex flex-col">
              {sortedTokens.map((token) => (
                <div key={token.id} className="grid grid-cols-4 py-4 border-b border-zinc-800/50 items-center hover:bg-[#1A1B1E]/50 transition-colors -mx-6 px-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{token.symbol}</span>
                    <span className="text-xs text-zinc-500">{token.name}</span>
                  </div>
                  <div className="font-mono text-sm">${token.price.toFixed(token.price < 1 ? 4 : 2)}</div>
                  <div className={`font-mono text-sm ${token.volChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {token.volChange >= 0 ? "+" : ""}{token.volChange}%
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${token.sentiment > 70 ? 'bg-emerald-500' : token.sentiment > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${token.sentiment}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-zinc-400">{token.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
