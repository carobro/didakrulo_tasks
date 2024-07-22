import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Root Node', canAdd: false },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Nächste Frage', canAdd: true },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Nächste Frage', canAdd: true },
    position: { x: 400, y: 125 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false,
    label: 'Ja',
    type: 'straight',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: false,
    label: 'Nein',
    type: 'straight',
  },
];

const CustomNode = ({ id, data, xPos, yPos }) => {
  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ddd',
        borderRadius: 5,
        background: '#fff',
        textAlign: 'center',
      }}
    >
      <input
        type="text"
        value={data.label}
        onChange={(evt) => {
          const newLabel = evt.target.value;
          data.onLabelChange(id, newLabel);
        }}
        style={{ width: '80%', marginBottom: '10px' }}
      />
      {data.canAdd && (
        <button onClick={() => data.onAddNode(id, { x: xPos, y: yPos })}>+</button>
      )}
      <Handle type="source" position="bottom" id="a" />
      <Handle type="target" position="top" id="b" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const FlowchartEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(4);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateLabel = useCallback(
    (id, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
    },
    [setNodes]
  );

  const addNode = useCallback(
    (parentId, position) => {
      const newNodeYes = {
        id: `${nodeId}`,
        type: 'custom',
        data: { label: 'Nächste Frage', onAddNode: addNode, onLabelChange: updateLabel, canAdd: true },
        position: { x: position.x - 100, y: position.y + 100 },
      };
      const newNodeNo = {
        id: `${nodeId + 1}`,
        type: 'custom',
        data: { label: 'Nächste Frage', onAddNode: addNode, onLabelChange: updateLabel, canAdd: true },
        position: { x: position.x + 100, y: position.y + 100 },
      };
      const newEdgeYes = {
        id: `e${parentId}-${nodeId}`,
        source: parentId,
        target: `${nodeId}`,
        animated: false,
        label: 'Yes',
        type: 'straight',
      };
      const newEdgeNo = {
        id: `e${parentId}-${nodeId + 1}`,
        source: parentId,
        target: `${nodeId + 1}`,
        animated: false,
        label: 'No',
        type: 'straight',
      };

      setNodes((nds) =>
        nds.map((node) =>
          node.id === parentId
            ? { ...node, data: { ...node.data, canAdd: false } }
            : node
        ).concat(newNodeYes, newNodeNo)
      );
      setEdges((eds) => [...eds, newEdgeYes, newEdgeNo]);
      setNodeId((id) => id + 2);
    },
    [nodeId, setNodes, setEdges, updateLabel]
  );

  const exportToJson = () => {
    const graphData = {
      nodes,
      edges,
    };
    const dataStr = JSON.stringify(graphData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowchart.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '80%', height: '70vh' }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddNode: addNode, onLabelChange: updateLabel },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />

      </ReactFlow>
      <button onClick={exportToJson} style={{ position: 'absolute', bottom: 10, left: 50 }}>
        Export to JSON
      </button>
    </div>
  );
};

export default FlowchartEditor;
