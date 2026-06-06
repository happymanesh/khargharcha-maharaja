"use client";
import { Bell, Search } from "lucide-react";

interface HeaderProps { title: string; subtitle?: string; }

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
      <div>
        <h1 className="font-bold text-gray-900 text-xl">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search..." className="input pl-9 w-56 bg-gray-50" />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron-500 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-maroon-950 rounded-lg flex items-center justify-center text-white text-xs font-bold">A</div>
      </div>
    </header>
  );
}
