import React from 'react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import ayurvedaIcon from 'figma:asset/5f3d258e381d9cd4b1a7d52cba60f367582cacde.png';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ 
  menuItems, 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-[#61803F] via-[#6D8F38] to-[#677D5E] border-r border-[#C9C24D]/20 transform transition-all duration-700 ease-out lg:translate-x-0 shadow-2xl backdrop-blur-xl",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Header - Clean Logo with Text */}
      <div className="p-6 border-b border-[#C9C24D]/25">
        <div className="flex items-center space-x-4 animate-fade-in-up">
          {/* Ayurveda Icon */}
          <div className="relative group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-[#C9C24D]/30 flex items-center justify-center neo-morphism animate-rotate3d transform transition-all duration-500 hover:scale-110">
              <img 
                src={ayurvedaIcon} 
                alt="AyurSync Ayurveda" 
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9C24D]/20 to-[#CA912E]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse"></div>
          </div>
          
          {/* Brand Text */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#FEFEFE] tracking-wide drop-shadow-lg animate-glow-pulse">
              AyurSync
            </h1>
            <p className="text-[#C9C24D] text-sm font-semibold opacity-90">
              Sync your diet, Balance your life
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start space-x-4 h-14 rounded-xl transition-all duration-500 group relative overflow-hidden font-semibold text-base",
                isActive 
                  ? "bg-gradient-to-r from-[#C9C24D] to-[#CA912E] text-[#61803F] border border-[#C9C24D]/50 shadow-2xl transform scale-105 animate-glow" 
                  : "text-[#FEFEFE] hover:bg-white/15 hover:text-[#C9C24D] hover:scale-105 hover:shadow-xl backdrop-blur-sm"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
            >
              {!isActive && <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>}
              <Icon className="w-6 h-6 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#C9C24D]/20 bg-gradient-to-t from-[#677D5E]/20 to-transparent backdrop-blur-sm">
        <div className="text-center bg-white/10 rounded-xl p-4 border border-[#C9C24D]/30">
          <p className="text-[#C9C24D] font-bold text-sm tracking-wide">Healthcare Practitioner Portal</p>
          <p className="text-xs mt-2 text-[#FEFEFE]/80 font-medium">Version 2.1.0 • Premium</p>
          <div className="mt-2 w-12 h-1 bg-gradient-to-r from-[#C9C24D] to-[#CA912E] rounded-full mx-auto animate-pulse-bright"></div>
        </div>
      </div>
    </div>
  );
}