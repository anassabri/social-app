# Bluesky Social App

## Overview
This is the official Bluesky social app (bsky.app) - a decentralized social network built on the AT Protocol. This is a React Native/Expo application with web support.

## Project Structure
- `/src` - Main application source code
- `/web` - Web-specific configuration and HTML template
- `/web-build` - Production web build output
- `/assets` - Images, icons, and fonts
- `/bskyweb` - Go-based web server for production (not used in Replit)
- `/bskyembed` - Embed widget component
- `/modules` - Native iOS/Android modules

## Tech Stack
- **Framework**: React Native with Expo (web platform)
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: React Native StyleSheet with custom theming
- **API**: AT Protocol (@atproto/api)
- **Internationalization**: Lingui

## Running the App

### Development (Web)
The app serves a pre-built static version on port 5000:
```bash
./node_modules/.bin/http-server web-build --port 5000 --host 0.0.0.0 --cors -c-1
```

### Rebuilding the Web App
To rebuild the web version after making changes:
```bash
yarn intl:compile  # Compile locale files
yarn build-web     # Build the web app
```

## Important Notes
1. **CORS Restrictions**: The app connects to Bluesky's production API (bsky.social, bsky.app). Some features may show CORS errors when running locally since the API expects requests from https://bsky.app.

2. **Authentication**: Users can sign in with their existing Bluesky credentials to access the full functionality.

3. **Mobile Apps**: This codebase also builds iOS and Android apps, but those require native build tooling (Xcode, Android Studio) not available in Replit.

## Dependencies
- Node.js 20+
- Yarn 1.22+
- Key packages: expo, react-native-web, @atproto/api

## Configuration Files
- `app.config.js` - Expo configuration
- `webpack.config.js` - Web build configuration (modified for Replit compatibility)
- `babel.config.js` - Babel transpiler settings
- `tsconfig.json` - TypeScript configuration

## Recent Changes
- Configured webpack devServer for Replit environment (port 5000, all hosts allowed)
- Added webpack-cli and webpack-dev-server as dev dependencies
- Set up static file serving for production build
