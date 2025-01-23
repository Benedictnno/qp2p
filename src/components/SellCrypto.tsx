import { AppDispatch, RootState } from "@/States/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCommasToNumber } from "@/utils/formatNumbers";
import { getAllBanks } from "@/States/thunks/Banks";


interface BuyerUserData {
  userData: {
    tonRate: number;
    usdtRate: number;
    user: string; // Assuming this is a vendor ID or identifier
  };
  loading: boolean;
}

type FormData = {
  coin: string;
  sendersAddress: string;
  amount: string;
};

function SellCrypto() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [receivingCoin, setReceivingCoin] = useState<string>("");
  const [receivingBalance, setReceivingBalance] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
const dispatch: AppDispatch = useDispatch();
  const {
    userData: { user,tonRate,usdtRate },
  } = useSelector(
    (state: RootState) => state.getBuyerUserData as BuyerUserData
  );

 const schema: ZodType<FormData> = z.object({
    coin: z.string(),
    sendersAddress: z.string(),
    amount: z.string(),
  });

   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
    });

     const handleCopy = (text: string) => {
       navigator.clipboard.writeText(text).then(() => {
         setCopied(true);
         setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
       });
     };

  const getWalletAddress = async () => {
    const wallet = await axios.get(
      `http://localhost:5000/api/v1/crypto/TonAddress/${user}`
    );
    
    setWalletAddress(wallet.data.walletAddress);
  };


    const submitData = (data: FormData) => {
      console.log(data);
      if (data.coin === "TON") {
        setReceivingBalance(tonRate*Number(data.amount))
        
      } else {
        setReceivingBalance(usdtRate * Number(data.amount));
        
      }
      setReceivingCoin(data.coin)
    }
   
    
    useEffect(() => {
      getWalletAddress();
     dispatch(getAllBanks())
  }, []);


  const { allBanks } = useSelector((state: RootState) => state.AllBanks);

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
          required
          {...register("coin")}
          className="block w-full px-4 py-2 border rounded-lg"
        >
          <option value="TON">Toncoin (TON)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
      </div>
      <label>Amount of Ton being sent </label>
      <input
        type="number"
        required
        {...register("amount")}
        placeholder="eg 5.4 ton"
        className="block w-full px-4 py-2 border rounded-lg"
      />

      <label>Wallet address you will be sending from </label>

      <input
        type="text"
        required
        {...register("sendersAddress")}
        placeholder="wallet address you'll sending from "
        className="block w-full px-4 py-2 border rounded-lg"
      />

      <p>You'll receive {addCommasToNumber(receivingBalance)} NGN</p>
      <div className="mb-4">
        <label>Select Bank</label>
        <select
          required
          {...register("coin")}
          className="block w-full px-4 py-2 border rounded-lg"
        >
          {allBanks.map((bank: any) => {
            return (
              <option value={bank.code}>
                {bank.name} ({bank.slug})
              </option>
            );
          })}
        </select>
      </div>

      <input
        type="number"
        required
        {...register("sendersAddress")}
        placeholder="your Account number"
        className="block w-full px-4 py-2 border rounded-lg"
      />

      <p onClick={() => handleCopy(walletAddress)}>
        {walletAddress} <span>{copied ? "Copied!" : "Copy"}</span>
      </p>
      <button onClick={handleSubmit(submitData)}>I have sent it</button>
    </div>
  );
}

export default SellCrypto;
