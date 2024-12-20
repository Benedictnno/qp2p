import { Button } from "@/components/ui/button";
import { Chart } from "@/utils/Chart";
import { useState } from "react";
// import { useToast } from "@/components/hooks/use-toast";

const Dashboard = () => {
 const [copied, setCopied] = useState<boolean>(false);
   const handleCopy = () => {
     navigator.clipboard
       .writeText("iuygvbnmlughbnm,.mnsskjjjjjjsssssssssssss")
       .then(() => {
         setCopied(true);
         setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
       });
   };
  const dashBoardCardStyle= "m-3 font-[' Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'] font-semibold text-center"
  return (
    <>
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
        <div className={`${dashBoardCardStyle}`}>
          <p>Fiat Balance</p>
          <h2>NGN 200,000</h2>
        </div>
        <Button variant="outline" className="w-10/12 self-center">
          Add Funds
        </Button>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
        <div className={`${dashBoardCardStyle}`}>
          <p>Ton coin Balance</p>

          <h2> 10 Ton </h2>
        </div>
        <Button
          variant="outline"
          className="w-10/12 self-center"
          onClick={handleCopy}
        >
          <p className="w-20 truncate">
            iuygvbnmlughbnm,.mnsskjjjjjjsssssssssssss
          </p>
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
          onClick={handleCopy}
        >
          <p className="w-20 truncate">
            iuygvbnmlughbnm,.mnsskjjjjjjsssssssssssss
          </p>
          <span>{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center">
        <div className={`${dashBoardCardStyle}`}>
          <p>Number of fiat transactions</p>
          <h2> 100</h2>
        </div>
        <div className="flex justify-evenly w-full align-baseline">
          <h3>50 sells</h3>
          <h3>50 Buys </h3>
        </div>
      </div>
    </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
      <Chart/>
      
      </div>
    </>
  );
};

export default Dashboard;
