import { forwardRef } from 'react';

function BaseIcon(
  {
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    children,
    ...props
  },
  ref
) {
  const numericSize = Number(size) || 24;
  const numericStrokeWidth = Number(strokeWidth) || 2;
  const computedStrokeWidth = absoluteStrokeWidth
    ? (numericStrokeWidth * 24) / numericSize
    : numericStrokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={computedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const IconBase = forwardRef(BaseIcon);

function createIcon(displayName, render) {
  const Component = forwardRef((props, ref) => (
    <IconBase ref={ref} {...props}>
      {render(props)}
    </IconBase>
  ));

  Component.displayName = displayName;
  return Component;
}

function createMonogramIcon(displayName, label) {
  return createIcon(displayName, () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="8"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        {label}
      </text>
    </>
  ));
}

export const Activity = createIcon('Activity', () => (
  <polyline points="3 12 7 12 10 5 14 19 17 12 21 12" />
));

export const AlertCircle = createIcon('AlertCircle', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
  </>
));

export const AlertTriangle = createIcon('AlertTriangle', () => (
  <>
    <path d="M12 4 20 19H4L12 4Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
  </>
));

export const ArrowDownRight = createIcon('ArrowDownRight', () => (
  <>
    <line x1="7" y1="7" x2="17" y2="17" />
    <polyline points="10 17 17 17 17 10" />
  </>
));

export const ArrowLeft = createIcon('ArrowLeft', () => (
  <>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </>
));

export const ArrowRight = createIcon('ArrowRight', () => (
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
));

export const ArrowUpRight = createIcon('ArrowUpRight', () => (
  <>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="10 7 17 7 17 14" />
  </>
));

export const Ban = createIcon('Ban', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </>
));

export const BarChart3 = createIcon('BarChart3', () => (
  <>
    <line x1="6" y1="20" x2="6" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="18" y1="20" x2="18" y2="14" />
  </>
));

export const Bell = createIcon('Bell', () => (
  <>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </>
));

export const Bug = createMonogramIcon('Bug', 'B');

export const Calendar = createIcon('Calendar', () => (
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="3" y1="11" x2="21" y2="11" />
  </>
));

export const CalendarClock = createIcon('CalendarClock', () => (
  <>
    <rect x="3" y="5" width="14" height="14" rx="2" />
    <line x1="13" y1="3" x2="13" y2="7" />
    <line x1="7" y1="3" x2="7" y2="7" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <circle cx="18" cy="17" r="4" />
    <line x1="18" y1="17" x2="18" y2="14.8" />
    <line x1="18" y1="17" x2="19.8" y2="18.2" />
  </>
));

export const Camera = createIcon('Camera', () => (
  <>
    <path d="M5 7h3l1.5-2h5L16 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <circle cx="12" cy="13" r="3.5" />
  </>
));

export const Check = createIcon('Check', () => (
  <polyline points="20 6 9 17 4 12" />
));

export const CheckCircle = createIcon('CheckCircle', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="16 10 11 15 8 12" />
  </>
));

export const CheckCircle2 = CheckCircle;

export const ChevronDown = createIcon('ChevronDown', () => (
  <polyline points="6 9 12 15 18 9" />
));

export const ChevronLeft = createIcon('ChevronLeft', () => (
  <polyline points="15 6 9 12 15 18" />
));

export const ChevronRight = createIcon('ChevronRight', () => (
  <polyline points="9 6 15 12 9 18" />
));

export const CircleDot = createIcon('CircleDot', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
  </>
));

export const Clock = createIcon('Clock', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </>
));

export const Code = createIcon('Code', () => (
  <>
    <polyline points="9 18 3 12 9 6" />
    <polyline points="15 6 21 12 15 18" />
  </>
));

export const Code2 = createIcon('Code2', () => (
  <>
    <polyline points="8 18 2 12 8 6" />
    <polyline points="16 6 22 12 16 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </>
));

export const Copy = createIcon('Copy', () => (
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <rect x="4" y="4" width="11" height="11" rx="2" />
  </>
));

export const CreditCard = createIcon('CreditCard', () => (
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="7" y1="15" x2="11" y2="15" />
  </>
));

export const Crown = createIcon('Crown', () => (
  <>
    <path d="M4 18h16l-2-9-6 4-6-4-2 9Z" />
    <circle cx="6" cy="8" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="12" cy="6" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="18" cy="8" r="1.25" fill="currentColor" stroke="none" />
  </>
));

export const DollarSign = createIcon('DollarSign', () => (
  <>
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
  </>
));

export const Edit = createIcon('Edit', () => (
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
  </>
));

export const Edit2 = Edit;

export const ExternalLink = createIcon('ExternalLink', () => (
  <>
    <path d="M14 3h7v7" />
    <path d="M10 14 21 3" />
    <path d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4" />
  </>
));

export const Eye = createIcon('Eye', () => (
  <>
    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.5" />
  </>
));

export const EyeOff = createIcon('EyeOff', () => (
  <>
    <path d="M3 3 21 21" />
    <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
    <path d="M9.1 4.8A11.6 11.6 0 0 1 12 4.5c6 0 10 7.5 10 7.5a18.7 18.7 0 0 1-4.1 4.8" />
    <path d="M6.2 6.2A19.4 19.4 0 0 0 2 12s4 7.5 10 7.5c1.8 0 3.4-.5 4.8-1.2" />
  </>
));

export const FileText = createIcon('FileText', () => (
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <polyline points="14 3 14 8 19 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </>
));

export const Filter = createIcon('Filter', () => (
  <path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z" />
));

export const Folder = createIcon('Folder', () => (
  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
));

export const Globe = createIcon('Globe', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </>
));

export const GripVertical = createIcon('GripVertical', () => (
  <>
    <circle cx="9" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="18" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="1" fill="currentColor" stroke="none" />
  </>
));

export const Hash = createIcon('Hash', () => (
  <>
    <line x1="5" y1="9" x2="19" y2="9" />
    <line x1="5" y1="15" x2="19" y2="15" />
    <line x1="9" y1="4" x2="7" y2="20" />
    <line x1="17" y1="4" x2="15" y2="20" />
  </>
));

export const Headphones = createIcon('Headphones', () => (
  <>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="12" width="4" height="7" rx="2" />
    <rect x="17" y="12" width="4" height="7" rx="2" />
  </>
));

export const Heart = createIcon('Heart', () => (
  <path d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z" />
));

export const HelpCircle = createIcon('HelpCircle', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2.25-2.5 4" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
  </>
));

export const History = createIcon('History', () => (
  <>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3 4 3 10 9 10" />
    <polyline points="12 7 12 12 15 14" />
  </>
));

export const Home = createIcon('Home', () => (
  <>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 10v10h14V10" />
  </>
));

export const Inbox = createIcon('Inbox', () => (
  <>
    <path d="M4 5h16l1 8v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4l1-8Z" />
    <path d="M4 13h4l2 3h4l2-3h4" />
  </>
));

export const Info = createIcon('Info', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
  </>
));

export const Key = createIcon('Key', () => (
  <>
    <circle cx="7.5" cy="14.5" r="3.5" />
    <path d="M11 14.5h10" />
    <path d="M17 14.5v-3" />
    <path d="M20 14.5v-2" />
  </>
));

export const Languages = createMonogramIcon('Languages', 'A');

export const Layers = createIcon('Layers', () => (
  <>
    <polygon points="12 4 20 8 12 12 4 8 12 4" />
    <polyline points="4 12 12 16 20 12" />
    <polyline points="4 16 12 20 20 16" />
  </>
));

export const LayoutDashboard = createIcon('LayoutDashboard', () => (
  <>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="5" rx="1.5" />
    <rect x="13" y="10" width="8" height="11" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
  </>
));

export const LifeBuoy = createIcon('LifeBuoy', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <line x1="7" y1="7" x2="9.5" y2="9.5" />
    <line x1="17" y1="7" x2="14.5" y2="9.5" />
    <line x1="7" y1="17" x2="9.5" y2="14.5" />
    <line x1="17" y1="17" x2="14.5" y2="14.5" />
  </>
));

export const Lightbulb = createIcon('Lightbulb', () => (
  <>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M8 14a5 5 0 1 1 8 0c-.8.8-1.4 1.7-1.7 2.8H9.7C9.4 15.7 8.8 14.8 8 14Z" />
  </>
));

export const Link = createIcon('Link', () => (
  <>
    <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
    <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
  </>
));

export const Link2 = Link;

export const Loader = createIcon('Loader', () => (
  <path d="M12 3a9 9 0 1 0 9 9" />
));

export const Loader2 = createIcon('Loader2', () => (
  <path d="M21 12a9 9 0 1 1-3-6.7" />
));

export const Lock = createIcon('Lock', () => (
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </>
));

export const LogOut = createIcon('LogOut', () => (
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </>
));

export const Mail = createIcon('Mail', () => (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="4 7 12 13 20 7" />
  </>
));

export const Megaphone = createMonogramIcon('Megaphone', 'M');

export const Menu = createIcon('Menu', () => (
  <>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </>
));

export const MessageCircle = createIcon('MessageCircle', () => (
  <path d="M7 18.5 3 21l1.2-4A8.5 8.5 0 1 1 20.5 12 8.5 8.5 0 0 1 7 18.5Z" />
));

export const MessageCirclePlus = createIcon('MessageCirclePlus', () => (
  <>
    <path d="M7 18.5 3 21l1.2-4A8.5 8.5 0 1 1 20.5 12 8.5 8.5 0 0 1 7 18.5Z" />
    <line x1="12" y1="8.5" x2="12" y2="15.5" />
    <line x1="8.5" y1="12" x2="15.5" y2="12" />
  </>
));

export const MessageSquare = createIcon('MessageSquare', () => (
  <path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-5 3V7a2 2 0 0 1 2-2Z" />
));

export const Minus = createIcon('Minus', () => (
  <line x1="5" y1="12" x2="19" y2="12" />
));

export const Moon = createIcon('Moon', () => (
  <path d="M21 12.6A9 9 0 1 1 11.4 3 7 7 0 1 0 21 12.6Z" />
));

export const MousePointerClick = createMonogramIcon('MousePointerClick', 'P');

export const Package = createIcon('Package', () => (
  <>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
    <path d="M3 7.5 12 12l9-4.5" />
    <path d="M12 12v9" />
  </>
));

export const Palette = createMonogramIcon('Palette', 'P');

export const Play = createIcon('Play', () => (
  <polygon points="8 5 19 12 8 19 8 5" />
));

export const Plus = createIcon('Plus', () => (
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
));

export const Power = createIcon('Power', () => (
  <>
    <line x1="12" y1="3" x2="12" y2="11" />
    <path d="M7.1 5.7a8 8 0 1 0 9.8 0" />
  </>
));

export const PowerOff = createIcon('PowerOff', () => (
  <>
    <line x1="2" y1="2" x2="22" y2="22" />
    <line x1="12" y1="3" x2="12" y2="8" />
    <path d="M7.4 7.4a8 8 0 1 0 9.2 1.3" />
  </>
));

export const QrCode = createMonogramIcon('QrCode', 'QR');

export const Receipt = createIcon('Receipt', () => (
  <>
    <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3Z" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </>
));

export const RefreshCw = createIcon('RefreshCw', () => (
  <>
    <path d="M20 7v5h-5" />
    <path d="M4 17v-5h5" />
    <path d="M20 12a8 8 0 0 0-13.6-5.7L4 7" />
    <path d="M4 12a8 8 0 0 0 13.6 5.7L20 17" />
  </>
));

export const Repeat = createIcon('Repeat', () => (
  <>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a3 3 0 0 1 3-3h15" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a3 3 0 0 1-3 3H3" />
  </>
));

export const Reply = createIcon('Reply', () => (
  <>
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-1a5 5 0 0 0-5-5H4" />
  </>
));

export const Rocket = createIcon('Rocket', () => (
  <>
    <path d="M12 3c4.5 1 7.5 4 8.5 8.5L14 18l-8 2 2-8 6-6.5Z" />
    <circle cx="14" cy="10" r="1.5" />
    <path d="M8 14 5 17" />
    <path d="M10 19 7 16" />
  </>
));

export const RotateCcw = createIcon('RotateCcw', () => (
  <>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.5 15a9 9 0 1 0 2.1-9.1L1 10" />
  </>
));

export const Save = createIcon('Save', () => (
  <>
    <path d="M4 4h13l3 3v13H4V4Z" />
    <rect x="7" y="4" width="8" height="5" />
    <rect x="8" y="14" width="8" height="6" rx="1" />
  </>
));

export const Search = createIcon('Search', () => (
  <>
    <circle cx="11" cy="11" r="6" />
    <line x1="16" y1="16" x2="21" y2="21" />
  </>
));

export const Send = createIcon('Send', () => (
  <path d="M21 3 10 14M21 3 14 21l-4-7-7-4L21 3Z" />
));

export const Server = createIcon('Server', () => (
  <>
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
  </>
));

export const Settings = createIcon('Settings', () => (
  <>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M4.9 4.9l2.1 2.1" />
    <path d="M17 17l2.1 2.1" />
    <path d="M2 12h3" />
    <path d="M19 12h3" />
    <path d="M4.9 19.1 7 17" />
    <path d="M17 7l2.1-2.1" />
  </>
));

export const Share2 = createIcon('Share2', () => (
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.6" y1="10.8" x2="15.4" y2="6.2" />
    <line x1="8.6" y1="13.2" x2="15.4" y2="17.8" />
  </>
));

export const Shield = createIcon('Shield', () => (
  <path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z" />
));

export const ShieldAlert = createIcon('ShieldAlert', () => (
  <>
    <path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
  </>
));

export const ShieldCheck = createIcon('ShieldCheck', () => (
  <>
    <path d="M12 3 5 6v5c0 5 3.2 8 7 10 3.8-2 7-5 7-10V6l-7-3Z" />
    <polyline points="9.5 12.5 11.5 14.5 15 11" />
  </>
));

export const ShoppingBag = createIcon('ShoppingBag', () => (
  <>
    <path d="M6 8h12l1 12H5L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </>
));

export const ShoppingCart = createIcon('ShoppingCart', () => (
  <>
    <circle cx="9" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
    <path d="M3 5h2l2.2 10.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H7" />
  </>
));

export const Sparkles = createIcon('Sparkles', () => (
  <>
    <path d="M12 4 13.8 9 19 10.8 13.8 12.6 12 18 10.2 12.6 5 10.8 10.2 9 12 4Z" />
    <path d="M5 3 5.6 4.4 7 5 5.6 5.6 5 7 4.4 5.6 3 5 4.4 4.4 5 3Z" />
    <path d="M19 16 19.6 17.4 21 18 19.6 18.6 19 20 18.4 18.6 17 18 18.4 17.4 19 16Z" />
  </>
));

export const Star = createIcon('Star', () => (
  <polygon points="12 3.5 14.8 9 21 9.8 16.5 14 17.8 20.2 12 17.2 6.2 20.2 7.5 14 3 9.8 9.2 9 12 3.5" />
));

export const Sun = createIcon('Sun', () => (
  <>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.9" y1="4.9" x2="7" y2="7" />
    <line x1="17" y1="17" x2="19.1" y2="19.1" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.9" y1="19.1" x2="7" y2="17" />
    <line x1="17" y1="7" x2="19.1" y2="4.9" />
  </>
));

export const Target = createIcon('Target', () => (
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </>
));

export const Terminal = createIcon('Terminal', () => (
  <>
    <polyline points="4 7 9 12 4 17" />
    <line x1="11" y1="17" x2="20" y2="17" />
  </>
));

export const TestTube = createIcon('TestTube', () => (
  <>
    <path d="M9 3h6" />
    <path d="M10 3v5l-5 8a3 3 0 0 0 2.6 5h8.8A3 3 0 0 0 19 16l-5-8V3" />
    <path d="M8.5 14h7" />
  </>
));

export const ThumbsUp = createMonogramIcon('ThumbsUp', 'T');

export const Ticket = createIcon('Ticket', () => (
  <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V8Z" />
));

export const Timer = createIcon('Timer', () => (
  <>
    <circle cx="12" cy="13" r="8" />
    <line x1="12" y1="13" x2="15.5" y2="10.5" />
    <line x1="9" y1="2" x2="15" y2="2" />
  </>
));

export const Trash2 = createIcon('Trash2', () => (
  <>
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M7 7l1 13h8l1-13" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </>
));

export const TrendingUp = createIcon('TrendingUp', () => (
  <>
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="15 7 21 7 21 13" />
  </>
));

export const Upload = createIcon('Upload', () => (
  <>
    <path d="M12 17V4" />
    <polyline points="7 9 12 4 17 9" />
    <path d="M4 20h16" />
  </>
));

export const User = createIcon('User', () => (
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0" />
  </>
));

export const UserPlus = createIcon('UserPlus', () => (
  <>
    <circle cx="10" cy="8" r="4" />
    <path d="M2 20a8 8 0 0 1 16 0" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </>
));

export const Users = createIcon('Users', () => (
  <>
    <circle cx="9" cy="8.5" r="3.5" />
    <circle cx="17" cy="9.5" r="2.5" />
    <path d="M3 19a6 6 0 0 1 12 0" />
    <path d="M15 19a4.5 4.5 0 0 1 6 0" />
  </>
));

export const Wallet = createIcon('Wallet', () => (
  <>
    <path d="M4 7h14a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <path d="M4 7V6a2 2 0 0 1 2-2h10" />
    <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
  </>
));

export const X = createIcon('X', () => (
  <>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </>
));

export const XCircle = createIcon('XCircle', () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </>
));

export const Zap = createIcon('Zap', () => (
  <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
));
