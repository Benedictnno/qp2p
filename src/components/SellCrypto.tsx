import { RootState } from "@/States/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface BuyerUserData {
  userData: {
    tonRate: number;
    usdtRate: number;
    user: string; // Assuming this is a vendor ID or identifier
  };
  loading: boolean;
}

function SellCrypto() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const {
    userData: { user,tonRate,usdtRate },
  } = useSelector(
    (state: RootState) => state.getBuyerUserData as BuyerUserData
  );

  const getWalletAddress = async () => {
    const wallet = await axios.get(
      `http://localhost:5000/api/v1/crypto/TonAddress/${user}`
    );
    setWalletAddress(wallet.data.walletAddress);
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <div>
      <div>
        <h2 className="mb-4">Vendor Selling Rates:</h2>
        <div className="flex justify-between mb-4">
          <h2>Ton: NGN {tonRate}</h2>
          <h2>USDT: NGN {usdtRate}</h2>
        </div>
      </div>
      <div className="mb-4">
        <label>I want to sell</label>
        <select
          //   value={crypto}
          name="crypto"
          //   onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        >
          <option value="TON">Toncoin (TON)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
      </div>
      <label>Amount of Ton being sent </label>
      <input
        type="number"
        name="value"
        placeholder="Amount in ton being sent"
        className="block w-full px-4 py-2 border rounded-lg"
      />
      <p>{walletAddress}</p>
      <button>I have sent it</button>
    </div>
  );
}

export default SellCrypto;
