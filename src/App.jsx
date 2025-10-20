import React, { useState } from 'react';


// THIS IS YOUR CONFIGURATION FILE - Easy to edit without touching code
// Grid and lane layout constants
const LANE_HEIGHT = 100; // pixels per swimlane
const GRID_COLUMN_WIDTH = 250; // width per node column
const LANE_NAME_COLUMN_WIDTH = 160; // left-most column width for lane names
const PROCESS_CONFIG = {
  swimLanes: [
    { id: 'lane1', label: 'Sales', color: '#3b82f6' },
    { id: 'lane2', label: 'Engineering', color: '#10b981' },
    { id: 'lane3', label: 'Manufacturing', color: 'red' },

  ],
  nodes: [
    {
      id: '1',
      swimLane: 'lane1',
      label: 'Start',
      grid: { col: 1 },
      modalData: {
        title: 'Start Node',
        description: 'This is a minimal starting node for the flow.',
        roles: ['Owner'],
        duration: 'N/A',
        deliverables: ['N/A'],
        links: []
      }
    },
    {
      id: '2',
      swimLane: 'lane2',
      label: 'Next',
      grid: { col: 2 },
      modalData: {
        title: 'Next Step',
        description: 'Second node in the same swimlane for demonstration.',
        roles: ['Owner'],
        duration: 'N/A',
        deliverables: ['N/A'],
        links: []
      }
    },
    {
      id: '3',
      swimLane: 'lane2',
      label: 'Last',
      grid: {col: 3 },
    },
    {
      id: '4',
      swimLane: 'lane3',
      label: 'Last',
      grid: {col: 4 },
    }
  ],
  edges: []
};

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '15px 25px',
        borderRadius: '8px',
        background: data.color,
        color: 'white',
        border: '2px solid white',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.2s',
        minWidth: '150px',
        maxWidth: '150px',
        textAlign: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}
    >
      {data.label}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// Modal Component
const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>{data.title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              width: '32px',
              height: '32px',
              lineHeight: '32px'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Description</h3>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{data.description}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Duration</h3>
          <p style={{ color: '#6b7280' }}>{data.duration}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Roles Involved</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.roles.map((role, idx) => (
              <span
                key={idx}
                style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Deliverables</h3>
          <ul style={{ color: '#6b7280', lineHeight: '1.8', marginLeft: '20px' }}>
            {data.deliverables.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Related Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  borderRadius: '6px',
                  display: 'inline-block',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
              >
                {link.text} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ProcessFlow = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxCol = PROCESS_CONFIG.nodes.reduce((max, n) => {
    const c = n.grid?.col ?? 1;
    return c > max ? c : max;
  }, 1);

  const getNodesAt = (laneId, col) => {
    return PROCESS_CONFIG.nodes.filter(n => n.swimLane === laneId && (n.grid?.col ?? 1) === col);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 5
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1f2937' }}>
          Company Process Flow - Cradle to Grave
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
          Click any step to view detailed information
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `${LANE_NAME_COLUMN_WIDTH}px repeat(${maxCol}, ${GRID_COLUMN_WIDTH}px)`,
          rowGap: '24px',
          columnGap: '24px',
          padding: '20px 20px 40px 20px'
        }}
      >
        {/* Header row for columns (blank cell at [0,0]) */}
        <div />
        {Array.from({ length: maxCol }).map((_, idx) => (
          <div key={`col-header-${idx}`} style={{ height: '40px' }} />
        ))}

        {/* Rows */}
        {PROCESS_CONFIG.swimLanes.map((lane) => (
          <React.Fragment key={lane.id}>
            {/* Lane name cell */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: lane.color,
              color: 'white',
              borderRadius: '6px',
              padding: '12px',
              fontWeight: 600,
              height: `${LANE_HEIGHT}px`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>{lane.label}</div>

            {Array.from({ length: maxCol }).map((_, colIdx) => {
              const col = colIdx + 1;
              const nodesHere = getNodesAt(lane.id, col);
              return (
                <div
                key={`${lane.id}-${col}`}
                style={{
                  height: '100%',  // This ensures the cell takes up the full height of the grid row
                  display: 'flex', // Use flex to center the node inside
                  alignItems: 'center',  // Vertically center the node
                  justifyContent: 'center', // Horizontally center the node
                }}
              >
                {nodesHere.map((n) => (
                  <div key={n.id} onClick={() => { setModalData(n.modalData); setIsModalOpen(true); }}>
                    <CustomNode data={{ label: n.label, color: lane.color }} />
                  </div>
                ))}
              </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </div>
  );
};

export default ProcessFlow;