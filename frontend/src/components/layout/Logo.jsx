import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx'; // No need for TypeScript import syntax
import { twMerge } from 'tailwind-merge';

// Utility function for merging class names
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Logo() {
  return (
    <Link 
      to="/" 
      className={cn(
        "group relative flex items-center gap-3 px-4 py-2",
        "transition-all duration-300 ease-out",
        "hover:scale-105 rounded-full",
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-gradient-to-r before:from-yellow-400/10 before:to-yellow-600/10",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      )}
    >
      <div className="relative w-8 h-8">
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-full h-full transition-transform duration-500",
            "group-hover:rotate-12 animate-float"
          )}
        >
          {/* Base plate gradient */}
          <defs>
            <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="animate-gradient-flow" style={{stopColor: '#facc15'}} />
              <stop offset="100%" className="animate-gradient-flow" style={{stopColor: '#fbbf24'}} />
            </linearGradient>
          </defs>

          {/* Fork handle with morphing */}
          <path
            d="M12 3V10"
            className="stroke-yellow-400 animate-morph"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Animated fork tines */}
          <path
            d="M8 6V10 M12 10V15 M16 6V10"
            className="stroke-yellow-400 animate-draw"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Animated plate */}
          <path
            d="M6 15C6 15 12 18 18 15"
            stroke="url(#plateGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="animate-pulse-subtle"
          />

          {/* Interactive particles */}
          {[...Array(3)].map((_, i) => (
            <circle
              key={i}
              cx={12 + (i - 1) * 4}
              cy={19}
              r={0.5}
              className={cn(
                "fill-yellow-400 animate-particle",
                i === 0 && "animate-delay-0",
                i === 1 && "animate-delay-150",
                i === 2 && "animate-delay-300"
              )}
            />
          ))}
        </svg>

        {/* Glow effect */}
        <div className={cn(
          "absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30",
          "rounded-full blur-lg opacity-0 group-hover:opacity-100",
          "transition-all duration-500 animate-pulse-slow"
        )} />
      </div>
      
      {/* Text with wave animation */}
      <span className={cn(
        "text-2xl font-bold tracking-tight",
        "relative overflow-hidden flex"
      )}>
        <span className={cn(
          "text-yellow-400 inline-block transition-all duration-300",
          "group-hover:translate-y-[-2px] group-hover:scale-110",
          "animate-wave"
        )}>
          Taste
        </span>
        <span className={cn(
          "text-white inline-block transition-all duration-300",
          "group-hover:translate-y-[-2px] group-hover:scale-110",
          "group-hover:text-yellow-50 animate-wave-delay"
        )}>
          Bite
        </span>
      </span>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        @keyframes morph {
          0%, 100% { d: path('M12 3V10'); }
          50% { d: path('M12 3.5V10.5'); }
        }

        @keyframes draw {
          0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }

        @keyframes particle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-1px) scale(1.2); opacity: 1; }
        }

        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes gradient-flow {
          0% { stop-color: #facc15; }
          50% { stop-color: #fbbf24; }
          100% { stop-color: #facc15; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-morph {
          animation: morph 3s ease-in-out infinite;
        }

        .animate-draw {
          animation: draw 2s ease-out forwards;
        }

        .animate-particle {
          animation: particle 2s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }

        .animate-wave-delay {
          animation: wave 3s ease-in-out infinite;
          animation-delay: 150ms;
        }

        .animate-delay-0 {
          animation-delay: 0ms;
        }

        .animate-delay-150 {
          animation-delay: 150ms;
        }

        .animate-delay-300 {
          animation-delay: 300ms;
        }

        .animate-pulse-subtle {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-gradient-flow {
          animation: gradient-flow 3s ease-in-out infinite;
        }
      `}</style>
    </Link>
  );
}