"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import Link from "next/link";
import { Plus, Edit, Users, Calendar } from "lucide-react";

interface Event { id: string; titleEn: string; titleMr: string; type: string; status: string; date: string; venue: string; capacity: number; _count?: { registrations: number } }

const STATUS_COLORS: Record<string, string> = { UPCOMING:"bg-blue-100 text-blue-700", ONGOING:"bg-green-100 text-green-700", COMPLETED:"bg-gray-100 text-gray-600", CANCELLED:"bg-red-100 text-red-700" };

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events").then(r => setEvents(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-5">
      <Header title="Events" subtitle={`${events.length} total events`} />
      <div className="flex justify-end">
        <Link href="/events/new" className="btn-primary flex items-center gap-2"><Plus size={15} />Add Event</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? [...Array(6)].map((_, i) => <div key={i} className="card p-5 h-40 animate-pulse bg-gray-100 rounded-2xl" />)
        : events.map(ev => {
          const pct = Math.round(((ev._count?.registrations || 0) / ev.capacity) * 100);
          return (
            <div key={ev.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className={`badge ${STATUS_COLORS[ev.status]}`}>{ev.status}</span>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><Edit size={14} /></button>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 leading-tight">{ev.titleEn}</h3>
              <p className="text-xs text-gray-500 mb-3">{ev.titleMr}</p>
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><Calendar size={12} />{new Date(ev.date).toLocaleDateString("en-IN")}</div>
                <div className="flex items-center gap-1.5"><Users size={12} />{ev._count?.registrations || 0} / {ev.capacity} registered</div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{pct}% full</span></div>
                <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-saffron-500 rounded-full" style={{ width: `${pct}%` }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
