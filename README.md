# Casino Game Lobby (Next.js)

A modern, feature-rich casino game lobby built with Next.js, React Query, Zustand, and SCSS Modules. Now with a fully responsive, Figma-accurate UI, including a fixed header, airdrop banner, horizontal category bar, improved search bar, and transparent horizontal scrollbars.

## Features

### Core Functionality
- **Game Grid Display** – Responsive, horizontally scrollable grid of game cards
- **Real-time Search** – Debounced search bar with search icon
- **Provider Filtering** – Horizontal, scrollable provider filter with transparent scrollbar
- **Favorites System** – Add/remove games to favorites with persistent storage
- **Infinite Scroll** – Seamless pagination with intersection observer
- **Show Favorites Only** – Toggle to view only favorited games
- **Category Bar** – Horizontal, scrollable button bar for quick filtering
- **Airdrop Banner** – Customizable banner section for promotions
- **Fixed Header** – Responsive header with logo and login/register buttons

### User Experience
- **Performance Optimized** - React Query caching and optimized re-renders
- **Responsive Design** - Works perfectly on desktop and mobile
- **Modern UI** - Clean, dark theme with smooth animations
- **Loading States** - Skeleton loaders and progress indicators
- **Error Handling** - Graceful error states and user feedback
- **Empty States** - Helpful messages when no games are found

### Technical Features
- **Comprehensive Testing** - Jest + React Testing Library test suite
- **Type Safety** - Proper prop validation and error boundaries
- **Developer Experience** - Hot reload, and debugging tools
- **Modular Architecture** - Clean component structure and separation of concerns

## 🛠 Tech Stack

### Frontend
- **Next.js 13** - React framework with SSR/SSG support
- **React 18** - Latest React with concurrent features
- **SCSS Modules** - Scoped styling with CSS modules
- **Axios** - HTTP client for API requests

### State Management & Data
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management and caching
- **localStorage** - Persistent favorites storage

### Testing & Development
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **Babel** - JavaScript compiler for testing

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd casino-lobby

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

## 📁 Project Structure

```
casion-lobby/
├── components/
│   ├── __tests__/
│   │   └── GameCard.test.jsx
│   ├── AirdropBanner.jsx         # Airdrop banner section
│   ├── CategoryBar.jsx           # Horizontal dummy button bar
│   ├── FixedHeader.jsx           # Responsive fixed header
│   ├── GameCard.jsx
│   ├── GameLobby.jsx
│   ├── SearchBar.jsx
│   ├── ProviderFilter.jsx
│   ├── ShowFavoritesToggle.jsx
│   ├── Loader.jsx
│   ├── EmptyState.jsx
│   └── ErrorState.jsx
├── pages/
│   └── index.js
├── store/
│   └── useGameStore.js
├── styles/
│   ├── AirdropBanner.module.scss
│   ├── CategoryBar.module.scss
│   ├── FixedHeader.module.scss
│   ├── GameCard.module.scss
│   ├── GameLobby.module.scss
│   ├── ProviderFilter.module.scss
│   ├── SearchBar.module.scss
│   ├── Loader.module.scss
│   └── ShowFavoritesToggle.module.scss
├── utils/
│   └── api.js
├── public/
│   ├── jackpot-logo-web.png      # Web logo
│   ├── bag.png                   # Mobile logo
│   ├── airdrop-banner.png        # Airdrop banner image
│   ├── providers-icon.png        # Providers icon
│   └── providers/               # Provider logos
├── jest.config.js
├── jest.setup.js
├── babel.config.js
├── package.json
└── README.md
```

##  Key Features Explained

### Search & Filtering
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Provider Filtering**: Multi-select provider filtering with visual feedback
- **Favorites Toggle**: Show all games or favorites only
- **Category Bar**: Horizontal buttons for quick filtering

### Infinite Scroll
- **Intersection Observer**: Efficient scroll detection
- **Pagination**: 20 games per page with seamless loading
- **Caching**: React Query handles data caching and background updates
- **Cache Configuration**: 
  - `staleTime: 5 minutes` - Data considered fresh for 5 minutes
  - `cacheTime: 30 minutes` - Cached data kept for 30 minutes
  - `refetchOnWindowFocus: false` - Prevents unnecessary refetches

### State Management
- **Zustand Store**: Manages search, filters, favorites, and UI state
- **Persistent Storage**: Favorites saved to localStorage
- **Optimistic Updates**: Immediate UI feedback for user actions

### Testing
- **Component Testing**: Comprehensive test suite for GameCard component
- **Mocking**: Zustand store and API calls properly mocked
- **Accessibility**: Basic accessibility with ARIA labels for favorite buttons, alt text for images, and accessibility-focused tests

## Configuration

### Environment Variables
No environment variables required for basic functionality.

### API Configuration
The app connects to the Jackpot API:
- Base URL: `https://jpapi-staging.jackpot.bet`
- Endpoints: `/casino/games` and `/casino/games/search`

### Styling
- **SCSS Modules**: Scoped styles with CSS modules
- **Dark Theme**: Consistent dark color scheme
- **Responsive**: Mobile-first responsive design

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- **GameCard Component**: 100% test coverage
- **User Interactions**: Click events, state changes
- **Edge Cases**: Missing data, error states
- **Accessibility**: ARIA labels and screen reader support

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
- Ensure all dependencies are installed
- Configure API endpoints if needed
- Set up proper environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## Support

For support and questions:
- Check the existing issues
- Create a new issue with detailed description
- Include steps to reproduce any bugs 