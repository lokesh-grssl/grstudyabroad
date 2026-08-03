export type ViewMode = 
  | 'home' 
  | 'glimpse'
  | 'destinations' 
  | 'universities' 
  | 'programs' 
  | 'pathways' 
  | 'scholarships' 
  | 'services' 
  | 'blogs' 
  | 'events' 
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'cookies';

export interface Destination {
  id: string;
  name: string;
  code: string; // e.g. 'UK', 'US'
  flag: string; // Emoji or SVG path
  heroImage: string;
  shortDescription: string;
  longDescription: string;
  whyStudyHere: string[];
  avgTuitionUG: string;
  avgTuitionPG: string;
  avgLivingCost: string;
  visaRequirements: string[];
  workRights: string;
  prOpportunity: string;
  topCities: string[];
  popularCourses: string[];
  faqs: { question: string; answer: string }[];
}

export interface University {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  logo: string;
  bannerImage: string;
  location: string;
  qsRanking: string;
  isPartner: boolean;
  isPathwayPartner?: boolean;
  overview: string;
  popularCourses: string[];
  tuitionRange: string;
  scholarshipsAvailable: string;
  entryRequirements: {
    ug: string;
    pg: string;
    english: string;
  };
  gallery: string[];
  acceptanceRate: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Doctorate';
  duration: string;
  avgSalary: string;
  overview: string;
  careerOutcomes: string[];
  topUniversities: string[];
  avgFee: string;
  eligibility: string;
  iconName: string;
}

export interface Scholarship {
  id: string;
  title: string;
  type: 'Merit Scholarships' | 'Government Scholarships' | 'University Scholarships' | 'Need-based Scholarships';
  country: string;
  amount: string;
  eligibility: string;
  deadline: string;
  description: string;
  provider: string;
  coverage: string;
  degreeLevel?: string;
  eligibleForIndian?: string;
  website?: string;
  notes?: string;
}

export interface PathwayProgram {
  id: string;
  category: 'Integrated Global BBA + MBA (igMBA)' | 'MBA Pathways (uMBA / gMBA)';
  title: string;
  targetAudience: string;
  indianInstitution: string;
  globalPartner: string;
  country: string;
  durationStructure: string; // e.g., "5 Years (4 SEMs in India + remaining International)"
  totalCostUSD: string;
  indiaFeeUSD: string;
  internationalFeeUSD: string;
  degreesAwarded: string;
  overview: string;
  eligibleStreams: string[];
  highlights: string[];
  partnerImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  benefits: string[];
  deliverables: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Webinar' | 'Spot Admissions' | 'Education Expo' | 'University Q&A';
  location: string;
  speaker: string;
  speakerRole: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  studentPhoto: string;
  university: string;
  course: string;
  country: string;
  countryCode: string;
  review: string;
  visaStatus: string; // "Visa Approved"
  intake: string;
  score?: string; // e.g. IELTS 8.0
}

export interface CounsellingBooking {
  fullName: string;
  email: string;
  phone: string;
  preferredDestination: string;
  studyLevel: string;
  preferredIntake: string;
  counsellingMode: 'Online Video' | 'In-Person Branch' | 'Phone Call';
  preferredBranch?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}
