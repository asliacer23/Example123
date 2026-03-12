import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'student' | 'superadmin';
export type PlanType = 'basic' | 'pro' | 'capstone' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: PlanType;
  aiCredits: number;
  storageUsed: number;
  storageTotal: number;
  projectsCreated: number;
  maxProjects: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  selectPlan: (plan: PlanType) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@autostore.im',
    role: 'superadmin',
    plan: null,
    aiCredits: 9999,
    storageUsed: 0,
    storageTotal: 999,
    projectsCreated: 0,
    maxProjects: 999,
    joinDate: '2025-01-01',
  },
  {
    id: '2',
    name: 'Juan Dela Cruz',
    email: 'juan@student.bestlink.edu.ph',
    role: 'student',
    plan: 'pro',
    aiCredits: 680,
    storageUsed: 1.2,
    storageTotal: 2,
    projectsCreated: 2,
    maxProjects: 3,
    joinDate: '2025-06-15',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string) => {
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // Allow any login as student
    setUser({
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      role: 'student',
      plan: null,
      aiCredits: 0,
      storageUsed: 0,
      storageTotal: 0,
      projectsCreated: 0,
      maxProjects: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({
      id: crypto.randomUUID(),
      name,
      email,
      role: 'student',
      plan: null,
      aiCredits: 0,
      storageUsed: 0,
      storageTotal: 0,
      projectsCreated: 0,
      maxProjects: 0,
      joinDate: new Date().toISOString().split('T')[0],
    });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const selectPlan = useCallback((plan: PlanType) => {
    if (!user) return;
    const planDetails: Record<string, Partial<User>> = {
      basic: { plan: 'basic', aiCredits: 400, storageTotal: 1, maxProjects: 1 },
      pro: { plan: 'pro', aiCredits: 1000, storageTotal: 2, maxProjects: 3 },
      capstone: { plan: 'capstone', aiCredits: 2100, storageTotal: 4, maxProjects: 4 },
    };
    if (plan && planDetails[plan]) {
      setUser({ ...user, ...planDetails[plan] } as User);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, selectPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
