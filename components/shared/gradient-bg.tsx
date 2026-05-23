/** CSS-only animated background — GPU-friendly, no JS animation loop */
export function GradientBg() {
  return (
    <div className="gradient-bg-root" aria-hidden="true">
      <div className="gradient-bg-base" />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
    </div>
  );
}
