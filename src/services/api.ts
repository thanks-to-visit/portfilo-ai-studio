import { BlogPost, Experience, Project, SiteSettings, AdminUser, ContactMessage } from '../types';
import { INITIAL_POSTS, INITIAL_PROJECTS, INITIAL_EXPERIENCES, INITIAL_SETTINGS } from '../data/seedData';

const STORAGE_KEYS = {
  POSTS: 'portfolio_posts_v1',
  PROJECTS: 'portfolio_projects_v1',
  EXPERIENCES: 'portfolio_experiences_v1',
  SETTINGS: 'portfolio_settings_v1',
  AUTH: 'portfolio_auth_token_v1',
  MESSAGES: 'portfolio_contact_messages_v1',
};

// Helper for realistic network delay simulation
const delay = (ms: number = 80) => new Promise((resolve) => setTimeout(resolve, ms));

function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to parse ${key} from storage`, err);
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to write ${key} to storage`, err);
  }
}

export const api = {
  // --- Site Settings ---
  async getSettings(): Promise<SiteSettings> {
    await delay(30);
    return getStorage<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    await delay(120);
    const current = getStorage<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    const updated = { ...current, ...settings };
    setStorage(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // --- Projects ---
  async getProjects(): Promise<Project[]> {
    await delay(50);
    const projects = getStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    return projects.sort((a, b) => a.order - b.order);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    await delay(40);
    const projects = getStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    return projects.find((p) => p.slug === slug) || null;
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    await delay(150);
    const projects = getStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    projects.push(newProject);
    setStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await delay(150);
    const projects = getStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Project with ID ${id} not found`);
    const updated = { ...projects[index], ...updates };
    projects[index] = updated;
    setStorage(STORAGE_KEYS.PROJECTS, projects);
    return updated;
  },

  async deleteProject(id: string): Promise<boolean> {
    await delay(120);
    const projects = getStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const filtered = projects.filter((p) => p.id !== id);
    setStorage(STORAGE_KEYS.PROJECTS, filtered);
    return true;
  },

  // --- Blog Posts ---
  async getPosts(options?: { includeDrafts?: boolean; category?: string; tag?: string; search?: string }): Promise<BlogPost[]> {
    await delay(50);
    let posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);

    if (!options?.includeDrafts) {
      posts = posts.filter((p) => p.status === 'published');
    }

    if (options?.category && options.category !== 'All') {
      posts = posts.filter((p) => p.category.toLowerCase() === options.category!.toLowerCase());
    }

    if (options?.tag) {
      posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === options.tag!.toLowerCase()));
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      posts = posts.filter((p) => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by publication date descending
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay(40);
    const posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    return posts.find((p) => p.slug === slug) || null;
  },

  async createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
    await delay(180);
    const posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      views: 1,
    };
    posts.unshift(newPost);
    setStorage(STORAGE_KEYS.POSTS, posts);
    return newPost;
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    await delay(180);
    const posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Post with ID ${id} not found`);
    const updated = { ...posts[index], ...updates };
    posts[index] = updated;
    setStorage(STORAGE_KEYS.POSTS, posts);
    return updated;
  },

  async deletePost(id: string): Promise<boolean> {
    await delay(150);
    const posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const filtered = posts.filter((p) => p.id !== id);
    setStorage(STORAGE_KEYS.POSTS, filtered);
    return true;
  },

  async incrementPostViews(slug: string): Promise<void> {
    const posts = getStorage<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const index = posts.findIndex((p) => p.slug === slug);
    if (index !== -1) {
      posts[index].views = (posts[index].views || 0) + 1;
      setStorage(STORAGE_KEYS.POSTS, posts);
    }
  },

  // --- Experiences ---
  async getExperiences(): Promise<Experience[]> {
    await delay(40);
    const exp = getStorage<Experience[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    return exp.sort((a, b) => a.order - b.order);
  },

  async createExperience(exp: Omit<Experience, 'id'>): Promise<Experience> {
    await delay(140);
    const exps = getStorage<Experience[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    const newExp: Experience = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    exps.push(newExp);
    setStorage(STORAGE_KEYS.EXPERIENCES, exps);
    return newExp;
  },

  async updateExperience(id: string, updates: Partial<Experience>): Promise<Experience> {
    await delay(140);
    const exps = getStorage<Experience[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    const index = exps.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Experience with ID ${id} not found`);
    const updated = { ...exps[index], ...updates };
    exps[index] = updated;
    setStorage(STORAGE_KEYS.EXPERIENCES, exps);
    return updated;
  },

  async deleteExperience(id: string): Promise<boolean> {
    await delay(120);
    const exps = getStorage<Experience[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    const filtered = exps.filter((e) => e.id !== id);
    setStorage(STORAGE_KEYS.EXPERIENCES, filtered);
    return true;
  },

  // --- Authentication ---
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    await delay(200);
    const cleanEmail = email.trim().toLowerCase();
    // Predefined demo admin credential
    if (
      (cleanEmail === 'admin@portfolio.dev' || cleanEmail === 'gleuser83@gmail.com' || cleanEmail === 'julian@portfolio.dev') &&
      password === 'engineer2026'
    ) {
      const user: AdminUser = {
        id: 'usr-admin-1',
        email: cleanEmail,
        role: 'admin',
      };
      const token = `jwt_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      setStorage(STORAGE_KEYS.AUTH, { token, user, expiresAt: Date.now() + 86400000 });
      return { token, user };
    }
    throw new Error('Invalid credentials. Hint: use admin@portfolio.dev / engineer2026');
  },

  async logout(): Promise<void> {
    await delay(50);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    const session = getStorage<{ token: string; user: AdminUser; expiresAt: number } | null>(STORAGE_KEYS.AUTH, null);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      return null;
    }
    return session.user;
  },

  // --- Contact Messages ---
  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> {
    await delay(250);
    const messages = getStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMsg);
    setStorage(STORAGE_KEYS.MESSAGES, messages);
    return newMsg;
  },

  // --- Reset Database to Defaults ---
  async resetDatabase(): Promise<void> {
    await delay(200);
    setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    setStorage(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    setStorage(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  }
};
