import React from 'react';

// Premium Custom Icons - Designed for maximum visual impact
export const PropertyIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="propertyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
          </linearGradient>
        </defs>
        <path 
          d="M12 2L2 8V22H9V16H15V22H22V8L12 2Z" 
          fill="url(#propertyGradient)"
          stroke="currentColor" 
          strokeWidth="0.5"
        />
      </>
    ) : (
      <path 
        d="M12 2L2 8V22H9V16H15V22H22V8L12 2Z" 
        fill={variant === "filled" ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    )}
  </svg>
);

export const AgentIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="8" r="4" fill="url(#agentGradient)"/>
        <path d="M6 21V19C6 16.79 7.79 15 10 15H14C16.21 15 18 16.79 18 19V21" stroke="url(#agentGradient)" strokeWidth="2" fill="none"/>
      </>
    ) : (
      <>
        <circle cx="12" cy="8" r="4" fill={variant === "filled" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
        <path d="M6 21V19C6 16.79 7.79 15 10 15H14C16.21 15 18 16.79 18 19V21" stroke="currentColor" strokeWidth="2" fill="none"/>
      </>
    )}
  </svg>
);

export const LocationIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <path 
          d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" 
          fill="url(#locationGradient)"
        />
        <circle cx="12" cy="10" r="3" fill="white"/>
      </>
    ) : (
      <>
        <path 
          d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" 
          fill={variant === "filled" ? "currentColor" : "none"}
          stroke="currentColor" 
          strokeWidth="2"
        />
        <circle cx="12" cy="10" r="3" fill="none" stroke={variant === "filled" ? "white" : "currentColor"} strokeWidth="2"/>
      </>
    )}
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="8" stroke="url(#searchGradient)" strokeWidth="2" fill="none"/>
        <path d="m21 21-4.35-4.35" stroke="url(#searchGradient)" strokeWidth="2" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    )}
  </svg>
);

export const VerifiedIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="verifiedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
          </linearGradient>
        </defs>
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="url(#verifiedGradient)"
        />
        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <>
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill={variant === "filled" ? "currentColor" : "none"}
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path d="M9 12L11 14L15 10" stroke={variant === "filled" ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    )}
  </svg>
);

export const CommunityIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="communityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        <circle cx="9" cy="7" r="4" fill="url(#communityGradient)"/>
        <circle cx="15" cy="8" r="3" fill="url(#communityGradient)"/>
        <path d="M6 21V19C6 16.79 7.79 15 10 15H12C12.34 15 12.67 15.04 13 15.1" stroke="url(#communityGradient)" strokeWidth="2" fill="none"/>
        <path d="M13 21V19C13 17.9 13.9 17 15 17H18C19.1 17 20 17.9 20 19V21" stroke="url(#communityGradient)" strokeWidth="2" fill="none"/>
      </>
    ) : (
      <>
        <circle cx="9" cy="7" r="4" fill={variant === "filled" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
        <circle cx="15" cy="8" r="3" fill={variant === "filled" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
        <path d="M6 21V19C6 16.79 7.79 15 10 15H12C12.34 15 12.67 15.04 13 15.1" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M13 21V19C13 17.9 13.9 17 15 17H18C19.1 17 20 17.9 20 19V21" stroke="currentColor" strokeWidth="2" fill="none"/>
      </>
    )}
  </svg>
);

export const TechnologyIcon = ({ className = "w-6 h-6", variant = "default" }: { className?: string; variant?: "default" | "filled" | "gradient" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === "gradient" ? (
      <>
        <defs>
          <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#techGradient)"/>
        <circle cx="8" cy="8" r="2" fill="white"/>
        <circle cx="16" cy="8" r="2" fill="white"/>
        <circle cx="8" cy="16" r="2" fill="white"/>
        <circle cx="16" cy="16" r="2" fill="white"/>
        <path d="M10 8H14M10 16H14M8 10V14M16 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" fill={variant === "filled" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="2" fill={variant === "filled" ? "white" : "none"} stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="8" r="2" fill={variant === "filled" ? "white" : "none"} stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="16" r="2" fill={variant === "filled" ? "white" : "none"} stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="2" fill={variant === "filled" ? "white" : "none"} stroke="currentColor" strokeWidth="2"/>
        <path d="M10 8H14M10 16H14M8 10V14M16 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    )}
  </svg>
);