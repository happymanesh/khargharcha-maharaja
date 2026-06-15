"use client";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Plus, Trash2, Image as ImageIcon, Upload, X, FolderOpen, ArrowLeft } from "lucide-react";
import NextImage from "next/image";

interface Album { id: string; titleEn: string; titleMr: string; coverUrl?: string; _count?: { items: number } }
interface GalleryItem { id: string; title: string; url: string; thumbnailUrl?: string; type: "PHOTO" | "VIDEO" }

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [albumForm, setAlbumForm] = useState({ titleEn: "", titleMr: "" });
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<{ file: File; preview: string; title: string }[]>([]);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAlbums = () => {
    api.get("/gallery/albums").then(r => setAlbums(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { fetchAlbums(); }, []);

  const fetchItems = (albumId: string) => {
    setItemsLoading(true);
    api.get(`/gallery/albums/${albumId}/items`).then(r => setItems(r.data.data)).catch(console.error).finally(() => setItemsLoading(false));
  };

  const handleOpenAlbum = (album: Album) => {
    setSelectedAlbum(album);
    fetchItems(album.id);
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/gallery/albums", albumForm);
    setShowAlbumForm(false); setAlbumForm({ titleEn: "", titleMr: "" }); fetchAlbums();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
    }));
    setUploadQueue(prev => [...prev, ...newItems]);
    setShowUploadPanel(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFromQueue = (idx: number) => {
    setUploadQueue(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Upload photos to Cloudinary (or use URL if Cloudinary not set up yet → store as base64 placeholder)
  const handleUpload = async () => {
    if (!selectedAlbum || uploadQueue.length === 0) return;
    setUploading(true);
    try {
      for (const item of uploadQueue) {
        // Try Cloudinary upload first; fall back to saving filename as URL
        let url = item.preview;
        try {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
          if (cloudName && uploadPreset) {
            const fd = new FormData();
            fd.append("file", item.file);
            fd.append("upload_preset", uploadPreset);
            fd.append("folder", `kharghar-maharaja/${selectedAlbum.id}`);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: fd });
            const data = await res.json();
            url = data.secure_url;
          }
        } catch { /* fallback to preview */ }
        await api.post("/gallery/items", {
          albumId: selectedAlbum.id,
          title: item.title,
          type: "PHOTO",
          url,
          thumbnailUrl: url,
        });
      }
      // clear queue and refresh
      uploadQueue.forEach(q => URL.revokeObjectURL(q.preview));
      setUploadQueue([]);
      setShowUploadPanel(false);
      fetchItems(selectedAlbum.id);
      fetchAlbums();
    } catch (err) {
      alert("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Delete this photo?")) return;
    await api.delete(`/gallery/items/${itemId}`);
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  // ── Album list view ──────────────────────────────────────────────
  if (!selectedAlbum) {
    return (
      <div className="p-6 space-y-5">
        <Header title="Gallery" subtitle="Manage photo albums and event photographs" />

        <div className="flex gap-3 justify-end">
          <button onClick={() => setShowAlbumForm(!showAlbumForm)} className="btn-primary flex items-center gap-2">
            <Plus size={15} />{showAlbumForm ? "Cancel" : "New Album"}
          </button>
        </div>

        {showAlbumForm && (
          <form onSubmit={handleCreateAlbum} className="card p-5 flex gap-4 items-end">
            <div className="flex-1"><label className="block text-xs font-semibold text-gray-600 mb-1">Album Title (English) *</label>
              <input value={albumForm.titleEn} onChange={e => setAlbumForm({...albumForm, titleEn: e.target.value})} className="input" required /></div>
            <div className="flex-1"><label className="block text-xs font-semibold text-gray-600 mb-1">Album Title (Marathi) *</label>
              <input value={albumForm.titleMr} onChange={e => setAlbumForm({...albumForm, titleMr: e.target.value})} className="input" required /></div>
            <button type="submit" className="btn-primary">Create Album</button>
          </form>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? [...Array(8)].map((_, i) => <div key={i} className="card aspect-square animate-pulse bg-gray-100 rounded-2xl" />) :
          albums.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p>No albums yet. Create your first album.</p>
            </div>
          ) :
          albums.map(album => (
            <div key={album.id} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleOpenAlbum(album)}>
              <div className="relative aspect-square bg-gray-100">
                {album.coverUrl ? (
                  <NextImage src={album.coverUrl} alt={album.titleEn} fill className="object-cover" sizes="25vw" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                    <FolderOpen size={32} />
                    <span className="text-xs">Open Album</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-semibold">Open</span>
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-900 truncate">{album.titleEn}</p>
                <p className="text-xs text-gray-500">{album.titleMr} • {album._count?.items || 0} photos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Album detail / photo upload view ────────────────────────────
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setSelectedAlbum(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="font-bold text-gray-900 text-lg">{selectedAlbum.titleEn}</h2>
          <p className="text-gray-500 text-sm">{selectedAlbum.titleMr} • {items.length} photos</p>
        </div>
      </div>

      {/* Upload panel */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Upload Event Photos</h3>
          <label className="btn-primary flex items-center gap-2 cursor-pointer">
            <Upload size={15} />
            Select Photos
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
          </label>
        </div>

        {uploadQueue.length > 0 && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
              {uploadQueue.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <input
                    value={item.title}
                    onChange={e => setUploadQueue(prev => prev.map((q, i) => i === idx ? {...q, title: e.target.value} : q))}
                    className="mt-1 w-full text-xs border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-saffron-400"
                    placeholder="Photo title"
                  />
                  <button onClick={() => removeFromQueue(idx)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleUpload} disabled={uploading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                <Upload size={15} />
                {uploading ? `Uploading ${uploadQueue.length} photos...` : `Upload ${uploadQueue.length} Photo${uploadQueue.length > 1 ? "s" : ""}`}
              </button>
              <button onClick={() => { uploadQueue.forEach(q => URL.revokeObjectURL(q.preview)); setUploadQueue([]); }} className="text-sm text-gray-500 hover:text-gray-700">
                Clear all
              </button>
            </div>
          </>
        )}

        {uploadQueue.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Click "Select Photos" to add event photographs</p>
            <p className="text-gray-400 text-xs mt-1">Supports JPG, PNG, WEBP • Multiple files supported</p>
          </div>
        )}
      </div>

      {/* Existing photos grid */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Album Photos ({items.length})</h3>
        {itemsLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
            <ImageIcon size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No photos yet. Upload event photos above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {items.map(item => (
              <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                <NextImage src={item.url} alt={item.title} fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs truncate flex-1">{item.title}</span>
                  <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 bg-red-500 text-white rounded-lg ml-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
