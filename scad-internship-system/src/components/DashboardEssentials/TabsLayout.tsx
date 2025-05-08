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
      <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="py-2">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default TabsLayout;