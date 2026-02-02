# Clerk Private Metadata Demo

A Next.js demonstration of accessing Clerk **Private Metadata** via Client-side (JWT) vs. Server-side (API).

## 🚀 Setup

1. **Keys:** Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env`.
2. **Dashboard:** In [Clerk Dashboard](https://dashboard.clerk.com) > Sessions > Edit Session Token, add:
   ```json
   { "private_data": "{{user.private_metadata}}" }
   ```
3. **Data:** Add sample private metadata to a test user: `{"role": "agent"}`.

## 🛠 Usage

```bash
npm install
npm run dev
```

## 📊 Comparison

- **Approach 1 (Token):** Instant, cached in JWT, requires dashboard config.
- **Approach 2 (Backend):** Fresh, network bound, standard API access.
