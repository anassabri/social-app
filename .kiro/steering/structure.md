# Bluesky Social Project Structure

## Directory Organization

```
src/
├── alf/                    # Design system (ALF)
│                           # - Themes, tokens, atoms
│                           # - Component library
│
├── components/             # Shared UI components
│                           # - Button, Dialog, Menu, etc.
│                           # - Reusable across screens
│
├── screens/                # Full-page screen components (newer pattern)
│                           # - Individual screen implementations
│
├── view/                   # View layer (mixed legacy/new)
│   ├── screens/            # Full-page screens (legacy location)
│   ├── com/                # Reusable view components
│   └── shell/              # App shell
│                           # - Navigation bars, tabs
│                           # - Layout wrappers
│
├── state/                  # State management
│   ├── queries/            # TanStack Query hooks
│   │                       # - Data fetching logic
│   │                       # - Cache management
│   ├── preferences/        # User preferences (React Context)
│   ├── session/            # Authentication state
│   └── persisted/          # Persistent storage layer
│
├── lib/                    # Utilities and helpers
│                           # - Constants
│                           # - Helper functions
│                           # - Utility modules
│
├── locale/                 # Internationalization
│                           # - i18n configuration
│                           # - Language files
│
├── analytics/              # Analytics tracking
│
├── logger/                 # Logging and error tracking
│
├── storage/                # Persistent storage abstraction
│
├── types/                  # TypeScript type definitions
│
└── Navigation.tsx          # Main navigation configuration
```

## Key Directories Explained

### alf/
Custom design system with Tailwind-inspired naming. Contains theme definitions, design tokens, and reusable styled components.

### components/ & view/com/
Reusable UI components. Use `components/` for new code. `view/com/` is legacy but still in use.

### screens/ & view/screens/
Full-page screen implementations. `screens/` is the newer pattern; `view/screens/` is legacy.

### state/
All state management logic:
- **queries/**: TanStack Query hooks for server state
- **preferences/**: React Context for UI preferences
- **session/**: Authentication and user session
- **persisted/**: Storage abstraction for persistent data

### lib/
Utility functions, constants, and helpers. Keep this organized by feature or concern.

### locale/
Lingui i18n setup and translation files. All user-facing strings must be extracted here.

## File Naming Conventions

- **Platform-specific**: `Component.web.tsx`, `Component.native.tsx`, `Component.ios.tsx`, `Component.android.tsx`
- **TypeScript**: All source files use `.ts` or `.tsx`
- **Exports**: Use named exports for components and utilities

## Import Patterns

- Use absolute imports with `#/` alias: `import { Button } from '#/components'`
- Avoid relative imports when possible
- Group imports: external libraries, then internal modules

## Component Structure

Components typically follow this pattern:
1. Imports
2. Type definitions
3. Component function
4. Internationalization strings (wrapped with `msg()`)
5. Export

Always include accessibility props (labels, roles, etc.) for interactive elements.
