import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/States/store";
import { useDispatch, useSelector } from "react-redux";
import { ProfilesDetails } from "@/States/thunks/profileDetails";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
// interface URL {
//   id: number;
//   url: string;
// }

type FormData = {
  businessName: string;
  accountNumber: string;
  accountName: string;
  usdt: string;
  ton: string;
  solana: string;
  // Bank: string;
};

const ProfileForm: React.FC = () => {
  // const [urls, setUrls] = useState<URL[]>([]);
  // const [newUrl, setNewUrl] = useState<string>("");
  const [Bank, setBank] = useState("");
  const schema: ZodType<FormData> = z.object({
    businessName: z.string().min(2).max(30),
    accountNumber: z.string().min(2).max(20),
    accountName: z.string().min(2),
    usdt: z.string().min(2),
    ton: z.string().min(2),
    solana: z.string().min(2),
    // Bank: z.string().min(3),
  });
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // const handleAddUrl = () => {
  //   if (newUrl.trim() !== "") {
  //     setUrls([...urls, { id: Date.now(), url: newUrl }]);
  //     setNewUrl("");
  //   }
  // };

  // const handleRemoveUrl = (id: number) => {
  //   setUrls(urls.filter((url) => url.id !== id));
  // };
  const { success, error } = useSelector(
    (state: RootState) => state.profileDetails
  );
 const { toast } = useToast();

  const submitData = (data: FormData) => {
    dispatch(
      ProfilesDetails({
        businessName: data.businessName,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bankName: Bank,
        tonRate: data.ton,
        usdtRate: data.usdt,
      })
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "ERROR , go through the form before submitting",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    if (success) {
      toast({
        variant: "default",
        title: "Success",
        description: "Your Details has ben successfully saved",
        action: <ToastAction altText="Try again">Done</ToastAction>,
      });
    }
  };

  return (
    <>
      <form className="p-6">
        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Business Name
          </label>
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
          <label className="block text-sm font-medium mb-2">
            Account Number
          </label>
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
            <Autocomplete setBank={setBank} />
          </div>
        </div>

        {/* set token price */}

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {" "}
            Set Ton Price (per 1 Token)
          </label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            {...register("ton")}
            placeholder={`Enter token price`}
          />
          <p>{errors?.ton?.message}</p>

          <label className="block text-sm font-medium mb-2">
            Set Usdt Price (per 1 Token)
          </label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            {...register("usdt")}
            placeholder={`Enter token price`}
          />
          <label className="block text-sm font-medium mb-2">
            Set Solana Price (per 1 Token)
          </label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            {...register("solana")}
            placeholder={`Enter token price`}
          />
        </div>
        {/* Bio */}
        {/* <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter your bio"
        />
      </div>

       {URLs }
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
      </div> */}

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-md"
          onClick={handleSubmit(submitData)}
        >
          Save
        </button>
      </form>

          {(error || success) && <Toaster />}
      
    </>
  );
};

export default ProfileForm;
