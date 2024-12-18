# StudentlyAI Design System & Style Requirements

[Previous Logo Specifications section remains unchanged...]

## Brand Identity

### Theme System

#### Default Theme (Orange)
```typescript
const defaultOrangeTheme = {
  name: "Orange",
  colors: {
    50: "#FFF3EB",   // Lightest - backgrounds
    100: "#FFE5D6",  // Very light - subtle backgrounds
    200: "#FFCBB3",  // Light - hover states
    300: "#FFB190",  // Medium light - borders
    400: "#FF976D",  // Medium - disabled states
    500: "#FF5C00",  // Base color - primary actions
    600: "#E65300",  // Medium dark - hover states
    700: "#CC4A00",  // Dark - active states
    800: "#B34000",  // Very dark - text
    900: "#993700"   // Darkest - headings
  }
};
```

#### Preset Themes
```typescript
const presetThemes = {
  blue: {
    name: "Blue",
    colors: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",  // Base color
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A"
    }
  },
  green: {
    name: "Green",
    colors: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E",  // Base color
      600: "#16A34A",
      700: "#15803D",
      800: "#166534",
      900: "#14532D"
    }
  },
  purple: {
    name: "Purple",
    colors: {
      50: "#FAF5FF",
      100: "#F3E8FF",
      200: "#E9D5FF",
      300: "#D8B4FE",
      400: "#C084FC",
      500: "#A855F7",  // Base color
      600: "#9333EA",
      700: "#7E22CE",
      800: "#6B21A8",
      900: "#581C87"
    }
  }
};
```

#### Custom Theme Generation
```typescript
interface CustomThemeGenerator {
  // Input: Base color (500)
  baseColor: string;  // e.g., "#FF5C00"
  
  // Color Shade Generation Algorithm
  generateShades: {
    // Lightening algorithm (50-400)
    lighter: (baseColor: string, step: number) => string;
    // Base color (500)
    base: string;
    // Darkening algorithm (600-900)
    darker: (baseColor: string, step: number) => string;
  };
  
  // Contrast Ratio Requirements
  contrastRatios: {
    textOnLight: number;     // Minimum 4.5:1 for normal text
    textOnDark: number;      // Minimum 4.5:1 for normal text
    largeTextOnLight: number; // Minimum 3:1 for large text
    largeTextOnDark: number;  // Minimum 3:1 for large text
  };
  
  // Color Override Options
  overrides: {
    // Allow specific shade overrides while maintaining contrast
    shades?: Partial<Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>>;
    // Validate overrides meet contrast requirements
    validateOverride: (color: string, background: string) => boolean;
  };
}

// Example color shade generation
const generateCustomTheme = (baseColor: string) => {
  return {
    // Lighter shades (reduce saturation, increase brightness)
    50: adjustColor(baseColor, { saturation: -70%, brightness: +35% }),
    100: adjustColor(baseColor, { saturation: -60%, brightness: +30% }),
    200: adjustColor(baseColor, { saturation: -40%, brightness: +20% }),
    300: adjustColor(baseColor, { saturation: -20%, brightness: +10% }),
    400: adjustColor(baseColor, { saturation: -10%, brightness: +5% }),
    // Base color
    500: baseColor,
    // Darker shades (maintain saturation, reduce brightness)
    600: adjustColor(baseColor, { brightness: -10% }),
    700: adjustColor(baseColor, { brightness: -20% }),
    800: adjustColor(baseColor, { brightness: -30% }),
    900: adjustColor(baseColor, { brightness: -40% })
  };
};

// Contrast validation
const validateContrast = (foreground: string, background: string) => {
  const ratio = calculateContrastRatio(foreground, background);
  return {
    normalText: ratio >= 4.5,
    largeText: ratio >= 3.0
  };
};

// Example usage
const customTheme = {
  baseColor: "#FF5C00",  // User provided
  theme: generateCustomTheme("#FF5C00"),
  overrides: {
    // Optional manual overrides
    100: "#FFE1D1",  // Must pass contrast validation
    900: "#8A3200"   // Must pass contrast validation
  }
};
```

#### Theme Application
```typescript
interface ThemeApplication {
  // CSS Variable Generation
  cssVariables: {
    primary: string;      // --theme-primary
    shades: {
      [key: string]: string;  // --theme-50 through --theme-900
    };
  };
  
  // Tailwind Extension
  tailwind: {
    theme: {
      extend: {
        colors: {
          theme: {
            50: 'var(--theme-50)',
            // ... through 900
          }
        }
      }
    }
  };
  
  // Runtime Theme Switching
  themeSwitch: {
    // Save theme preference
    storage: "localStorage";
    key: "user-theme-preference";
    
    // Apply theme
    applyTheme: (theme: Theme) => void;
    
    // Transition settings
    transition: {
      duration: "200ms";
      timing: "ease-in-out";
      properties: ["background-color", "color", "border-color"];
    };
  };
}
```

[Rest of the original file content remains unchanged...]

## Theme Implementation Requirements

### Color Generation Rules
1. Base color (500) must be provided in hex format
2. Lighter shades (50-400):
   - Progressively decrease saturation
   - Progressively increase brightness
3. Darker shades (600-900):
   - Maintain saturation
   - Progressively decrease brightness
4. Each adjacent shade pair must maintain distinguishable contrast

### Accessibility Requirements
1. Text Contrast Ratios:
   - Normal text (16px and under): minimum 4.5:1
   - Large text (over 16px): minimum 3:1
   - UI components and graphical objects: minimum 3:1
2. Interactive Elements:
   - Focus indicators: minimum 3:1 contrast
   - Hover/Active states: must maintain required contrast ratios
3. Error States:
   - Error messages: minimum 4.5:1 contrast
   - Error indicators: must be distinguishable by more than just color

### Theme Customization Interface
1. Base Color Selection:
   - Color picker with hex input
   - Preview of generated shades
   - Real-time contrast validation
2. Manual Overrides:
   - Individual shade adjustment
   - Contrast ratio display
   - Invalid selection prevention
3. Theme Preview:
   - Live preview of UI components
   - Dark/Light mode toggle
   - Accessibility validation feedback

This document should be regularly updated as the design system evolves. All implementations should follow these guidelines to maintain consistency across the platform.
