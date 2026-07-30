// Fixed corner instrument chrome — a build indicator and an online readout,
// echoing the console's own status bar.
export default function Ornaments() {
  return (
    <>
      <div className="ornament left" aria-hidden="true">
        BUILDING
        <span className="blocks">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="ornament right" aria-hidden="true">
        <span className="pulse" />
        <span className="v">ONLINE</span>
      </div>
    </>
  );
}
