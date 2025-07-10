# Nuxt Notes App

A simple, modern, minimalistic notes app.
- Built in Nuxt 3 + Vue 3
- Uses Supabase for backend data store

## Features

- Create, edit, delete notes
- View notes in a responsive grid
- Modern, minimal and responsive UI

## Supabase Table Schema

You must create a `notes` table in Supabase:

| Field      | Type       | Special           |
|------------|------------|-------------------|
| id         | int8       | Primary key, auto inc, not null |
| title      | text       | not null          |
| content    | text       | not null          |
| created_at | timestamp  | default: now()    |

The app expects your Supabase project URL/key in `useSupabase.ts` (see code).

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
