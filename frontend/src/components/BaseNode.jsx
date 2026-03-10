import { Handle, Position } from 'reactflow';

/**
 * BaseNode — the shared skeleton for all pipeline nodes.
 *
 * Props:
 *   title       string          – node header label
 *   accentColor string          – CSS color for the left border and title
 *   icon        ReactNode       – optional icon shown next to the title
 *   inputs      string[]        – list of input handle ids (left side)
 *   outputs     string[]        – list of output handle ids (right side)
 *   children    ReactNode       – custom body content
 *   selected    bool            – passed automatically by React Flow
 */
export default function BaseNode({
  title,
  accentColor = '#6366f1',
  icon,
  inputs = [],
  outputs = [],
  children,
  selected,
}) {
  return (
    <div
      className="relative rounded-xl shadow-lg transition-all duration-150 min-w-[200px]"
      style={{
        background: 'oklch(0.17 0.015 264)',
        border: `1.5px solid ${selected ? accentColor : 'oklch(0.26 0.02 264)'}`,
        boxShadow: selected
          ? `0 0 0 2px ${accentColor}44, 0 8px 32px #0008`
          : '0 4px 24px #0006',
      }}
    >
      {/* Colored left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
        style={{ background: accentColor }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 pt-3 pb-2 border-b"
        style={{ borderColor: 'oklch(0.26 0.02 264)' }}
      >
        {icon && (
          <span className="text-sm" style={{ color: accentColor }}>
            {icon}
          </span>
        )}
        <span
          className="text-xs font-semibold uppercase tracking-wider font-mono"
          style={{ color: accentColor }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3">{children}</div>

      {/* Input handles — left side */}
      {inputs.map((id, idx) => (
        <div key={id}>
          <Handle
            type="target"
            position={Position.Left}
            id={id}
            style={{
              top: `${((idx + 1) / (inputs.length + 1)) * 100}%`,
              background: accentColor,
              border: '2px solid oklch(0.13 0.01 264)',
              width: 10,
              height: 10,
            }}
          />
          <div style={{
            top: `${((idx + 1) / (inputs.length + 1)) * 100}%`,
          }} className="absolute left-0 -ml-3 flex justify-end">
            <span
              className="absolute text-[10px] font-mono pointer-events-none right-full"
              style={{
                top: `calc(${((idx + 1) / (inputs.length + 1)) * 100}% - 8px)`,
                color: 'oklch(0.55 0.02 264)',
              }}
            >
              {id}
            </span>
          </div>
        </div>
      ))}

      {/* Output handles — right side */}
      {outputs.map((id, idx) => (
        <div key={id}>
          <Handle
            type="source"
            position={Position.Right}
            id={id}
            style={{
              top: `${((idx + 1) / (outputs.length + 1)) * 100}%`,
              background: accentColor,
              border: '2px solid oklch(0.13 0.01 264)',
              width: 10,
              height: 10,
            }}
          />
          <div style={{
            top: `calc(${((idx + 1) / (outputs.length + 1)) * 100}% - 8px)`,
          }} className="absolute right-0 -mr-3 flex justify-start">
            <span
              className="absolute text-[10px] font-mono pointer-events-none"
              style={{
                color: 'oklch(0.55 0.02 264)',
              }}
            >
              {id}
            </span>
          </div>
        </div>
      ))}
    </div >
  );
}
