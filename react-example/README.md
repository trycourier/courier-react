# React 17 Example App

A React 17 example application demonstrating Courier integration with routing and environment variables.

## Features

- **React 17** with TypeScript
- **React Router** for navigation
- **Courier Integration** using `@trycourier/react-hooks` and `@trycourier/react-provider`
- **Environment Variables** support
- **Local Package Integration** - Uses local Courier packages from the monorepo

## Getting Started

### Installation

Install dependencies from the root of the monorepo:

```bash
cd /Users/michaelmiller/Desktop/courier/web/courier-react
yarn install
```

### Configuration

1. Copy `.env.example` to `.env`:

   ```bash
   cp react-example/.env.example react-example/.env
   ```

2. Update the values in `.env` with your actual configuration, especially Courier credentials:
   ```env
   REACT_APP_COURIER_CLIENT_KEY=your-client-key
   REACT_APP_COURIER_USER_ID=your-user-id
   ```

### Development

Start the development server:

```bash
cd react-example
npm start
```

The app will open at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

The built files will be in the `build` directory.

## Pages

- **Home** (`/`) - Welcome page with app information
- **Preferences** (`/preferences`) - Courier preferences example using `usePreferences` hook

## Environment Variables

This app supports environment variables through `.env` files. Create React App automatically loads environment variables from `.env` files.

### Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration.

### Usage

- **Important**: Environment variables must be prefixed with `REACT_APP_` to be exposed to the client-side code.
- Access variables in your code using `process.env.REACT_APP_VARIABLE_NAME`
- The `.env` file is ignored by git (see `.gitignore`)
- Never commit sensitive values like API keys to version control

## Courier Integration

This example includes integration with `@trycourier/react-hooks` and `@trycourier/react-provider` using the local packages from the monorepo.

### Setup

1. Configure Courier credentials in your `.env` file:

   ```env
   REACT_APP_COURIER_CLIENT_KEY=your-client-key
   REACT_APP_COURIER_USER_ID=your-user-id
   REACT_APP_COURIER_API_URL=https://api.courier.com
   ```

   Or use an authorization token:

   ```env
   REACT_APP_COURIER_AUTHORIZATION=your-auth-token
   ```

2. The app is wrapped with `CourierProvider` which provides the necessary context for all Courier hooks.

### Using usePreferences

The Preferences page demonstrates how to use the `usePreferences` hook:

```tsx
import { usePreferences } from "@trycourier/react-hooks";

const MyComponent = () => {
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchPreferencePage();
  }, []);

  // Access preferences.preferencePage, preferences.isLoading, etc.
};
```
