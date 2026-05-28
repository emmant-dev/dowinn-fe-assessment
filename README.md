# Dowinn Frontend Assessment

## Project Overview

This is a simple project management frontend built for a technical assessment. The app allows members to sign up, sign in, manage projects, create and update tasks, move tasks between status columns, and view task change history.

## Tech Stack

- Next.js
- Tailwind CSS
- Axios
- TypeScript

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=https://m-backend.dowinnsys.com
```

Run the app locally:

```bash
npm run dev
```

Open the local app in your browser:

```bash
http://localhost:3000
```

## Credentials / Test Account

The app supports member sign-up through the provided assessment API. To test locally, create a new account from the sign-up form, then sign in with the same user ID and password.

The login API returns an `ok` response rather than a full token-based session. For this assessment implementation, the frontend stores the signed-in `userId` in `localStorage` and protects the dashboard client-side using that value.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the provided assessment API |

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
- Change log feature: records and displays task history for task creation, edits, and status changes
- Responsive dashboard: mobile drawer sidebar, tablet sidebar, and desktop sidebar layout

## Architecture Notes

- `lib/api.ts` centralizes Axios configuration and API wrappers.
- API responses are normalized in `lib/api.ts` so backend fields such as `name`, `contents`, `project_id`, `task_id`, and `created_at` can be consumed by frontend models such as `title`, `description`, `projectId`, `taskId`, and `createdAt`.
- `src/app/page.tsx` contains the authentication screen.
- `src/app/dashboard/page.tsx` owns dashboard state for projects, tasks, selected project, modals, drag-and-drop updates, and changelogs.
- Components in `components/` are kept focused on UI rendering and form input.

## Drag-and-Drop and Change Log Behavior

The Kanban board uses native browser drag-and-drop. When a task is dropped into another status column, the UI updates optimistically, the task status is persisted through the API, and a change log entry is created.

Change log entries are created for:

- Task creation
- Task detail updates
- Task status changes through drag-and-drop

The dashboard fetches change log records from the API and displays logs related to the currently selected project's tasks.

## Database Initialization / Seed Endpoint Status

The assessment requirement mentions an API endpoint for initializing the database with predefined data. I checked the current codebase and the exposed OpenAPI documentation for the assessment `/test01` through `/test04` endpoints. No database initialization or seed endpoint is currently documented for these routes.

Because no known endpoint is available, the frontend does not call a seed/init endpoint. If an endpoint is provided later, it can be added as a small Axios wrapper in `lib/api.ts`.

## Known Issues / API Behavior

The provided assessment backend uses a shared dataset environment. Projects, tasks, and change logs are not isolated per user.

As a result, authenticated users may see data created by other users. This behavior comes from the provided assessment API environment, and the frontend consumes API data as returned.

Authentication is intentionally lightweight for this assessment and is based on the available API behavior. The frontend stores `userId` in `localStorage` for client-side dashboard access instead of implementing a full token/session flow.

## Available Scripts

These are standard Next.js scripts used for development and deployment checks:

```bash
npm run dev
npm run build
npm run start
npm run lint
```
