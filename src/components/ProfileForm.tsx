import React, { useState } from "react";
import Autocomplete from "./Autocomplete";

interface URL {
  id: number;
  url: string;
}

const ProfileForm: React.FC = () => {
  const [urls, setUrls] = useState<URL[]>([]);
  const [newUrl, setNewUrl] = useState("");

  const handleAddUrl = () => {
    if (newUrl.trim() !== "") {
      setUrls([...urls, { id: Date.now(), url: newUrl }]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (id: number) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  return (
    <form className="p-6">
      {/* Username */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Business Name</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter username"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Account Number</label>
        <input
          required
          minLength={11}
          maxLength={11}
          type="number"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter username"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Account Name</label>
        <p>Name that matches the Bank account</p>
        <input
          required
          minLength={11}
          maxLength={11}
          type="number"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter username"
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Bank</label>
        <div className="">
          <Autocomplete />
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter your bio"
        />
      </div>

      {/* URLs */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">URLs</label>
        {urls.map((url) => (
          <div key={url.id} className="flex items-center space-x-3 mb-2">
            <span className="text-sm">{url.url}</span>
            <button
              type="button"
              onClick={() => handleRemoveUrl(url.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Add a URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add URL
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded-md"
      >
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
