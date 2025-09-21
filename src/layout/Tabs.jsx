import React, { useState, useRef, useEffect } from "react";

const Tabs = ({ tabs, defaultActive = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <div className="mt-6 relative">
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b relative">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`py-2 px-6 rounded-t-lg font-medium text-gray-500`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.name}
          </button>
        ))}

        {/* Sliding underline */}
        <span
          className="absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300"
          style={{
            left: underlineStyle.left || 0,
            width: underlineStyle.width || 0,
          }}
        />
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl p-4 shadow mt-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
