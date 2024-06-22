import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { 
  Background, 
  BackgroundVariant, 
  Connection, 
  Controls, 
  MiniMap, 
  Node, 
  ReactFlowInstance, 
  addEdge, 
  useEdgesState, 
  useNodesState 
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import 'reactflow/dist/style.css';
import TextMessageNode from "./nodes/TextMessageNode";
import { nanoid } from "nanoid";
import { addTextNode, setTextEdges } from "../features/flow/flowSlice";

const nodeTypes = {
  textMessage: TextMessageNode
}

const ChatbotFlow = () => {
  const mainNodes = useSelector((state: RootState) => state.flow.nodes);
  const mainEdges = useSelector((state: RootState) => state.flow.edges);
  const selectedNodeId = useSelector((state: RootState) => state.flow.selectedNodeId);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [nodes, setNodes , onNodesChange] = useNodesState(mainNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mainEdges);
 
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);
        dispatch(setTextEdges(newEdges));
        return newEdges;
      });
    },
    [dispatch, setEdges]
  );

  const onInit = (_reactFlowInstance: ReactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.effectAllowed = "move";
  }

  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    const type = event.dataTransfer.getData("application/x-chatbot-flow");
    

    const position = reactFlowInstance && reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    })

    const newNodeId: string = nanoid();

    const newNode: Node = {
      id: newNodeId,
      type,
      data: { name: 'Text Message', description: 'This is a message', emoji: '😎', nodeId: newNodeId },
      position: position!
    }

    setNodes((nds: Node[]) => nds.concat(newNode))
    dispatch(addTextNode(newNode))
  }

  useEffect(() => {
    const updateNodeDescription = (id: string | null) => {
      if (!id) {
        return;
      }

      setNodes((nds) => {
        return nds.map((node: Node) => {
          if (node.id === id) {
            const mainNode = mainNodes.find((n) => n.id === id);
            if (mainNode) {
              return { ...node, data: { ...node.data, description: mainNode.data.description } }
            }
          }
          return node;
        })
      })
    }
    updateNodeDescription(selectedNodeId)
  }, [mainNodes])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      ref={reactFlowWrapper}
      onInit={onInit}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}

export default ChatbotFlow