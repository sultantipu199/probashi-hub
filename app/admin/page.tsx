"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  PhoneCall,
  Download,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Lock,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  Globe
} from "lucide-react";

interface Lead {
  id: string;
  user_name: string;
  phone_number: string;
  whatsapp_number: string;
  saudi_city: string;
  service_category: string;
  service_slug: string;
  service_title: string;
  details: string;
  status: "pending" | "contacted" | "converted" | "cancelled";
  created_at: string;
  admin_notes?: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittingPin, setSubmittingPin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check saved authentication on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem("probashi_admin_token");
    if (savedToken) {
      setAdminToken(savedToken);
      setIsAuthenticated(true);
      fetchLeads(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError("অনুগ্রহ করে পিন নম্বর প্রবেশ করান।");
      return;
    }

    setSubmittingPin(true);
    setPinError("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setIsAuthenticated(true);
        setAdminToken(data.token);
        sessionStorage.setItem("probashi_admin_token", data.token);
        setPinError("");
        fetchLeads(data.token);
      } else {
        setPinError(data.message || "ভুল পিন নম্বর! আবার চেষ্টা করুন।");
      }
    } catch (err) {
      setPinError("সার্ভারের সাথে যোগাযোগ করা যায়নি। পুনরায় চেষ্টা করুন।");
    } finally {
      setSubmittingPin(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken("");
    sessionStorage.removeItem("probashi_admin_token");
    localStorage.removeItem("probashi_admin_auth");
    setPinInput("");
  };

  const fetchLeads = async (activeToken?: string) => {
    setLoading(true);
    const token = activeToken || adminToken || sessionStorage.getItem("probashi_admin_token") || "";
    try {
      const res = await fetch("/api/leads", {
        headers: {
          "x-admin-token": token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.leads) {
          setLeads(data.leads);
        }
      } else if (res.status === 401) {
        handleLogout();
        setPinError("অ্যাডমিন সেশনের মেয়াদ শেষ হয়েছে। পুনরায় লগইন করুন।");
      }
    } catch (e) {
      console.error("Error fetching leads", e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    const token = adminToken || sessionStorage.getItem("probashi_admin_token") || "";
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ lead_id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((item) =>
            item.id === leadId ? { ...item, status: newStatus as any } : item
          )
        );
      } else if (res.status === 401) {
        handleLogout();
        setPinError("সেশন শেষ। পুনরায় পিন দিয়ে লগইন করুন।");
      }
    } catch (e) {
      console.error("Error updating lead status", e);
    } finally {
      setUpdatingId(null);
    }
  };

  // Export leads to CSV
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Phone", "WhatsApp", "City", "Service", "Details", "Status", "Date"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.user_name.replace(/"/g, '""')}"`,
      `"${l.phone_number}"`,
      `"${l.whatsapp_number}"`,
      `"${l.saudi_city}"`,
      `"${(l.service_title || l.service_category).replace(/"/g, '""')}"`,
      `"${(l.details || "").replace(/"/g, '""')}"`,
      l.status,
      l.created_at,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `probashi_hub_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;
    const inName = lead.user_name?.toLowerCase().includes(q);
    const inPhone = lead.phone_number?.toLowerCase().includes(q);
    const inCity = lead.saudi_city?.toLowerCase().includes(q);
    const inService = lead.service_title?.toLowerCase().includes(q) || lead.service_category?.toLowerCase().includes(q);
    return matchesStatus && (inName || inPhone || inCity || inService);
  });

  const stats = {
    total: leads.length,
    pending: leads.filter((l) => l.status === "pending").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  // If not authenticated, show secure PIN login modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-8 shadow-2xl shadow-emerald-950/50 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">অ্যাডমিন ব্যাকএন্ড পোর্টাল</h1>
            <p className="text-xs text-slate-400">
              প্রবাসীদের লিড ও ইনকোয়ারি দেখতে পিন কোড প্রবেশ করান।
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                নিরাপদ অ্যাডমিন পিন কোড
              </label>
              <input
                type="password"
                value={pinInput}
                disabled={submittingPin}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="গোপন পিন কোড লিখুন..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none focus:border-emerald-500 transition"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-400 mt-2 text-center font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              disabled={submittingPin}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/40"
            >
              {submittingPin ? "যাচাই করা হচ্ছে..." : "ড্যাশবোর্ডে প্রবেশ করুন"}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-emerald-400 transition">
              ← হোমপেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-emerald-950 border border-emerald-700/60 rounded-lg text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">লিড ম্যানেজমেন্ট ব্যাকএন্ড</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            প্রবাসী সেবা প্রার্থীদের তথ্য, সরাসরি হোয়াটসঅ্যাপ যোগাযোগ ও লিগ্যাল পার্টনার ট্র্যাকার।
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchLeads()}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            <span>রিফ্রেশ</span>
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center shadow-lg transition"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Excel / CSV এক্সপোর্ট</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs text-slate-400 hover:text-red-400 transition"
          >
            লগআউট
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>সর্বমোট লিড</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.total}</div>
          <div className="text-[10px] text-slate-500 mt-1">ওয়েবসাইট ও WhatsApp থেকে</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-600/30 bg-amber-950/20">
          <div className="flex items-center justify-between text-amber-300 text-xs font-medium mb-1">
            <span>অপেক্ষমাণ (Pending)</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300">{stats.pending}</div>
          <div className="text-[10px] text-amber-400/70 mt-1">যোগাযোগ করা প্রয়োজন</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-blue-600/30 bg-blue-950/20">
          <div className="flex items-center justify-between text-blue-300 text-xs font-medium mb-1">
            <span>যোগাযোগকৃত (Contacted)</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-300">{stats.contacted}</div>
          <div className="text-[10px] text-blue-400/70 mt-1">বার্তা বা কল পাঠানো হয়েছে</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-600/30 bg-emerald-950/20">
          <div className="flex items-center justify-between text-emerald-300 text-xs font-medium mb-1">
            <span>সফল কনভার্শন (Done)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300">{stats.converted}</div>
          <div className="text-[10px] text-emerald-400/70 mt-1">পার্টনার বা কেস সমাধান</div>
        </div>
      </div>

      {/* Google Search Console & SEO Automation Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 transition-all rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Google Search Console & SEO কানেকশন</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  ভেরিফিকেশন রেডি
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                লাইভ ডোমেন <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">https://probashi-hub.vercel.app</code> গুগল কনসোলে ১-ক্লিকে ভেরিফাই করুন।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://search.google.com/search-console/welcome?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/40"
            >
              <span>গুগল কনসোল ওপেন করুন</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <span>Sitemap (83 URLs)</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <span>Robots.txt</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block mb-1 font-medium">১. অটো ফাইল ভেরিফিকেশন (HTML File):</span>
            <span className="text-emerald-400 font-semibold font-mono text-[11px]">Dynamic /google*.html সক্রিয়</span>
            <p className="text-[10px] text-slate-500 mt-1">Google Console-এ &apos;HTML file&apos; অপশন রেখে সরাসরি Verify বাটনে ক্লিক করুন।</p>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block mb-1 font-medium">২. HTML Meta Tag ভেরিফিকেশন:</span>
            <span className="text-emerald-400 font-semibold font-mono text-[11px]">&lt;meta google-site-verification&gt;</span>
            <p className="text-[10px] text-slate-500 mt-1">সব পেজের &lt;head&gt; ট্যাগে ভেরিফিকেশন কোড সক্রিয় করা আছে।</p>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block mb-1 font-medium">৩. সাইটম্যাপ ইনডেক্সিং:</span>
            <span className="text-slate-300 font-mono text-[11px]">https://probashi-hub.vercel.app/sitemap.xml</span>
            <p className="text-[10px] text-slate-500 mt-1">ভেরিফিকেশনের পর &apos;Sitemaps&apos; মেনুতে গিয়ে sitemap.xml সাবমিট করুন।</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন নম্বর বা শহর দিয়ে খুঁজুন..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> স্ট্যাটাস:
          </span>
          {["all", "pending", "contacted", "converted"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                statusFilter === st
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {st === "all" ? "সবগুলো" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-300">কোনো লিড পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">নতুন আবেদন জমা হলে এখানে সরাসরি প্রদর্শিত হবে।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeads.map((lead) => {
              const cleanPhone = lead.phone_number.replace(/[^0-9]/g, "");
              const waText = encodeURIComponent(
                `আসসালামু আলাইকুম ${lead.user_name} ভাই, Probashi Hub থেকে আপনার '${lead.service_title || lead.service_category}' সম্পর্কিত অনুসন্ধানের প্রেক্ষিতে যোগাযোগ করছি। আপনি কি এখন কথা বলতে পারবেন?`
              );
              const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

              return (
                <div
                  key={lead.id}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-base">{lead.user_name}</span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                        📍 {lead.saudi_city}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/40">
                        {lead.service_title || lead.service_category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          lead.status === "pending"
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : lead.status === "contacted"
                            ? "bg-blue-950 text-blue-300 border border-blue-800"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      &ldquo;{lead.details}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>📞 {lead.phone_number}</span>
                      <span>📅 {new Date(lead.created_at).toLocaleString("bn-BD")}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center shadow-lg transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                      <span>WhatsApp চ্যাট</span>
                    </a>

                    <a
                      href={`tel:${lead.phone_number}`}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5 mr-1" />
                      <span>কল</span>
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Monetization & Setup Info Box */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>মনিটাইজেশন ও কমিশন সেটআপ গাইড</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          উপরে প্রাপ্ত লিডগুলো আপনি সরাসরি রিয়াদ বা জেদ্দার লাইসেন্সধারী ট্রাভেল ও লিগ্যাল এজেন্সিদের কাছে রেফার করে প্রতি সফল সার্ভিসে ৫০ থেকে ২০০ রিয়াল কমিশন নিতে পারেন। এক্সপোর্ট বাটনে চাপ দিয়ে যেকোনো সময় সম্পূর্ণ ক্লায়েন্ট তালিকা ডাউনলোড করতে পারবেন।
        </p>
      </div>
    </div>
  );
}
