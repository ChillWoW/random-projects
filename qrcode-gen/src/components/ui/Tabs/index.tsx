"use client";

import React, { useState, useRef, useEffect } from "react";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  onChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    updateIndicator();
  }, [activeTab]);

  const updateIndicator = () => {
    const currentTab =
      tabsRef.current[tabs.findIndex((tab) => tab.value === activeTab)];
    if (currentTab) {
      setIndicatorStyle({
        left: `${currentTab.offsetLeft}px`,
        width: `${currentTab.offsetWidth}px`,
      });
    }
  };

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="flex justify-around border-b border-dark-600 relative">
        {tabs.map((tab, index) => (
          <div
            key={tab.value}
            ref={(el) => {
              if (el) {
                tabsRef.current[index] = el;
              }
            }}
            className={`
              flex-1 px-4 py-3 cursor-pointer text-center
              text-sm font-medium transition-colors duration-200
              ${
                tab.value === activeTab
                  ? "text-foreground"
                  : "text-dark-300 hover:text-foreground"
              }
            `}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </div>
        ))}
        <div
          className="absolute bottom-0 h-[1px] bg-purple-600 transition-all duration-200"
          style={indicatorStyle}
        />
      </div>
      <div className="py-2.5">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
