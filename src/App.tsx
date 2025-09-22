import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { DietPlanGenerator } from './components/DietPlanGenerator';
import { RecipeDatabase } from './components/RecipeDatabase';
import { ReportsGeneration } from './components/ReportsGeneration';
import { Topbar } from './components/Topbar';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Book, 
  FileText
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patient Management', icon: Users },
  { id: 'diet-plans', label: 'Diet Plan Generator', icon: Calendar },
  { id: 'recipes', label: 'Recipe Database', icon: Book },
  { id: 'reports', label: 'Reports & PDF', icon: FileText },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Scroll animation effect
  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe all elements with animate-on-scroll class
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    // Set up observer after a small delay to ensure elements are rendered
    const timer = setTimeout(observeElements, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [activeSection]); // Re-run when section changes

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientManagement />;
      case 'diet-plans':
        return <DietPlanGenerator />;
      case 'recipes':
        return <RecipeDatabase />;
      case 'reports':
        return <ReportsGeneration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#D5D8AB]/30 to-[#84A15D]/20 texture-overlay" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Topbar Navigation */}
      <Topbar
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveSection()}
      </main>
    </div>
  );
}