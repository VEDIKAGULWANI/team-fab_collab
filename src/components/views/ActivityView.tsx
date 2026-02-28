import React, { useState, useEffect } from "react";
import { Zap, Activity, ShieldCheck, Filter } from "lucide-react";


type Transaction = {
  id: string;
  hash: string;
  method: "Swap" | "Send" | "Mint" | "Burn" | "Approve";
  status: "Success" | "Pending" | "Failed";
  time: string;
  value: string;
  usdValue: string;
};


const generateMockTransactions = (count: number): Transaction[] => {
  const methods: Transaction["method"][] = [
    "Swap",
    "Send",
    "Mint",
    "Burn",
    "Approve",
  ];

  const statuses: Transaction["status"][] = [
    "Success",
    "Pending",
    "Failed",
  ];

  const coins = ["ETH", "USDC", "WBTC", "LINK", "UNI"];

  return Array.from({ length: count }).map((_, i) => {
    const method =
      methods[Math.floor(Math.random() * methods.length)];
    const status =
      statuses[Math.floor(Math.random() * statuses.length)];
    const coin =
      coins[Math.floor(Math.random() * coins.length)];

    const valueNum = (Math.random() * 10).toFixed(4);

    return {
      id: `tx-${Date.now()}-${i}`,
      hash:
        "0x" +
        Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join(""),
      method,
      status,
      time: `${Math.floor(Math.random() * 60)} mins ago`,
      value: `${valueNum} ${coin}`,
      usdValue: `$${(
        parseFloat(valueNum) * 2000
      ).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
    };
  });
};


export const ActivityView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    []
  );
  const [filterMethod, setFilterMethod] = useState<string>("All");

  useEffect(() => {
    setTransactions(generateMockTransactions(25));
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    if (filterMethod !== "All" && tx.method !== filterMethod)
      return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Network Load"
          value="48 Gwei"
          change={-12.4}
          icon={Zap}
        />
        <StatCard
          title="24h Transactions"
          value="1.2M"
          change={5.2}
          icon={Activity}
        />
        <StatCard
          title="Active Contracts"
          value="42,891"
          change={1.2}
          icon={ShieldCheck}
        />
      </div>

      <div className="bg-[#151619] border border-[#1A1B1E] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <div className="relative flex items-center">
            <Filter
              size={16}
              className="absolute left-3 text-zinc-500"
            />
            <select
              className="bg-[#1A1B1E] text-white text-sm rounded-lg pl-9 pr-6 py-2 border border-[#2A2B2E] focus:outline-none focus:border-emerald-500/50"
              value={filterMethod}
              onChange={(e) =>
                setFilterMethod(e.target.value)
              }
            >
              <option value="All">All Types</option>
              <option value="Swap">Swaps</option>
              <option value="Send">Sends</option>
              <option value="Mint">Mints</option>
              <option value="Burn">Burns</option>
              <option value="Approve">Approvals</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[#1A1B1E]">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center py-4"
            >
              <div>
                <div className="text-sm text-white font-medium">
                  {tx.method}
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  {tx.hash.slice(0, 10)}...
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-white">
                  {tx.value}
                </div>
                <div className="text-xs text-zinc-500">
                  {tx.usdValue}
                </div>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full ${
                  tx.status === "Success"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : tx.status === "Pending"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {tx.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
}: any) => {
  return (
    <div className="bg-[#151619] border border-[#1A1B1E] rounded-xl p-6 flex justify-between items-center">
      <div>
        <div className="text-xs text-zinc-500 mb-1">
          {title}
        </div>
        <div className="text-xl font-semibold text-white">
          {value}
        </div>
        <div
          className={`text-xs mt-1 ${
            change >= 0
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </div>
      </div>

      <Icon className="text-emerald-500" size={22} />
    </div>
  );
};
