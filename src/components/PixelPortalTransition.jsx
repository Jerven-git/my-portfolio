const loadingCells = Array.from({ length: 8 }, (_, index) => index);
const portalRings = Array.from({ length: 5 }, (_, index) => index);

export default function PixelPortalTransition() {
  return (
    <div className="pixel-portal" aria-hidden="true">
      <div className="pixel-portal__void" />

      <div className="pixel-portal__tunnel">
        {portalRings.map((ring) => (
          <i key={ring} className="pixel-portal__ring" />
        ))}
        <b className="pixel-portal__core" />
      </div>

      <div className="pixel-portal__status">
        <span className="pixel-portal__enter-label">Warping to Mission Grid</span>
        <span className="pixel-portal__exit-label">Returning to Crafted</span>
        <span className="pixel-portal__load" aria-hidden="true">
          {loadingCells.map((cell) => <i key={cell} />)}
        </span>
      </div>
    </div>
  );
}
