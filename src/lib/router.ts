import { ViewMode, University, Course } from '../types';
import { UNIVERSITIES, COURSES } from '../data/mockData';
import { ALL_MASTER_UNIVERSITIES, masterToUniversity } from '../data/masterUniversities';

export interface RouteState {
  view: ViewMode;
  universityId?: string;
  courseId?: string;
  isBookModal?: boolean;
  isSearchModal?: boolean;
  isAiModal?: boolean;
}

const VALID_VIEWS: ViewMode[] = [
  'home',
  'glimpse',
  'destinations',
  'universities',
  'programs',
  'pathways',
  'scholarships',
  'services',
  'blogs',
  'events',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
  'cookies'
];

/**
 * Parses the current location.hash into structured RouteState
 */
export function parseRouteHash(hashString?: string): RouteState {
  const hash = hashString !== undefined ? hashString : (typeof window !== 'undefined' ? window.location.hash : '');
  const cleanHash = hash.replace(/^#\/?/, '');

  if (!cleanHash) {
    return { view: 'home' };
  }

  const [rawPath, queryString] = cleanHash.split('?');
  const path = rawPath.toLowerCase().trim();
  const params = new URLSearchParams(queryString || '');

  // Special modal & route shortcuts
  if (path === 'book' || path === 'book-counselling') {
    return { view: 'home', isBookModal: true };
  }
  if (path === 'search') {
    return { view: 'home', isSearchModal: true };
  }
  if (path === 'ai-advisor' || path === 'ai') {
    return { view: 'home', isAiModal: true };
  }
  if (path === 'privacy-policy') {
    return { view: 'privacy' };
  }
  if (path === 'terms-and-conditions' || path === 'terms-of-service' || path === 'terms-conditions') {
    return { view: 'terms' };
  }
  if (path === 'cookie-policy') {
    return { view: 'cookies' };
  }

  let view: ViewMode = 'home';
  if (path === 'university' || path === 'uni') {
    view = 'universities';
  } else if (VALID_VIEWS.includes(path as ViewMode)) {
    view = path as ViewMode;
  }

  const uniId = params.get('id') || params.get('uni') || undefined;
  const courseId = params.get('id') || params.get('course') || undefined;

  return {
    view,
    universityId: (view === 'universities') ? uniId : undefined,
    courseId: (view === 'programs') ? courseId : undefined,
    isBookModal: params.get('book') === 'true',
  };
}

/**
 * Builds a hash string based on state
 */
export function buildRouteHash(
  view: ViewMode,
  selectedUniversity?: University | null,
  selectedCourse?: Course | null,
  isBookModal?: boolean
): string {
  if (isBookModal) {
    return '#/book-counselling';
  }
  if (selectedUniversity) {
    return `#/universities?id=${encodeURIComponent(selectedUniversity.id)}`;
  }
  if (selectedCourse) {
    return `#/programs?id=${encodeURIComponent(selectedCourse.id)}`;
  }
  return `/#/${view === 'home' ? '' : view}`;
}

/**
 * Looks up University by ID or slug
 */
export function findUniversityById(id?: string): University | null {
  if (!id) return null;
  const target = id.toLowerCase().trim();
  const mockMatch = UNIVERSITIES.find(
    (u) =>
      u.id.toLowerCase() === target ||
      u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === target ||
      u.name.toLowerCase().replace(/\s+/g, '-') === target
  );
  if (mockMatch) return mockMatch;

  const masterMatch = ALL_MASTER_UNIVERSITIES.find(
    (m) =>
      m.id.toLowerCase() === target ||
      m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === target ||
      m.name.toLowerCase().replace(/\s+/g, '-') === target
  );
  if (masterMatch) {
    return masterToUniversity(masterMatch);
  }

  return null;
}

/**
 * Looks up Course by ID or slug
 */
export function findCourseById(id?: string): Course | null {
  if (!id) return null;
  const target = id.toLowerCase().trim();
  return (
    COURSES.find(
      (c) =>
        c.id.toLowerCase() === target ||
        c.title.toLowerCase().replace(/\s+/g, '-') === target
    ) || null
  );
}

/**
 * Returns dynamic page title for SEO & UX
 */
export function getPageTitle(
  view: ViewMode,
  selectedUniversity?: University | null,
  selectedCourse?: Course | null
): string {
  if (selectedUniversity) {
    return `${selectedUniversity.name} (${selectedUniversity.country}) | Grassroots Study Abroad`;
  }
  if (selectedCourse) {
    return `${selectedCourse.title} (${selectedCourse.level}) | Grassroots Study Abroad`;
  }

  switch (view) {
    case 'home':
      return 'Grassroots Study Abroad | Global Overseas Education & Admissions Advisory';
    case 'glimpse':
      return 'Grassroots Study Abroad at a Glimpse | Corporate Reach & Milestones';
    case 'destinations':
      return 'Study Destinations (UK, USA, Canada, Australia, Germany) | Grassroots Study Abroad';
    case 'universities':
      return '1,274+ Global Partner Universities Across 44 Countries | Grassroots Study Abroad';
    case 'programs':
      return 'Search Degrees, Master’s & Diploma Programs | Grassroots Study Abroad';
    case 'pathways':
      return '1+2 Global Pathway & Dual Degree Programs | Grassroots Study Abroad';
    case 'scholarships':
      return '100+ Global Scholarships & Grants 2027 | Grassroots Study Abroad';
    case 'services':
      return 'Student Counselling, SOP, Visa Filing & Forex Services | Grassroots Study Abroad';
    case 'blogs':
      return 'Overseas Education Master Guides & Blogs | Grassroots Study Abroad';
    case 'events':
      return 'Global Education Fairs & Spot Admissions Events | Grassroots Study Abroad';
    case 'contact':
      return 'Contact Us & Corporate Office Locations | Grassroots Study Abroad';
    case 'privacy':
      return 'Privacy Policy & Student Data Protection | Grassroots Study Abroad';
    case 'terms':
      return 'Terms & Conditions | Advisory Services & Visa Filing Guidelines | Grassroots Study Abroad';
    case 'disclaimer':
      return 'Official Disclaimer & University Admissions Disclosures | Grassroots Study Abroad';
    case 'cookies':
      return 'Cookie Policy & User Preferences | Grassroots Study Abroad';
    default:
      return 'Grassroots Study Abroad | Overseas Education Advisory';
  }
}
