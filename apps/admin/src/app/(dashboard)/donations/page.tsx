"use client";
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Search, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";

interface Donation { id: string; donorName: string; donorMobile: string; amount: number; category: string; status: string; receiptNumber: string; createdAt: string; member?: { name: string } }

const STATUS_COLORS: Record<string, string> = { SUCCESS:"bg-green-100 text-green-700", PENDING:"bg-yellow-100 text-yellow-700", FAILED:"bg-red-100 text-red-700", REFUNDED:"bg-gray-100 text-gray-700" };
const CAT_EMOJI: Record<string, string> = { GANESH_UTSAV:"🐘", ANNADAN:"🍱", MEDICAL:"🏥", EDUCATION:"📚", DISASTER_RELIEF:"🆘", GENERAL:"🙏" };

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const limit = 20;

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/donations", { params: { page, limit, status: status || undefined } });
      setDonations(data.data); setTotal(data.total);
      setTotalAmount(data.data.filter((d: Donation) => d.status === "SUCCESS").reduce((s: number, d: Donation) => s + d.amount, 0));
    } catch { setDonations([]); } finally { setLoading(false); }
  }, [page, status]);

  useEffect(() => { fetchDonations(); }, [fetchDonations]);

  return (
    <div className="p-6 space-y-5">
      <Header title="Donations" subtitle={`${total.toLocaleString()} total donations`} />

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Received",    value: `₹${totalAmount.toLocaleString("en-IN")}`, color: "text-green-600" },
          { label: "Total Transactions", value: total.toString(), color: "text-blue-600" },
          { label: "This Page",         value: donations.filter(d=>d.status==="SUCCESS").length.toString(), color: "text-saffron-600" },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="input w-40">
            <option value="">All Status</option>
            {["SUCCESS","PENDING","FAILED","REFUNDED"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn-secondary flex items-center gap-2"><Download size={14} />Export</button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{["Receipt","Donor","Mobile","Amount","Category","Status","Date","Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? [...Array(5)].map((_, i) => <tr key={i}>{[...Array(8)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>)}</tr>)
              : donations.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{d.receiptNumber}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{d.donorName}</td>
                  <td className="px-4 py-3 text-gray-600">{d.donorMobile}</td>
                  <td className="px-4 py-3 font-bold text-green-700">₹{d.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">{CAT_EMOJI[d.category]} <span className="text-gray-600 text-xs">{d.category.replace("_"," ")}</span></td>
                  <td className="px-4 py-3"><span className={`badge ${STATUS_COLORS[d.status]}`}>{d.status}</span></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3"><button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg" title="Receipt"><FileText size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
