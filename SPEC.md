# Enterprise Order System - Technical Specification

## Project Overview
- **Project Name**: Enterprise Order System (EOS)
- **Type**: Full-stack E-commerce Platform
- **Core Functionality**: Amazon-style ordering system with product catalog, multi-step checkout, user accounts, and admin dashboard
- **Target Users**: Enterprise buyers and administrators

---

## UI/UX Specification

### Layout Structure

#### Global Layout
- **Header**: Fixed top navigation (64px height)
  - Left: Logo (bold text "EOS")
  - Center: Search bar (max-width 600px)
  - Right: User menu, Cart icon with badge
- **Main Content**: Full-width with max-width 1440px centered
- **Footer**: Multi-column links (dark background)

#### Page Sections
- **Product Catalog**: Filter sidebar (280px) + Product grid
- **Checkout**: Multi-step wizard with progress indicator
- **Admin Dashboard**: Sidebar navigation + content area

#### Responsive Breakpoints
- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768px - 1024px (collapsed sidebar)
- Desktop: > 1024px (full layout)

### Visual Design

#### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Navy | #0F172A |
| Primary Light | Navy | #1E293B |
| Secondary | Slate Gray | #475569 |
| Accent | Electric Blue | #2563EB |
| Accent Hover | Blue Dark | #1D4ED8 |
| Success | Emerald | #059669 |
| Warning | Amber | #D97706 |
| Error | Red | #DC2626 |
| Background | White | #FFFFFF |
| Background Alt | Gray 50 | #F8FAFC |
| Border | Gray 200 | #E2E8F0 |
| Text Primary | Gray 900 | #0F172A |
| Text Secondary | Gray 600 | #475569 |
| Text Muted | Gray 400 | #94A3B8 |

#### Typography
- **Font Family**: "IBM Plex Sans" (Google Fonts) - professional, technical feel
- **Headings**: IBM Plex Sans, weights 600-700
  - H1: 32px / 40px line-height
  - H2: 24px / 32px line-height
  - H3: 20px / 28px line-height
- **Body**: IBM Plex Sans, weight 400
  - Large: 16px / 24px
  - Base: 14px / 20px
  - Small: 12px / 16px

#### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

#### Visual Effects
- **Borders**: 1px solid #E2E8F0 (sharp corners, 0px border-radius)
- **Shadows**: 
  - Card: 0 1px 3px rgba(0,0,0,0.1)
  - Dropdown: 0 4px 12px rgba(0,0,0,0.15)
  - Modal: 0 8px 32px rgba(0,0,0,0.2)
- **Transitions**: 150ms ease-in-out

### Components

#### Buttons
- **Primary**: Navy background (#0F172A), white text, 0px radius
- **Secondary**: White background, navy border, navy text
- **Accent**: Blue background (#2563EB), white text
- **States**: Hover (darken 10%), Active (darken 15%), Disabled (opacity 50%)

#### Form Inputs
- Height: 40px
- Border: 1px solid #E2E8F0
- Focus: 2px blue outline (#2563EB)
- 0px border-radius

#### Cards
- White background
- 1px border #E2E8F0
- 0px border-radius
- Padding: 16px or 24px

#### Tables
- Header: #F8FAFC background, font-weight 600
- Rows: 1px border bottom #E2E8F0
- Hover: #F8FAFC background

#### Badges/Tags
- Small rounded-full for status indicators (exception to sharp rule)
- Categories: rectangular with 0px radius

---

## Functionality Specification

### Core Features

#### 1. Product Catalog
- Grid layout (4 columns desktop, 2 tablet, 1 mobile)
- Product cards: Image, title, price, rating, "Add to Cart" button
- Filters sidebar:
  - Category (checkbox list)
  - Price range (slider)
  - Rating (star filter)
  - Availability (in stock toggle)
- Search bar with debounced search (300ms)
- Sort options: Price low-high, high-low, Rating, Newest
- Pagination or infinite scroll

#### 2. Shopping Cart
- Persistent cart (localStorage + API sync)
- Cart drawer/slide-out panel
- Quantity controls (+/-)
- Remove item
- Subtotal calculation
- "One-Click Buy" button on product cards

#### 3. Checkout Pipeline (Multi-step)
- **Step 1 - Cart Review**: Edit quantities, remove items
- **Step 2 - Shipping**: Address form, shipping method selection
- **Step 3 - Payment**: Credit card form (mock), order summary
- **Step 4 - Review**: Complete order review, place order
- Progress indicator showing current step
- Back/Next navigation
- Form validation at each step

#### 4. Order Management
- Order confirmation page
- Order status tracking: Processing → Shipped → Delivered
- Order history (buyer)
- Order details view

#### 5. User Accounts
- Registration/Login forms
- User profile: Name, email, addresses, phone
- Order history
- Wishlist

#### 6. Admin Dashboard
- Inventory management: CRUD products
- Order management: View, update status
- Analytics: Sales overview, recent orders

### API Routes (Next.js API)

```
GET    /api/products          - List products (with filters)
GET    /api/products/[id]     - Get single product
POST   /api/products          - Create product (admin)
PUT    /api/products/[id]     - Update product (admin)
DELETE /api/products/[id]     - Delete product (admin)

GET    /api/cart              - Get user cart
POST   /api/cart              - Add to cart
PUT    /api/cart              - Update cart item
DELETE /api/cart/[id]         - Remove from cart

POST   /api/orders            - Create order
GET    /api/orders            - List user orders
GET    /api/orders/[id]       - Get order details
PUT    /api/orders/[id]        - Update order status (admin)

POST   /api/auth/register     - Register user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user

GET    /api/admin/orders      - Admin: All orders
GET    /api/admin/products    - Admin: All products
```

### Data Models

#### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  reviewCount: number
  stock: number
  createdAt: Date
}
```

#### User
```typescript
{
  id: string
  email: string
  password: string (hashed)
  name: string
  role: 'buyer' | 'admin'
  addresses: Address[]
  wishlist: string[] (product ids)
  createdAt: Date
}
```

#### Order
```typescript
{
  id: string
  userId: string
  items: CartItem[]
  shippingAddress: Address
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  total: number
  createdAt: Date
}
```

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] All corners are sharp (0px border-radius)
- [ ] No emojis in UI
- [ ] Consistent use of Lucide icons
- [ ] Deep Navy (#0F172A) as primary color
- [ ] Professional typography (IBM Plex Sans)

### Functional Checkpoints
- [ ] Product catalog displays with filters working
- [ ] Search returns relevant results
- [ ] Add to cart works, cart persists on refresh
- [ ] One-click buy adds to cart and shows confirmation
- [ ] Checkout flow navigates through all 4 steps
- [ ] Order is created and appears in order history
- [ ] Admin can view and update order status
- [ ] Admin can add/edit products

### Technical Checkpoints
- [ ] API routes return proper JSON responses
- [ ] Error handling returns appropriate status codes
- [ ] TypeScript types are properly defined
- [ ] No console errors in production build
- [ ] Responsive layout works on all breakpoints
