export interface StorefrontConfig {
  id: string;
  name: string;
  domain: string;
  type: string;
  checkoutMode: "cart" | "inquiry";
  logoUrl?: string | null;
  themeConfig?: Record<string, unknown>;
  contactInfo?: Record<string, unknown>;
  socialLinks?: Record<string, unknown>;
  seoConfig?: Record<string, unknown>;
  currency?: string | null;
  currencySymbol?: string | null;
}

export interface HomepageSection {
  id: string;
  storeId: string;
  type: string;
  label: string;
  isActive: boolean;
  sortOrder: number;
  config: Record<string, unknown>;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  sortOrder?: number;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku?: string | null;
  stockQuantity?: number;
  attributes?: Record<string, unknown>;
  isActive?: boolean;
}

export interface ProductAttribute {
  id: string;
  key: string;
  value: string;
  group?: string | null;
}

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  slug: string;
  description?: string | null;
  basePrice: number;
  salePrice?: number | null;
  sku?: string | null;
  status?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  metadata?: Record<string, unknown>;
  images?: ProductImage[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  parentId?: string | null;
  children?: Category[];
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface NavigationMenu {
  id: string;
  location: string;
  items: NavigationItem[];
  isActive?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CartLineProduct {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

export interface CartLineVariant {
  id: string;
  name: string;
  attributes?: Record<string, unknown>;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product?: CartLineProduct | null;
  variant?: CartLineVariant | null;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
}

export interface CustomerAuthResponse {
  accessToken: string;
  customer: Customer;
}

export interface ShippingQuote {
  amount: number;
  label?: string;
}

export interface PaymentMethod {
  id: string;
  provider: string;
  isEnabled?: boolean;
  config?: Record<string, unknown>;
}

export interface OrderItem {
  id?: string;
  productId: string;
  variantId?: string | null;
  productName: string;
  unitPrice: number;
  quantity: number;
  total?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  shippingAddress: Record<string, unknown>;
  billingAddress: Record<string, unknown>;
  couponCode?: string | null;
  notes?: string | null;
  trackingNumber?: string | null;
  items: OrderItem[];
}

export interface CouponValidation {
  valid: boolean;
  discount: number;
  promotion?: Record<string, unknown>;
}
