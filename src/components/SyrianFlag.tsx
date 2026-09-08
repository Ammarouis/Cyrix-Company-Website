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
    {/* Two green stars */}
    <g fill="#007A3D">
      <polygon points="36,21 37.5,25 41.5,25 38.2,27.5 39.5,31.5 36,29 32.5,31.5 33.8,27.5 30.5,25 34.5,25" />
      <polygon points="48,21 49.5,25 53.5,25 50.2,27.5 51.5,31.5 48,29 44.5,31.5 45.8,27.5 42.5,25 46.5,25" />
    </g>
  </svg>
);

export default SyrianFlag;
