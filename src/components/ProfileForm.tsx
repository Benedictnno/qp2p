import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface URL {
  id: number;
  url: string;
}

type FormData = {
  businessName: string;
  accountNumber: string;
  accountName: string;
  Bank: string;
  confirmPassword: string;
};


const ProfileForm: React.FC = () => {
  const [urls, setUrls] = useState<URL[]>([]);
  const [newUrl, setNewUrl] = useState("");
 const schema: ZodType<FormData> = z
    .object({
      businessName: z.string().min(2).max(30),
      accountNumber: z.string().min(2).max(20),
      accountName: z.string().min(2),
      Bank: z.string().min(3),
      confirmPassword: z.string().min(6).max(15),
    })
    

    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleAddUrl = () => {
    if (newUrl.trim() !== "") {
      setUrls([...urls, { id: Date.now(), url: newUrl }]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (id: number) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

    const submitData = (data: FormData) => {
  //  dispatch(LoginUser({ email: data.email, password: data.password }));
    console.log("Submitted data:");
    
    // if (error === "Unauthorized") {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "incorrect email or password",
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    // }
    // if (success) {
    //   navigate("/");
    // }
  };

  return (
    <form className="p-6">
      {/* Username */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Business Name</label>
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2"
          id="businessName"
           {...register("businessName")}
          placeholder="Enter Business Name"
        />
        <p>{errors?.businessName?.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Account Number</label>
        <input
          required
           id="accountNumber"
           {...register("accountNumber")}
          minLength={11}
          maxLength={11}
          type="number"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Account Number"
        />
        <p>{errors?.accountNumber?.message}</p>

      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Account Name</label>
        <p>Name that matches the Bank account</p>
        <input
          required
           id="accountName"
           {...register("accountName")}
          minLength={11}
          maxLength={11}
          type="text"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter username"
        />
        <p>{errors?.accountName?.message}</p>

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
         onClick={handleSubmit(submitData)}
      >
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
