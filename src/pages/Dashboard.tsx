import { Button } from "@/components/ui/button";
import { Chart } from "@/utils/Chart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/States/store";
import { userBalances } from "@/States/thunks/balance";
import { Link } from "react-router-dom";
import { transactions } from "@/States/thunks/transactions";
import { TonAddress } from "@/States/thunks/CryptoDetails";

const Dashboard = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const { fiatBalance,tonBalance } = useSelector((state: RootState) => state.userBalances);

  const handleCopy = (text:string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
  };

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
      //  const timeout = setTimeout(() => {
    dispatch(userBalances());
    dispatch(TonAddress());
    //  }, 5000);

     const fetchData = async () => {
          try {

            dispatch(transactions());
          } catch (error) {
            console.error("Error in fetchData:", error);
          }
        };
    
        fetchData();
    // return () => clearTimeout(timeout);
  }, []);

  const { history, error, success, loading } = useSelector(
  (state: RootState) => state.transactions
);
  const { walletAddress } = useSelector(
    (state: RootState) => state.tonAddress
  );

  

  const currentDate = new Date();
const todaysTransactions = history.filter((transaction) => {
  const transactionDate = new Date(transaction.createdAt);
  return (
    transactionDate.getFullYear() === currentDate.getFullYear() &&
    transactionDate.getMonth() === currentDate.getMonth() &&
    transactionDate.getDate() === currentDate.getDate()
  );
});

const sentCount = todaysTransactions.filter((t) => t.status === "sent").length;
const receivedCount = todaysTransactions.filter((t) => t.status === "Received").length;
console.log("todays transactions" + todaysTransactions.length);
console.log("sent transactions" + sentCount);
console.log("receivedCount transactions" + receivedCount);


  const dashBoardCardStyle =
    "m-3 font-[' Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'] font-semibold text-center";
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
          <div className={`${dashBoardCardStyle}`}>
            <p>Fiat Balance</p>
            <h2>NGN {fiatBalance}</h2>
          </div>
          <Button variant="outline" className="w-10/12 self-center">
          <Link to={'fund-wallet'}>
          
            Add Funds
          </Link>
          </Button>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
          <div className={`${dashBoardCardStyle}`}>
            <p>Ton coin Balance</p>

            <h2> {tonBalance} Ton </h2>
          </div>
          <Button
            variant="outline"
            className="w-10/12 self-center"
            onClick={()=> handleCopy(walletAddress)}
          >
            <p className="w-20 truncate">{walletAddress}</p>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
          <div className={`${dashBoardCardStyle}`}>
            <p>Solana Balance</p>
            <h2> 10 Sol</h2>
          </div>
          <Button
            variant="outline"
            className="w-10/12 self-center"
            onClick={()=>handleCopy}
          >
            <p className="w-20 truncate">
              iuygvbnmlughbnmmnsskjjjjjjsssssssssssss
            </p>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
        <Link
          to="/user/transactions"
          className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center"
        >
          <div className={`${dashBoardCardStyle}`}>
            <p>Number of fiat transactions transactions Today</p>
            <h2> {todaysTransactions.length}</h2>
          </div>
          <div className="flex justify-evenly w-full align-baseline">
            <h3>{sentCount} sells</h3>
            <h3>{receivedCount} Buys </h3>
          </div>
        </Link>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
