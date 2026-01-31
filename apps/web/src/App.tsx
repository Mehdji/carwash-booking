import { useEffect, useState } from "react";

type SlotDay = {
  date: string;
  times: string[];
};

export default function App() {
  const [days, setDays] = useState<SlotDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/slots");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as SlotDay[];
        setDays(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Chargement…</div>;
  if (error) return <div style={{ padding: 24 }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Créneaux disponibles</h1>

      {days.map((d) => (
        <div key={d.date} style={{ marginTop: 16, padding: 12, border: "1px solid #333", borderRadius: 8 }}>
          <strong>{d.date}</strong>

          {d.times.length === 0 ? (
            <div style={{ marginTop: 8, opacity: 0.7 }}>Aucun créneau disponible</div>
          ) : (
            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {d.times.map((t) => (
                <button key={t} style={{ padding: "8px 12px", borderRadius: 8 }}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}