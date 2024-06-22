import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FcSms } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSelectedNodes }  from "../../features/flow/flowSlice";

interface TextMessageNodeProps {
  data: {
    name: string;
    description: string;
    emoji: string;
    nodeId: string;
  }
}


const TextMessageNode = ({ data }: TextMessageNodeProps) => {
  const dispatch = useDispatch();
  
  const handleNodeSelect = () => {
    dispatch(setSelectedNodes(data.nodeId))
  }

  return (
    <div onClick={handleNodeSelect} role="button" className="shadow-md bg-white border-[1px] border-stone-400 rounded-lg overflow-hidden hover:border-stone-800">
      <div className="flex flex-col text-xs w-56">
        <div className="bg-green-200 p-[2px] font-bold flex gap-2 justify-between items-baseline px-2">
          <div className="flex items-center gap-2">
            <div>
              <FcSms size={10} />
            </div>
            <p>{data.name}</p>
          </div>
          <div>
            <BsWhatsapp size={10} />
          </div>
        </div>
        <div className="p-2">
          <p>{data.description}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full bg-gray-700" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full bg-gray-700" />
    </div>
  )
}

export default memo(TextMessageNode);