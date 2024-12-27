import axios from "axios";
import { useEffect, useState } from "react";
import { DateFormater } from '@/utils/Date.tsx'
function TransactionHistory() {
  const [history, setHistory] = useState([]);

  async function get() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/transactions", {
        withCredentials: true,
      });
      console.log(res.data.history);
      setHistory(res.data.history);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  }


  useEffect(() => {
    get();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Sender's Name</th>
            <th scope="col" className="px-6 py-3">Token</th>
            <th scope="col" className="px-6 py-3">Quantity</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Fiat Amout (NGN)</th>
            <th scope="col" className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            history.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4">{item?.token || "N/A"}</td>
                <td className="px-6 py-4">{item?.quantity || "N/A"}</td>
                <td className="px-6 py-4">{item?.status || "N/A"}</td>
                <td className="px-6 py-4">{item?.amount || "N/A"}</td>
                <td className="px-6 py-4">{Date(item?.createdAt) || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
