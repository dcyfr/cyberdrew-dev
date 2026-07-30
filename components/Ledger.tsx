import { ledger } from "@/lib/site";

export function Ledger() {
  return (
    <section className="ledger" aria-label="By the numbers">
      {ledger.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-v">
            {s.value}
            {s.unit ? <sup>{s.unit}</sup> : null}
          </div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
