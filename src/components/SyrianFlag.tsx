const SyrianFlag = ({ className = "h-4 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 72 48"
    className={className}
    aria-label="Syrian flag"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Green stripe */}
    <rect x="0" y="0" width="72" height="16" fill="#007A3D" />
    {/* White stripe */}
    <rect x="0" y="16" width="72" height="16" fill="#FFFFFF" />
    {/* Black stripe */}
    <rect x="0" y="32" width="72" height="16" fill="#000000" />
    {/* Three red stars */}
    <g fill="#CE1126">
      <polygon points="24,20 25.5,24 29.5,24 26.2,26.5 27.5,30.5 24,28 20.5,30.5 21.8,26.5 18.5,24 22.5,24" />
      <polygon points="36,20 37.5,24 41.5,24 38.2,26.5 39.5,30.5 36,28 32.5,30.5 33.8,26.5 30.5,24 34.5,24" />
      <polygon points="48,20 49.5,24 53.5,24 50.2,26.5 51.5,30.5 48,28 44.5,30.5 45.8,26.5 42.5,24 46.5,24" />
    </g>
  </svg>
);

export default SyrianFlag;
