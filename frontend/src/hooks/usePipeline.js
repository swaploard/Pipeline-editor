import { useCallback, useState } from 'react';
import { addEdge, useEdgesState, useNodesState } from 'reactflow';

const INITIAL_NODES = [];
const INITIAL_EDGES = [];

let nodeIdCounter = 1;

function generateId(type) {
  return `${type}-${nodeIdCounter++}`;
}

/**
 * Central hook managing the React Flow pipeline state.
 * Exposes nodes, edges, connection handler, and a factory to add nodes.
 */
export function usePipeline() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (type, position = { x: 200, y: 200 }) => {
      const id = generateId(type);
      const newNode = {
        id,
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  };
}
