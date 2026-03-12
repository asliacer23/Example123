import { useState } from "react";
import StudentDashboardLayout from "@/features/student/components/StudentDashboardLayout";
import OverviewTab from "@/features/student/components/OverviewTab";
import GeneratorTab from "@/features/student/components/GeneratorTab";
import TemplatesTab from "@/features/student/components/TemplatesTab";
import DomainsTab from "@/features/student/components/DomainsTab";
import DatabaseTab from "@/features/student/components/DatabaseTab";
import SettingsTab from "@/features/student/components/SettingsTab";
import ActivityLogTab from "@/features/student/components/ActivityLogTab";
import NotificationsTab from "@/features/student/components/NotificationsTab";
import AnalyticsTab from "@/features/student/components/AnalyticsTab";
import AIChatTab from "@/features/student/components/AIChatTab";
import BillingTab from "@/features/student/components/BillingTab";
import HelpCenterTab from "@/features/student/components/HelpCenterTab";
import ExportCenterTab from "@/features/student/components/ExportCenterTab";
import IntegrationsTab from "@/features/student/components/IntegrationsTab";
import DatabaseAdvancedTab from "@/features/student/components/DatabaseAdvancedTab";
import ProjectsTab from "@/features/student/components/ProjectsTab";
import AIFeaturesTab from "@/features/student/components/AIFeaturesTab";
import WorldMapTab from "@/features/student/components/WorldMapTab";
import SecurityTab from "@/features/student/components/SecurityTab";
import PerformanceTab from "@/features/student/components/PerformanceTab";
import DeploymentTab from "@/features/student/components/DeploymentTab";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role === 'superadmin') return <Navigate to="/admin" />;

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'generator': return <GeneratorTab />;
      case 'ai-features': return <AIFeaturesTab />;
      case 'templates': return <TemplatesTab />;
      case 'projects': return <ProjectsTab />;
      case 'world-map': return <WorldMapTab />;
      case 'domains': return <DomainsTab />;
      case 'database': return <DatabaseTab />;
      case 'database-advanced': return <DatabaseAdvancedTab />;
      case 'deployment': return <DeploymentTab />;
      case 'performance': return <PerformanceTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'notifications': return <NotificationsTab />;
      case 'activity': return <ActivityLogTab />;
      case 'ai-chat': return <AIChatTab />;
      case 'security': return <SecurityTab />;
      case 'billing': return <BillingTab />;
      case 'integrations': return <IntegrationsTab />;
      case 'export': return <ExportCenterTab />;
      case 'help': return <HelpCenterTab />;
      case 'settings': return <SettingsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <StudentDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTab()}
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
