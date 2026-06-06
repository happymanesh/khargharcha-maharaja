"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface NewsItem { id: string; titleEn: string; titleMr: string; category: string; isPublished: boolean; publishedAt?: string; createdAt: string; }

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titleMr:"", titleHi:"", titleEn:"", contentMr:"", contentHi:"", contentEn:"", category:"Announcement", isPublished: false });

  const fetchNews = () => {
    setLoading(true);
    api.get("/news?limit=50").then(r => setNews(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchNews(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/news", form);
    setShowForm(false); setForm({ titleMr:"", titleHi:"", titleEn:"", contentMr:"", contentHi:"", contentEn:"", category:"Announcement", isPublished: false });
    fetchNews();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await api.put(`/news/${id}`, { isPublished: !current });
    fetchNews();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this news item?")) return;
    await api.delete(`/news/${id}`);
    fetchNews();
  };

  return (
    <div className="p-6 space-y-5">
      <Header title="News & Announcements" subtitle="Manage multilingual content" />
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2"><Plus size={15} />{showForm ? "Cancel" : "New Post"}</button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900">New Announcement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Title (Marathi) *</label><input value={form.titleMr} onChange={e => setForm({...form, titleMr:e.target.value})} className="input" required /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Title (Hindi) *</label><input value={form.titleHi} onChange={e => setForm({...form, titleHi:e.target.value})} className="input" required /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Title (English) *</label><input value={form.titleEn} onChange={e => setForm({...form, titleEn:e.target.value})} className="input" required /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Content (Marathi)</label><textarea value={form.contentMr} onChange={e => setForm({...form, contentMr:e.target.value})} rows={3} className="input" /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Content (Hindi)</label><textarea value={form.contentHi} onChange={e => setForm({...form, contentHi:e.target.value})} rows={3} className="input" /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Content (English)</label><textarea value={form.contentEn} onChange={e => setForm({...form, contentEn:e.target.value})} rows={3} className="input" /></div>
          </div>
          <div className="flex gap-4 items-center">
            <select value={form.category} onChange={e => setForm({...form, category:e.target.value})} className="input w-48">
              {["Announcement","Social","Medical","Cultural","Volunteer","Festival"].map(c => <option key={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} className="w-4 h-4 accent-saffron-500" />
              Publish immediately
            </label>
            <button type="submit" className="btn-primary ml-auto">Publish</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {loading ? [...Array(4)].map((_, i) => <div key={i} className="card p-4 h-16 animate-pulse bg-gray-100 rounded-xl" />) :
        news.map(item => (
          <div key={item.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`badge ${item.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isPublished ? "Published" : "Draft"}</span>
                <span className="badge bg-purple-50 text-purple-700">{item.category}</span>
              </div>
              <p className="font-semibold text-gray-900 truncate">{item.titleEn}</p>
              <p className="text-xs text-gray-500 truncate">{item.titleMr}</p>
            </div>
            <p className="text-xs text-gray-400 shrink-0">{new Date(item.createdAt).toLocaleDateString("en-IN")}</p>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => togglePublish(item.id, item.isPublished)} className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-lg" title={item.isPublished?"Unpublish":"Publish"}>
                {item.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button className="p-1.5 hover:bg-saffron-50 text-saffron-600 rounded-lg"><Edit size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
