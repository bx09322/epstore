import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  title: string;
  count: number;
  image: string;
  href: string;
}

export function GameCard({ title, count, image, href }: GameCardProps) {
  // Create unique IDs for SVG patterns
  const patternId = `pattern-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Link href={href} className="block group">
      <div className="relative aspect-square bg-gradient-to-br from-[#1a2044] to-[#0d1225] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(40,71,160,0.4)]">
        {/* Diamond grid pattern background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="8" height="8" fill="transparent"/>
                <rect width="4" height="4" fill="rgba(40,100,200,0.15)"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#${patternId})`} />
          </svg>
        </div>

        {/* Game Image/Logo */}
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <Image
            src={image}
            alt={title}
            width={220}
            height={220}
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_30px_rgba(40,100,200,0.3)]"
          />
        </div>

        {/* Diagonal blue wave at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-20"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(35,80,180,0.85)" />
              <stop offset="100%" stopColor="rgba(55,110,220,0.85)" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 L0 15 Q25 5 50 12 Q75 19 100 8 L100 30 Z"
            fill={`url(#${gradientId})`}
          />
        </svg>

        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent pointer-events-none" />

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-white text-lg font-semibold group-hover:text-blue-400 transition-colors duration-200">
        {title} <span className="text-gray-500 font-normal">({count})</span>
      </h3>
    </Link>
  );
}
