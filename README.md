This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CATEGORY_API_URL=
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗 Project Structure

```
src/
├── app/                 # Next.js app directory
├── libs/               # Utility functions and API clients
├── providers/          # Web3 and app providers
├── types/              # TypeScript type definitions
└── views/              # Reusable UI components
```

## 🔗 Web3 Integration

The application integrates with the Rivalz2 testnet:

```typescript:src/providers/chains/rivalz-testnet.ts
startLine: 3
endLine: 19
```

## 🎨 UI Components

The application uses a custom design system built on Chakra UI, featuring:

- Responsive Navigation
- Dark Mode Support
- Custom Card Components
- Interactive Playground
- Code Highlighting

## 📦 Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Support

For support, please contact [support team contact].
