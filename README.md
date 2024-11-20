# Rivalz ADCS Adaptor

A modern web application for creating and managing Rivalz ADCS (Adaptor Data Collection System) configurations. Built with Next.js 14 and integrated with Web3 technologies.

## 🚀 Features

- Web3 Integration with RainbowKit and Wagmi
- Real-time Adaptor Management
- Provider Integration System
- Responsive Design with Chakra UI
- Dark Mode Support
- Multi-chain Support (Rivalz2 Testnet)

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Chakra UI, Emotion
- **Web3:** RainbowKit, Wagmi, Viem
- **State Management:** Jotai, TanStack Query
- **API Integration:** Axios
- **Code Highlighting:** Prism React Renderer
- **TypeScript:** Full type safety

## 🏃‍♂️ Getting Started

1. Clone the repository:
`git clone https://github.com/Rivalz-ai/adcs-frontend.git`

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
