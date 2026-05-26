# Dowinn Frontend Assessment

Simple project management frontend built with Next.js, React, Tailwind CSS, and Axios.

## Features

- Sign up and sign in
- Project create and update
- Task create and update
- Kanban board with Todo, In Progress, and Done columns
- Drag and drop task status updates
- Change log tracking for task creation, edits, and status changes

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Axios
- TypeScript

## Setup

Install dependencies:

```bash
npm install
```

Create an optional `.env.local` if the API host or init endpoint changes:

```bash
NEXT_PUBLIC_API_BASE_URL=https://m-backend.dowinnsys.com
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Notes

- API calls are centralized in `lib/api.ts`.
- The dashboard keeps state locally for readability and simplicity.
- The backend login endpoint returns `ok`, so the app stores `userId` locally for session routing.
