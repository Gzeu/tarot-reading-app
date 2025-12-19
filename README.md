# Full-Stack Tarot Reading App

A mystical, AI-powered tarot reading application built with modern web technologies. Explore personalized tarot readings with authentic interpretations powered by GPT-4, complete with a beautiful dark theme and comprehensive card library.

## Features

### Core Functionality
- **36 Tarot Cards** - Complete mystical deck with traditional meanings, upright/reversed interpretations, symbolism, and keywords
- **6 Reading Spreads** - Daily Card, Three-Card (Past-Present-Future), Love (5-card), Career (4-card), Celtic Cross (10-card), and Custom spreads
- **AI-Powered Interpretations** - GPT-4 integration for personalized, context-aware tarot readings
- **User Authentication** - Secure OAuth and email/password authentication
- **Reading History** - Complete log of all readings with timestamps and saved interpretations
- **Favorite Readings** - Save and organize your most meaningful readings
- **Daily Streak Tracking** - Track consecutive days of readings
- **Journal Entries** - Add personal notes and reflections to readings

### User Experience
- **Dark Mystical Theme** - Elegant dark background with teal and gold accents
- **Animated Cards** - Smooth card shuffling, drawing, and flip animations
- **Card Reversal** - Toggle between upright and reversed card meanings
- **Responsive Design** - Mobile-first approach works on all devices
- **Intuitive Navigation** - Clear, easy-to-use interface

## Tech Stack

### Frontend
- **React 19** with Vite for fast development and building
- **Tailwind CSS 4** with custom mystical theme and design tokens
- **Framer Motion** for smooth animations
- **React Router** for client-side navigation
- **Zustand** for state management
- **shadcn/ui** components for consistent UI

### Backend
- **Node.js + Express** for server runtime
- **tRPC** for end-to-end type-safe API procedures
- **Drizzle ORM** for database operations
- **JWT** for session management
- **Manus OAuth** for secure authentication

### Database
- **MySQL** (TiDB compatible) for reliable data storage
- **Drizzle Migrations** for schema management

### AI Integration
- **OpenAI GPT-4** for personalized tarot interpretations

## Installation & Setup

### Prerequisites
- Node.js 22+ and pnpm
- MySQL database (or TiDB)
- OpenAI API key for GPT-4 access

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-jwt-secret-key
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# User Info
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name

# Manus Built-in APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-forge-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# App Configuration
VITE_APP_TITLE=Tarot Reading App
VITE_APP_LOGO=https://your-logo-url.png
```

### Installation Steps

1. **Clone and install dependencies:**
```bash
cd tarot-reading-app
pnpm install
```

2. **Set up the database:**
```bash
pnpm db:push
```

3. **Seed the database with tarot cards:**
```bash
node seed-cards.mjs
```

4. **Start the development server:**
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
tarot-reading-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app router
│   │   └── index.css      # Global styles with theme
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── routers/           # tRPC procedure definitions
│   ├── routers.ts         # Main router
│   ├── db.ts              # Database query helpers
│   └── _core/             # Framework internals
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Table definitions
├── shared/                # Shared types and constants
├── seed-cards.mjs         # Database seeding script
├── todo.md                # Feature tracking
└── README.md              # This file
```

## API Endpoints

All API endpoints are tRPC procedures accessible via `/api/trpc`:

### Cards
- `cards.getAll()` - Get all 36 tarot cards
- `cards.getById(id)` - Get a single card by ID
- `cards.getByIds(ids)` - Get multiple cards by IDs

### Readings
- `readings.create(data)` - Create a new reading
- `readings.getUserReadings(options)` - Get user's reading history
- `readings.getById(id)` - Get a specific reading
- `readings.toggleFavorite(id)` - Toggle favorite status
- `readings.updateInterpretation(data)` - Update reading interpretation

### Journals
- `journals.create(data)` - Create a journal entry
- `journals.getByReadingId(id)` - Get journal entries for a reading

### Interpretations
- `interpretations.generateInterpretation(data)` - Generate AI interpretation for a reading

### Authentication
- `auth.me()` - Get current user info
- `auth.logout()` - Logout current user

## Database Schema

### Users Table
- `id` - Primary key
- `openId` - OAuth identifier
- `name` - User's name
- `email` - User's email
- `loginMethod` - Authentication method
- `role` - User role (user/admin)
- `readingStreak` - Current reading streak
- `lastReadingDate` - Last reading timestamp
- `createdAt`, `updatedAt`, `lastSignedIn` - Timestamps

### Cards Table
- `id` - Primary key
- `name` - Card name
- `number` - Card number (1-36)
- `imageUrl` - Card image URL
- `meaning` - Card meaning
- `uprightInterpretation` - Upright meaning
- `reversedInterpretation` - Reversed meaning
- `symbolism` - Symbolic meaning
- `keywords` - JSON array of keywords
- `themes` - JSON array of themes
- `createdAt` - Creation timestamp

### Readings Table
- `id` - Primary key
- `userId` - Reference to user
- `spreadType` - Type of spread
- `question` - User's question
- `cardIds` - JSON array of card IDs
- `isReversed` - JSON array of reversal flags
- `interpretation` - AI-generated interpretation
- `isFavorite` - Favorite flag
- `createdAt`, `updatedAt` - Timestamps

### Journals Table
- `id` - Primary key
- `readingId` - Reference to reading
- `userId` - Reference to user
- `notes` - User's notes
- `reflection` - User's reflection
- `createdAt`, `updatedAt` - Timestamps

## Available Pages

- **Home** (`/`) - Landing page with feature overview
- **Dashboard** (`/dashboard`) - User dashboard with stats and recent readings
- **Card Library** (`/cards`) - Browse all 36 tarot cards
- **Daily Reading** (`/reading/daily`) - Perform a daily card reading
- **Profile** (`/profile`) - User profile and settings (planned)
- **History** (`/history`) - Complete reading history (planned)

## Testing

Run the test suite:

```bash
pnpm test
```

The test suite includes:
- Card data validation
- Tarot spread type validation
- Reading data structure validation
- User streak calculation logic
- Journal entry validation

All 24 tests pass successfully.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Push database schema changes
pnpm db:push

# Seed database with cards
node seed-cards.mjs

# Format code
pnpm format

# Lint code
pnpm lint
```

## Design System

### Colors
- **Primary (Teal)**: `#00d4d4` - Main accent color
- **Secondary (Gold)**: `#d4af37` - Mystical gold accent
- **Accent (Purple)**: `#8b5cf6` - Supporting accent
- **Background**: `#0f0f1a` - Dark mystical background
- **Card**: `#1a1a2e` - Card background
- **Border**: `#2a2a3e` - Border color
- **Text**: `#f5f5f5` - Primary text
- **Muted**: `#4a4a5e` - Muted text

### Typography
- **Headings**: Playfair Display (serif, bold)
- **Body**: Lora (serif)
- **UI**: System fonts (fallback)

### Components
- **Mystical Cards**: Gold borders with subtle glow effects
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Smooth transitions and card flip effects

## Security

- **Authentication**: Manus OAuth with JWT sessions
- **Password Hashing**: bcrypt for password security
- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Implemented on API endpoints
- **Input Validation**: Zod schema validation on all inputs

## Performance

- **Image Optimization**: Lazy loading for card images
- **Caching**: Card data caching strategy
- **Code Splitting**: Route-based code splitting with React Router
- **Database**: Indexed queries for fast lookups
- **Frontend**: Vite for fast development and optimized builds

## Future Enhancements

- [ ] PDF export for readings
- [ ] Social media sharing
- [ ] Daily email notifications
- [ ] NFT minting for special readings
- [ ] Advanced analytics dashboard
- [ ] Multiple language support
- [ ] Voice-based readings
- [ ] Community readings and sharing
- [ ] Astrology integration
- [ ] PWA installability

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` environment variable
- Check database credentials
- Ensure database server is running

### OAuth Issues
- Verify `VITE_APP_ID` and OAuth URLs
- Check that redirect URIs are configured correctly
- Clear browser cookies if experiencing login loops

### AI Interpretation Errors
- Verify OpenAI API key is valid
- Check API rate limits
- Ensure sufficient API credits

### Build Issues
- Clear `.next` or `dist` directories
- Reinstall dependencies: `pnpm install`
- Check Node.js version compatibility

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Make your changes
3. Add tests for new features
4. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For issues, questions, or feature requests, please contact the development team.

---

**Built with mystical wisdom and modern technology** ✨
