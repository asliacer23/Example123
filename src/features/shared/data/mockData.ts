export interface Project {
  id: string;
  name: string;
  type: string;
  status: 'live' | 'draft' | 'generating';
  domain: string;
  createdAt: string;
  storageUsed: number;
}

export interface MockStudent {
  id: string;
  name: string;
  email: string;
  plan: 'basic' | 'pro' | 'capstone';
  projectsCount: number;
  joinDate: string;
  status: 'active' | 'inactive';
  lastActive: string;
  systemTypes: string[];
}

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Campus Merch Store', type: 'E-commerce Store', status: 'live', domain: 'campusmerch.autostore-im.app', createdAt: '2025-09-10', storageUsed: 0.4 },
  { id: '2', name: 'BCP Inventory Tracker', type: 'Inventory System', status: 'live', domain: 'bcpinventory.autostore-im.app', createdAt: '2025-10-02', storageUsed: 0.8 },
  { id: '3', name: 'Student Portfolio', type: 'Portfolio Website', status: 'draft', domain: 'juanportfolio.student-app.site', createdAt: '2025-11-15', storageUsed: 0.1 },
];

export const MOCK_STUDENTS: MockStudent[] = [
  { id: '1', name: 'Juan Dela Cruz', email: 'juan@student.bestlink.edu.ph', plan: 'pro', projectsCount: 2, joinDate: '2025-06-15', status: 'active', lastActive: '2025-12-20', systemTypes: ['E-commerce', 'Inventory'] },
  { id: '2', name: 'Maria Santos', email: 'maria@student.bestlink.edu.ph', plan: 'capstone', projectsCount: 4, joinDate: '2025-05-20', status: 'active', lastActive: '2025-12-19', systemTypes: ['Clinic', 'School', 'E-commerce', 'Portfolio'] },
  { id: '3', name: 'Pedro Reyes', email: 'pedro@student.bestlink.edu.ph', plan: 'basic', projectsCount: 1, joinDate: '2025-07-01', status: 'active', lastActive: '2025-12-18', systemTypes: ['Portfolio'] },
  { id: '4', name: 'Ana Garcia', email: 'ana@student.bestlink.edu.ph', plan: 'pro', projectsCount: 3, joinDate: '2025-08-10', status: 'active', lastActive: '2025-12-20', systemTypes: ['E-commerce', 'Inventory', 'School'] },
  { id: '5', name: 'Carlos Mendoza', email: 'carlos@student.bestlink.edu.ph', plan: 'basic', projectsCount: 1, joinDate: '2025-09-05', status: 'inactive', lastActive: '2025-11-30', systemTypes: ['Portfolio'] },
  { id: '6', name: 'Sofia Villanueva', email: 'sofia@student.bestlink.edu.ph', plan: 'capstone', projectsCount: 3, joinDate: '2025-04-18', status: 'active', lastActive: '2025-12-20', systemTypes: ['Clinic', 'Inventory', 'E-commerce'] },
  { id: '7', name: 'Miguel Torres', email: 'miguel@student.bestlink.edu.ph', plan: 'pro', projectsCount: 2, joinDate: '2025-07-22', status: 'active', lastActive: '2025-12-17', systemTypes: ['School', 'Portfolio'] },
  { id: '8', name: 'Isabella Cruz', email: 'isabella@student.bestlink.edu.ph', plan: 'basic', projectsCount: 0, joinDate: '2025-10-01', status: 'inactive', lastActive: '2025-10-15', systemTypes: [] },
  { id: '9', name: 'Rafael Aquino', email: 'rafael@student.bestlink.edu.ph', plan: 'pro', projectsCount: 2, joinDate: '2025-06-01', status: 'active', lastActive: '2025-12-20', systemTypes: ['E-commerce', 'Clinic'] },
  { id: '10', name: 'Camille Bautista', email: 'camille@student.bestlink.edu.ph', plan: 'capstone', projectsCount: 4, joinDate: '2025-03-15', status: 'active', lastActive: '2025-12-19', systemTypes: ['School', 'Inventory', 'E-commerce', 'Clinic'] },
];

export const SYSTEM_TYPES = [
  { id: 'ecommerce', name: 'E-commerce Store', icon: '{ }', description: 'Full online store with cart, checkout, and product management.', color: 'from-foreground/10 to-foreground/5' },
  { id: 'inventory', name: 'Inventory System', icon: '[ ]', description: 'Track stock levels, suppliers, and warehouse operations.', color: 'from-foreground/10 to-foreground/5' },
  { id: 'clinic', name: 'Clinic System', icon: '+ +', description: 'Patient records, appointments, and billing management.', color: 'from-foreground/10 to-foreground/5' },
  { id: 'school', name: 'School System', icon: '< >', description: 'Student enrollment, grades, and attendance tracking.', color: 'from-foreground/10 to-foreground/5' },
  { id: 'portfolio', name: 'Portfolio Website', icon: '* *', description: 'Personal showcase with projects, resume, and contact form.', color: 'from-foreground/10 to-foreground/5' },
  { id: 'booking', name: 'Booking System', icon: '= =', description: 'Appointment scheduling, calendar management, and reminders.', color: 'from-foreground/10 to-foreground/5' },
];

export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Student Basic',
    price: 1500,
    currency: '₱',
    features: ['1 Templated System', '400 AI Credits', '1 GB Database Storage', '1 Domain Hosting', '1 Domain Name'],
    target: 'Solo / Practice Projects',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Student Pro',
    price: 3000,
    currency: '₱',
    features: ['3 Templated Systems', '1,000 AI Credits', '2 GB Database Storage', '1 Domain Hosting', '1 Domain Name'],
    target: 'Group Projects',
    popular: true,
  },
  {
    id: 'capstone',
    name: 'Student Capstone',
    price: 5000,
    currency: '₱',
    features: ['4 Templated Systems', '2,100 AI Credits', '4 GB Database Storage', '1 Domain Hosting', '1 Domain Name'],
    target: 'Thesis / Capstone Systems',
    popular: false,
  },
];

export const ADMIN_METRICS = {
  totalUsers: 847,
  activeStudents: 623,
  systemsGenerated: 1284,
  monthlyRevenue: 428500,
  storageUsed: 156.7,
  totalStorage: 500,
  aiCreditsUsed: 89420,
  totalAiCredits: 150000,
  basicUsers: 312,
  proUsers: 378,
  capstoneUsers: 157,
  weeklySignups: 34,
  avgSessionMinutes: 42,
  conversionRate: 68,
};

export const MONTHLY_REVENUE_DATA = [
  { month: 'Jul', revenue: 185000 },
  { month: 'Aug', revenue: 243000 },
  { month: 'Sep', revenue: 298000 },
  { month: 'Oct', revenue: 356000 },
  { month: 'Nov', revenue: 392000 },
  { month: 'Dec', revenue: 428500 },
];

export const USER_GROWTH_DATA = [
  { month: 'Jul', users: 120 },
  { month: 'Aug', users: 245 },
  { month: 'Sep', users: 389 },
  { month: 'Oct', users: 534 },
  { month: 'Nov', users: 691 },
  { month: 'Dec', users: 847 },
];

export const WEEKLY_ACTIVITY_DATA = [
  { day: 'Mon', sessions: 142, generations: 28 },
  { day: 'Tue', sessions: 168, generations: 35 },
  { day: 'Wed', sessions: 195, generations: 42 },
  { day: 'Thu', sessions: 178, generations: 38 },
  { day: 'Fri', sessions: 210, generations: 48 },
  { day: 'Sat', sessions: 95, generations: 18 },
  { day: 'Sun', sessions: 78, generations: 12 },
];

export const SYSTEM_TYPE_DISTRIBUTION = [
  { name: 'E-commerce', value: 412, fill: 'hsl(var(--foreground))' },
  { name: 'Inventory', value: 298, fill: 'hsl(var(--muted-foreground))' },
  { name: 'Clinic', value: 186, fill: 'hsl(var(--border))' },
  { name: 'School', value: 234, fill: 'hsl(var(--accent-foreground))' },
  { name: 'Portfolio', value: 154, fill: 'hsl(var(--secondary-foreground))' },
];

export const PLAN_DISTRIBUTION_DATA = [
  { name: 'Basic', value: 312, fill: 'hsl(var(--muted-foreground))' },
  { name: 'Pro', value: 378, fill: 'hsl(var(--foreground))' },
  { name: 'Capstone', value: 157, fill: 'hsl(var(--accent-foreground))' },
];

export const TEMPLATE_BLOCKS = [
  { id: 'header', type: 'header', label: 'Header Banner', content: 'Store Name', width: 'full' },
  { id: 'hero', type: 'hero', label: 'Hero Section', content: 'Welcome to our store!', width: 'full' },
  { id: 'products', type: 'product-grid', label: 'Product Grid', content: '3x3 Product Grid', width: 'full' },
  { id: 'text', type: 'text', label: 'Text Block', content: 'Add your description here...', width: 'full' },
  { id: 'image', type: 'image', label: 'Image Block', content: '📷 Image Placeholder', width: 'half' },
  { id: 'cta', type: 'cta', label: 'Call to Action', content: 'Shop Now →', width: 'full' },
  { id: 'testimonials', type: 'testimonials', label: 'Testimonials', content: '⭐ Customer Reviews', width: 'full' },
  { id: 'footer', type: 'footer', label: 'Footer', content: '© 2025 Your Store', width: 'full' },
  { id: 'categories', type: 'categories', label: 'Category Cards', content: '📂 Browse Categories', width: 'full' },
  { id: 'featured', type: 'featured', label: 'Featured Product', content: '⭐ Featured Item', width: 'half' },
];

export const TUTORIAL_STEPS = [
  {
    id: 1,
    title: 'Welcome to AutoStore IM',
    description: 'AutoStore IM is a platform that allows BSIT Information Management students to generate intelligent storefront systems using templates, AI generation, and managed infrastructure.',
    content: 'This tutorial will guide you through the main features of the platform. You\'ll learn how to generate systems, use templates, manage domains, and more.',
  },
  {
    id: 2,
    title: 'Choose Your Plan',
    description: 'Select a subscription plan that fits your project needs.',
    content: 'We offer three plans: Student Basic (₱1,500) for solo projects, Student Pro (₱3,000) for group projects, and Student Capstone (₱5,000) for thesis/capstone systems. Each plan comes with different AI credits, storage, and system limits.',
  },
  {
    id: 3,
    title: 'AI System Generator',
    description: 'Generate complete systems with a single click using AutoStore AI.',
    content: 'Navigate to the "Generate System" tab in your dashboard. Choose from system types like E-commerce Store, Inventory System, Clinic System, School System, or Portfolio Website. The AI will automatically generate the database schema, UI components, and deploy to cloud.',
  },
  {
    id: 4,
    title: 'Template Builder',
    description: 'Build custom storefronts using drag-and-drop blocks.',
    content: 'The Template Builder allows you to create custom storefronts by dragging blocks like headers, product grids, text sections, and CTAs onto a canvas. You can rearrange, customize, and preview your layout in real-time.',
  },
  {
    id: 5,
    title: 'Domain Management',
    description: 'Assign custom domain names to your generated projects.',
    content: 'Each project gets a subdomain under autostore-im.app. You can assign custom domain names, manage DNS settings, and monitor the status of your deployments from the Domain Manager tab.',
  },
  {
    id: 6,
    title: 'Database Manager',
    description: 'View and manage your database allocation and tables.',
    content: 'The Database Manager shows your storage usage, table structure, and row counts. You can monitor your database health and manage your data allocation based on your subscription plan.',
  },
  {
    id: 7,
    title: 'System Preview',
    description: 'Preview your generated systems in a realistic storefront view.',
    content: 'After generating a system, click "View Project" to see a live preview of your storefront. The preview shows a realistic mock of your generated system with products, navigation, and interactive elements.',
  },
  {
    id: 8,
    title: 'You\'re All Set!',
    description: 'Start building your first system today.',
    content: 'You\'re now ready to use AutoStore IM! Head to your dashboard and generate your first system. If you need help, revisit this tutorial anytime from the Settings tab. Happy building!',
  },
];

export const PREVIEW_PRODUCTS = [
  { id: '1', name: 'BCP Official Hoodie', price: 899, image: '[ H ]', category: 'Apparel', stock: 45, rating: 4.8 },
  { id: '2', name: 'IT Department Jacket', price: 1200, image: '[ J ]', category: 'Apparel', stock: 23, rating: 4.6 },
  { id: '3', name: 'Campus Notebook Set', price: 250, image: '[ N ]', category: 'Supplies', stock: 120, rating: 4.9 },
  { id: '4', name: 'USB Flash Drive 64GB', price: 450, image: '[ U ]', category: 'Electronics', stock: 67, rating: 4.5 },
  { id: '5', name: 'Student ID Lanyard', price: 150, image: '[ L ]', category: 'Accessories', stock: 200, rating: 4.7 },
  { id: '6', name: 'Wireless Mouse', price: 599, image: '[ M ]', category: 'Electronics', stock: 34, rating: 4.4 },
  { id: '7', name: 'College Tumbler', price: 350, image: '[ T ]', category: 'Accessories', stock: 89, rating: 4.8 },
  { id: '8', name: 'Programming Book', price: 750, image: '[ B ]', category: 'Books', stock: 15, rating: 4.9 },
];
