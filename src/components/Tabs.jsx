import { useState } from 'preact/hooks';
import { tabs } from '../scripts/helpers/content';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  return (
    <div className="us-container">
      <div className="tabs">
        <div className="tab-cards">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab-card ${activeTab === index ? 'active' : ''} ${index === 0 ? 'first' : ''}`}
              onClick={() => toggleTab(index)}
            >
              <div className="tab-card-inner">
                <div className="tab-card-front">
                  <div className="tab-icon-circle">
                    {tab.icon}
                  </div>
                  <div className="tab-name">
                    {tab.label}
                  </div>
                </div>
                <div className="tab-card-back">
                  <div className="tab-content">
                    {tab.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
