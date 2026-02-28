import React from "react";
import { motion } from "motion/react";
import { Plus, ShieldCheck, ArrowUpRight, ArrowDownRight, ChevronUp, ChevronDown } from "lucide-react";
import { Coin } from "../../types/market";

export type SortField = "name" | "current_price" | "price_change_percentage_24h" | "market_cap";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface MarketTableProps {
  coins: Coin[];
  onAddToWatchlist: (coin: Coin) => void;
  watchlistIds: string[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  selectedCoinId: string | null;
  onRowClick: (coinId: string) => void;
}

export const MarketTable = ({
  coins,
  onAddToWatchlist,
  watchlistIds,
  sortConfig,
  onSort,
  selectedCoinId,
  onRowClick,
}: MarketTableProps) => {
  
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#2A2B2E] bg-[#151619]">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-zinc-500 border-b border-[#2A2B2E] bg-[#1A1B1E]">
          <tr>
            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => onSort("name")}>
              <div className="flex items-center gap-1">Asset <SortIndicator field="name" /></div>
            </th>
            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => onSort("current_price")}>
              <div className="flex items-center gap-1">Price <SortIndicator field="current_price" /></div>
            </th>
            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => onSort("price_change_percentage_24h")}>
              <div className="flex items-center gap-1">24h Change <SortIndicator field="price_change_percentage_24h" /></div>
            </th>
            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => onSort("market_cap")}>
              <div className="flex items-center gap-1">Market Cap <SortIndicator field="market_cap" /></div>
            </th>
            <th className="px-6 py-4 font-medium text-right">Watch</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2A2B2E]/50">
          {coins.map((coin) => (
            <motion.tr
              key={coin.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => onRowClick(coin.id)}
              className={`cursor-pointer transition-colors ${
                selectedCoinId === coin.id ? "bg-[#1A1B1E]" : "hover:bg-[#1A1B1E]/50"
              }`}
            >
              <td className="px-6 py-4 text-white flex items-center gap-3">
                <span className="font-semibold">{coin.name}</span>
                <span className="text-xs text-zinc-500 uppercase">{coin.symbol}</span>
              </td>
              <td className="px-6 py-4 text-white font-mono">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className={`px-6 py-4 font-mono ${coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {coin.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight size={14} className="inline mr-1 mb-0.5" />
                ) : (
                  <ArrowDownRight size={14} className="inline mr-1 mb-0.5" />
                )}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </td>
              <td className="px-6 py-4 text-zinc-400 font-mono">
                ${(coin.market_cap / 1e9).toFixed(2)}B
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToWatchlist(coin);
                  }}
                  disabled={watchlistIds.includes(coin.id)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors inline-flex justify-end"
                >
                  {watchlistIds.includes(coin.id) ? (
                    <ShieldCheck size={18} className="text-emerald-500" />
                  ) : (
                    <Plus size={18} className="text-zinc-400 hover:text-white" />
                  )}
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
