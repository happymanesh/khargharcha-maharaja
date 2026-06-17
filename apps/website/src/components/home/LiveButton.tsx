"use client";

import { Youtube } from "lucide-react";

export default function LiveButton() {
  return (
    <section className="bg-gray-950 py-6 px-4">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-3 text-white">
          <span className="flex items-center gap-1.5 bg-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </span>
          <span className="text-gray-300 text-sm">Watch us live on YouTube &amp; Instagram</span>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.youtube.com/@khargharChaMaharaja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            <Youtube size={16} />
            YouTube
          </a>
          <a
            href="https://www.instagram.com/kharghar_cha_maharaja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-opacity"
          >
            📸 Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
