import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    number: number;
    suit: string;
    arcana: string;
    imageUrl?: string;
    meaning?: string;
  };
  isReversed?: boolean;
  isFlipped?: boolean;
  showBack?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-24 h-36',
  md: 'w-32 h-48',
  lg: 'w-40 h-60',
  xl: 'w-48 h-72',
};

// Generate a unique gradient based on card properties
function getCardGradient(card: TarotCardProps['card']) {
  const gradients = {
    major: 'from-purple-600 via-purple-500 to-indigo-600',
    wands: 'from-orange-600 via-red-500 to-pink-600',
    cups: 'from-blue-600 via-cyan-500 to-teal-600',
    swords: 'from-gray-600 via-slate-500 to-zinc-600',
    pentacles: 'from-green-600 via-emerald-500 to-lime-600',
  };
  return gradients[card.suit as keyof typeof gradients] || gradients.major;
}

// Generate card back pattern
function CardBack({ className }: { className?: string }) {
  return (
    <div className={cn(
      'w-full h-full rounded-lg border-4 border-[hsl(var(--gold))] bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--secondary))] p-4 flex items-center justify-center relative overflow-hidden',
      className
    )}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="card-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="0" cy="40" r="2" fill="currentColor" />
            <circle cx="40" cy="0" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#card-pattern)" />
        </svg>
      </div>
      
      {/* Central design */}
      <div className="relative z-10 text-[hsl(var(--gold))]">
        <Sparkles className="w-16 h-16 animate-pulse" />
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 text-[hsl(var(--gold))] opacity-50">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute top-2 right-2 text-[hsl(var(--gold))] opacity-50">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-2 left-2 text-[hsl(var(--gold))] opacity-50">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-2 right-2 text-[hsl(var(--gold))] opacity-50">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}

// Generate SVG card image as placeholder
function GeneratedCardImage({ card }: { card: TarotCardProps['card'] }) {
  const gradient = getCardGradient(card);
  const isReversed = false; // Can be passed as prop if needed
  
  return (
    <div className={cn(
      'w-full h-full rounded-lg border-4 border-[hsl(var(--gold))] bg-gradient-to-br',
      gradient,
      'p-4 flex flex-col items-center justify-between text-white relative overflow-hidden'
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`stars-${card.id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25,5 L27,15 L37,15 L29,21 L32,31 L25,25 L18,31 L21,21 L13,15 L23,15 Z" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#stars-${card.id})`} />
        </svg>
      </div>
      
      {/* Card number at top */}
      <div className="relative z-10 text-center">
        <div className="text-2xl font-bold mb-1">{card.number}</div>
        {card.arcana === 'major' && (
          <div className="text-xs uppercase tracking-wider">Major Arcana</div>
        )}
      </div>
      
      {/* Center icon/symbol */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Suit symbol */}
          {card.suit === 'wands' && <div className="text-6xl">🔥</div>}
          {card.suit === 'cups' && <div className="text-6xl">💧</div>}
          {card.suit === 'swords' && <div className="text-6xl">⚔️</div>}
          {card.suit === 'pentacles' && <div className="text-6xl">⭐</div>}
          {card.suit === 'major' && <div className="text-6xl">✨</div>}
        </div>
      </div>
      
      {/* Card name at bottom */}
      <div className="relative z-10 text-center">
        <div className="text-sm font-bold uppercase tracking-wide px-2 line-clamp-2">
          {card.name}
        </div>
      </div>
      
      {/* Reversed indicator */}
      {isReversed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 opacity-30">
          <RotateCcw className="w-12 h-12" />
        </div>
      )}
    </div>
  );
}

export default function TarotCard({
  card,
  isReversed = false,
  isFlipped = false,
  showBack = false,
  size = 'md',
  onClick,
  className,
  animated = true,
}: TarotCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'card-perspective cursor-pointer',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={animated ? { scale: 1.05 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
    >
      <motion.div
        className="relative w-full h-full card-preserve-3d"
        animate={{
          rotateY: showBack || !isFlipped ? 0 : 180,
          rotateZ: isReversed ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <CardBack />
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {card.imageUrl ? (
            <div className="w-full h-full rounded-lg border-4 border-[hsl(var(--gold))] overflow-hidden relative">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to generated image if real image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden">
                <GeneratedCardImage card={card} />
              </div>
            </div>
          ) : (
            <GeneratedCardImage card={card} />
          )}
          
          {/* Hover overlay */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end p-3"
            >
              <div className="text-white text-xs font-semibold line-clamp-2">
                {card.meaning}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Glow effect when hovered */}
      {isHovered && animated && (
        <div className="absolute -inset-2 bg-[hsl(var(--primary))] opacity-20 blur-xl rounded-lg -z-10" />
      )}
    </motion.div>
  );
}
