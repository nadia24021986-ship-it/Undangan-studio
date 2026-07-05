import React, { useState, useEffect, useRef } from "react";
import {
  Copy,
  Smartphone,
  Monitor,
  MapPin,
  Calendar,
  Clock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Music,
  Trash2,
  Upload,
  Heart,
  Sparkles,
  User,
  Palette,
  LayoutGrid,
  Film,
  Send,
  ArrowLeft,
  Link as LinkIcon,
  X,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  RefreshCw,
  Users,
  Share2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  KONSTANTA: TEMA & FONT                                             */
/* ------------------------------------------------------------------ */

const THEMES = {
  royalGold: {
    label: "Royal Gold",
    swatch: "bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700",
    bg: "bg-[#0c0a05]",
    panelBg: "bg-gradient-to-b from-[#12100a] to-[#0c0a05]",
    text: "text-amber-50",
    subtext: "text-amber-200/70",
    border: "border-amber-500/30",
    accent: "text-amber-400",
    accentBg: "bg-amber-500",
    accentBgHover: "hover:bg-amber-400",
    divider: "bg-gradient-to-r from-transparent via-amber-400 to-transparent",
    cardBg: "bg-amber-950/20",
    ring: "ring-amber-400/40",
  },
  rusticEmerald: {
    label: "Rustic Emerald",
    swatch: "bg-gradient-to-br from-emerald-300 via-emerald-600 to-emerald-900",
    bg: "bg-[#07120d]",
    panelBg: "bg-gradient-to-b from-[#0b1a12] to-[#07120d]",
    text: "text-emerald-50",
    subtext: "text-emerald-200/70",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-600",
    accentBgHover: "hover:bg-emerald-500",
    divider: "bg-gradient-to-r from-transparent via-emerald-400 to-transparent",
    cardBg: "bg-emerald-950/20",
    ring: "ring-emerald-400/40",
  },
  romanticBlush: {
    label: "Romantic Blush",
    swatch: "bg-gradient-to-br from-rose-200 via-rose-400 to-rose-600",
    bg: "bg-[#1a0f10]",
    panelBg: "bg-gradient-to-b from-[#241315] to-[#1a0f10]",
    text: "text-rose-50",
    subtext: "text-rose-200/70",
    border: "border-rose-400/30",
    accent: "text-rose-300",
    accentBg: "bg-rose-500",
    accentBgHover: "hover:bg-rose-400",
    divider: "bg-gradient-to-r from-transparent via-rose-300 to-transparent",
    cardBg: "bg-rose-950/20",
    ring: "ring-rose-300/40",
  },
  midnightNavy: {
    label: "Midnight Navy",
    swatch: "bg-gradient-to-br from-sky-300 via-blue-700 to-slate-950",
    bg: "bg-[#05070f]",
    panelBg: "bg-gradient-to-b from-[#0a0e1c] to-[#05070f]",
    text: "text-sky-50",
    subtext: "text-sky-200/70",
    border: "border-sky-500/30",
    accent: "text-sky-300",
    accentBg: "bg-sky-600",
    accentBgHover: "hover:bg-sky-500",
    divider: "bg-gradient-to-r from-transparent via-sky-300 to-transparent",
    cardBg: "bg-sky-950/20",
    ring: "ring-sky-300/40",
  },
};

const FONTS = {
  serif: {
    label: "Serif Elegan",
    family: "'Playfair Display', serif",
    googleName: "Playfair+Display:wght@400;500;600;700;800",
  },
  script: {
    label: "Script Romantis",
    family: "'Great Vibes', cursive",
    googleName: "Great+Vibes",
  },
  sans: {
    label: "Sans Modern",
    family: "'Poppins', sans-serif",
    googleName: "Poppins:wght@300;400;500;600;700",
  },
};

const TABS = [
  { id: "general", label: "Info Acara", icon: LayoutGrid },
  { id: "media", label: "Media", icon: Film },
];

/* ------------------------------------------------------------------ */
/*  JENIS ACARA: menentukan label & tata letak yang sesuai             */
/* ------------------------------------------------------------------ */
const EVENT_TYPES = {
  pernikahan: {
    label: "Pernikahan",
    coverTag: "The Wedding Of",
    contentTag: "We Are Getting Married",
    twoPersons: true,
    personSectionTitle: "Data Mempelai",
    person1Label: "Mempelai Pria",
    person2Label: "Mempelai Wanita",
    parentsPrefix: "Putra dari",
    parentsPrefix2: "Putri dari",
  },
  khitanan: {
    label: "Khitanan / Sunatan",
    coverTag: "Turut Mengundang",
    contentTag: "Acara Khitanan",
    twoPersons: false,
    personSectionTitle: "Profil Anak yang Dikhitan",
    person1Label: "Data Anak",
    parentsPrefix: "Putra dari",
  },
  aqiqah: {
    label: "Aqiqah",
    coverTag: "Turut Mengundang",
    contentTag: "Acara Aqiqah",
    twoPersons: false,
    personSectionTitle: "Profil Anak",
    person1Label: "Data Anak",
    parentsPrefix: "Putra/Putri dari",
  },
  syukuran: {
    label: "Syukuran",
    coverTag: "Turut Mengundang",
    contentTag: "Acara Syukuran",
    twoPersons: false,
    personSectionTitle: "Profil Acara",
    person1Label: "Nama yang Merayakan",
    parentsPrefix: "Keluarga dari",
  },
  ulangtahun: {
    label: "Ulang Tahun",
    coverTag: "Turut Mengundang",
    contentTag: "Perayaan Ulang Tahun",
    twoPersons: false,
    personSectionTitle: "Profil Acara",
    person1Label: "Nama yang Berulang Tahun",
    parentsPrefix: "Keluarga dari",
  },
  lainnya: {
    label: "Acara Lainnya",
    coverTag: "Turut Mengundang",
    contentTag: "Acara Kami",
    twoPersons: false,
    personSectionTitle: "Profil Acara",
    person1Label: "Nama Utama",
    parentsPrefix: "Keluarga dari",
  },
};

/* ------------------------------------------------------------------ */
/*  DATA DEFAULT (DUMMY)                                               */
/* ------------------------------------------------------------------ */

const DEFAULT_DATA = {
  eventType: "pernikahan",
  slug: "budi-rara",
  guestName: "Bapak/Ibu Sahabat Kami",
  eventDate: "2026-11-14",
  eventTime: "10:00 - 13:00 WIB",
  address: "Grand Ballroom Hotel Mahoni, Jl. Kenanga No. 8, Yogyakarta",
  mapsLink: "https://maps.google.com",
  quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
  quoteSource: "QS. Ar-Rum: 21",
  coverPhoto:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  theme: "royalGold",
  font: "serif",
  groom: {
    photo:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
    nickname: "Budi",
    fullName: "Budi Setiawan, S.T.",
    father: "Bapak Hartono",
    mother: "Ibu Sulastri",
  },
  bride: {
    photo:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
    nickname: "Rara",
    fullName: "Rara Anindita, S.Pd.",
    father: "Bapak Wibowo",
    mother: "Ibu Kartika",
  },
  gallery: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    },
  ],
  music: "",
};

/* ------------------------------------------------------------------ */
/*  KOMPONEN KECIL: FIELD EDITOR                                       */
/* ------------------------------------------------------------------ */

function FieldLabel({ children, icon: Icon }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
      {Icon && <Icon size={13} className="text-slate-500" />}
      {children}
    </label>
  );
}

function TextInput({ label, icon, ...props }) {
  return (
    <div className="mb-4">
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <input
        {...props}
        className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-fuchsia-500/60 focus:ring-1 focus:ring-fuchsia-500/40 transition-all"
      />
    </div>
  );
}

function TextArea({ label, icon, ...props }) {
  return (
    <div className="mb-4">
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <textarea
        {...props}
        className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-fuchsia-500/60 focus:ring-1 focus:ring-fuchsia-500/40 transition-all resize-none"
      />
    </div>
  );
}

function UploadBox({ label, previewUrl, onFile, roundedFull }) {
  const inputRef = useRef(null);
  return (
    <div className="mb-4">
      <FieldLabel icon={Upload}>{label}</FieldLabel>
      <div
        onClick={() => inputRef.current?.click()}
        className={`group relative cursor-pointer border border-dashed border-slate-700 hover:border-fuchsia-500/60 transition-colors overflow-hidden flex items-center justify-center bg-slate-900/60 ${
          roundedFull ? "w-20 h-20 rounded-full" : "w-full h-28 rounded-lg"
        }`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-600">
            <ImageIcon size={20} />
            <span className="text-[10px]">Unggah Foto</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload size={16} className="text-white" />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KONEKSI SERVER (SUPABASE) — untuk menyimpan & mengambil data       */
/*  undangan secara online, supaya bisa dibuka dari HP mana pun.       */
/* ------------------------------------------------------------------ */

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").trim().replace(/\/+$/, "");
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

async function fetchInvitation(slug) {
  if (!isSupabaseConfigured || !slug) return { data: null, error: "not-configured" };
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/invitations?slug=eq.${encodeURIComponent(slug)}&select=data`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
        },
      }
    );
    if (!res.ok) {
      let bodyText = "";
      try {
        bodyText = await res.text();
      } catch {
        // abaikan
      }
      return { data: null, error: `http-${res.status}:${bodyText.slice(0, 120)}` };
    }
    const json = await res.json();
    if (!json || json.length === 0) return { data: null, error: "not-found" };
    return { data: json[0].data, error: null };
  } catch (err) {
    return { data: null, error: `network:${(err && err.message) || "unknown"}` };
  }
}

async function saveInvitation(slug, data) {
  if (!isSupabaseConfigured || !slug) return { ok: false };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/invitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([{ slug, data, updated_at: new Date().toISOString() }]),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/* ------------------------------------------------------------------ */
/*  ROUTING SEDERHANA BERBASIS PATH (tanpa library routing)            */
/*  "/"                  -> mode ADMIN  (dashboard editor, dikunci)    */
/*  "/tuan-rumah/<slug>" -> mode HOST   (generator link tamu)          */
/*  "/<slug>?to=<nama>"  -> mode GUEST  (tampilan undangan untuk tamu) */
/* ------------------------------------------------------------------ */

function parseRoute() {
  if (typeof window === "undefined") return { mode: "admin" };
  let path = window.location.pathname.replace(/\/+$/, "");
  if (path === "") path = "/";
  if (path === "/") return { mode: "admin" };
  if (path === "/tuan-rumah") return { mode: "host", slug: "" };
  if (path.startsWith("/tuan-rumah/")) {
    const slug = decodeURIComponent(path.slice("/tuan-rumah/".length));
    return { mode: "host", slug };
  }
  const slug = decodeURIComponent(path.slice(1).split("/")[0]);
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to") || "";
  return { mode: "guest", slug, guestName };
}

/* ------------------------------------------------------------------ */
/*  APP UTAMA (ROUTER)                                                 */
/* ------------------------------------------------------------------ */

const ADMIN_UNLOCK_KEY = "undangkita_admin_unlocked";
// Ganti password default ini lewat Environment Variable VITE_ADMIN_PASSWORD di Vercel.
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || "admin123").toString();

const DRAFT_STORAGE_KEY = "undangkita_studio_draft";

// Muat draf terakhir dari localStorage (hanya dipakai di sisi Admin),
// supaya kalau app ditutup tanpa sempat tersimpan ke server, isian tidak hilang.
function loadInitialData() {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const saved = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_DATA, ...parsed };
    }
  } catch {
    // abaikan, pakai default
  }
  return DEFAULT_DATA;
}

export default function App() {
  const [route] = useState(parseRoute);

  if (route.mode === "host") {
    return <HostLinkPage slug={route.slug} />;
  }
  if (route.mode === "guest") {
    return <GuestPage slug={route.slug} guestNameOverride={route.guestName} />;
  }
  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [viewMode, setViewMode] = useState("hp"); // 'hp' | 'pc'
  const [invitationState, setInvitationState] = useState("cover"); // 'cover' | 'content'
  const [data, setData] = useState(loadInitialData);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(ADMIN_UNLOCK_KEY) === "true"
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error

  /* ---- Simpan draf otomatis ke localStorage setiap ada perubahan data ---- */
  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // abaikan kalau storage penuh / tidak tersedia
    }
  }, [data]);

  /* ---- Autosave ke server (debounced) setiap ada perubahan, kalau sudah login ---- */
  useEffect(() => {
    if (!unlocked || !data.slug) return;
    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      const result = await saveInvitation(data.slug, data);
      setSaveStatus(result.ok ? "saved" : "error");
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, unlocked]);

  const theme = THEMES[data.theme];
  const font = FONTS[data.font];
  const currentEventType = EVENT_TYPES[data.eventType] || EVENT_TYPES.pernikahan;

  /* ---- Inject Google Fonts dinamis ---- */
  useEffect(() => {
    const linkId = "undangkita-google-fonts";
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const families = Object.values(FONTS)
      .map((f) => `family=${f.googleName}`)
      .join("&");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, []);

  /* ---- Handlers umum ---- */
  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));
  const updatePerson = (role, key, value) =>
    setData((prev) => ({ ...prev, [role]: { ...prev[role], [key]: value } }));

  const handleOpenInvitation = () => {
    setInvitationState("content");
  };

  const handleBackToCover = () => {
    setInvitationState("cover");
    setGalleryIndex(0);
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const items = files.map((f) => ({
      type: f.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(f),
    }));
    setData((prev) => ({ ...prev, gallery: [...prev.gallery, ...items] }));
  };

  const removeGalleryItem = (idx) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx),
    }));
    setGalleryIndex(0);
  };

  const copyLink = () => {
    const origin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "";
    const slug = data.slug || "nama-anda";
    const url = `${origin}/tuan-rumah/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      window.localStorage.setItem(ADMIN_UNLOCK_KEY, "true");
      setUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const formattedDate = (() => {
    try {
      return new Date(data.eventDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return data.eventDate;
    }
  })();

  const nextSlide = () =>
    setGalleryIndex((i) => (data.gallery.length ? (i + 1) % data.gallery.length : 0));
  const prevSlide = () =>
    setGalleryIndex((i) =>
      data.gallery.length ? (i - 1 + data.gallery.length) % data.gallery.length : 0
    );

  /* ================================================================ */
  /*  GERBANG PASSWORD: hanya pemilik app yang bisa masuk dashboard    */
  /* ================================================================ */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-xs bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 flex items-center justify-center mb-4">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-lg mb-1">Dashboard Admin</h1>
          <p className="text-slate-500 text-xs mb-5">
            Halaman ini khusus pemilik aplikasi. Masukkan kata sandi untuk melanjutkan.
          </p>
          <input
            type="password"
            autoFocus
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setPasswordError(false);
            }}
            placeholder="Kata sandi"
            className={`w-full bg-slate-950 border rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none mb-2 ${
              passwordError ? "border-red-500" : "border-slate-700 focus:border-fuchsia-500/60"
            }`}
          />
          {passwordError && (
            <p className="text-red-400 text-[11px] mb-3">Kata sandi salah, coba lagi.</p>
          )}
          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2"
          >
            Masuk
          </button>
        </form>
      </div>
    );
  }

  /* ================================================================ */
  /*  DASHBOARD ADMIN: editor split-screen                             */
  /* ================================================================ */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* =============== HEADER =============== */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-fuchsia-900/40">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-[15px] sm:text-base font-bold tracking-tight text-white">
                UndangKita <span className="text-fuchsia-400">Studio</span>
              </h1>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Wedding Invitation Maker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSupabaseConfigured ? (
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
                {saveStatus === "saving" && (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Menyimpan...
                  </>
                )}
                {saveStatus === "saved" && (
                  <>
                    <CheckCircle2 size={12} className="text-emerald-400" /> Tersimpan
                  </>
                )}
                {saveStatus === "error" && (
                  <>
                    <AlertCircle size={12} className="text-red-400" /> Gagal simpan
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-amber-400">
                <AlertCircle size={12} /> Server belum terhubung
              </div>
            )}

            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-full p-1">
              <button
                onClick={() => setViewMode("hp")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === "hp"
                    ? "bg-fuchsia-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Smartphone size={13} /> HP Simulator
              </button>
              <button
                onClick={() => setViewMode("pc")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === "pc"
                    ? "bg-fuchsia-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Monitor size={13} /> Monitor PC
              </button>
            </div>

            <button
              onClick={copyLink}
              className="relative flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-200 transition-colors px-3.5 py-2 rounded-full text-xs font-semibold shadow"
            >
              {copied ? <Sparkles size={13} /> : <Copy size={13} />}
              {copied ? "Tersalin!" : "Link Tuan Rumah"}
            </button>
          </div>
        </div>
      </header>

      {/* =============== BODY: SPLIT SCREEN =============== */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* -------- KOLOM KIRI: EDITOR -------- */}
        <section className="w-full lg:w-[46%] xl:w-[42%] bg-slate-950 border-r border-slate-800/80">
          {/* Tab nav */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-800/80 bg-slate-900/40 sticky top-[57px] z-30 backdrop-blur-md">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] flex flex-col items-center gap-1 py-3 text-[11px] font-medium border-b-2 transition-all ${
                    isActive
                      ? "border-fuchsia-500 text-fuchsia-400"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-5 sm:p-6 max-h-[calc(100vh-115px)] overflow-y-auto">
            {/* ============ TAB 1: INFO ACARA ============ */}
            {activeTab === "general" && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <SectionTitle title="Info Acara" desc="Atur URL undangan dan identitas acara." />

                <div className="mb-5">
                  <FieldLabel icon={Sparkles}>Jenis Acara</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(EVENT_TYPES).map(([key, ev]) => (
                      <button
                        key={key}
                        onClick={() => update("eventType", key)}
                        className={`rounded-lg border-2 py-2.5 px-2 text-xs font-medium transition-all ${
                          data.eventType === key
                            ? "border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-300"
                            : "border-slate-800 hover:border-slate-600 text-slate-300"
                        }`}
                      >
                        {ev.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <FieldLabel icon={LinkIcon}>Slug URL Undangan</FieldLabel>
                  <div className="flex items-center bg-slate-900/80 border border-slate-700/80 rounded-lg overflow-hidden focus-within:border-fuchsia-500/60 focus-within:ring-1 focus-within:ring-fuchsia-500/40">
                    <span className="pl-3 text-xs text-slate-500 whitespace-nowrap">
                      situs-anda.com/
                    </span>
                    <input
                      value={data.slug}
                      onChange={(e) => update("slug", e.target.value)}
                      placeholder="budi-rara"
                      className="w-full bg-transparent px-1 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none"
                    />
                  </div>
                </div>

                <div className={`rounded-xl border ${isSupabaseConfigured ? "border-fuchsia-500/30 bg-fuchsia-500/5" : "border-amber-500/30 bg-amber-500/5"} p-4 mb-6`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isSupabaseConfigured ? "text-fuchsia-400" : "text-amber-400"}`}>
                    Link untuk Tuan Rumah
                  </p>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                    Kirim link ini ke tuan rumah acara. Mereka hanya bisa mengetik nama tamu
                    untuk membuat link personal, tanpa bisa mengubah isi undangan.
                  </p>
                  <div className="flex items-center gap-2 bg-slate-950/60 rounded-lg px-3 py-2 mb-2">
                    <code className="text-[11px] text-slate-300 truncate flex-1">
                      {typeof window !== "undefined" ? window.location.origin : ""}/tuan-rumah/
                      {data.slug || "..."}
                    </code>
                    <button
                      onClick={copyLink}
                      className="shrink-0 text-fuchsia-400 hover:text-fuchsia-300"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  {!isSupabaseConfigured && (
                    <p className="text-[10px] text-amber-400/80">
                      ⚠️ Server belum terhubung — link ini belum bisa dibuka tuan rumah/tamu
                      sampai Environment Variable Supabase dipasang di Vercel.
                    </p>
                  )}
                </div>

                <TextInput
                  label="Nama Penerima Tamu"
                  icon={User}
                  placeholder="Bapak/Ibu ..."
                  value={data.guestName}
                  onChange={(e) => update("guestName", e.target.value)}
                />

                <TextInput
                  label="Tanggal Acara"
                  icon={Calendar}
                  type="date"
                  value={data.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                />

                <TextInput
                  label={currentEventType.person1Label}
                  icon={User}
                  placeholder="Budi"
                  value={data.groom.nickname}
                  onChange={(e) => updatePerson("groom", "nickname", e.target.value)}
                />

                {currentEventType.twoPersons && (
                  <TextInput
                    label={currentEventType.person2Label}
                    icon={User}
                    placeholder="Rara"
                    value={data.bride.nickname}
                    onChange={(e) => updatePerson("bride", "nickname", e.target.value)}
                  />
                )}

                <TextInput
                  label="Link Google Maps"
                  icon={MapPin}
                  placeholder="https://maps.google.com/..."
                  value={data.mapsLink}
                  onChange={(e) => update("mapsLink", e.target.value)}
                />
              </div>
            )}

            {/* ============ TAB 2: MEDIA ============ */}
            {activeTab === "media" && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <SectionTitle title="Media" desc="Ganti background sampul dan unggah video/foto isi undangan." />

                <UploadBox
                  label="Ganti Background Sampul"
                  previewUrl={data.coverPhoto}
                  onFile={(url) => update("coverPhoto", url)}
                />

                <div className="mt-6">
                  <FieldLabel icon={ImageIcon}>Import Video / Foto Undangan</FieldLabel>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    Unggah hasil desain video/foto undangan kamu (dari aplikasi lain). File ini
                    yang akan langsung tampil begitu tamu menekan tombol "Buka Undangan". Bisa
                    unggah lebih dari satu — akan tampil berurutan otomatis.
                  </p>
                  <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-700 hover:border-fuchsia-500/60 rounded-lg py-6 cursor-pointer mb-3 bg-slate-900/60 transition-colors">
                    <Upload size={18} className="text-slate-500" />
                    <span className="text-xs text-slate-500">Klik untuk unggah foto/video (bisa multiple)</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={handleGalleryUpload}
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {data.gallery.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-lg overflow-hidden aspect-square bg-slate-900 border border-slate-800"
                      >
                        {item.type === "video" ? (
                          <video src={item.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={item.url} className="w-full h-full object-cover" alt="" />
                        )}
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                          {idx + 1}
                        </span>
                        <button
                          onClick={() => removeGalleryItem(idx)}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {data.gallery.length === 0 && (
                      <p className="col-span-3 text-center text-xs text-slate-600 py-6">
                        Belum ada video/foto yang diunggah.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* -------- KOLOM KANAN: PREVIEW -------- */}
        <section className="flex-1 bg-[radial-gradient(circle_at_top,_#1e1b2e,_#020103)] flex items-center justify-center py-10 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:22px_22px]" />

          <PhoneFrame viewMode={viewMode}>
            <InvitationPreview
              data={data}
              theme={theme}
              font={font}
              invitationState={invitationState}
              onOpen={handleOpenInvitation}
              onBack={handleBackToCover}
              galleryIndex={galleryIndex}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              formattedDate={formattedDate}
            />
          </PhoneFrame>
        </section>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION TITLE                                                      */
/* ------------------------------------------------------------------ */
function SectionTitle({ title, desc }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PHONE / MONITOR FRAME                                              */
/* ------------------------------------------------------------------ */
function PhoneFrame({ viewMode, children }) {
  if (viewMode === "pc") {
    return (
      <div className="w-full max-w-[900px]">
        <div className="rounded-t-xl bg-slate-800 h-7 flex items-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="bg-black rounded-b-xl border-4 border-t-0 border-slate-800 overflow-hidden shadow-2xl shadow-black/60 h-[75vh]">
          <div className="h-full w-full overflow-y-auto scrollbar-hide mx-auto max-w-[430px]">
            {children}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="w-[300px] sm:w-[330px] h-[640px] sm:h-[690px] bg-slate-950 rounded-[2.8rem] border-[6px] border-slate-800 shadow-2xl shadow-black/70 relative overflow-hidden ring-1 ring-slate-700/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-30" />
        <div className="w-full h-full overflow-y-auto scrollbar-hide rounded-[2.3rem]">
          {children}
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -left-[7px] top-24 w-1.5 h-8 bg-slate-800 rounded-l-sm" />
      <div className="absolute -left-[7px] top-36 w-1.5 h-14 bg-slate-800 rounded-l-sm" />
      <div className="absolute -right-[7px] top-32 w-1.5 h-16 bg-slate-800 rounded-r-sm" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PREVIEW UNDANGAN (COVER + CONTENT)                                 */
/* ------------------------------------------------------------------ */
function InvitationPreview({
  data,
  theme,
  font,
  invitationState,
  onOpen,
  onBack,
  galleryIndex,
  nextSlide,
  prevSlide,
  formattedDate,
}) {
  return (
    <div className={`relative w-full h-full ${theme.bg} ${theme.text}`} style={{ fontFamily: font.family }}>
      {invitationState === "cover" ? (
        <CoverScreen data={data} theme={theme} font={font} onOpen={onOpen} />
      ) : (
        <ContentScreen
          data={data}
          theme={theme}
          onBack={onBack}
          galleryIndex={galleryIndex}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      )}
    </div>
  );
}

/* ---------------- STATE 1: COVER ---------------- */
function CoverScreen({ data, theme, font, onOpen }) {
  const et = EVENT_TYPES[data.eventType] || EVENT_TYPES.pernikahan;
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between text-center px-6 py-10 overflow-hidden">
      <img
        src={data.coverPhoto}
        alt="cover"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

      <div className="relative z-10 pt-4">
        <p className={`text-[11px] tracking-[0.3em] uppercase ${theme.accent} animate-pulse`}>
          {et.coverTag}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1
          className="text-4xl sm:text-5xl text-white drop-shadow-lg leading-tight"
          style={{ fontFamily: FONTS.script.family }}
        >
          {et.twoPersons ? (
            <>
              {data.groom.nickname} <span className={theme.accent}>&</span> {data.bride.nickname}
            </>
          ) : (
            data.groom.nickname
          )}
        </h1>
        <div className={`h-px w-16 ${theme.divider}`} />
        <p className="text-xs text-white/80 tracking-wide">{formatShortDate(data.eventDate)}</p>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-4">
        <div className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/60 mb-1">Kepada Yth.</p>
          <p className="text-sm font-semibold text-white">{data.guestName || "Tamu Undangan"}</p>
        </div>

        <button
          onClick={onOpen}
          className={`group flex items-center gap-2 ${theme.accentBg} ${theme.accentBgHover} text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-black/40 transition-all hover:scale-105`}
        >
          <Sparkles size={15} className="group-hover:rotate-12 transition-transform" />
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

function formatShortDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ---------------- STATE 2: CONTENT ---------------- */
function ContentScreen({ data, theme, onBack, galleryIndex, nextSlide, prevSlide }) {
  const gallery = data.gallery || [];
  const currentMedia = gallery[galleryIndex];

  /* Auto-lanjut ke slide berikutnya untuk foto (video lanjut otomatis lewat onEnded) */
  useEffect(() => {
    if (!currentMedia || currentMedia.type === "video") return;
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryIndex, currentMedia]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {currentMedia ? (
        currentMedia.type === "video" ? (
          <video
            key={galleryIndex}
            src={currentMedia.url}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            controls
            onEnded={nextSlide}
          />
        ) : (
          <img
            key={galleryIndex}
            src={currentMedia.url}
            className="w-full h-full object-contain"
            alt="Undangan"
          />
        )
      ) : (
        <div className="text-slate-500 text-xs text-center px-8 leading-relaxed">
          Belum ada video atau foto yang diunggah untuk undangan ini.
        </div>
      )}

      {/* Overlay atas: tombol lihat lokasi */}
      {data.mapsLink && (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-20 px-6">
          <a
            href={data.mapsLink}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1.5 ${theme.accentBg} text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg`}
          >
            <MapPin size={13} /> Lihat Lokasi
          </a>
        </div>
      )}

      {/* Prev/Next + indikator */}
      {gallery.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {gallery.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === galleryIndex ? `w-4 ${theme.accentBg}` : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Kembali ke sampul */}
      <div className="absolute bottom-4 left-0 right-0 px-6 z-20">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold py-3 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Sampul Depan
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ theme, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`h-px flex-1 ${theme.divider}`} />
      <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{title}</h3>
      <div className={`h-px flex-1 ${theme.divider}`} />
    </div>
  );
}

function PersonCard({ person, theme, parentsPrefix }) {
  const hasParents = Boolean(person.father || person.mother);
  return (
    <div className={`flex flex-col items-center text-center rounded-xl border ${theme.border} ${theme.cardBg} p-5`}>
      <div className={`w-24 h-24 rounded-full overflow-hidden ring-2 ${theme.ring} ring-offset-2 ring-offset-transparent mb-3 sepia-[.15]`}>
        <img src={person.photo} alt={person.fullName} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-lg mb-1" style={{ fontFamily: FONTS.script.family }}>
        {person.nickname}
      </h4>
      <p className="text-sm font-semibold mb-1">{person.fullName}</p>
      {hasParents && (
        <p className={`text-[11px] ${theme.subtext}`}>
          {parentsPrefix || "Putra/Putri dari"} {person.father}
          {person.father && person.mother ? " & " : ""}
          {person.mother}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HALAMAN TAMU: "/<slug>?to=<nama>"                                  */
/*  Read-only. Mengambil data dari server berdasarkan slug, lalu       */
/*  menampilkan undangan penuh layar dengan nama tamu dari query.      */
/* ------------------------------------------------------------------ */
function GuestPage({ slug, guestNameOverride }) {
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error
  const [data, setData] = useState(null);
  const [invitationState, setInvitationState] = useState("cover");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setErrorDetail("not-configured");
        setStatus("error");
        return;
      }
      const result = await fetchInvitation(slug);
      if (cancelled) return;
      if (result.error === "not-found") {
        setStatus("not-found");
      } else if (result.error) {
        setErrorDetail(result.error);
        setStatus("error");
      } else {
        setData(result.data);
        setStatus("ready");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* ---- Inject Google Fonts (tamu juga butuh font yang sama) ---- */
  useEffect(() => {
    const linkId = "undangkita-google-fonts";
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const families = Object.values(FONTS)
      .map((f) => `family=${f.googleName}`)
      .join("&");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <Loader2 size={28} className="animate-spin text-fuchsia-400" />
        <p className="text-sm">Memuat undangan...</p>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-center px-6 gap-2">
        <AlertCircle size={28} className="text-amber-400 mb-2" />
        <p className="text-white font-semibold">Undangan tidak ditemukan</p>
        <p className="text-slate-500 text-xs max-w-xs">
          Link ini mungkin salah ketik, atau undangannya belum dipublikasikan oleh pemilik acara.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-center px-6 gap-2">
        <AlertCircle size={28} className="text-red-400 mb-2" />
        <p className="text-white font-semibold">Undangan belum bisa dimuat</p>
        <p className="text-slate-500 text-xs max-w-xs">
          Server sedang bermasalah atau belum terhubung. Coba muat ulang halaman beberapa saat lagi.
        </p>
        <p className="text-slate-700 text-[10px] mt-3 max-w-xs break-all px-2">Kode: {errorDetail || "unknown"}</p>
      </div>
    );
  }

  const theme = THEMES[data.theme] || THEMES.royalGold;
  const font = FONTS[data.font] || FONTS.serif;
  const displayData = guestNameOverride ? { ...data, guestName: guestNameOverride } : data;

  const formattedDate = (() => {
    try {
      return new Date(data.eventDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return data.eventDate;
    }
  })();

  const handleOpenInvitation = () => {
    setInvitationState("content");
  };

  const handleBackToCover = () => {
    setInvitationState("cover");
    setGalleryIndex(0);
  };

  const gallery = data.gallery || [];
  const nextSlide = () => setGalleryIndex((i) => (gallery.length ? (i + 1) % gallery.length : 0));
  const prevSlide = () =>
    setGalleryIndex((i) => (gallery.length ? (i - 1 + gallery.length) % gallery.length : 0));

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-full h-screen sm:max-w-[480px] sm:h-[92vh] sm:my-4 sm:rounded-[2rem] sm:overflow-hidden sm:shadow-2xl overflow-y-auto scrollbar-hide">
        <InvitationPreview
          data={displayData}
          theme={theme}
          font={font}
          invitationState={invitationState}
          onOpen={handleOpenInvitation}
          onBack={handleBackToCover}
          galleryIndex={galleryIndex}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HALAMAN TUAN RUMAH: "/tuan-rumah/<slug>"                           */
/*  Hanya bisa mengetik nama tamu dan membuat link personal untuk      */
/*  dibagikan. Tidak bisa mengubah isi undangan sama sekali.           */
/* ------------------------------------------------------------------ */
function HostLinkPage({ slug }) {
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error
  const [eventData, setEventData] = useState(null);
  const [guestNameInput, setGuestNameInput] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setErrorDetail("not-configured");
        setStatus("error");
        return;
      }
      const result = await fetchInvitation(slug);
      if (cancelled) return;
      if (result.error === "not-found") {
        setStatus("not-found");
      } else if (result.error) {
        setErrorDetail(result.error);
        setStatus("error");
      } else {
        setEventData(result.data);
        setStatus("ready");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const handleGenerate = () => {
    const name = guestNameInput.trim();
    if (!name) return;
    const url = `${origin}/${slug}?to=${encodeURIComponent(name)}`;
    setGeneratedLink(url);
    setCopied(false);
  };

  const handleCopy = () => {
    if (navigator.clipboard && generatedLink) {
      navigator.clipboard.writeText(generatedLink).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waShareUrl = generatedLink
    ? `https://wa.me/?text=${encodeURIComponent(
        `Assalamu'alaikum/Halo, dengan hormat kami mengundang Anda untuk hadir di acara kami. Silakan buka undangan digital berikut:\n${generatedLink}`
      )}`
    : "";

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <Loader2 size={28} className="animate-spin text-fuchsia-400" />
        <p className="text-sm">Memuat data acara...</p>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-center px-6 gap-2">
        <AlertCircle size={28} className="text-amber-400 mb-2" />
        <p className="text-white font-semibold">Acara tidak ditemukan</p>
        <p className="text-slate-500 text-xs max-w-xs">
          Link ini mungkin salah ketik, atau pemilik acara belum menyimpan undangannya ke server.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-center px-6 gap-2">
        <AlertCircle size={28} className="text-red-400 mb-2" />
        <p className="text-white font-semibold">Halaman belum bisa dimuat</p>
        <p className="text-slate-500 text-xs max-w-xs">
          Server sedang bermasalah atau belum terhubung. Coba muat ulang halaman beberapa saat lagi.
        </p>
        <p className="text-slate-700 text-[10px] mt-3 max-w-xs break-all px-2">Kode: {errorDetail || "unknown"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-fuchsia-900/40">
            <Users size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-white">Buat Link Tamu</h1>
            <p className="text-[11px] text-slate-500">
              {eventData &&
                (EVENT_TYPES[eventData.eventType]?.twoPersons ?? true
                  ? `${eventData.groom?.nickname} & ${eventData.bride?.nickname}`
                  : eventData.groom?.nickname)}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Ketik nama tamu yang ingin diundang, lalu buat link khusus untuk mereka. Setiap
            tamu bisa punya link dengan nama masing-masing.
          </p>

          <FieldLabel icon={User}>Nama Tamu</FieldLabel>
          <input
            value={guestNameInput}
            onChange={(e) => setGuestNameInput(e.target.value)}
            placeholder="Bapak/Ibu Joko Widodo"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-fuchsia-500/60 focus:ring-1 focus:ring-fuchsia-500/40 transition-all mb-3"
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />

          <button
            onClick={handleGenerate}
            disabled={!guestNameInput.trim()}
            className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            <Sparkles size={14} /> Buat Link
          </button>

          {generatedLink && (
            <div className="mt-5 pt-5 border-t border-slate-800">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                Link untuk {guestNameInput}
              </p>
              <div className="flex items-center gap-2 bg-slate-950 rounded-lg px-3 py-2 mb-3">
                <code className="text-[11px] text-slate-300 truncate flex-1">{generatedLink}</code>
                <button onClick={handleCopy} className="shrink-0 text-fuchsia-400 hover:text-fuchsia-300">
                  <Copy size={14} />
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-emerald-400 mb-3 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Link tersalin ke clipboard
                </p>
              )}
              <a
                href={waShareUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                <Share2 size={14} /> Bagikan via WhatsApp
              </a>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-6">
          Halaman ini tidak bisa mengubah isi undangan. Untuk mengubah tema, foto, atau
          detail acara, hubungi penyedia undangan.
        </p>
      </div>
    </div>
  );
}
