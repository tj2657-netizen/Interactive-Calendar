type Props = { className?: string };

export function Cloud({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 86 48" fill="none" aria-hidden="true">
      <path
        d="M22 38c-8 0-14-6-14-13s7-12 14-11c2-8 12-12 20-9 4-6 14-8 21-3 8-2 18 3 19 12 7 1 12 8 10 14-2 7-9 10-16 10H22Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.4 14.2 8l5.9.4-4.5 3.8 1.5 5.8L12 14.9 6.9 18l1.5-5.8L3.9 8.4 9.8 8 12 2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 1.5 11.4 8 18 10l-6.6 2L10 18.5 8.6 12 2 10l6.6-2L10 1.5Z" fill="currentColor" />
    </svg>
  );
}

export function Heart({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 22" fill="none" aria-hidden="true">
      <path
        d="M12 20S2.2 13.4 2.2 7.6C2.2 4.4 4.7 2 7.8 2c1.9 0 3.5.9 4.2 2.3C12.7 2.9 14.3 2 16.2 2c3.1 0 5.6 2.4 5.6 5.6C21.8 13.4 12 20 12 20Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Flower({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="8" r="4.2" fill="currentColor" />
      <circle cx="20" cy="12.5" r="4.2" fill="currentColor" />
      <circle cx="18.2" cy="19.6" r="4.2" fill="currentColor" />
      <circle cx="9.8" cy="19.6" r="4.2" fill="currentColor" />
      <circle cx="8" cy="12.5" r="4.2" fill="currentColor" />
      <circle cx="14" cy="14" r="3.1" fill="#F6E7B0" />
    </svg>
  );
}

export function Moon({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.5 3.2A9.5 9.5 0 1 0 21 14.8 7.4 7.4 0 0 1 16.5 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Pip({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 72 64" fill="none" aria-hidden="true">
      <ellipse cx="36" cy="38" rx="22" ry="20" fill="#F7E2B0" />
      <circle cx="36" cy="24" r="16" fill="#F4D27A" />
      <circle cx="30" cy="22" r="2.2" fill="#2C3A3A" />
      <circle cx="42" cy="22" r="2.2" fill="#2C3A3A" />
      <path d="M32 28c2.2 3 6.2 3 8.4 0" stroke="#2C3A3A" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="21" cy="40" rx="7" ry="4" fill="#E8B48A" transform="rotate(-18 21 40)" />
      <ellipse cx="51" cy="40" rx="7" ry="4" fill="#E8B48A" transform="rotate(18 51 40)" />
      <circle cx="36" cy="24" r="5" fill="#E07A5F" />
    </svg>
  );
}

export function MonthArt({ month }: { month: number }) {
  const scenes = [
    <JanArt key="jan" />,
    <FebArt key="feb" />,
    <MarArt key="mar" />,
    <AprArt key="apr" />,
    <MayArt key="may" />,
    <JunArt key="jun" />,
    <JulArt key="jul" />,
    <AugArt key="aug" />,
    <SepArt key="sep" />,
    <OctArt key="oct" />,
    <NovArt key="nov" />,
    <DecArt key="dec" />,
  ];
  return <div className="month-art">{scenes[month]}</div>;
}

function JanArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <path d="M28 40c-8 0-14-6-14-12s6-11 13-10c2-7 11-11 18-8 4-5 13-7 19-2 7-2 16 3 17 11 6 1 11 7 9 13-2 6-8 9-15 9H28Z" fill="#E7F0F6" />
      <circle cx="168" cy="28" r="14" fill="#F6E7B0" />
      <circle cx="70" cy="62" r="16" fill="#EEF4F8" stroke="#9BB6C9" strokeWidth="2" />
      <circle cx="70" cy="42" r="11" fill="#EEF4F8" stroke="#9BB6C9" strokeWidth="2" />
      <circle cx="66" cy="40" r="1.4" fill="#2C3A3A" />
      <circle cx="74" cy="40" r="1.4" fill="#2C3A3A" />
      <path d="M67 45c2 2 5 2 7 0" stroke="#2C3A3A" strokeLinecap="round" />
      <circle cx="40" cy="24" r="2" fill="#D7E6F0" />
      <circle cx="120" cy="18" r="1.6" fill="#D7E6F0" />
      <circle cx="200" cy="50" r="2.2" fill="#D7E6F0" />
    </svg>
  );
}

function FebArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <path d="M70 62S42 46 42 32c0-8 6-14 14-14 5 0 9 3 11 6 2-3 6-6 11-6 8 0 14 6 14 14 0 14-28 30-28 30Z" fill="#E6B8C4" />
      <path d="M150 58S128 46 128 34c0-6 5-11 11-11 4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 5 11 11 0 12-22 24-22 24Z" fill="#E8A090" />
      <path d="M40 74c30-28 70-28 110 4" stroke="#E6B8C4" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="188" cy="24" r="5" fill="#C9B8E0" />
    </svg>
  );
}

function MarArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <path d="M148 38c-8 0-14-6-14-12s6-11 13-10c2-7 11-11 18-8 4-5 13-7 19-2 7-2 16 3 17 11 6 1 11 7 9 13-2 6-8 9-15 9h-47Z" fill="#D7EDE0" />
      <path d="M48 78c0-22 10-40 16-40" stroke="#6FA07A" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="64" cy="34" rx="9" ry="14" fill="#A8C5B4" />
      <ellipse cx="78" cy="38" rx="8" ry="12" fill="#8FB59A" />
      <path d="M150 28v18M144 36h12M158 44v16M152 52h12" stroke="#9BB6C9" strokeLinecap="round" />
    </svg>
  );
}

function AprArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <path d="M20 70c40-40 80-20 120-38" stroke="#C9A38A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="54" cy="42" r="8" fill="#E6B8C4" />
      <circle cx="72" cy="30" r="7" fill="#E8A090" />
      <circle cx="96" cy="38" r="8" fill="#E6B8C4" />
      <circle cx="124" cy="24" r="7" fill="#F4C7A8" />
      <path d="M188 18 191 28l10 3-10 3-3 10-3-10-10-3 10-3 3-10Z" fill="#F2E2A4" />
    </svg>
  );
}

function MayArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <circle cx="64" cy="28" r="8" fill="#E6B8C4" />
      <circle cx="78" cy="38" r="8" fill="#C9B8E0" />
      <circle cx="64" cy="48" r="8" fill="#B7D7EA" />
      <circle cx="50" cy="38" r="8" fill="#A8C5B4" />
      <circle cx="64" cy="38" r="5" fill="#F6E7B0" />
      <ellipse cx="150" cy="42" rx="16" ry="9" fill="#F4D27A" />
      <ellipse cx="150" cy="42" rx="10" ry="5" fill="#2C3A3A" />
      <path d="M166 42c10-8 16-6 22 2" stroke="#2C3A3A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="22" r="3" fill="#F6E7B0" />
    </svg>
  );
}

function JunArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <ellipse cx="78" cy="52" rx="18" ry="22" fill="#E8A090" />
      <path d="M78 30c-6 8 0 12 0 12s6-4 0-12Z" fill="#6FA07A" />
      <circle cx="70" cy="48" r="2" fill="#FBF6EE" />
      <circle cx="86" cy="56" r="2" fill="#FBF6EE" />
      <path d="M160 20 164 30l11 .8-8.4 7.2 2.8 10.6L160 43l-9.4 5.6 2.8-10.6-8.4-7.2 11-.8L160 20Z" fill="#F2E2A4" />
    </svg>
  );
}

function JulArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <circle cx="58" cy="32" r="16" fill="#F4D27A" />
      <path d="M20 70c18-10 30 6 48-4 18-10 32 8 52-2 20-10 36 6 78-8" stroke="#7A9BB8" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M28 78c16-8 28 4 44-4 18-8 30 6 50-2" stroke="#B7D7EA" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AugArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <ellipse cx="70" cy="50" rx="20" ry="22" fill="#F4C7A8" />
      <ellipse cx="70" cy="50" rx="12" ry="14" fill="#E8A090" />
      <path d="M70 26c-4 8 0 12 0 12s4-4 0-12Z" fill="#6FA07A" />
      <path d="M150 44c-8 0-14-6-14-12s6-11 13-10c2-7 11-11 18-8 4-5 13-7 19-2 7-2 16 3 17 11 6 1 11 7 9 13-2 6-8 9-15 9h-47Z" fill="#F8E0D2" />
    </svg>
  );
}

function SepArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <circle cx="64" cy="48" r="18" fill="#E8A090" />
      <path d="M64 30c-5 8 0 11 0 11s5-3 0-11Z" fill="#6FA07A" />
      <path d="M110 30c12 8 8 28-6 34" stroke="#C4783A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="128" cy="36" rx="10" ry="16" fill="#E07A5F" transform="rotate(-20 128 36)" />
      <ellipse cx="150" cy="52" rx="9" ry="14" fill="#D2A35A" transform="rotate(18 150 52)" />
    </svg>
  );
}

function OctArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <ellipse cx="78" cy="54" rx="24" ry="20" fill="#E07A5F" />
      <ellipse cx="78" cy="54" rx="14" ry="16" fill="#C4783A" />
      <path d="M78 30c-3 8 0 12 0 12s3-4 0-12Z" fill="#6FA07A" />
      <path d="M168 22a14 14 0 1 0 6 24 11 11 0 0 1-6-24Z" fill="#C9B8E0" />
      <path d="M196 18 198 24l6 .5-4.5 4 1.5 5.8L196 31l-5.2 3.3 1.5-5.8-4.5-4 6-.5L196 18Z" fill="#F2E2A4" />
    </svg>
  );
}

function NovArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <ellipse cx="70" cy="58" rx="22" ry="8" fill="#E6C2A4" />
      <path d="M52 58c2-18 10-28 18-28s16 10 18 28" fill="#FBF6EE" stroke="#C4783A" strokeWidth="3" />
      <ellipse cx="70" cy="36" rx="10" ry="4" fill="#FBF6EE" stroke="#C4783A" strokeWidth="2" />
      <path d="M70 24c0-8 10-10 12-4" stroke="#C4783A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M168 40S154 32 154 24c0-5 4-9 9-9 3 0 5 2 6 4 1-2 3-4 6-4 5 0 9 4 9 9 0 8-16 16-16 16Z" fill="#E6B8C4" />
    </svg>
  );
}

function DecArt() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <path d="M110 18 78 70h64L110 18Z" fill="#A8C5B4" />
      <path d="M110 32 88 70h44L110 32Z" fill="#6FA07A" />
      <rect x="106" y="70" width="8" height="10" fill="#C9A38A" />
      <circle cx="96" cy="52" r="3" fill="#E8A090" />
      <circle cx="122" cy="46" r="3" fill="#F4D27A" />
      <circle cx="110" cy="40" r="3" fill="#B7D7EA" />
      <path d="M168 12 172 22l11 .8-8.4 7.2 2.8 10.6L168 35l-9.4 5.6 2.8-10.6-8.4-7.2 11-.8L168 12Z" fill="#F2E2A4" />
    </svg>
  );
}

export function WashiStrip({ className = "" }: Props) {
  return <span className={`washi-strip ${className}`} aria-hidden="true" />;
}

export function StampRing({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" />
      <circle cx="36" cy="36" r="24" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
