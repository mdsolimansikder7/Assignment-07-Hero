# বাজার দর (BazarDor)

**Live Site:** https://assigment-07-hero.vercel.app

**GitHub Repository:** https://github.com/mdsolimansikder7/Assignment-07-Hero

## About the Project

বাজার দর (BazarDor) is a Bangla-language web application that helps users check the daily prices of essential products in Bangladesh. It presents everyday items such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices in one place, along with price changes and market-wise price ranges.

The homepage includes a hero section, a scrolling price ticker, products whose prices have increased or decreased, and a complete product list. Users can browse products by category, sort products by price and price movement, and open a product detail page (after signing in) to compare minimum, maximum, and average prices across markets.

The interface is primarily in Bangla and is designed for mobile, tablet, and desktop screens.

## Technologies Used

- **Next.js (App Router)** — routing and server-rendered pages
- **React** — UI components and interactions
- **TypeScript** — typed application code and product models
- **Tailwind CSS** — responsive styling
- **DaisyUI** — UI styling utilities
- **Better Auth** — email/password and social authentication
- **MongoDB** — database adapter for authentication
- **react-hot-toast** — success and error notifications
- **react-icons** — icons
- **Custom CSS marquee** — scrolling market-price ticker
- **Hind Siliguri via next/font** — Bangla typography
- **Programming Hero BazarDor API** — product, category, and price data
- **Vercel** — deployment

## Features

1. **Scrolling price ticker.** Displays selected products, today's prices, units, and percentage changes in an infinite scrolling strip. The animation pauses on hover.
2. **Price increases and decreases.** The homepage highlights the top six products whose prices have increased and the top six whose prices have decreased.
3. **Product list and sorting.** Browse all products and sort by default order, lowest price, highest price, largest price increase, or largest price decrease. Sorting uses numeric values, not text.
4. **Category-based browsing.** Explore products through category pages with category information, sorting options, and a friendly empty state for invalid categories.
5. **Product price details.** Signed-in users can view a product's current price, price movement, market-wise minimum and maximum prices, and calculated minimum, maximum, and average price summaries.
6. **Authentication.** Sign up and sign in with email/password or Google and GitHub, when the corresponding OAuth providers are configured. Toast messages are shown for success and errors.
7. **Protected routes.** Product detail and profile pages require sign-in. Unauthenticated visitors are redirected to the sign-in page with a notification.
8. **User profile.** Signed-in users can view their account information, update their profile name, and sign out.
9. **Bangla-first experience.** Uses Bangla interface text, Bangla digits for displayed prices, and a Bangla date in the navigation area.
10. **Loading and not-found states.** Skeleton loaders appear while data is loading, and a custom 404 page handles invalid routes or missing content.
11. **Responsive layout.** Navigation, product cards, and price details adapt to mobile, tablet, and desktop screens.

## Pages and Routes

| Route                     | Description                                         | Authentication |
| ------------------------- | --------------------------------------------------- | -------------- |
| `/`                       | Hero, price risers, price fallers, and all products | Not required   |
| `/category/[id]`          | Products within a category                          | Not required   |
| `/product/[id]`           | Product and market-wise price details               | Required       |
| `/signin`                 | Sign-in page                                        | Not required   |
| `/signup`                 | Registration page                                   | Not required   |
| `/profile`                | User profile and sign-out                           | Required       |
| `/profile/update-profile` | Update profile information                          | Required       |

## Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB connection and authentication-provider credentials if you want to test authentication locally

### 1. Clone the repository

```bash
git clone https://github.com/mdsolimansikder7/Assignment-07-Hero.git
cd Assignment-07-Hero
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. Add the variables required by the authentication setup in `src/lib/auth.ts` and `src/lib/auth-client.ts`. These may include a MongoDB connection string, the Better Auth base URL, and OAuth credentials for providers you enable.

Example placeholders:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Use the exact variable names expected by your current auth configuration. Never commit real credentials or secret keys to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint checks                    |

## Project Structure

```text
src/
├── app/
│   ├── api/auth/              # Better Auth API handler
│   ├── category/[id]/         # Category products page
│   ├── product/[id]/          # Product price details
│   ├── profile/               # User profile and profile update
│   ├── signin/                # Sign-in page
│   ├── signup/                # Sign-up page
│   ├── layout.tsx             # Root layout, navbar, ticker, footer
│   ├── loading.tsx            # Home page skeleton loader
│   ├── not-found.tsx          # Custom 404 page
│   └── page.tsx               # Homepage
├── components/                # Navbar, hero, ticker, cards, sorting, etc.
├── lib/                       # Auth configuration and shared utilities
└── proxy.ts                   # Route protection
```

## Links

- **Live Website:** https://assigment-07-hero.vercel.app
- **GitHub Repository:** https://github.com/mdsolimansikder7/Assignment-07-Hero

## Author

**Md Soliman Sikder**

- GitHub: [@mdsolimansikder7](https://github.com/mdsolimansikder7)

---

If you find this project useful, consider giving the repository a star.