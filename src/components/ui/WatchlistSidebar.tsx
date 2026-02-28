import { motion, AnimatePresence } from "motion/react";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { WatchlistItem } from "../../types/market";

export const WatchlistSidebar = ({
  items,
  onRemove,
}: {
  items: WatchlistItem[];
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0F1115] border-l border-[#1A1B1E] p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Watchlist</h3>
        <p className="text-xs text-zinc-500">
          Track your favorite tokens
        </p>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto">
        <AnimatePresence>
          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-zinc-500 text-center py-10"
            >
              No assets added yet
            </motion.div>
          )}

          {items.map((item) => {
            const isPositive = item.change24h >= 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group flex items-center justify-between p-4 rounded-xl 
                           bg-[#151619] border border-[#1A1B1E] 
                           hover:border-emerald-500/40 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    {item.symbol}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-white">
                      ${item.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs flex items-center gap-1 justify-end ${
                        isPositive
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {isPositive ? "+" : ""}
                      {item.change24h}%
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="opacity-0 group-hover:opacity-100 
                               text-zinc-500 hover:text-red-500 
                               transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
