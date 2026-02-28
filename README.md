Nexus Terminal

A real-time Web3 crypto dashboard built with React, TypeScript, and Express. Tracks live market data, manages a personal watchlist, and displays trending assets and on-chain activity.

---

Features

- **Live Market Data** — Fetches top 10 coins from CoinGecko with 7-day sparkline charts
- **Interactive Price Chart** — Click any coin to view its area chart with price history
- **Watchlist** — Add/remove coins to a persistent watchlist (stored in `data.json`)
- **Trending View** — Gainers/losers grid, sector heatmap, and trending tokens table
- **Activity View** — Transaction feed with method/status filters and live network block feed
- **Settings View** — Slippage, gas priority, RPC, security, and notification preferences
- **CORS Proxy** — Express backend proxies CoinGecko requests and caches results for 60s

---

## Tech Stack


| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Frontend     | React 18, TypeScript, Tailwind CSS v4           |
| State / Data | TanStack React Query, Axios                     |
| Animations   | Framer Motion                                   |
| Charts       | Recharts                                        |
| Icons        | Lucide React                                    |
| Backend      | Express + Vite middleware                       |
| Runtime      | Node.js 18+, TSX                                |
```
## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
cd web-3-fixed

cp .env.example .env

npm install
```

### Running in Development

```bash
npm run dev
```

Opens at **http://localhost:3000**

The dev server runs Express + Vite together in a single process. Vite handles HMR for the frontend while Express serves the API routes.

### Building for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
web-3-main/
│
├── server.ts              # Backend server
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── index.html             # Main HTML entry
│
└── src/
    ├── main.tsx           # React entry point
    ├── App.tsx            # Root component
    │
    ├── components/
    ├── layout/
    ├── ui/
    ├── views/
    ├── hooks/
    └── types/
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/market` | Proxied CoinGecko market data (cached 60s) |
| GET | `/api/watchlist` | Get saved watchlist items |
| POST | `/api/watchlist` | Add a coin to the watchlist |
| DELETE | `/api/watchlist/:id` | Remove a coin from the watchlist |

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
GEMINI_API_KEY=        # Optional: for AI features
DISABLE_HMR=false      # Set true to disable Vite HMR
```

---

## Notes

- Market data is cached server-side for 60 seconds to avoid CoinGecko rate limits
- The watchlist persists to `data.json` on disk — no database required
- "Connect Wallet" button is UI-only, no actual wallet integration
- Activity and Settings views use mock/demo data
