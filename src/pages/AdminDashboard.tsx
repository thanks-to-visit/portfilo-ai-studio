import React, { useState, useEffect } from 'react';
import { BlogPost, Experience, Project, SiteSettings, AdminUser } from '../types';
import { api } from '../services/api';
import { useRouter } from '../hooks/useRouter';
import { useToast } from '../hooks/useToast';
import { 
  ShieldCheck, Lock, LogOut, ArrowLeft, Plus, Edit2, Trash2, Eye, 
  FileText, Briefcase, Settings, BarChart3, CheckCircle, RefreshCw, 
  Layers, ExternalLink, Globe, AlertTriangle, EyeOff, Save, X
} from 'lucide-react';

type AdminTab = 'overview' | 'posts' | 'projects' | 'experience' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@portfolio.dev');
  const [loginPassword, setLoginPassword] = useState('engineer2026');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Post Editor modal state
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({});
  const [postPreviewMode, setPostPreviewMode] = useState(false);

  // Project Editor modal state
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});

  // Experience Editor modal state
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [editingExp, setEditingExp] = useState<Partial<Experience>>({});

  // Delete confirmation modal state
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: 'post' | 'project' | 'experience' | null;
    id: string;
    title: string;
  }>({ open: false, type: null, id: '', title: '' });

  // Load auth state
  useEffect(() => {
    api.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadData();
      }
    });
  }, []);

  const loadData = async () => {
    const [pList, projList, expList, sData] = await Promise.all([
      api.getPosts({ includeDrafts: true }),
      api.getProjects(),
      api.getExperiences(),
      api.getSettings(),
    ]);
    setPosts(pList);
    setProjects(projList);
    setExperiences(expList);
    setSettings(sData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await api.login(loginEmail, loginPassword);
      setUser(res.user);
      toast('Authenticated successfully as Administrator', 'success');
      loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      toast(msg, 'error');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    toast('Logged out of Admin Portal', 'info');
  };

  // --- Post Operations ---
  const handleOpenNewPost = () => {
    setEditingPost({
      title: '',
      slug: '',
      category: 'Backend',
      excerpt: '',
      content: '## Introduction\n\nWrite your technical analysis here...\n\n```python\n# Code snippet\nprint("Hello World")\n```',
      tags: ['Engineering', 'Architecture'],
      status: 'draft',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: '5 min read',
      author: {
        name: settings?.name || 'Julian Thorne',
        role: settings?.role || 'Software Engineer',
      },
    });
    setPostPreviewMode(false);
    setIsEditingPost(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setPostPreviewMode(false);
    setIsEditingPost(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost.title || !editingPost.slug) {
      toast('Title and slug are required.', 'error');
      return;
    }

    try {
      if (editingPost.id) {
        await api.updatePost(editingPost.id, editingPost);
        toast('Post updated successfully', 'success');
      } else {
        await api.createPost(editingPost as Omit<BlogPost, 'id' | 'views'>);
        toast('Post created successfully', 'success');
      }
      setIsEditingPost(false);
      loadData();
    } catch {
      toast('Failed to save post', 'error');
    }
  };

  const togglePostStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await api.updatePost(post.id, { status: newStatus });
    toast(`Post marked as ${newStatus}`, 'info');
    loadData();
  };

  // --- Project Operations ---
  const handleOpenNewProject = () => {
    setEditingProject({
      name: '',
      slug: '',
      category: 'Backend & Systems',
      description: '',
      problemSolved: '',
      architectureHighlights: ['High-throughput execution model', 'Bounded queueing mechanism'],
      technologies: ['Python', 'FastAPI'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: false,
      status: 'In Progress',
      year: new Date().getFullYear().toString(),
      order: projects.length + 1,
    });
    setIsEditingProject(true);
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsEditingProject(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.name || !editingProject.slug) {
      toast('Project name and slug are required.', 'error');
      return;
    }

    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        toast('Project updated', 'success');
      } else {
        await api.createProject(editingProject as Omit<Project, 'id'>);
        toast('Project created', 'success');
      }
      setIsEditingProject(false);
      loadData();
    } catch {
      toast('Failed to save project', 'error');
    }
  };

  // --- Experience Operations ---
  const handleOpenNewExp = () => {
    setEditingExp({
      organization: '',
      role: '',
      location: 'Remote',
      duration: '2025 — Present',
      startDate: '2025',
      endDate: 'Present',
      description: '',
      responsibilities: ['Architected backend services', 'Reduced tail latency P99'],
      achievements: ['Increased request throughput by 40%'],
      technologies: ['Python', 'Go', 'Docker'],
      order: experiences.length + 1,
    });
    setIsEditingExp(true);
  };

  const handleEditExp = (exp: Experience) => {
    setEditingExp({ ...exp });
    setIsEditingExp(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp.organization || !editingExp.role) {
      toast('Organization and role are required.', 'error');
      return;
    }

    try {
      if (editingExp.id) {
        await api.updateExperience(editingExp.id, editingExp);
        toast('Experience entry updated', 'success');
      } else {
        await api.createExperience(editingExp as Omit<Experience, 'id'>);
        toast('Experience entry created', 'success');
      }
      setIsEditingExp(false);
      loadData();
    } catch {
      toast('Failed to save experience', 'error');
    }
  };

  // --- Deletion Execution ---
  const confirmDelete = async () => {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    if (type === 'post') {
      await api.deletePost(id);
      toast('Post permanently removed', 'info');
    } else if (type === 'project') {
      await api.deleteProject(id);
      toast('Project removed', 'info');
    } else if (type === 'experience') {
      await api.deleteExperience(id);
      toast('Experience entry removed', 'info');
    }

    setDeleteModal({ open: false, type: null, id: '', title: '' });
    loadData();
  };

  // --- Settings Update ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await api.updateSettings(settings);
    toast('Site configuration updated across portfolio', 'success');
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all site data to default seed data? Custom modifications will be replaced.')) {
      await api.resetDatabase();
      toast('Database reset to initial sample state', 'info');
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center font-mono text-xs text-[#666666]">
        Verifying administrative session...
      </div>
    );
  }

  // --- Unauthenticated Login Screen ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666666] hover:text-[#171717] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <div className="w-10 h-10 rounded-sm bg-[#171717] text-white flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#171717]">
            Admin Control Center
          </h2>
          <p className="mt-1 text-xs text-[#666666]">
            Secure session required for content mutations, articles, and site settings.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-6">
          <div className="bg-white py-8 px-6 border border-[#DCDCDC] shadow-2xs rounded-sm sm:px-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 px-4 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors disabled:opacity-50"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In as Administrator'}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#F0F0EE] space-y-2">
              <div className="text-[11px] font-mono text-[#777777]">
                <span className="font-semibold text-[#171717]">Demo Credentials:</span>
                <div className="mt-1">Email: <code className="bg-[#F4F4F2] px-1 py-0.5">admin@portfolio.dev</code></div>
                <div className="mt-0.5">Password: <code className="bg-[#F4F4F2] px-1 py-0.5">engineer2026</code></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@portfolio.dev');
                  setLoginPassword('engineer2026');
                }}
                className="text-[11px] text-[#1B4332] hover:underline"
              >
                Auto-fill credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Authenticated Dashboard ---
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftsCount = posts.filter((p) => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#F4F4F2] flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#DCDCDC] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#171717] transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </button>
          <div className="h-4 w-[1px] bg-[#DCDCDC]" />
          <span className="font-semibold text-xs text-[#171717] uppercase tracking-wider font-mono">
            Admin Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#666666] hidden sm:inline">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="p-1.5 text-[#666666] hover:text-[#171717] transition-colors flex items-center gap-1 text-xs"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#DCDCDC] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#171717] text-white'
                : 'text-[#666666] hover:text-[#171717] hover:bg-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'posts'
                ? 'bg-[#171717] text-white'
                : 'text-[#666666] hover:text-[#171717] hover:bg-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blog Articles ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-[#171717] text-white'
                : 'text-[#666666] hover:text-[#171717] hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-[#171717] text-white'
                : 'text-[#666666] hover:text-[#171717] hover:bg-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#171717] text-white'
                : 'text-[#666666] hover:text-[#171717] hover:bg-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Settings</span>
          </button>
        </div>

        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-100">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#DCDCDC] p-5 rounded-sm">
                <span className="text-[11px] font-mono uppercase text-[#666666] block mb-1">Total Posts</span>
                <div className="text-2xl font-semibold text-[#171717] tabular-nums">{posts.length}</div>
                <div className="text-[11px] text-[#888888] mt-1">{publishedCount} published &middot; {draftsCount} draft</div>
              </div>

              <div className="bg-white border border-[#DCDCDC] p-5 rounded-sm">
                <span className="text-[11px] font-mono uppercase text-[#666666] block mb-1">Projects Showcase</span>
                <div className="text-2xl font-semibold text-[#171717] tabular-nums">{projects.length}</div>
                <div className="text-[11px] text-[#888888] mt-1">{projects.filter((p) => p.featured).length} marked featured</div>
              </div>

              <div className="bg-white border border-[#DCDCDC] p-5 rounded-sm">
                <span className="text-[11px] font-mono uppercase text-[#666666] block mb-1">Career Journey</span>
                <div className="text-2xl font-semibold text-[#171717] tabular-nums">{experiences.length}</div>
                <div className="text-[11px] text-[#888888] mt-1">Timeline milestones</div>
              </div>

              <div className="bg-white border border-[#DCDCDC] p-5 rounded-sm">
                <span className="text-[11px] font-mono uppercase text-[#666666] block mb-1">Total Article Views</span>
                <div className="text-2xl font-semibold text-[#171717] tabular-nums">{totalViews}</div>
                <div className="text-[11px] text-[#888888] mt-1">Telemetry accumulator</div>
              </div>
            </div>

            {/* Quick Actions & Recent Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Post Creator */}
              <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#171717]">Recent Articles</h3>
                  <button
                    onClick={handleOpenNewPost}
                    className="text-xs font-semibold text-[#1B4332] hover:underline"
                  >
                    + Write Article
                  </button>
                </div>
                <div className="divide-y divide-[#F0F0EE]">
                  {posts.slice(0, 4).map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="truncate mr-3">
                        <span className="font-medium text-[#171717] truncate">{p.title}</span>
                        <div className="text-[10px] text-[#888888] font-mono">
                          {p.category} &middot; {p.status} &middot; {p.publishedAt}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditPost(p)}
                        className="text-[#666666] hover:text-[#171717] text-xs shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Project Showcase */}
              <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#171717]">Active Projects</h3>
                  <button
                    onClick={handleOpenNewProject}
                    className="text-xs font-semibold text-[#1B4332] hover:underline"
                  >
                    + Add Project
                  </button>
                </div>
                <div className="divide-y divide-[#F0F0EE]">
                  {projects.slice(0, 4).map((proj) => (
                    <div key={proj.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="truncate mr-3">
                        <span className="font-medium text-[#171717]">{proj.name}</span>
                        <div className="text-[10px] text-[#888888] font-mono">
                          {proj.category} &middot; {proj.status}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="text-[#666666] hover:text-[#171717] text-xs shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: BLOG MANAGEMENT --- */}
        {activeTab === 'posts' && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#171717]">Blog Management</h3>
                <p className="text-xs text-[#666666]">Create, edit, draft, publish, or remove publications.</p>
              </div>
              <button
                onClick={handleOpenNewPost}
                className="px-3.5 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Post</span>
              </button>
            </div>

            <div className="bg-white border border-[#DCDCDC] rounded-sm overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F8F7] border-b border-[#DCDCDC] text-[#666666] font-mono text-[11px] uppercase">
                  <tr>
                    <th className="py-3 px-4">Title & Slug</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EE]">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#171717] max-w-xs sm:max-w-md truncate">
                          {post.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#888888] truncate">
                          /blog/{post.slug}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#555555] font-mono text-[11px]">
                        {post.category}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => togglePostStatus(post)}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded-xs border ${
                            post.status === 'published'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {post.status}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-[#666666] font-mono text-[11px]">
                        {post.publishedAt}
                      </td>
                      <td className="py-3 px-4 text-[#666666] font-mono text-[11px] tabular-nums">
                        {post.views || 0}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          className="p-1 text-[#666666] hover:text-[#171717]"
                          title="View on site"
                        >
                          <Eye className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-1 text-[#666666] hover:text-[#171717]"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              type: 'post',
                              id: post.id,
                              title: post.title,
                            })
                          }
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: PROJECT MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#171717]">Project Showcase Management</h3>
                <p className="text-xs text-[#666666]">Manage software projects, repository links, and architecture metadata.</p>
              </div>
              <button
                onClick={handleOpenNewProject}
                className="px-3.5 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="bg-white border border-[#DCDCDC] rounded-sm overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F8F7] border-b border-[#DCDCDC] text-[#666666] font-mono text-[11px] uppercase">
                  <tr>
                    <th className="py-3 px-4">Name & Category</th>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Stack</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EE]">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#171717]">{proj.name}</div>
                        <div className="text-[10px] text-[#888888] font-mono">{proj.category}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#666666]">
                        {proj.year}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] px-2 py-0.5 bg-[#F4F4F2] border border-[#E5E5E0] text-[#333333]">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {proj.featured ? (
                          <span className="text-[#1B4332] font-semibold text-[11px]">Yes</span>
                        ) : (
                          <span className="text-[#888888] text-[11px]">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-[#666666] max-w-xs truncate">
                        {proj.technologies.join(', ')}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="p-1 text-[#666666] hover:text-[#171717]"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              type: 'project',
                              id: proj.id,
                              title: proj.name,
                            })
                          }
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 4: EXPERIENCE MANAGEMENT --- */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#171717]">Career Experience Timeline</h3>
                <p className="text-xs text-[#666666]">Add or adjust work history, research roles, and technical milestones.</p>
              </div>
              <button
                onClick={handleOpenNewExp}
                className="px-3.5 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white border border-[#DCDCDC] p-5 rounded-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-[#171717]">{exp.role}</h4>
                    <p className="text-xs text-[#555555] font-mono mt-0.5">
                      {exp.organization} &middot; {exp.location} &middot; {exp.duration}
                    </p>
                    <p className="text-xs text-[#666666] line-clamp-1 mt-1 max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleEditExp(exp)}
                      className="px-2.5 py-1 text-xs border border-[#DCDCDC] hover:border-[#171717] rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({
                          open: true,
                          type: 'experience',
                          id: exp.id,
                          title: `${exp.role} at ${exp.organization}`,
                        })
                      }
                      className="px-2.5 py-1 text-xs text-red-600 hover:text-red-800 border border-transparent hover:border-red-200 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: SITE SETTINGS --- */}
        {activeTab === 'settings' && settings && (
          <div className="bg-white border border-[#DCDCDC] p-6 sm:p-8 rounded-sm space-y-6 animate-in fade-in duration-100">
            <div>
              <h3 className="text-lg font-semibold text-[#171717]">Website Profile & Metadata Settings</h3>
              <p className="text-xs text-[#666666]">
                Configure developer identity, status lines, social endpoints, and SEO metadata.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Primary Role
                  </label>
                  <input
                    type="text"
                    value={settings.role}
                    onChange={(e) => setSettings({ ...settings, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Short Introduction (Hero Subtext)
                </label>
                <textarea
                  rows={2}
                  value={settings.bioShort}
                  onChange={(e) => setSettings({ ...settings, bioShort: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Currently Building
                  </label>
                  <input
                    type="text"
                    value={settings.currentlyBuilding}
                    onChange={(e) => setSettings({ ...settings, currentlyBuilding: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Currently Learning
                  </label>
                  <input
                    type="text"
                    value={settings.currentlyLearning}
                    onChange={(e) => setSettings({ ...settings, currentlyLearning: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Currently Exploring
                  </label>
                  <input
                    type="text"
                    value={settings.currentlyExploring}
                    onChange={(e) => setSettings({ ...settings, currentlyExploring: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#F0F0EE]">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={settings.githubUrl}
                    onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={settings.linkedinUrl}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={settings.seoDescription}
                    onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F0F0EE]">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Site Settings</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-3.5 py-2 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Seed Defaults</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* --- POST EDITOR MODAL --- */}
      {isEditingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DCDCDC] w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl rounded-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCDCDC]">
              <h3 className="font-semibold text-sm text-[#171717]">
                {editingPost.id ? 'Edit Article Publication' : 'Create Technical Note'}
              </h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPostPreviewMode(!postPreviewMode)}
                  className="text-xs text-[#666666] hover:text-[#171717] flex items-center gap-1 border border-[#DCDCDC] px-2 py-1 rounded"
                >
                  {postPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{postPreviewMode ? 'Edit Mode' : 'Preview'}</span>
                </button>
                <button
                  onClick={() => setIsEditingPost(false)}
                  className="text-[#666666] hover:text-[#171717]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingPost((prev) => ({
                        ...prev,
                        title,
                        slug: prev.slug ? prev.slug : slug,
                      }));
                    }}
                    placeholder="e.g. Architecting for P99"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Category
                  </label>
                  <select
                    value={editingPost.category || 'Backend'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as BlogPost['category'] })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Status
                  </label>
                  <select
                    value={editingPost.status || 'draft'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as BlogPost['status'] })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingPost.readingTime || '5 min read'}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Excerpt / Teaser
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Summary of core findings and takeaways..."
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingPost.tags?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Distributed Systems, Raft, Go"
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              {/* Content / Markdown Editor */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Content (Markdown Supported)
                </label>
                {postPreviewMode ? (
                  <div className="p-4 bg-[#FBFBFA] border border-[#DCDCDC] rounded text-xs text-[#333333] max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed font-sans">
                    {editingPost.content}
                  </div>
                ) : (
                  <textarea
                    rows={12}
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full p-3 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono resize-y"
                  />
                )}
              </div>

              <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingPost(false)}
                  className="px-4 py-2 text-xs text-[#666666] hover:text-[#171717]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PROJECT EDITOR MODAL --- */}
      {isEditingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DCDCDC] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl rounded-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCDCDC]">
              <h3 className="font-semibold text-sm text-[#171717]">
                {editingProject.id ? 'Edit Project' : 'Add Project Showcase'}
              </h3>
              <button
                onClick={() => setIsEditingProject(false)}
                className="text-[#666666] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingProject((prev) => ({
                        ...prev,
                        name,
                        slug: prev.slug ? prev.slug : slug,
                      }));
                    }}
                    placeholder="ProjectLens"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Category
                  </label>
                  <select
                    value={editingProject.category || 'Backend & Systems'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as Project['category'] })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  >
                    <option value="Backend & Systems">Backend & Systems</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web & Frontend">Web & Frontend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status || 'Featured'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as Project['status'] })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  >
                    <option value="Featured">Featured</option>
                    <option value="Open Source">Open Source</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="One sentence explaining the system..."
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Problem Solved
                </label>
                <textarea
                  rows={3}
                  value={editingProject.problemSolved || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, problemSolved: e.target.value })}
                  placeholder="Explain why standard solutions failed and how this architecture solved it..."
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Python, FastAPI, PostgreSQL, Redis"
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded text-[#1B4332]"
                />
                <label htmlFor="featured-check" className="text-xs text-[#171717] font-medium">
                  Mark as Featured on Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProject(false)}
                  className="px-4 py-2 text-xs text-[#666666] hover:text-[#171717]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EXPERIENCE EDITOR MODAL --- */}
      {isEditingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#DCDCDC] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl rounded-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCDCDC]">
              <h3 className="font-semibold text-sm text-[#171717]">
                {editingExp.id ? 'Edit Experience Milestone' : 'Add Experience Entry'}
              </h3>
              <button
                onClick={() => setIsEditingExp(false)}
                className="text-[#666666] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.organization || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    placeholder="Meridian Cloud Labs"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="Software Engineer Intern"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingExp.duration || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    placeholder="May 2025 — Aug 2025"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    placeholder="San Francisco, CA / Remote"
                    className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Overview Description
                </label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={4}
                  value={editingExp.responsibilities?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      responsibilities: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#555555] mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingExp.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Go, gRPC, Kubernetes, Redis"
                  className="w-full px-3 py-2 text-xs bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#171717] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingExp(false)}
                  className="px-4 py-2 text-xs text-[#666666] hover:text-[#171717]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] rounded transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="bg-white border border-[#DCDCDC] p-6 max-w-md w-full rounded-sm shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-semibold text-sm text-[#171717]">
                Confirm Irreversible Deletion
              </h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to permanently remove <span className="font-semibold text-[#171717]">&quot;{deleteModal.title}&quot;</span>? This will eliminate it from public portfolio feeds and API responses.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0F0EE]">
              <button
                onClick={() => setDeleteModal({ open: false, type: null, id: '', title: '' })}
                className="px-3.5 py-1.5 text-xs text-[#666666] hover:text-[#171717]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 text-xs font-medium text-white bg-red-700 hover:bg-red-800 rounded transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
