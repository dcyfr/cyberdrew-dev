// Fixed corner "instrument" ornaments — a build indicator and an online readout,
// echoing an operator console's chrome.
export default function Ornaments() {
  return (
    <>
      <div className="ornament left" aria-hidden="true">
        BUILDING{" "}
        <span className="blocks">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="ornament right" aria-hidden="true">
        <span className="on">● ONLINE</span>
      </div>
    </>
  );
}
