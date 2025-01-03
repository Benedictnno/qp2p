import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";

const App: React.FC = () => {
  const tabs = ["Profile", "Set Token Sell Rate", "Your Link", "Notifications", "Display"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
const sessionUser = sessionStorage.getItem("user");
  const { user } = sessionUser ? JSON.parse(sessionUser) : null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg">
        <header className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 text-sm font-medium ${
                activeTab === tab
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </header>

        <div className="p-6">
          {activeTab === "Profile" && <ProfileForm />}
          {activeTab === "Set Token Sell Rate" && (
            <SetTokenRate label="Account Field" />
          )}
          {activeTab === "Your Link" && <YourLink userId={user.id} />}
          {activeTab === "Notifications" && (
            <DemoFormField label="Notifications Field" />
          )}
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

const YourLink: React.FC<{ userId: string }> = ({ userId }) => (
  <div>
    <label className="block text-sm font-medium mb-2">Access Link</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      value={`http://localhost:5174/profiles/${userId}`}
      placeholder={`Enter`}
    />
  </div>
);
const SetTokenRate: React.FC<{ label: string }> = ({ label }) => (
  <div>
    <label className="block text-sm font-medium mb-2"> Set Ton Price (per 1 Token)</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    <label className="block text-sm font-medium mb-2">Set Usdt Price (per 1 Token)</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    <label className="block text-sm font-medium mb-2">Set Solana Price (per 1 Token)</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default App;
