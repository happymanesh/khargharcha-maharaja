// ─── Enums ────────────────────────────────────────────────────────────────────

export type Locale = "mr" | "hi" | "en" | "gu" | "bn" | "pa";

export type MembershipTier = "GENERAL" | "SILVER" | "GOLD" | "PLATINUM" | "LIFETIME";

export type DonationCategory =
  | "GANESH_UTSAV"
  | "ANNADAN"
  | "MEDICAL"
  | "EDUCATION"
  | "DISASTER_RELIEF"
  | "GENERAL";

export type DonationStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type EventType =
  | "GANESH_UTSAV"
  | "DAHI_HANDI"
  | "BLOOD_DONATION"
  | "MEDICAL_CAMP"
  | "CULTURAL"
  | "EDUCATIONAL"
  | "SOCIAL_WELFARE";

export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export type VolunteerStatus = "ACTIVE" | "INACTIVE" | "PENDING";

export type AdminRole = "SUPER_ADMIN" | "ORG_ADMIN" | "COMMITTEE";

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "UNKNOWN";

// ─── User / Member ─────────────────────────────────────────────────────────────

export interface Member {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  area: string;
  bloodGroup: BloodGroup;
  language: Locale;
  membershipTier: MembershipTier;
  membershipNumber?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemberCreateInput {
  name: string;
  mobile: string;
  email?: string;
  area: string;
  bloodGroup: BloodGroup;
  language: Locale;
}

// ─── Admin User ────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
}

// ─── Event ─────────────────────────────────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  description: string;
  type: EventType;
  status: EventStatus;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  memberId: string;
  member?: Member;
  event?: Event;
  registeredAt: string;
  attendedAt?: string;
  qrCode: string;
}

// ─── Donation ──────────────────────────────────────────────────────────────────

export interface Donation {
  id: string;
  memberId?: string;
  member?: Member;
  donorName: string;
  donorMobile: string;
  donorEmail?: string;
  amount: number;
  category: DonationCategory;
  status: DonationStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  receiptNumber: string;
  receiptUrl?: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Volunteer ─────────────────────────────────────────────────────────────────

export interface Volunteer {
  id: string;
  memberId: string;
  member?: Member;
  group: string;
  skills: string[];
  status: VolunteerStatus;
  hoursContributed: number;
  joinedAt: string;
}

// ─── News / Announcement ───────────────────────────────────────────────────────

export interface NewsItem {
  id: string;
  titleMr: string;
  titleHi: string;
  titleEn: string;
  contentMr: string;
  contentHi: string;
  contentEn: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Gallery ───────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  title: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string;
  albumId?: string;
  album?: GalleryAlbum;
  createdAt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  titleMr: string;
  coverUrl?: string;
  itemCount: number;
  createdAt: string;
}

// ─── Dashboard / Analytics ────────────────────────────────────────────────────

export interface DashboardStats {
  totalMembers: number;
  newMembersThisMonth: number;
  totalDonations: number;
  donationsThisMonth: number;
  totalDonationAmount: number;
  donationAmountThisMonth: number;
  activeVolunteers: number;
  upcomingEvents: number;
  totalEvents: number;
}

export interface DonationChartData {
  date: string;
  amount: number;
  count: number;
}

export interface MemberGrowthData {
  month: string;
  count: number;
}

// ─── API Response wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
