# Clerk Private Metadata Demo 🔐

A high-performance Next.js 15 demonstration dashboard highlighting the difference between accessing **Private Metadata** via the Session Token (Client) versus the Backend API (Server).

![Metadata Dashboard](/app/favicon.ico) <!-- Placeholder for actual screenshot if available -->

## 🚀 Features

- **Approach 1 (JWT Decoding):** Demonstrates ultra-fast, zero-latency access to private metadata by decoding the Clerk Session Token on the client.
- **Approach 2 (Server Actions):** Demonstrates real-time, fresh data retrieval using Next.js Server Actions and the `@clerk/nextjs` SDK.
- **Comparison Engine:** Integrated visual comparison of latency, freshness, and scalability between both methods.
- **Premium UI:** Glassmorphism design, interactive hover states, and consistent dark theme.
- **Full Payload Inspector:** Toggle to view the entire decoded JWT payload.

## ⚙️ Setup & Configuration

### 1. Environment Variables
Clone `.env.example` to `.env` and provide your Clerk keys:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 2. Clerk Dashboard Configuration (Crucial)
For **Approach 1** to work, you must sync your private metadata to the session token:
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com).
2. Navigate to **Sessions** -> **Edit** (under Session Token).
3. Add the following to your JSON claims:
   ```json
   {
     "private_data": "{{user.private_metadata}}"
   }
   ```
4. Save changes.

### 3. Add Sample Metadata
Manually add some private metadata to a test user in the Clerk Dashboard to see it in action:
```json
{
  "role": "secret_agent",
  "clearance": 5
}
```

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** Clerk (@clerk/nextjs)
- **Styling:** Tailwind CSS (Modern Glassmorphism)
- **Icons:** Lucide React
- **Tools:** jwt-decode

## 📖 Understanding the Methods

| Feature | Approach 1: Session Token | Approach 2: Backend API |
| :--- | :--- | :--- |
| **Latency** | Zero (Local Decode) | Network Bound (~100-300ms) |
| **Freshness** | Stale (Cached in JWT) | Real-time (Always Fresh) |
| **Setup** | Required in Clerk Dashboard | Standard API Access |
| **Scalability** | Infinite (No API Hits) | Subject to Clerk Rate Limits |

## 🛹 Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the comparison.
