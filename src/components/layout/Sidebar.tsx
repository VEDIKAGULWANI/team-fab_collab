import React from "react";
import { LayoutDashboard, Activity, TrendingUp, Settings, LucideIcon } from "lucide-react";

export type TabType = "dashboard" | "activity" | "trending" | "settings";

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

interface TabConfig {
  icon: LucideIcon;
  id: TabType;
  label: string;
}

const MAIN_TABS: TabConfig[] = [
  { icon: LayoutDashboard, id: "dashboard", label: "Dashboard" },
  { icon: Activity, id: "activity", label: "Activity" },
  { icon: TrendingUp, id: "trending", label: "Trending" },
];

const BOTTOM_TABS: TabConfig[] = [
  { icon: Settings, id: "settings", label: "Settings" },
];

export default function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const renderTab = ({ icon: Icon, id, label }: TabConfig) => {
    const isActive = activeTab === id;
    
    return (
      <div key={id} className="relative group flex items-center justify-center w-full">
        {isActive && (
          <div className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full" />
        )}
        
        <button
          onClick={() => onChangeTab(id)}
          aria-label={label}
          className={`p-3 rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-zinc-500 hover:text-white hover:bg-white/5"
          }`}
        >
          <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
        </button>

        <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#1A1B1E] border border-[#2A2B2E] text-xs font-medium text-white rounded-md opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-20 bg-[#111214] border-r border-[#1A1B1E] flex flex-col items-center py-6 z-50 select-none">
      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 font-black text-xl mb-8">
        N
      </div>
      <nav className="flex flex-col gap-3 w-full">
        {MAIN_TABS.map(renderTab)}
      </nav>

      <div className="flex-grow" />
      <nav className="flex flex-col gap-3 w-full">
        {BOTTOM_TABS.map(renderTab)}
      </nav>
    </aside>
  );
}
