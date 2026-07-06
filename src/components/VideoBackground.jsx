import { useRef, useState, useEffect } from "react";

/**
 * VideoBackground
 * Video full-screen yang diputar looping sebagai background undangan,
 * lengkap dengan audio dari video tersebut.
 *
 * Kenapa perlu tombol "Buka Undangan":
 * Browser mobile (Chrome Android & Safari iOS) memblokir autoplay
 * video yang ada suaranya, KECUALI ada interaksi (tap) dari user
 * terlebih dahulu. Jadi videonya start muted, lalu begitu tamu tap
 * tombol, kita unmute + play ulang dari awal.
 *
 * Ganti VIDEO_URL di bawah dengan public URL dari Supabase Storage
 * setelah kamu upload videonya, contoh:
 * https://xxxxx.supabase.co/storage/v1/object/public/videos/nama-file.mp4
 */

export default function VideoBackground({ videoUrl, children }) {
  const videoRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Video langsung autoplay dalam kondisi muted begitu halaman dibuka,
    // supaya begitu tamu tap tombol, video sudah "jalan" tinggal unmute.
    const video = videoRef.current;
    if (video && videoUrl) {
      video.play().catch(() => {
        // Sebagian browser tetap menolak autoplay walau muted, tidak masalah,
        // video akan mulai play saat tombol "Buka Undangan" ditekan.
      });
    }
  }, []);

  const handleOpenInvitation = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch((err) => {
        console.error("Gagal memutar video dengan suara:", err);
      });
    }
    setIsOpened(true);
  };

  return (
    <div style={styles.container}>
      {!videoError && videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          style={styles.video}
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
        />
      )}

      {/* Overlay gelap tipis biar teks di atas video tetap kebaca */}
      <div style={styles.overlay} />

      {/* Konten undangan (nama mempelai, tanggal, dll) ditumpuk di atas video */}
      <div style={styles.content}>{children}</div>

      {/* Tombol buka undangan, hilang setelah ditekan */}
      {!isOpened && (
        <div style={styles.openScreen}>
          <button style={styles.openButton} onClick={handleOpenInvitation}>
            🔔 Buka Undangan
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
  },
  openScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(4px)",
  },
  openButton: {
    padding: "16px 32px",
    fontSize: "18px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "999px",
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
};
