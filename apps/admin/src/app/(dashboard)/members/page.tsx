"use client";
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Search, Download, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react";

interface Member { id: string; name: string; mobile: string; email?: string; area: string; bloodGroup: string; membershipTier: string; isVerified: boolean; isActive: boolean; createdAt: string; }

const TIER_COLORS: Record<string, string> = { GENERAL:"bg-gray-100 text-gray-700", SILVER:"bg-gray-200 text-gray-800", GOLD:"bg-yellow-100 text-yellow-800", PLATINUM:"bg-purple-100 text-purple-800", LIFETIME:"bg-red-100 text-red-800" };

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/members", { params: { page, limit, search: search || undefined, tier: tier || undefined } });
      setMembers(data.data); setTotal(data.total);
    } catch { setMembers([]); } finally { setLoading(false); }
  }, [page, search, tier]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  return (
    <div className="p-6 space-y-5">
      <Header title="Members" subtitle={`${total.toLocaleString()} total members`} />

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search name, mobile..." className="input pl-9 w-56" />
          </div>
          <select value={tier} onChange={e => { setTier(e.target.value); setPage(1); }} className="input w-40">
            <option value="">All Tiers</option>
            {["GENERAL","SILVER","GOLD","PLATINUM","LIFETIME"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button className="btn-secondary flex items-center gap-2"><Download size={14} />Export CSV</button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{["Name","Mobile","Area","Blood","Tier","Verified","Joined","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? [...Array(5)].map((_, i) => (
                <tr key={i}>{[...Array(8)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>)}</tr>
              )) : members.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{m.name || <span className="text-gray-400 italic">No name</span>}</td>
                  <td className="px-4 py-3 text-gray-600">+91 {m.mobile}</td>
                  <td className="px-4 py-3 text-gray-600">{m.area}</td>
                  <td className="px-4 py-3"><span className="badge bg-red-50 text-red-700">{m.bloodGroup}</span></td>
                  <td className="px-4 py-3"><span className={`badge ${TIER_COLORS[m.membershipTier]}`}>{m.membershipTier}</span></td>
                  <td className="px-4 py-3">
                    <span className={`badge ${m.isVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{m.isVerified ? "✓ Yes" : "No"}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(m.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg" title="View"><Eye size={14} /></button>
                      <button className="p-1.5 hover:bg-saffron-50 text-saffron-600 rounded-lg" title="Edit"><Edit size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {((page-1)*limit)+1}–{Math.min(page*limit,total)} of {total}</span>
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
