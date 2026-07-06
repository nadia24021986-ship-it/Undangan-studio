import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Sesuaikan dengan config Supabase yang sudah kamu pakai di project
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const BUCKET_NAME = "invitation-videos";
const MAX_SIZE_MB = 50;

/**
 * VideoUploader
 * Dipakai di admin dashboard, per undangan (butuh invitationId).
 * Setelah upload sukses, otomatis update kolom video_url
 * di baris invitations yang sesuai.
 */
export default function VideoUploader({ invitationId, currentVideoUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Validasi tipe file
    if (!file.type.startsWith("video/")) {
      setError("File harus berupa video (mp4, mov, dll).");
      return;
    }

    // Validasi ukuran
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      setError(`Ukuran video maksimal ${MAX_SIZE_MB} MB. File kamu ${sizeMB.toFixed(1)} MB.`);
      return;
    }

    setUploading(true);
    setProgressText("Mengupload video...");

    try {
      // Nama file unik per invitation, biar re-upload menimpa file lama
      const fileExt = file.name.split(".").pop();
      const filePath = `${invitationId}/video.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      setProgressText("Menyimpan link video...");

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("invitations")
        .update({ video_url: publicUrl })
        .eq("id", invitationId);

      if (updateError) throw updateError;

      setProgressText("Video berhasil diupload!");
      onUploaded?.(publicUrl);
    } catch (err) {
      console.error("Upload gagal:", err);
      setError("Upload gagal. Coba lagi atau cek koneksi kamu.");
      setProgressText("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Video Undangan</label>

      {currentVideoUrl && (
        <video
          src={currentVideoUrl}
          controls
          style={styles.preview}
        />
      )}

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={uploading}
        style={styles.input}
      />

      {uploading && <p style={styles.status}>{progressText}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.hint}>
        Format MP4, maksimal {MAX_SIZE_MB} MB. Video akan diputar loop
        dengan suara saat tamu membuka undangan.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    border: "1px solid #e2e2e2",
    borderRadius: "12px",
  },
  label: {
    fontWeight: 600,
    fontSize: "14px",
  },
  preview: {
    width: "100%",
    maxHeight: "240px",
    borderRadius: "8px",
    backgroundColor: "#000",
  },
  input: {
    fontSize: "14px",
  },
  status: {
    fontSize: "13px",
    color: "#2563eb",
  },
  error: {
    fontSize: "13px",
    color: "#dc2626",
  },
  hint: {
    fontSize: "12px",
    color: "#888",
  },
};
