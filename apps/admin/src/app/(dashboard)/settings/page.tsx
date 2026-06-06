"use client";
import Header from "@/components/layout/Header";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <Header title="Settings" subtitle="Manage site configuration" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organisation */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Organisation Details</h3>
          {[
            { label: "Organisation Name", value: "Navnirman Sevabhavi Sanstha", type: "text" },
            { label: "Brand Name", value: "Khargharcha Maharaja", type: "text" },
            { label: "Contact Email", value: "info@khargharmaharaja.org", type: "email" },
            { label: "Contact Phone", value: "+91 99999 99999", type: "tel" },
            { label: "Address", value: "Kharghar, Navi Mumbai, Maharashtra 410210", type: "text" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
              <input type={f.type} defaultValue={f.value} className="input" />
            </div>
          ))}
          <button className="btn-primary flex items-center gap-2"><Save size={14} />Save</button>
        </div>

        {/* Payment Settings */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Payment Gateway (Razorpay)</h3>
          {[
            { label: "Key ID", placeholder: "rzp_live_xxxxx", type: "text" },
            { label: "Key Secret", placeholder: "••••••••••••••••", type: "password" },
            { label: "Webhook Secret", placeholder: "••••••••", type: "password" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} className="input font-mono" />
            </div>
          ))}
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg p-3">
            ⚠️ Store credentials in environment variables, not here in production.
          </div>
          <button className="btn-primary flex items-center gap-2"><Save size={14} />Save</button>
        </div>

        {/* Social Media */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Social Media Links</h3>
          {[
            { label: "YouTube", value: "https://www.youtube.com/@khargharChaMaharaja" },
            { label: "Instagram", value: "https://www.instagram.com/kharghar_cha_maharaja" },
            { label: "Facebook", value: "" },
            { label: "WhatsApp Group", value: "" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
              <input type="url" defaultValue={f.value} placeholder={`https://...`} className="input" />
            </div>
          ))}
          <button className="btn-primary flex items-center gap-2"><Save size={14} />Save</button>
        </div>

        {/* Admin Users */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Admin Users</h3>
          {[
            { name: "Super Admin", email: "admin@khargharmaharaja.org", role: "SUPER_ADMIN" },
          ].map(a => (
            <div key={a.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-sm text-gray-900">{a.name}</p>
                <p className="text-xs text-gray-500">{a.email}</p>
              </div>
              <span className="badge bg-red-100 text-red-700">{a.role}</span>
            </div>
          ))}
          <button className="btn-secondary flex items-center gap-2 w-full justify-center"><span>+ Add Admin</span></button>
        </div>
      </div>
    </div>
  );
}
