import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const mainNodes = useSelector((state: RootState) => state.flow.nodes);
  const mainEdges = useSelector((state: RootState) => state.flow.edges);

  const handleSaveFlow = () => {
    if (mainNodes.length === 0 || mainEdges.length === 0) {
      toast.error("Cannot Save flow", {
        position: "top-center"
      });
      return;
    }

    if ((mainNodes.length - mainEdges.length) !== 1) {
      toast.error("Cannot Save flow", {
        position: "top-center"
      });
      return;
    }

    toast.success("Flow Saved", {
      position: "top-center"
    })
  }

  return (
    <nav className="w-full h-12 bg-gray-100 flex items-center justify-end px-8">
      <button 
        className={`border-[1px] rounded-lg py-1 px-4 border-blue-400 text-blue-600`}
        onClick={handleSaveFlow}
      >
        Save Changes
      </button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </nav>
  )
}

export default Navbar