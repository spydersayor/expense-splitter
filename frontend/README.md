# Expense Splitter

A high-performance, production-ready SPA frontend for splitting expenses among groups. Built with React, TypeScript, and modern web technologies.

## Features

- **Authentication**: Secure JWT-based login and registration
- **Group Management**: Create and manage expense groups with multiple members
- **Expense Tracking**: Add expenses with flexible splitting (equal or custom shares)
- **Balance Calculation**: Real-time balance tracking for all group members
- **Settlement Recording**: Track payments between members
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-first design that works across all devices
- **Offline Support**: Graceful error handling and offline detection
- **Type Safety**: Full TypeScript coverage with strict mode

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query) v5
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with dark mode
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - `VITE_BASE_URL`: Your API backend URL
   - `VITE_APP_NAME`: Your application name (default: "Expense Splitter")

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # App configuration
│   ├── guard.tsx          # Route protection
│   ├── Layout.tsx         # Main layout with header
│   ├── providers.tsx      # App providers (Query, Auth, Toast)
│   └── routes.tsx         # Route definitions
├── components/            # Shared components
│   ├── ui/               # UI primitives (Button, Input, Modal, etc.)
│   ├── EmptyState.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── PageHeader.tsx
├── features/             # Feature modules
│   ├── auth/            # Authentication
│   ├── balances/        # Balance calculations
│   ├── expenses/        # Expense management
│   ├── groups/          # Group management
│   └── settlements/     # Settlement tracking
├── hooks/               # Custom hooks
│   ├── useTheme.ts
│   └── useOnlineStatus.ts
├── lib/                 # Utilities
│   ├── axios.ts        # Axios instance with interceptors
│   ├── currency.ts     # Currency formatting
│   ├── queryClient.ts  # React Query configuration
│   ├── utils.ts        # General utilities
│   └── validators.ts   # Zod schemas
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Root component
├── index.css           # Global styles
└── main.tsx            # Entry point
```

## API Integration

The app consumes a REST API with the following endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create group
- `POST /api/groups/{groupId}/members` - Add member to group

### Expenses
- `GET /api/expenses?groupId={id}` - Get expenses for a group
- `POST /api/expenses` - Create expense

### Balances
- `GET /api/balances/{groupId}` - Get balance summary

### Settlements
- `GET /api/settlements?groupId={id}` - Get settlements for a group
- `POST /api/settlements` - Record settlement

## Authentication

JWT tokens are stored in `localStorage` and automatically attached to requests via Axios interceptors. On 401 responses, the app clears authentication state and redirects to login.

## State Management

- **Server State**: Managed by React Query with intelligent caching
- **Auth State**: React Context with localStorage persistence
- **Theme**: Custom hook with localStorage and system preference support

## React Query Configuration

Query keys follow a consistent pattern:
- `['groups']` - All groups
- `['group', groupId]` - Single group
- `['expenses', groupId]` - Expenses for a group
- `['balances', groupId]` - Balances for a group
- `['settlements', groupId]` - Settlements for a group

Cache defaults:
- `staleTime`: 30 seconds
- `retry`: 1 attempt
- `refetchOnWindowFocus`: false

## Form Validation

All forms use React Hook Form with Zod schemas for validation:
- Email validation
- Password minimum length
- Expense shares must sum to total amount
- Settlement from/to users must be different
- Positive number validation

## Dark Mode

The app supports dark mode with:
- System preference detection on first load
- Manual toggle persisted in localStorage
- Class-based strategy with Tailwind CSS

## Performance Optimizations

- Code splitting via React.lazy for route components
- Optimistic updates for faster UX
- Skeleton loaders for perceived performance
- Lazy loading of non-critical components
- Tree-shaken imports

## Accessibility

- Semantic HTML with proper ARIA attributes
- Keyboard navigation support
- Focus management in modals
- Color contrast meeting WCAG AA
- Screen reader friendly

## Browser Support

Modern browsers with ES2020+ support:
- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## Deployment

### Vercel/Netlify

1. Connect your repository
2. Set environment variables
3. Deploy

Build command: `npm run build`
Output directory: `dist`

### Docker

A Dockerfile can be added for containerized deployment:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- No sensitive data in URLs
- HTTPS enforced in production
- Input validation on all forms
- XSS protection via React's escaping

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass and types check
4. Submit a pull request

## License

MIT
