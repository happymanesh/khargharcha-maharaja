"use client";
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

interface Volunteer { id: string; group: string; skills: string[]; status: string; hoursContributed: number; joinedAt: string; member: { name: string; mobile: string; area: string; bloodGroup: string } }

const STATUS_COLORS: Record<string, string> = { ACTIVE:"bg-green-100 text-green-700", PENDING:"bg-yellow-100 text-yellow-700", INACTIVE:"bg-gray-100 text-gray-500" };

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/volunteers", { params: { page, limit, status: status || undefined } });
      setVolunteers(data.data); setTotal(data.total);
    } catch { setVolunteers([]); } finally { setLoading(false); }
  }, [page, status]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, newStatus: string) => {
    await api.put(`/volunteers/${id}`, { status: newStatus });
    fetch();
  };

  return (
    <div className="p-6 space-y-5">
      <Header title="Volunteers" subtitle={`${total} volunteers`} />
      <div className="card p-4 flex gap-3">
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="input w-40">
          <option value="">All Status</option>
          {["PENDING","ACTIVE","INACTIVE"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr>{["Name","Mobile","Area","Group","Skills","Hours","Status","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? [...Array(5)].map((_, i) => <tr key={i}>{[...Array(8)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)
              : volunteers.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{v.member.name}</td>
                  <td className="px-4 py-3 text-gray-500">{v.member.mobile}</td>
                  <td className="px-4 py-3 text-gray-500">{v.member.area}</td>
                  <td className="px-4 py-3 text-gray-600">{v.group}</td>
                  <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{v.skills.slice(0,3).map(s => <span key={s} className="badge bg-blue-50 text-blue-700">{s}</span>)}</div></td>
                  <td className="px-4 py-3 text-gray-500">{v.hoursContributed}h</td>
                  <td className="px-4 py-3"><span className={`badge ${STATUS_COLORS[v.status]}`}>{v.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {v.status === "PENDING" && <button onClick={() => updateStatus(v.id, "ACTIVE")} className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg" title="Approve"><CheckCircle size={14} /></button>}
                      {v.status !== "INACTIVE" && <button onClick={() => updateStatus(v.id, "INACTIVE")} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg" title="Deactivate"><XCircle size={14} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-gray-500">
          <span>{total} total</span>
          <div className="flex gap-2">
            <button disabled={page===1} onClick={() => setPage(p=>p-1)} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronLeft size={16} /></button>
            <span className="px-3 py-1 bg-saffron-500 text-white rounded text-xs font-bold">{page}</span>
            <button disabled={page*limit>=total} onClick={() => setPage(p=>p+1)} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
