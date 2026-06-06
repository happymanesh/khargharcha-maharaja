"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Calendar, Heart, UserCheck, Image, Newspaper, Settings, LogOut, ChevronLeft, Menu } from "lucide-react";
import { clearAuthToken } from "@/lib/api";
import { useState } from "react";
import { clsx } from "clsx";

const nav = [
  { href: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { href: "/members",     label: "Members",      icon: Users },
  { href: "/events",      label: "Events",       icon: Calendar },
  { href: "/donations",   label: "Donations",    icon: Heart },
  { href: "/volunteers",  label: "Volunteers",   icon: UserCheck },
  { href: "/gallery",     label: "Gallery",      icon: Image },
  { href: "/news",        label: "News & CMS",   icon: Newspaper },
  { href: "/settings",    label: "Settings",     icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { clearAuthToken(); router.push("/login"); };

  return (
    <aside className={clsx("flex flex-col bg-maroon-950 text-gray-300 h-screen sticky top-0 transition-all duration-300 shrink-0", collapsed ? "w-16" : "w-60")}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-saffron-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-white font-bold text-lg">ग</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">Khargharcha Maharaja</p>
            <p className="text-saffron-400 text-xs">Admin Panel</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-gray-400 hover:text-white p-1 rounded">
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} title={collapsed ? label : undefined}
              className={clsx("sidebar-link", active && "active", !active && "text-gray-400")}>
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <button onClick={handleLogout} title={collapsed ? "Logout" : undefined}
          className="sidebar-link w-full text-red-400 hover:bg-red-500/10 hover:text-red-300">
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
