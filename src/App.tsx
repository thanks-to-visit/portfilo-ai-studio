import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { ToastProvider } from './hooks/useToast';
import { SiteSettings, BlogPost, Project, Experience as ExperienceType } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { FeaturedBlog } from './components/FeaturedBlog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { INITIAL_SETTINGS } from './data/seedData';

const MainContent: React.FC = () => {
  const { path, params } = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load site data on mount & route change
  const refreshSiteData = async () => {
    try {
      const [sData, pList, projList, expList] = await Promise.all([
        api.getSettings(),
        api.getPosts(),
        api.getProjects(),
        api.getExperiences(),
      ]);
      setSettings(sData);
      setPosts(pList);
      setProjects(projList);
      setExperiences(expList);
    } catch (err) {
      console.error('Failed to load portfolio state', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSiteData();
  }, [path]);

  // Route 1: Admin Dashboard
  if (path === '/admin') {
    return <AdminDashboard />;
  }

  // Route 2: Single Blog Article
  if (path === '/blog/:slug') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar settings={settings} />
        <main className="flex-1">
          <BlogArticlePage slug={params.slug} />
        </main>
        <Footer settings={settings} posts={posts} projects={projects} />
      </div>
    );
  }

  // Route 3: Full Blog Catalog
  if (path === '/blog') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar settings={settings} />
        <main className="flex-1">
          <BlogPage />
        </main>
        <Footer settings={settings} posts={posts} projects={projects} />
      </div>
    );
  }

  // Default Route: Homepage
  return (
    <div className="flex flex-col min-h-screen selection:bg-[#1B4332] selection:text-white">
      <Navbar settings={settings} />
      <main className="flex-1">
        <Hero settings={settings} />
        <About settings={settings} />
        <Projects initialProjects={projects} />
        <Experience initialExperiences={experiences} />
        <Skills />
        <FeaturedBlog initialPosts={posts} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} posts={posts} projects={projects} />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <ToastProvider>
        <MainContent />
      </ToastProvider>
    </RouterProvider>
  );
}
