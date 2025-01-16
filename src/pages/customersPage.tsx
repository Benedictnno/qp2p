import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../utils/Loader";
import Modal from "../utils/Model";
import { getBuyerUserData } from "../States/thunks/getBuyerUserData";
import {
  updateFormData,
  verifySendersWallet,
} from "../States/thunks/verifySendersWallet";
import { RootState, AppDispatch } from "../States/store"; // Adjust the path to match your setup


// Define types for the form data
interface FormData {
  name: string;
  email: string;
  value: number | string;
  Phone: string;
  customersAddress: string;
  crypto: string;
}


interface BuyerUserData {
  userData: {
    tonRate: number;
    usdtRate: number;
    user: string; // Assuming this is a vendor ID or identifier
  },loading:boolean
}

interface VerifyWalletState {
  formData: FormData;
  success: boolean;
  loading: boolean;
  error: { error: string } | null;
}

const SingleProfilePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { profilesId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  // Environment variables
  const publicKey =
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_1234567890";
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Redux selectors
  const { userData, loading } = useSelector(
    (state: RootState) => state.getBuyerUserData as BuyerUserData
  );
  const {
    formData,
    success: verified,
    loading: loadingVerified,
    error,
  } = useSelector(
    (state: RootState) => state.verifyWallet as VerifyWalletState
  );

  // Extract fields from formData
  const { email, value, Phone, name, customersAddress, crypto }: FormData =
    formData;

  // Handle input changes with type safety
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      updateFormData({ [name]: name === "value" ? Number(value) : value })
    );
  };

  // Verify if the entered value is valid
  const verifySend = (): { msg: string; success: boolean } => {
    if (value && +value < userData?.user?.usdtRate) {
      return { msg: "Amount cannot be less than 1 USDT", success: false };
    }
    return { msg: "Good to go", success: true };
  };

  const vendorWalletId = userData?.user?.user;
  const verifyData = { customersAddress, value: Number(value), vendorWalletId };

  // Fetch buyer user data on component mount
  useEffect(() => {
    if (profilesId) {
      dispatch(getBuyerUserData(profilesId));
    }
  }, [dispatch, profilesId]);

  // Verify sender's wallet whenever required fields are updated
  useEffect(() => {
    if (customersAddress && value && vendorWalletId) {
      dispatch(verifySendersWallet(verifyData));
    }
  }, [dispatch, customersAddress, value, vendorWalletId]);

  // Show modal if there's an error
  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);

  // Handle payment logic
  const payment = async (amount: number): Promise<void> => {
    const quantity = amount / userData?.user?.tonRate;

    try {
      await axios.post(`${API_BASE_URL}/api/v1/fiat/fund`, {
        amt: amount,
        user: vendorWalletId,
        email,
        name,
        token: crypto,
        quantity,
      });

      await axios.post(`${API_BASE_URL}/api/v1/crypto/send`, {
        to: customersAddress,
        value: quantity,
        user: { _id: vendorWalletId },
      });
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  // Paystack configuration
  const componentProps = {
    email,
    amount: Number(value) * 100, // Convert to kobo
    metadata: { name, Phone },
    publicKey,
    text: "Pay Now",
    onSuccess: () => payment(Number(value)),
    onClose: () =>
      alert("Transaction incomplete. Please complete the transaction."),
  };

  // Store verification results to avoid redundant calls
  const verificationResult = verifySend();

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 font-bold text-lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <button className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1 px-4">
              Buy Crypto
            </button>
            <button className="text-gray-500 font-medium pb-1 px-4 hover:text-blue-500">
              Sell Crypto
            </button>
          </div>

          {/* Vendor Rates */}
          <h2 className="mb-4">Vendor Selling Rates:</h2>
          <div className="flex justify-between mb-4">
            <h2>Ton: NGN {userData?.user?.tonRate}</h2>
            <h2>USDT: NGN {userData?.user?.usdtRate}</h2>
          </div>

          {/* Form Fields */}
          <div className="mb-4">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label>I want to buy</label>
            <select
              value={crypto}
              name="crypto"
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            >
              <option value="TON">Toncoin (TON)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>

          <div className="mb-4">
            <label>Amount</label>
            <input
              type="number"
              name="value"
              value={value}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            />
            <p
              className={
                verificationResult.success ? "text-green-500" : "text-red-500"
              }
            >
              {verificationResult.msg}
            </p>
          </div>

          <div className="mb-4">
            <label>Your Wallet Address</label>
            <input
              type="text"
              name="customersAddress"
              value={customersAddress}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label>Phone Number</label>
            <input
              type="text"
              name="Phone"
              value={Phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {!verificationResult.success && !verified ? (
            <Loader />
          ) : (
            <PaystackButton
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
              {...componentProps}
            />
          )}
        </>
      )}

      {/* Error Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Error"
      >
        <p>{error?.error}</p>
      </Modal>
    </div>
  );
};

export default SingleProfilePage;
