import axios from "axios";
import Modal from "./Model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "console";

function LogOut() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();
log('logout')
  const verify = async () => {
    await axios.post(`http://localhost:5000/logout`);
    sessionStorage.removeItem("user");
    // navigate("/login");
  };
verify();
//   return (
//     <Modal isOpen={true} >
//       <h2 className="text-xl font-semibold mb-4">Hello from QP2P</h2>
//       <p className="text-gray-600 mb-4">Are you sure u want to Log Out ?</p>
//       <button
//         onClick={() => {
//           verify(), setIsModalOpen(false), navigate("/login");
//         }}
//         className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//       >
//         Log out
//       </button>
//     </Modal>
//   );
}

export default LogOut;
