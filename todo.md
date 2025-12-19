# Tarot Reading App - TODO

## Phase 1: Core Application (COMPLETED)
- [x] Create Drizzle schema for cards, readings, journals
- [x] Create database migrations
- [x] Seed database with 36 tarot cards
- [x] Create tRPC procedures for card operations
- [x] Create tRPC procedures for reading CRUD operations
- [x] Create tRPC procedures for journal entries
- [x] Implement AI interpretation generation endpoint
- [x] Create landing page with app overview
- [x] Create dashboard with user stats and recent readings
- [x] Create card library/browser page
- [x] Implement daily card reading spread
- [x] Set up dark mystical theme with gold/teal accents
- [x] Create responsive mobile-first layout
- [x] Create unit tests (24 tests, all passing)

## Phase 2: Stripe Payment Integration (IN PROGRESS)
- [ ] Design database schema for payments (stripe_customer_id, stripe_subscription_id)
- [ ] Create products.ts file with premium reading products and subscription plans
- [ ] Implement tRPC procedure to create checkout sessions
- [ ] Implement webhook endpoint at /api/stripe/webhook
- [ ] Add webhook event handlers (checkout.session.completed, invoice.paid)
- [ ] Create payment history page (/payments)
- [ ] Create pricing page with product offerings
- [ ] Add "Upgrade to Premium" buttons throughout app
- [ ] Implement subscription management UI
- [ ] Test with Stripe test card (4242 4242 4242 4242)
- [ ] Verify webhook signature validation
- [ ] Test event handling for test events (evt_test_*)

## Phase 3: Future Enhancements (PLANNED)
- [ ] Create reading history page with filters
- [ ] Create user profile and settings page
- [ ] Implement three-card (Past-Present-Future) spread
- [ ] Implement love reading (5-card) spread
- [ ] Implement career reading (4-card) spread
- [ ] Implement Celtic Cross (10-card) spread
- [ ] Implement custom spread builder
- [ ] Add Framer Motion animations
- [ ] Add sound effects toggle
- [ ] Implement dark/light mode toggle
- [ ] PDF export for readings
- [ ] Search and filter readings
- [ ] Share readings on social media
- [ ] Daily email notifications
- [ ] NFT minting for special readings
- [ ] Advanced analytics dashboard
- [ ] Multiple language support
- [ ] Voice-based readings
- [ ] Community readings and sharing
- [ ] Astrology integration
- [ ] PWA installability

## Testing & Deployment
- [x] Test all reading spreads
- [x] Test AI interpretation generation
- [x] Test user authentication flow
- [x] Test database operations
- [x] Create unit tests (24 tests, all passing)
- [ ] Test Stripe checkout flow
- [ ] Test webhook event handling
- [ ] Create integration tests (planned)
- [ ] Deploy to production
- [ ] Set up monitoring and logging

## Documentation
- [x] Create comprehensive README
- [x] Document API endpoints
- [x] Document database schema
- [x] Create setup instructions
- [ ] Create Stripe integration guide
- [ ] Create user guide (planned)
- [ ] Create API documentation (planned)
