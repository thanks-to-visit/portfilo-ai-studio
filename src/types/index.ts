export type ProjectStatus = 'Featured' | 'Open Source' | 'In Progress' | 'Archived';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  problemSolved: string;
  architectureHighlights: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  year: string;
  category: 'Backend & Systems' | 'Machine Learning' | 'Developer Tools' | 'Web & Frontend';
  order: number;
}

export type PostStatus = 'published' | 'draft';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: 'Engineering' | 'Backend' | 'AI / ML' | 'Computer Science' | 'Architecture' | 'Career';
  tags: string[];
  status: PostStatus;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  order: number;
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    note?: string;
  }[];
}

export interface SiteSettings {
  name: string;
  headline: string;
  role: string;
  subheadline: string;
  bioShort: string;
  bioFull: string[];
  currentlyBuilding: string;
  currentlyLearning: string;
  currentlyExploring: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  resumeUrl: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
  statusTicker: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
