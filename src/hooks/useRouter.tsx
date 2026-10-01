import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  hash: string;
}

interface RouterContextType {
  path: string;
  params: Record<string, string>;
  hash: string;
  navigate: (to: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

function parsePath(pathname: string): { path: string; params: Record<string, string> } {
  const clean = pathname.replace(/\/$/, '') || '/';

  // Check blog slug pattern: /blog/:slug
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return {
      path: '/blog/:slug',
      params: { slug: blogMatch[1] },
    };
  }

  return {
    path: clean,
    params: {},
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => {
    const { path, params } = parsePath(window.location.pathname);
    return {
      path,
      params,
      hash: window.location.hash,
    };
  });

  useEffect(() => {
    const handlePopState = () => {
      const { path, params } = parsePath(window.location.pathname);
      setRoute({
        path,
        params,
        hash: window.location.hash,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    // If it's a hash on the current page or anchor link
    if (to.startsWith('#')) {
      const hash = to;
      if (route.path !== '/') {
        // Navigate home first, then scroll
        window.history.pushState(null, '', `/${hash}`);
        setRoute({ path: '/', params: {}, hash });
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.history.pushState(null, '', hash);
        setRoute((prev) => ({ ...prev, hash }));
        const el = document.getElementById(hash.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Normal path navigation
    window.history.pushState(null, '', to);
    const { path, params } = parsePath(to);
    setRoute({ path, params, hash: '' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToSection = (sectionId: string) => {
    if (route.path !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <RouterContext.Provider value={{ path: route.path, params: route.params, hash: route.hash, navigate, scrollToSection }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
