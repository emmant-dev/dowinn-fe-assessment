# Dowinn Frontend Assessment

## Project Overview

This is a simple project management frontend built for a technical assessment. The app allows users to authenticate, manage projects, create and update tasks, move tasks between status columns, and view task change history.

## Tech Stack

- Next.js
- Tailwind CSS
- Axios
- TypeScript

## Setup Instructions

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Open the local app in your browser:

```bash
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root for local environment configuration.

```bash
NEXT_PUBLIC_API_BASE_URL=https://m-backend.dowinnsys.com
```

The frontend uses this value as the API base URL.

## Deployment

Vercel deployment:

```bash
https://dowinn-fe-assessment.vercel.app/
```

## Features

- Authentication: sign up, sign in, and logout
- Project management: create and update projects
- Task management: create and update tasks under projects
- Drag-and-drop task updates: move tasks between Todo, In Progress, and Done
- Change log feature: records and displays task history for creation, edits, and status changes

## Known Limitations / API Behavior

The provided assessment backend uses a shared dataset environment. Projects, tasks, and change logs are not isolated per user.

As a result, authenticated users may see data created by other users. This behavior comes from the provided assessment API environment, and the frontend consumes API data as returned.

## Available Scripts

These are standard Next.js scripts used for development and deployment checks:

- npm run dev – starts the development server
- npm run build – creates an optimized production build
- npm run start – runs the production build locally
- npm run lint – checks code quality and formatting issues
