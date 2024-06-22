import { ReactNode, useEffect, useState } from "react";

interface NodeProps {
  name: string,
  icon: ReactNode;
  id: string;
  position: number;
  type: string;
}

const NodeType = ({ name, icon, type }: NodeProps) => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsGrabbing(true);
  }

  const handleMouseUp = () => {
    setIsGrabbing(false);
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [])

  const onDragStart = (event: React.DragEvent<HTMLElement>, nodeType: string) => {
    event.dataTransfer.setData("application/x-chatbot-flow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <aside
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`border-[1px] border-blue-400 w-32 h-20 flex items-center flex-col pt-3
        ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}
      `}
      draggable
      onDragStart={(e) => onDragStart(e, type)}
    >
      {icon}
      <p className="text-blue-400">
        {name}
      </p>
    </aside>
      
  )
}

export default NodeType