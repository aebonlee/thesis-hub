/* ───────────────────────────────────────────
 *  Domain types for templete-ref
 * ─────────────────────────────────────────── */

// ─── Product ───
export interface Product {
  id: number;
  slug: string;
  category: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  imageUrl: string;
  isSoldOut: boolean;
  isActive: boolean;
  sortOrder: number;
  licenseSiteSlug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRow {
  id: number;
  slug: string;
  category: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  price: number;
  image_url: string;
  is_sold_out: boolean;
  is_active: boolean;
  sort_order: number;
  license_site_slug?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  slug?: string;
  category?: string;
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  price?: number;
  imageUrl?: string;
  isSoldOut?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  licenseSiteSlug?: string;
}

// ─── Cart ───
export interface CartItem extends Product {
  quantity: number;
}

// ─── Order ───
export interface OrderItemInput {
  product_title: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderData {
  order_number: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  total_amount: number;
  payment_method: string;
  user_id?: string | null;
  items?: OrderItemInput[];
}

export interface Order {
  id: string;
  order_number: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  total_amount: number;
  payment_method: string;
  payment_status: PaymentStatus;
  user_id?: string | null;
  portone_payment_id?: string;
  created_at: string;
  paid_at?: string;
  cancelled_at?: string;
  cancel_reason?: string;
  items?: OrderItemInput[];
  order_items?: OrderItemInput[];
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';

// ─── User / Auth ───
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  display_name: string;
  avatar_url: string;
  phone: string;
  provider: string;
  role: string;
  signup_domain: string;
  visited_sites: string[];
  last_sign_in_at: string;
  updated_at: string;
}

export interface AccountBlock {
  status: string;
  reason: string;
  suspended_until: string | null;
}

// ─── Comment ───
export interface Comment {
  id: number;
  postId: number;
  postType: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface CommentInput {
  postId: number;
  postType: string;
  authorId: string;
  authorName: string;
  content: string;
}

// ─── Search ───
export interface SearchResultItem {
  id: number;
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  category?: string;
  categoryEn?: string;
  description?: string;
  descriptionEn?: string;
  author?: string;
  date: string;
}

export interface SearchResults {
  blog: SearchResultItem[];
  board: SearchResultItem[];
  gallery: SearchResultItem[];
}

// ─── Site Config ───
export interface BrandPart {
  text: string;
  className: string;
}

export interface MenuItem {
  path: string;
  labelKey: string;
  activePath?: string;
  dropdown?: SubMenuItem[];
}

export interface SubMenuItem {
  path: string;
  labelKey: string;
}

export interface FamilySite {
  name: string;
  url: string;
}

export interface ColorOption {
  name: ColorTheme;
  color: string;
}

export interface CompanyInfo {
  name: string;
  ceo: string;
  bizNumber: string;
  salesNumber?: string;
  publisherNumber?: string;
  address: string;
  email: string;
  phone: string;
  kakao?: string;
  businessHours?: string;
}

export interface SiteFeatures {
  shop: boolean;
  community: boolean;
  search: boolean;
  auth: boolean;
  license: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  path: string;
}

export interface LearningSite {
  id: string;
  name: string;
  nameEn: string;
  url: string;
  icon: string;
  color: string;
  category: string;
  description: string;
  descriptionEn: string;
  techStack: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  curriculum: string[];
  curriculumEn: string[];
  features: string[];
  featuresEn: string[];
  target: string;
  targetEn: string;
  isService?: boolean;
  price?: number;
}

export interface SiteConfig {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  url: string;
  dbPrefix: string;
  parentSite: { name: string; url: string };
  brand: { parts: BrandPart[] };
  themeColor: string;
  company: CompanyInfo;
  features: SiteFeatures;
  colors: ColorOption[];
  categories: Category[];
  learningSites: LearningSite[];
  menuItems: MenuItem[];
  footerLinks: { path: string; labelKey: string }[];
  familySites: FamilySite[];
}

// ─── Payment (PortOne V1) ───
export interface PaymentRequest {
  orderId: string;
  orderName: string;
  totalAmount: number;
  payMethod: 'CARD' | 'TRANSFER';
  customer: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface PaymentSuccess {
  paymentId: string;
  txId: string;
}

export interface PaymentError {
  code: string;
  message: string;
}

export type PaymentResult = PaymentSuccess | PaymentError;

// ─── Toast ───
export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

// ─── Theme ───
export type ThemeMode = 'auto' | 'light' | 'dark';
export type ColorTheme = 'blue' | 'red' | 'green' | 'purple' | 'orange';

// ─── Language ───
export type Language = 'ko' | 'en';

// ─── Coupon ───
export interface Coupon {
  id: string;
  code: string;
  label: string;
  lecture_date: string;
  expires_at: string;
  duration_days: number;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
}

export interface CouponUse {
  id: string;
  coupon_id: string;
  user_id: string;
  redeemed_at: string;
}

export interface CouponWithStats extends Coupon {
  use_count: number;
}

export interface MyCoupon {
  id: string;
  code: string;
  label: string;
  lecture_date: string;
  expires_at: string;
  duration_days: number;
  redeemed_at: string;
  access_expires_at: string;
}
