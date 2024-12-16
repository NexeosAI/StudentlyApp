# StudentlyAI Design System & Style Requirements

## Logo Specifications

### Logo Design
```css
/* Logo Colors */
--logo-primary: "#FF5C00";     /* Orange graduation cap */
--logo-text: "#111827";        /* Dark text for "StudentlyAI" */

/* Logo Dimensions */
--logo-height-sm: 24px;
--logo-height-md: 32px;
--logo-height-lg: 48px;

/* Logo Spacing */
--logo-icon-spacing: 8px;      /* Space between icon and text */
```

### Logo Usage
- Minimum clear space: Equal to the height of the graduation cap icon
- Minimum size: 24px height
- File formats: SVG (preferred), PNG with transparency
- Usage: Always maintain original proportions
- Don't: Stretch, rotate, or alter logo colors
- Don't: Add effects like shadows or gradients

### Logo Variations
1. Full logo (icon + text)
2. Icon only (for favicons and small spaces)
3. Dark mode variant (white text)
4. Light mode variant (dark text)

## Brand Identity

### Core Colors
```css
/* Brand Colors */
--brand-primary: "#FF5C00";     /* Main orange */
--brand-secondary: "#FF7A2E";   /* Light orange */
--brand-accent: "#FFF3EB";      /* Pale orange */

/* Primary Blues */
--primary-100: "#E6F3FF";       /* Light blue - backgrounds */
--primary-500: "#0066CC";       /* Main blue - buttons, links */
--primary-700: "#004C99";       /* Dark blue - hover states */

/* Secondary Colors */
--secondary-300: "#FFB84D";     /* Orange - accents */
--secondary-500: "#FF9900";     /* Orange - CTAs */

/* Neutral Colors */
--neutral-50: "#F9FAFB";        /* Lightest grey - backgrounds */
--neutral-100: "#F3F4F6";       /* Light grey - cards */
--neutral-300: "#D1D5DB";       /* Mid grey - borders */
--neutral-700: "#374151";       /* Dark grey - text */
--neutral-900: "#111827";       /* Darkest - headings */

/* Semantic Colors */
--success-500: "#32D583";       /* Success states */
--warning-500: "#FBA944";       /* Warning states */
--error-500: "#FF4545";         /* Error states */
--info-500: "#2E90FA";         /* Info states */
```

### Typography System

#### Font Families
```css
--font-primary: "Inter", sans-serif;          /* Main text */
--font-display: "Clash Display", serif;       /* Headings */
--font-mono: "JetBrains Mono", monospace;     /* Code blocks */
```

#### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
```

#### Line Heights
```css
--leading-none: 1;        /* Headings */
--leading-tight: 1.25;    /* Compact text */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.75;  /* Readable text */
--leading-loose: 2;       /* Spacious text */
```

### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Component Design

### Buttons

#### Base Styles
```css
.btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s;
}
```

#### Variants
```typescript
interface ButtonVariants {
  primary: {
    background: "bg-primary-500";
    hover: "hover:bg-primary-700";
    text: "text-white";
  };
  secondary: {
    background: "bg-white";
    border: "border-2 border-primary-500";
    text: "text-primary-500";
    hover: "hover:bg-primary-50";
  };
  ghost: {
    background: "bg-transparent";
    text: "text-primary-500";
    hover: "hover:bg-primary-50";
  };
}
```

#### Sizes
```typescript
interface ButtonSizes {
  sm: {
    padding: "px-3 py-2";
    fontSize: "text-sm";
  };
  md: {
    padding: "px-4 py-2";
    fontSize: "text-base";
  };
  lg: {
    padding: "px-6 py-3";
    fontSize: "text-lg";
  };
}
```

### Cards

#### Base Styles
```css
.card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### Variants
```typescript
interface CardVariants {
  default: {
    padding: "p-6";
    background: "bg-white";
    border: "border border-neutral-200";
  };
  elevated: {
    padding: "p-6";
    background: "bg-white";
    shadow: "shadow-lg";
  };
  compact: {
    padding: "p-4";
    background: "bg-white";
    border: "border border-neutral-200";
  };
}
```

### Forms

#### Input Fields
```typescript
interface InputStyles {
  base: {
    padding: "px-4 py-2";
    border: "border border-neutral-300";
    radius: "rounded-md";
    fontSize: "text-base";
  };
  focus: {
    ring: "ring-2 ring-primary-500";
    border: "border-primary-500";
  };
  error: {
    border: "border-error-500";
    text: "text-error-500";
  };
}
```

#### Select Dropdowns
```typescript
interface SelectStyles {
  trigger: {
    padding: "px-4 py-2";
    border: "border border-neutral-300";
    radius: "rounded-md";
  };
  content: {
    background: "bg-white";
    shadow: "shadow-lg";
    radius: "rounded-md";
    border: "border border-neutral-200";
  };
  item: {
    padding: "px-4 py-2";
    hover: "hover:bg-neutral-50";
    selected: "bg-primary-50 text-primary-500";
  };
}
```

## Layout System

### Grid System
```typescript
interface GridSystem {
  columns: {
    default: 12;
    responsive: {
      sm: 6;
      md: 8;
      lg: 12;
    };
  };
  breakpoints: {
    xs: "320px";    // Small phones
    sm: "640px";    // Large phones
    md: "768px";    // Tablets
    lg: "1024px";   // Laptops
    xl: "1280px";   // Desktops
    "2xl": "1536px" // Large screens
  };
  gaps: {
    xs: "gap-2";    // 8px
    sm: "gap-4";    // 16px
    md: "gap-6";    // 24px
    lg: "gap-8";    // 32px
  };
}
```

### Container Sizes
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Breakpoint-specific max-widths */
@media (min-width: 640px) {
  .container { max-width: 640px; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## Dark Mode Support

### Color Mapping
```typescript
interface DarkModeColors {
  background: {
    primary: "#111827";    /* Dark background */
    secondary: "#1F2937";  /* Lighter dark background */
    tertiary: "#374151";   /* Accent background */
  };
  text: {
    primary: "#FFFFFF";    /* Main text */
    secondary: "#E5E7EB";  /* Secondary text */
    tertiary: "#9CA3AF";   /* Muted text */
  };
  border: {
    default: "#374151";    /* Default borders */
    focus: "#3B82F6";      /* Focus borders */
  };
}
```

### Theme Switching
```typescript
interface ThemeSwitching {
  system: {
    light: "(prefers-color-scheme: light)";
    dark: "(prefers-color-scheme: dark)";
  };
  manual: {
    storage: "localStorage";
    key: "theme-preference";
  };
  transition: {
    duration: "duration-200";
    timing: "ease-in-out";
    properties: [
      "background-color",
      "color",
      "border-color"
    ];
  };
}
```

## Animation & Transitions

### Duration Scale
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
```

### Easing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
```typescript
interface Animations {
  fade: {
    in: "fade-in";
    out: "fade-out";
    duration: "duration-200";
  };
  slide: {
    in: "slide-in";
    out: "slide-out";
    duration: "duration-200";
  };
  scale: {
    in: "scale-in";
    out: "scale-out";
    duration: "duration-150";
  };
}
```

## Accessibility

### Focus States
```css
--focus-ring-color: rgb(59, 130, 246);
--focus-ring-offset: 2px;
--focus-ring-width: 2px;
```

### Color Contrast
- Maintain WCAG 2.1 AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Interactive elements: 3:1 contrast with adjacent colors

### Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Icons & Assets

### Icon System
```typescript
interface IconSystem {
  sizes: {
    sm: "16px";
    md: "24px";
    lg: "32px";
    xl: "48px";
  };
  weights: {
    light: 300;
    regular: 400;
    bold: 700;
  };
  collections: {
    ui: "lucide-react";
    brand: "custom-icons";
  };
}
```

### Image Guidelines
- Use WebP format with fallbacks
- Responsive images with srcset
- Lazy loading for off-screen images
- Alt text for accessibility
- Placeholder images during loading

## Usage Guidelines

### Best Practices
1. Use semantic HTML elements
2. Maintain consistent spacing scale
3. Follow responsive design patterns
4. Implement proper dark mode support
5. Ensure accessibility compliance

### Component Implementation
```typescript
interface ComponentImplementation {
  naming: {
    prefix: "sl";  // Studently
    convention: "kebab-case";
  };
  structure: {
    atomic: boolean;
    modular: boolean;
    responsive: boolean;
  };
  documentation: {
    props: boolean;
    examples: boolean;
    accessibility: boolean;
  };
}
```

This document should be regularly updated as the design system evolves. All implementations should follow these guidelines to maintain consistency across the platform.