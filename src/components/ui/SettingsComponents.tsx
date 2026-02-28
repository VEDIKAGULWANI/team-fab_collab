import React from "react";
import { motion } from "motion/react";
import { Card } from "./Card";

export const SettingsSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="relative mb-8 group">
    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald-500/30 via-transparent to-emerald-500/30 opacity-40 group-hover:opacity-70 transition-opacity blur-sm" />

    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-8 py-6 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mt-1">{description}</p>
      </div>

      <div className="p-8 flex flex-col gap-8">{children}</div>
    </div>
  </div>
);

export const ToggleSwitch = ({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-zinc-400 mt-1">{description}</div>
        )}
      </div>

      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-14 h-7 rounded-full transition-all duration-300 
        ${enabled
            ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            : "bg-zinc-800"
          }`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-all duration-300
          ${enabled ? "translate-x-7" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};
export const StyledInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  rightElement,
}: any) => (
  <div className="relative">
    <input
      type={type}
      placeholder=" "
      value={value}
      onChange={onChange}
      className="peer w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all text-sm"
    />

    <label className="absolute left-4 top-2 text-xs text-zinc-400 transition-all 
      peer-placeholder-shown:top-4 
      peer-placeholder-shown:text-sm 
      peer-placeholder-shown:text-zinc-500 
      peer-focus:top-2 
      peer-focus:text-xs 
      peer-focus:text-emerald-400">
      {label}
    </label>

    {rightElement && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        {rightElement}
      </div>
    )}
  </div>
);

export const ActionBtn = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: any) => {
  const base =
    "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none";

  let style = "";

  if (variant === "primary") {
    style =
      "bg-emerald-500 text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]";
  } else if (variant === "danger") {
    style =
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20";
  } else {
    style =
      "bg-white/5 text-white border border-white/10 hover:bg-white/10";
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const PillSelector = ({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="relative flex bg-white/5 border border-white/10 rounded-xl p-1">
      {options.map((opt) => {
        const isActive = selected === opt;

        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-300
              ${isActive ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            {isActive && (
              <motion.div
                layoutId="pill-bg"
                className="absolute inset-0 bg-emerald-500/20 rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt}</span>
          </button>
        );
      })}
    </div>
  );
};
