# Bluesky Social Tech Stack

## Core Technologies

- **React Native 0.81** with Expo 54 - Cross-platform mobile framework
- **TypeScript 5.9** - Type-safe JavaScript
- **React Navigation** - Routing and navigation
- **TanStack Query 5.25.0** - Server state management and data fetching
- **Lingui** - Internationalization (i18n)
- **Jest** - Testing framework
- **Babel** - JavaScript compiler with React Compiler enabled
- **Node.js >= 20** - Runtime
- **Yarn 1.22.22** - Package manager

## Design System

- **ALF (Application Layout Framework)** - Custom design system with Tailwind-inspired naming (underscores instead of hyphens)
- Theme tokens, atoms, and component library

## Build & Deployment

- **Expo** - Cross-platform development and testing
- **EAS (Expo Application Services)** - Building and submitting apps
- **Metro bundler** - React Native bundler
- **Webpack** - Web builds
- **bskyweb** - Go server for production web serving

## Code Quality

- **ESLint** - Linting with TypeScript support and custom rules
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## Development Commands

```bash
yarn start              # Start Expo dev server
yarn web               # Start web version
yarn android           # Run on Android
yarn ios               # Run on iOS
yarn test              # Run Jest tests
yarn lint              # Run ESLint
yarn typecheck         # Run TypeScript type checking
yarn intl:extract      # Extract translation strings
yarn intl:compile      # Compile translations for runtime
yarn build-web         # Build web version
yarn prebuild          # Generate native projects
```

## Key Patterns & Conventions

- **Absolute imports**: Use `#/` alias for imports
- **Platform-specific files**: `.web.tsx`, `.native.tsx`, `.ios.tsx`, `.android.tsx`
- **Internationalization**: All user-facing strings wrapped with `msg()` or `<Trans>`
- **React Compiler**: Enabled - no manual `useMemo`/`useCallback` needed
- **Dialog patterns**: Use `control.close(() => {...})` to avoid race conditions
- **Accessibility**: Always provide `label` props for interactive elements
- **State management**: TanStack Query for server state, React Context for UI preferences
