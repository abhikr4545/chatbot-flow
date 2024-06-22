import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setSelectedNodes, updateNodeDescription } from "../features/flow/flowSlice";
import { FaArrowLeft } from "react-icons/fa6";
import { Node } from "reactflow";
import { useEffect, useState } from "react";

const SettingPanel = () => {
  const nodeId = useSelector((state: RootState) => state.flow.selectedNodeId)!;
  const mainNodes = useSelector((state: RootState) => state.flow.nodes);
  const [nodeMessage, setNodeMessage] = useState<string>("")

  const currentNode = mainNodes.find((node: Node) => nodeId === node.id);

  useEffect(() => {
    setNodeMessage(currentNode?.data.description)
  }, [nodeId])

  const dispatch = useDispatch();

  const handleHideSettingPanel = () => {
    dispatch(setSelectedNodes(null))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentDescrition = e.target.value;
    setNodeMessage(currentDescrition)
    dispatch(updateNodeDescription({id: nodeId, description: currentDescrition}))
  }

  return (
    <div 
      className={`bg-white h-[calc(100vh-48px)] w-full border-gray-500 absolute top-0 pt-2 
      ${nodeId  ? "left-0" : "left-80"}`}
    >
      <div className="flex items-center gap-24 px-2 border-b-2 py-2">
        <div className="cursor-pointer" onClick={handleHideSettingPanel}>
          <FaArrowLeft size={12} />
        </div>
        Message
      </div>
      <div className="px-2 py-4 border-b-2 border-gray-200">
        <label htmlFor="message" className="block mb-2 text- font-medium text-gray-900">Text</label>
        <textarea onChange={handleDescriptionChange} value={nodeMessage} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
    </div>
  )
}

export default SettingPanel