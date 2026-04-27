# Ecommerce Admin Dashboard

A Vue 3 + TypeScript admin dashboard for a simple ecommerce management demo. The project includes authentication, product management, order views, charts, and a lightweight API layer for deployment on Vercel.

## Features

- Login flow with mock authentication
- Dashboard overview with charts
- Product list with search, pagination, create, update, and delete actions
- Order management view
- Vue Router and Pinia based app structure
- Vercel serverless API for online demo support

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Axios
- ECharts

## Getting Started

Install dependencies:

```bash
npm install
```

Start the frontend in development mode:

```bash
npm run dev
```

## API Behavior

In local development, the frontend uses:

```text
http://localhost:3000
```

This works with a local PHP server such as:

```bash
php -S localhost:3000
```

In production, the frontend automatically sends requests to the deployed Vercel API:

```text
/api
```

The Vercel function lives in `api/index.ts` and mirrors the mock endpoints used during development.

## Build

Create a production build with:

```bash
npm run build
```

## Deployment

This project can be deployed directly to Vercel.

After pushing the repository to GitHub:

1. Import the repository into Vercel.
2. Use the default Vite build settings.
3. Deploy the project.

The frontend and the mock API will be deployed together, so the online login and product pages can work without the local PHP backend.

## Notes

- The current backend is mock data intended for demos and portfolio use.
- Data created through the Vercel function is not persistent storage.
- For production-grade behavior, connect the project to a real database and backend service.
