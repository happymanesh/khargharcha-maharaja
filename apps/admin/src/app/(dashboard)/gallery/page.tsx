"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";

interface Album { id: string; titleEn: string; titleMr: string; coverUrl?: string; _count?: { items: number } }

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titleEn: "", titleMr: "" });

  const fetchAlbums = () => {
    api.get("/gallery/albums").then(r => setAlbums(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { fetchAlbums(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/gallery/albums", form);
    setShowForm(false); setForm({ titleEn: "", titleMr: "" }); fetchAlbums();
  };

  return (
    <div className="p-6 space-y-5">
      <Header title="Gallery" subtitle="Manage photo and video albums" />
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2"><Plus size={15} />{showForm ? "Cancel" : "New Album"}</button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card p-5 flex gap-4 items-end">
          <div className="flex-1"><label className="block text-xs font-semibold text-gray-600 mb-1">Album Title (English) *</label><input value={form.titleEn} onChange={e => setForm({...form, titleEn:e.target.value})} className="input" required /></div>
          <div className="flex-1"><label className="block text-xs font-semibold text-gray-600 mb-1">Album Title (Marathi) *</label><input value={form.titleMr} onChange={e => setForm({...form, titleMr:e.target.value})} className="input" required /></div>
          <button type="submit" className="btn-primary">Create Album</button>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? [...Array(8)].map((_, i) => <div key={i} className="card aspect-square animate-pulse bg-gray-100 rounded-2xl" />) :
        albums.map(album => (
          <div key={album.id} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative aspect-square bg-gray-100">
              {album.coverUrl ? (
                <NextImage src={album.coverUrl} alt={album.titleEn} fill className="object-cover" sizes="25vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><ImageIcon size={32} className="text-gray-300" /></div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-gray-900 truncate">{album.titleEn}</p>
              <p className="text-xs text-gray-500">{album._count?.items || 0} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
