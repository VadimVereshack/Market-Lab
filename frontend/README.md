
```
frontend/
├── src/
│   ├── app/                  # Application pages and routing
│   │   ├── (auth)/           # Auth layout group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (cabinet)/        # User cabinet layout group
│   │   │   ├── profile/
│   │   │   ├── orders/
│   │   │   └── subscriptions/
│   │   ├── (catalog)/        # Catalog layout group
│   │   │   ├── products/
│   │   │   └── categories/
│   │   ├── cart/             # Shopping cart pages
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Home page
│   ├── components/           # All React components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product components
│   │   ├── cart/             # Cart components
│   │   ├── forms/            # Form components
│   │   ├── features/         # Business feature components
│   │   └── index.ts          # Unified components export
│   ├── shared/               # Global resources
│   │   ├── styles/           # Global styles
│   │   │   ├── globals.css   # Main styles
│   │   │   └── variables.css # CSS variables
│   │   └── assets/           # Fonts, icons, images
│   └── core/                 # Core application logic
│       ├── api/              # API functions
│       ├── store/            # Global state management
│       ├── utils/            # Helper functions
│       ├── constants/        # Constants
│       └── types/            # TypeScript types
├── public/                   # Static files
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```


# Navigation
- Base UI components  [→ Details](#ui-components)
- Layout components   [→ Details](#layout-components)
- Product components  [→ Details](#product-components)
- Cart components     [→ Details](#cart-components)
- Form components     [→ Details](#form-components)
- Features components [→ Details](#features-components)



## UI Components
```
ui/
├── Button/              # Buttons with variants
├── Input/               # Input fields
├── Modal/               # Modal dialogs
├── Select/              # Dropdown selects
├── Checkbox/            # Checkbox inputs
├── Radio/               # Radio buttons
├── Tabs/                # Tab components
├── Accordion/           # Accordion components
├── Badge/               # Badges and labels
├── Loader/              # Loading indicators
├── Toast/               # Notification toasts
└── index.ts             # Unified exports
```


## Common Components
```
features/
├── SearchBar/           # Search bar component
├── Pagination/          # Pagination component
├── Breadcrumbs/         # Breadcrumb navigation
├── Rating/              # Star rating component
├── Price/               # Price formatting component
├── ImageGallery/        # Image gallery component
├── Counter/             # Quantity counter
├── ShareButtons/        # Social share buttons
└── index.ts             # Unified exports
```


## Layout Components
```
layout/
├── Header/              # Site header
│   ├── Header.tsx
│   ├── Navigation/      # Navigation menu
│   ├── UserMenu/        # User dropdown menu
│   └── Search/          # Header search
├── Footer/              # Site footer
│   ├── Footer.tsx
│   ├── LinksSection/    # Links section
│   └── SocialLinks/     # Social media links
├── Sidebar/             # Sidebar panel
│   ├── Sidebar.tsx
│   ├── Filters/         # Sidebar filters
│   └── Categories/      # Categories list
├── MainLayout/          # Main page layout
├── AuthLayout/          # Authentication pages layout
├── DashboardLayout/     # User dashboard layout
└── index.ts             # Unified exports
```


## Form Components
```
forms/
├── auth/                # Authentication forms
│   ├── LoginForm/       # Login form
│   └── RegisterForm/    # Registration form
├── checkout/            # Checkout process form
│   ├── DeliveryStep/    # Delivery information step
│   ├── PaymentStep/     # Payment information step
│   └── ReviewStep/      # Order review step
├── product/             # Product add/edit form
├── profile/             # User profile edit form
├── search/              # Advanced search form
├── review/              # Product review form
├── contact/             # Contact form
├── newsletter/          # Newsletter subscription form
└── hooks/               # Custom form hooks
    ├── useForm.ts
    ├── useValidation.ts
    └── useFormSteps.ts
```


## Product Components
```
product/
├── ProductCard/            # Product card for listings
│   ├── ProductCard.tsx
│   ├── ProductImage/       # Product image display
│   ├── ProductPrice/       # Price display block
│   └── ProductActions/     # Action buttons
├── ProductGrid/            # Products grid layout
├── ProductList/            # Products list layout
├── ProductGallery/         # Product image gallery
├── ProductInfo/            # Product information
│   ├── ProductTitle/
│   ├── ProductDescription/
│   ├── ProductAttributes/  # Product specifications
│   └── ProductRating/      # Ratings and reviews
├── ProductVariants/        # Product variants (size, color)
├── ProductRecommendations/ # Product recommendations
├── ProductFilters/         # Product filters
│   ├── PriceFilter/
│   ├── CategoryFilter/
│   └── BrandFilter/
├── ProductSort/            # Product sorting
└── hooks/                  # Product hooks
    ├── useProduct.ts
    ├── useProductList.ts
    └── useProductSearch.ts
```


## Cart Components
```
cart/
├── CartItem/              # Cart item component
│   ├── CartItem.tsx
│   ├── CartItemImage/     # Item image in cart
│   ├── CartItemInfo/      # Item information in cart
│   └── CartItemActions/   # Quantity management
├── CartList/              # Cart items list
├── CartSummary/           # Cart summary information
│   ├── CartTotals/        # Total calculations
│   ├── DiscountCode/      # Discount code input
│   └── CheckoutButton/    # Checkout action button
├── CartSidebar/           # Cart sidebar panel
├── CartEmpty/             # Empty cart state
├── CartPreview/           # Cart preview (in header)
├── AddToCart/             # Add to cart functionality
│   ├── AddToCartButton/
│   ├── QuantitySelector/  # Quantity selection
│   └── AddToCartForm/
└── hooks/                 # Cart hooks
    ├── useCart.ts
    ├── useCartActions.ts
    └── useCartTotals.ts
```