'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { usePipeline } from './hooks/usePipeline';
import { submitPipeline } from './submit';

import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import TextNode from './nodes/TextNode';
import MathNode from './nodes/MathNode';
import FilterNode from './nodes/FilterNode';
import ApiNode from './nodes/ApiNode';
import LoggerNode from './nodes/LoggerNode';
import DelayNode from './nodes/DelayNode';

// Register all custom node types with React Flow
const nodeTypes = {
  InputNode,
  OutputNode,
  LLMNode,
  TextNode,
  MathNode,
  FilterNode,
  ApiNode,
  LoggerNode,
  DelayNode,
};

// Toolbar node palette config
const NODE_PALETTE = [
  { type: 'InputNode',  label: 'Input',   color: 'oklch(0.55 0.2 150)',  icon: '⤵' },
  { type: 'OutputNode', label: 'Output',  color: 'oklch(0.55 0.18 200)', icon: '⤴' },
  { type: 'LLMNode',    label: 'LLM',     color: 'oklch(0.6 0.2 270)',   icon: '◈' },
  { type: 'TextNode',   label: 'Text',    color: 'oklch(0.6 0.18 50)',   icon: 'T' },
  { type: 'MathNode',   label: 'Math',    color: 'oklch(0.6 0.2 340)',   icon: '∑' },
  { type: 'FilterNode', label: 'Filter',  color: 'oklch(0.6 0.2 70)',    icon: '⊟' },
  { type: 'ApiNode',    label: 'API',     color: 'oklch(0.6 0.18 200)',  icon: '⇅' },
  { type: 'LoggerNode', label: 'Logger',  color: 'oklch(0.6 0.15 130)',  icon: '≡' },
  { type: 'DelayNode',  label: 'Delay',   color: 'oklch(0.6 0.18 300)',  icon: '⏱' },
];

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    usePipeline();

  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Drop a node at a sensible staggered position
  const handleAddNode = useCallback(
    (type, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      addNode(type, { x: 180 + col * 260, y: 80 + row * 220 });
    },
    [addNode]
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await submitPipeline({ nodes, edges });
      setResult(data);
      setShowResult(true);
    } catch (err) {
      setError(err.message ?? 'Request failed');
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans" style={{ background: 'oklch(0.11 0.01 264)' }}>
      {/* ── Left Sidebar ── */}
      <aside
        className="flex flex-col w-56 shrink-0 border-r overflow-y-auto"
        style={{
          background: 'oklch(0.15 0.015 264)',
          borderColor: 'oklch(0.22 0.02 264)',
        }}
      >
        {/* Brand */}
        <div
          className="px-4 py-4 border-b"
          style={{ borderColor: 'oklch(0.22 0.02 264)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-bold font-mono tracking-tight"
              style={{ color: 'oklch(0.75 0.2 250)' }}
            >
              PipelineAI
            </span>
          </div>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: 'oklch(0.5 0.02 264)' }}>
            Visual workflow builder
          </p>
        </div>

        {/* Node palette */}
        <div className="px-3 py-3 flex-1">
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-2 px-1"
            style={{ color: 'oklch(0.45 0.02 264)' }}
          >
            Nodes
          </p>
          <div className="flex flex-col gap-1">
            {NODE_PALETTE.map((node, i) => (
              <button
                key={node.type}
                onClick={() => handleAddNode(node.type, i)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all group"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${node.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  className="text-base w-5 text-center shrink-0"
                  style={{ color: node.color }}
                >
                  {node.icon}
                </span>
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: 'oklch(0.75 0.02 264)' }}
                >
                  {node.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className="px-4 py-3 border-t"
          style={{ borderColor: 'oklch(0.22 0.02 264)' }}
        >
          <div className="flex justify-between">
            <span className="text-[10px] font-mono" style={{ color: 'oklch(0.45 0.02 264)' }}>
              Nodes
            </span>
            <span className="text-[10px] font-mono font-semibold" style={{ color: 'oklch(0.75 0.2 250)' }}>
              {nodes.length}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-mono" style={{ color: 'oklch(0.45 0.02 264)' }}>
              Edges
            </span>
            <span className="text-[10px] font-mono font-semibold" style={{ color: 'oklch(0.75 0.2 250)' }}>
              {edges.length}
            </span>
          </div>
        </div>
      </aside>

      {/* ── Canvas ── */}
      <main className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: 'oklch(0.6 0.2 250)', strokeWidth: 1.5 },
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="oklch(0.3 0.01 264)"
          />
          <Controls
            style={{
              background: 'oklch(0.17 0.015 264)',
              border: '1px solid oklch(0.26 0.02 264)',
              borderRadius: '0.5rem',
            }}
          />
          <MiniMap
            style={{
              background: 'oklch(0.15 0.015 264)',
              border: '1px solid oklch(0.26 0.02 264)',
            }}
            nodeColor="oklch(0.6 0.2 250)"
            maskColor="oklch(0.11 0.01 264 / 0.7)"
          />

          {/* Top-right submit panel */}
          <Panel position="top-right">
            <button
              onClick={handleSubmit}
              disabled={loading || nodes.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-mono transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: loading ? 'oklch(0.4 0.15 250)' : 'oklch(0.6 0.2 250)',
                color: 'oklch(0.98 0.005 264)',
                boxShadow: '0 0 16px oklch(0.6 0.2 250 / 0.35)',
              }}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Analyzing…
                </>
              ) : (
                <>
                  <span>▶</span>
                  Submit Pipeline
                </>
              )}
            </button>
          </Panel>

          {/* Empty state hint */}
          {nodes.length === 0 && (
            <Panel position="bottom-center">
              <p
                className="text-sm font-mono pb-10"
                style={{ color: 'oklch(0.45 0.02 264)' }}
              >
                Click a node type in the sidebar to add it to the canvas
              </p>
            </Panel>
          )}
        </ReactFlow>
      </main>

      {/* ── Result Modal ── */}
      {showResult && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'oklch(0.08 0.01 264 / 0.75)' }}
          onClick={() => setShowResult(false)}
        >
          <div
            className="rounded-2xl p-8 w-80 shadow-2xl"
            style={{
              background: 'oklch(0.17 0.015 264)',
              border: '1.5px solid oklch(0.26 0.02 264)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {error ? (
              <>
                <h2
                  className="text-base font-bold font-mono mb-3"
                  style={{ color: 'oklch(0.7 0.22 27)' }}
                >
                  Request Failed
                </h2>
                <p className="text-xs font-mono" style={{ color: 'oklch(0.7 0.22 27)' }}>
                  {error}
                </p>
              </>
            ) : (
              <>
                <h2
                  className="text-base font-bold font-mono mb-5"
                  style={{ color: 'oklch(0.75 0.2 250)' }}
                >
                  Pipeline Analysis
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Nodes',  value: result?.num_nodes, color: 'oklch(0.6 0.2 250)' },
                    { label: 'Edges',  value: result?.num_edges, color: 'oklch(0.55 0.18 200)' },
                    { label: 'Is DAG', value: result?.is_dag ? 'true' : 'false',
                      color: result?.is_dag ? 'oklch(0.6 0.2 150)' : 'oklch(0.6 0.22 27)' },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{ color: 'oklch(0.65 0.02 264)' }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-sm font-mono font-bold"
                        style={{ color }}
                      >
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={() => setShowResult(false)}
              className="mt-6 w-full py-2 rounded-lg text-xs font-mono font-semibold transition-all"
              style={{
                background: 'oklch(0.22 0.02 264)',
                color: 'oklch(0.65 0.02 264)',
                border: '1px solid oklch(0.26 0.02 264)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
