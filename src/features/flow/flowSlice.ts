import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Edge, Node } from "reactflow";

export interface FlowState {
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string | null;
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null
} 

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addTextNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setTextEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addTextNodeEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
    setSelectedNodes: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload
    },
    updateNodeDescription: (state, action: PayloadAction<{ id: string, description: string }>) => {
      const node = state.nodes.find(node => node.id === action.payload.id);
      if (node) {
        node.data.description = action.payload.description;
      }
    },
  }
})

export const { setNodes, addTextNode, addTextNodeEdge, setSelectedNodes, updateNodeDescription, setTextEdges } = flowSlice.actions;
export default flowSlice.reducer;