import axios from "axios";
function TransactionHistory() {
    async function get() {
        const res = await axios.get("http://localhost:5000/api/v1/transactions") 
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    }

    useEffect(() => {
      get()
    
      
    }, [])
    
  return (
    <div>TransactionHistory


    </div>
  )
}

export default TransactionHistory