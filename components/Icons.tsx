export function IconWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'w-7 h-7'}
    >
      {children}
    </svg>
  )
}

export const WebIcon = (
  <IconWrapper>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
  </IconWrapper>
)

export const IntegrationIcon = (
  <IconWrapper>
    <rect x="3" y="9" width="7" height="7" rx="2" transform="rotate(-15 6.5 12.5)" />
    <rect x="14" y="8" width="7" height="7" rx="2" transform="rotate(-15 17.5 11.5)" />
    <path d="M10 12.5l4-1" />
  </IconWrapper>
)

export const MobileIcon = (
  <IconWrapper>
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M11 18.2h2" />
  </IconWrapper>
)

export const MarketingIcon = (
  <IconWrapper>
    <path d="M4 19V10M10 19V5M16 19v-7M21 19H3" />
  </IconWrapper>
)

export const SocialIcon = (
  <IconWrapper>
    <path d="M20 12a7.5 7.5 0 1 1-3.3-6.2" />
    <path d="M14 3.5V9h5.5" />
  </IconWrapper>
)

export const AiIcon = (
  <IconWrapper>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </IconWrapper>
)

export const TargetIcon = (
  <IconWrapper>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </IconWrapper>
)

export const RocketIcon = (
  <IconWrapper>
    <path d="M12 2.5c2.8 1.8 4.5 4.9 4.5 8.7 0 2-.5 3.8-1.4 5.3l-3.1 3.5-3.1-3.5C7.9 15 7.4 13.2 7.4 11.2c0-3.8 1.7-6.9 4.6-8.7Z" />
    <circle cx="12" cy="10.5" r="1.8" />
    <path d="M8.5 16.5 6 19M15.5 16.5 18 19" />
  </IconWrapper>
)

export const UsersIcon = (
  <IconWrapper>
    <circle cx="9" cy="9" r="3" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17" cy="8.5" r="2.3" />
    <path d="M15.5 12c2.2.4 3.5 1.9 3.8 3.6" />
  </IconWrapper>
)

export const CheckCircleIcon = (
  <IconWrapper>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.5 2.5L16 9.5" />
  </IconWrapper>
)

export const ReceiptIcon = (
  <IconWrapper>
    <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </IconWrapper>
)

export const GearIcon = (
  <IconWrapper>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </IconWrapper>
)

export const ChatIcon = (
  <IconWrapper>
    <path d="M4 5h16v11H9l-4 3.5V16H4Z" />
    <path d="M8 9h8M8 12h5" />
  </IconWrapper>
)

export const ServerIcon = (
  <IconWrapper>
    <rect x="4" y="4" width="16" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" />
    <path d="M7.5 7.25h.01M7.5 16.75h.01" />
  </IconWrapper>
)

export const AntennaIcon = (
  <IconWrapper>
    <path d="M12 21v-9" />
    <circle cx="12" cy="9" r="2.3" />
    <path d="M7.5 6.5a6.5 6.5 0 0 1 9 0M4.5 3.5a10.5 10.5 0 0 1 15 0" />
  </IconWrapper>
)

export const PlugIcon = (
  <IconWrapper>
    <path d="M9 3v5M15 3v5" />
    <path d="M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8Z" />
    <path d="M12 16.5V21" />
  </IconWrapper>
)

export const WrenchIcon = (
  <IconWrapper>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
  </IconWrapper>
)

export const DocumentIcon = (
  <IconWrapper>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" />
  </IconWrapper>
)
