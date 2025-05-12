import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabsLayoutProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: { value: string, label: string }[];
  children: ReactNode;
  className?: string;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabs,
  children,
  className = "mb-6"
}) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className={className}>
      <TabsList className="w-full flex flex-wrap md:flex-nowrap gap-1 h-auto p-1 bg-white border border-gray-200 shadow-sm">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="flex-1 py-2 data-[state=active]:bg-scad-red data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap text-sm"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default TabsLayout;