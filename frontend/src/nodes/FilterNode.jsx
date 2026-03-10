import BaseNode from '../components/BaseNode';

export default function FilterNode({ data, selected }) {
  return (
    <BaseNode
      title="Filter"
      accentColor="oklch(0.6 0.2 70)"
      icon="⊟"
      inputs={['data']}
      outputs={['matched', 'unmatched']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Field
        </label>
        <input
          type="text"
          defaultValue={data?.field ?? ''}
          placeholder="e.g. status"
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Condition
        </label>
        <select
          defaultValue={data?.condition ?? 'eq'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="eq">Equals</option>
          <option value="neq">Not Equals</option>
          <option value="contains">Contains</option>
          <option value="gt">Greater Than</option>
          <option value="lt">Less Than</option>
        </select>
        <input
          type="text"
          defaultValue={data?.value ?? ''}
          placeholder="value"
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </BaseNode>
  );
}
