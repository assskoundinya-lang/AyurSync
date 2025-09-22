import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Book, 
  FileText,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import ayurvedaIcon from '../assets/topbar-ui.jpg';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface TopbarProps {
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Topbar({ menuItems, activeSection, onSectionChange }: TopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#61803F] via-[#677D5E] to-[#84A15D] backdrop-blur-xl border-b border-[#C9C24D]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 animate-fade-in-up">
              <div className="relative group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-[#C9C24D]/30 flex items-center justify-center neo-morphism animate-rotate3d transform transition-all duration-500 hover:scale-110">
                  <img 
                    src={ayurvedaIcon} 
                    alt="AyurSync Ayurveda" 
                    className="w-8 h-8 object-contain drop-shadow-lg"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9C24D]/20 to-[#CA912E]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse"></div>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-[#FEFEFE] tracking-wide drop-shadow-lg animate-glow-pulse" style={{ fontFamily: 'Georgia, serif' }}>
                  AyurSync
                </h1>
                <p className="text-[#C9C24D] text-sm font-semibold opacity-90" style={{ fontFamily: 'Georgia, serif' }}>
                  Sync your diet, Balance your life
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      'flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 backdrop-blur-sm relative overflow-hidden',
                      isActive
                        ? 'bg-gradient-to-r from-[#C9C24D]/30 to-[#CA912E]/30 text-[#FEFEFE] border border-[#C9C24D]/50 shadow-2xl animate-glow-pulse'
                        : 'text-[#FEFEFE]/80 hover:text-[#FEFEFE] hover:bg-white/10 border border-transparent hover:border-[#C9C24D]/30'
                    )}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <Icon className={cn(
                      'w-5 h-5 transition-all duration-300',
                      isActive ? 'text-[#FEFEFE] drop-shadow-lg animate-pulse-bright' : 'text-[#FEFEFE]/70'
                    )} />
                    <span className="text-sm font-bold tracking-wide">
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#C9C24D]/20 via-transparent to-[#CA912E]/20 animate-shimmer opacity-50"></div>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#FEFEFE] hover:bg-white/10 transition-all duration-300 hover:scale-110 rounded-2xl w-12 h-12"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-[#61803F]/95 to-[#677D5E]/95 backdrop-blur-xl border-b border-[#C9C24D]/30 shadow-2xl animate-slide-scale">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="space-y-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => {
                        onSectionChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-sm text-left justify-start',
                        isActive
                          ? 'bg-gradient-to-r from-[#C9C24D]/30 to-[#CA912E]/30 text-[#FEFEFE] border border-[#C9C24D]/50 shadow-xl'
                          : 'text-[#FEFEFE]/80 hover:text-[#FEFEFE] hover:bg-white/10 border border-transparent hover:border-[#C9C24D]/30'
                      )}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <Icon className={cn(
                        'w-6 h-6 transition-all duration-300',
                        isActive ? 'text-[#FEFEFE] drop-shadow-lg' : 'text-[#FEFEFE]/70'
                      )} />
                      <span className="text-base font-bold tracking-wide">
                        {item.label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Floating Decorative Elements */}
        <div className="absolute top-2 right-20 w-16 h-16 bg-gradient-to-br from-[#C9C24D]/10 to-[#CA912E]/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-2 left-32 w-12 h-12 bg-gradient-to-br from-[#84A15D]/10 to-[#61803F]/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Spacer to prevent content from going under fixed topbar */}
      <div className="h-20"></div>
    </>
  );
}