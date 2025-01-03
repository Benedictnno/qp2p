import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";

const App: React.FC = () => {
  const tabs = ["Profile", "Account", "Appearance", "Notifications", "Display"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg">
        <header className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 text-sm font-medium ${
                activeTab === tab ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </header>

        <div className="p-6">
          {activeTab === "Profile" && <ProfileForm />}
          {activeTab === "Account" && <DemoFormField label="Account Field" />}
          {activeTab === "Appearance" && <DemoFormField label="Appearance Field" />}
          {activeTab === "Notifications" && <DemoFormField label="Notifications Field" />}
          {activeTab === "Display" && <DemoFormField label="Display Field" />}
        </div>
      </div>
    </div>
  );
};

const DemoFormField: React.FC<{ label: string }> = ({ label }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default App;
